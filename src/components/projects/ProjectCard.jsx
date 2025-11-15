import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={project.link}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative h-full group cursor-pointer"
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="glass-strong rounded-2xl p-6 h-full flex flex-col space-y-4 overflow-hidden relative"
          >
            {/* Gradient overlay on hover */}
            <motion.div
              animate={{
                opacity: isHovered ? 0.1 : 0,
              }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 pointer-events-none"
            />

            {/* Glow effect */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              className="absolute inset-0 rounded-2xl glow-effect pointer-events-none"
            />

            {/* Logo/Icon */}
            <div className="relative z-10">
              <motion.div
                animate={{
                  rotate: isHovered ? 360 : 0,
                }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 flex items-center justify-center backdrop-blur-sm"
              >
                {project.logo ? (
                  <img
                    src={project.logo}
                    alt={project.title}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-400" />
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2 font-mono group-hover:gradient-text transition-all duration-300">
                {project.title}
              </h3>
              <p className="dark:text-gray-300 text-gray-700 text-sm leading-relaxed flex-1 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* View Project Button */}
            <div className="relative z-10">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center dark:text-cyan-400 text-cyan-600 font-mono text-sm font-bold"
              >
                <span>{project.linkText || 'View Project'}</span>
                <motion.span
                  animate={{
                    x: isHovered ? 5 : 0,
                  }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </motion.div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
