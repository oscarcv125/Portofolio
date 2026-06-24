import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Lightformer } from "@react-three/drei";
import {
	BallCollider,
	CuboidCollider,
	Physics,
	RigidBody,
	useRopeJoint,
	useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

const segmentProps = {
	type: "dynamic",
	canSleep: true,
	colliders: false,
	angularDamping: 4,
	linearDamping: 4,
};

function makeStrapTexture() {
	const canvas = document.createElement("canvas");
	canvas.width = 64;
	canvas.height = 512;
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "#ea580c";
	ctx.fillRect(0, 0, 64, 512);
	ctx.fillStyle = "#7c2d12";
	for (let i = -64; i < 512; i += 36) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(64, i + 30);
		ctx.lineTo(64, i + 40);
		ctx.lineTo(0, i + 10);
		ctx.closePath();
		ctx.fill();
	}
	ctx.fillStyle = "#fef3c7";
	ctx.fillRect(0, 0, 3, 512);
	ctx.fillRect(61, 0, 3, 512);
	const tex = new THREE.CanvasTexture(canvas);
	tex.wrapS = THREE.RepeatWrapping;
	tex.wrapT = THREE.RepeatWrapping;
	tex.anisotropy = 16;
	return tex;
}

function Band({ photoUrl }) {
	const band = useRef();
	const fixed = useRef();
	const j1 = useRef();
	const j2 = useRef();
	const j3 = useRef();
	const card = useRef();

	const vec = new THREE.Vector3();
	const ang = new THREE.Vector3();
	const rot = new THREE.Vector3();
	const dir = new THREE.Vector3();

	const texture = useTexture(photoUrl);
	const strapTexture = useMemo(makeStrapTexture, []);

	const [curve] = useState(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
			]),
	);

	const [dragged, drag] = useState(false);
	const [hovered, hover] = useState(false);

	// Framer Lanyard_Prod physics — proven stable
	useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
	useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
	useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
	useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

	useEffect(() => {
		if (hovered) {
			document.body.style.cursor = dragged ? "grabbing" : "grab";
			return () => {
				document.body.style.cursor = "auto";
			};
		}
	}, [hovered, dragged]);

	useFrame((state, delta) => {
		if (dragged) {
			vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
			dir.copy(vec).sub(state.camera.position).normalize();
			vec.add(dir.multiplyScalar(state.camera.position.length()));
			[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
			card.current?.setNextKinematicTranslation({
				x: vec.x - dragged.x,
				y: vec.y - dragged.y,
				z: vec.z - dragged.z,
			});
		}
		if (fixed.current && j1.current && j2.current && j3.current && card.current) {
			[j1, j2].forEach((ref) => {
				if (!ref.current.lerped)
					ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
				const clampedDistance = Math.max(
					0.1,
					Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
				);
				ref.current.lerped.lerp(
					ref.current.translation(),
					delta * (30 * clampedDistance),
				);
			});
			curve.points[0].copy(j3.current.translation());
			curve.points[1].copy(j2.current.lerped);
			curve.points[2].copy(j1.current.lerped);
			curve.points[3].copy(fixed.current.translation());
			band.current.geometry.setPoints(curve.getPoints(32));
			ang.copy(card.current.angvel());
			rot.copy(card.current.rotation());
			card.current.setAngvel({
				x: ang.x,
				y: ang.y - rot.y * 0.25,
				z: ang.z,
			});
		}
	});

	curve.curveType = "chordal";

	return (
		<>
			<group position={[0, 4, 0]}>
				<RigidBody ref={fixed} {...segmentProps} type="fixed" />
				<RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody
					position={[2, 0, 0]}
					ref={card}
					{...segmentProps}
					type={dragged ? "kinematicPosition" : "dynamic"}
				>
					<CuboidCollider args={[0.8, 1.125, 0.01]} />
					<group
						onPointerOver={() => hover(true)}
						onPointerOut={() => hover(false)}
						onPointerUp={(e) => {
							e.target.releasePointerCapture(e.pointerId);
							drag(false);
						}}
						onPointerDown={(e) => {
							e.target.setPointerCapture(e.pointerId);
							drag(
								new THREE.Vector3()
									.copy(e.point)
									.sub(vec.copy(card.current.translation())),
							);
						}}
					>
						{/* Card body */}
						<mesh castShadow>
							<boxGeometry args={[1.6, 2.25, 0.02]} />
							<meshPhysicalMaterial
								color="#e4e4e7"
								clearcoat={0.9}
								clearcoatRoughness={0.2}
								roughness={0.45}
								metalness={0.1}
							/>
						</mesh>
						{/* Photo plane on front */}
						<mesh position={[0, -0.04, 0.011]}>
							<planeGeometry args={[1.5, 2.1]} />
							<meshPhysicalMaterial
								map={texture}
								clearcoat={1}
								clearcoatRoughness={0.15}
								roughness={0.35}
								metalness={0.2}
								side={THREE.FrontSide}
							/>
						</mesh>
						{/* Photo plane on back */}
						<mesh position={[0, -0.04, -0.011]} rotation={[0, Math.PI, 0]}>
							<planeGeometry args={[1.5, 2.1]} />
							<meshPhysicalMaterial
								map={texture}
								clearcoat={1}
								clearcoatRoughness={0.15}
								roughness={0.35}
								metalness={0.2}
								side={THREE.FrontSide}
							/>
						</mesh>
						{/* Metal connector */}
						<mesh position={[0, 1.2, 0]}>
							<boxGeometry args={[0.24, 0.1, 0.16]} />
							<meshStandardMaterial
								color="#9ca3af"
								metalness={1}
								roughness={0.18}
							/>
						</mesh>
						{/* Clip ring */}
						<mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
							<torusGeometry args={[0.08, 0.02, 16, 48]} />
							<meshStandardMaterial
								color="#9ca3af"
								metalness={1}
								roughness={0.18}
							/>
						</mesh>
					</group>
				</RigidBody>
			</group>
			<mesh ref={band}>
				<meshLineGeometry />
				<meshLineMaterial
					color="white"
					map={strapTexture}
					useMap={1}
					depthTest={false}
					resolution={[1000, 1000]}
					lineWidth={0.15}
					repeat={[-3, 1]}
				/>
			</mesh>
		</>
	);
}

const Lanyard = ({ photoUrl = "/homepage.jpeg" }) => (
	<Canvas
		camera={{ position: [0, 0, 20], fov: 20 }}
		style={{ pointerEvents: "auto" }}
	>
		<ambientLight intensity={Math.PI * 0.7} />
		<directionalLight position={[5, 5, 5]} intensity={1.2} />
		<Suspense fallback={null}>
			<Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
				<Band photoUrl={photoUrl} />
			</Physics>
		</Suspense>
		<Environment background={false} blur={0.75}>
			<Lightformer
				intensity={2}
				color="white"
				position={[0, -1, 5]}
				rotation={[0, 0, Math.PI / 3]}
				scale={[100, 0.1, 1]}
			/>
			<Lightformer
				intensity={3}
				color="white"
				position={[-1, -1, 1]}
				rotation={[0, 0, Math.PI / 3]}
				scale={[100, 0.1, 1]}
			/>
			<Lightformer
				intensity={3}
				color="white"
				position={[1, 1, 1]}
				rotation={[0, 0, Math.PI / 3]}
				scale={[100, 0.1, 1]}
			/>
			<Lightformer
				intensity={10}
				color="white"
				position={[-10, 0, 14]}
				rotation={[0, Math.PI / 2, Math.PI / 3]}
				scale={[100, 10, 1]}
			/>
		</Environment>
	</Canvas>
);

export default Lanyard;
