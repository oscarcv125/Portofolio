import React, { Suspense, useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center, MeshRefractionMaterial, Bvh, useProgress, useGLTF } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import * as THREE from 'three';

const ENV_HDR_PATH = '/env/studio_small_09_2k.hdr';
const DIAMOND_HDR_PATH = '/env/photo_studio_01_1k.hdr';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

function Loader() {
  const { progress, active } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <div className="viewer-loading" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
      <div className="viewer-loading-spinner" />
      <div className="viewer-loading-label" style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>Loading {Math.round(progress)}%</div>
    </div>
  );
}

const getMetalMaterial = (color) => {
  let hexColor = 0xf9d77e;
  if (color === 'white') hexColor = 0xf0ede8;
  if (color === 'rose') hexColor = 0xf0b49e;

  return new THREE.MeshPhysicalMaterial({
    color: hexColor,
    metalness: 1.0,
    roughness: 0.12,
    envMapIntensity: 1.0,
  });
};

function RingModel({ modelPath, metalColor, interactingRef, isMobile }) {
  const { scene } = useGLTF(modelPath);

  const envMap = useLoader(RGBELoader, DIAMOND_HDR_PATH);
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  const { scale, sceneMaxDim } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    return { scale: 1.5 / maxDim, sceneMaxDim: maxDim };
  }, [scene]);

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.updateMatrixWorld(true);
    return c;
  }, [scene]);

  const renderedMeshes = useMemo(() => {
    const elements = [];
    const metalMaterial = getMetalMaterial(metalColor);

    cloned.traverse((mesh) => {
      if (mesh.isMesh) {
        const name = (mesh.name || mesh.userData.attributes?.name || '').toLowerCase();
        
        const isDiamond = name.includes('pear') || 
                          name.includes('oval') || 
                          name.includes('diamond') || 
                          name.includes('gem') ||
                          name.includes('round') ||
                          name.includes('cushion') ||
                          name.includes('emerald') ||
                          name.includes('princess') ||
                          name.includes('marquise') ||
                          name.includes('stone');

        if (!mesh.geometry.attributes.normal) {
          mesh.geometry.computeVertexNormals();
        }

        if (isDiamond) {
          mesh.geometry.computeBoundingSphere();
          const stoneRadius = mesh.geometry.boundingSphere?.radius ?? 0;
          const isCenterStone = stoneRadius / sceneMaxDim > 0.05;

          if (isCenterStone) {
            elements.push(
              <mesh key={mesh.uuid} geometry={mesh.geometry} matrix={mesh.matrixWorld.clone()} matrixAutoUpdate={false}>
                <MeshRefractionMaterial
                  envMap={envMap}
                  bounces={isMobile ? 1 : 2}
                  aberrationStrength={0}
                  ior={2.417}
                  fresnel={1}
                  fastChroma={true}
                  toneMapped={false}
                />
              </mesh>
            );
          } else {
            elements.push(
              <mesh key={mesh.uuid} geometry={mesh.geometry} matrix={mesh.matrixWorld.clone()} matrixAutoUpdate={false}>
                <meshPhysicalMaterial
                  color={0xffffff}
                  transmission={1}
                  thickness={0.2}
                  roughness={0}
                  ior={2.417}
                  envMap={envMap}
                  envMapIntensity={2}
                  transparent
                  toneMapped={false}
                />
              </mesh>
            );
          }
        } else {
          elements.push(
            <mesh key={mesh.uuid} geometry={mesh.geometry} matrix={mesh.matrixWorld.clone()} matrixAutoUpdate={false} material={metalMaterial} />
          );
        }
      }
    });

    return elements;
  }, [cloned, metalColor, envMap, isMobile, sceneMaxDim]);

  const groupRef = React.useRef(null);

  useFrame(() => {
    if (groupRef.current && !interactingRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <Bvh>
        <Center scale={scale}>
          {renderedMeshes}
        </Center>
      </Bvh>
    </group>
  );
}

export default function RingViewer({ modelPath, metalColor }) {
  const interactingRef = useRef(false);
  const handleStart = useCallback(() => { interactingRef.current = true; }, []);
  const handleEnd = useCallback(() => { interactingRef.current = false; }, []);
  const isMobile = useIsMobile();

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        dpr={[1, isMobile ? 1.5 : 2]}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 8, 5]} intensity={0.6} />

        <Suspense fallback={null}>
          <RingModel modelPath={modelPath} metalColor={metalColor} interactingRef={interactingRef} isMobile={isMobile} />
          <Environment files={ENV_HDR_PATH} background={false} environmentIntensity={1.0} />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={6}
          autoRotate={false}
          onStart={handleStart}
          onEnd={handleEnd}
        />
      </Canvas>
      <Loader />
    </div>
  );
}
