import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot (fast)
  const dotSpringX = useSpring(mouseX, { stiffness: 500, damping: 30, mass: 0.5 });
  const dotSpringY = useSpring(mouseY, { stiffness: 500, damping: 30, mass: 0.5 });
  const dotX = useTransform(dotSpringX, v => v - 6);
  const dotY = useTransform(dotSpringY, v => v - 6);

  // Ring (slower lag)
  const ringSpringX = useSpring(mouseX, { stiffness: 200, damping: 20, mass: 0.8 });
  const ringSpringY = useSpring(mouseY, { stiffness: 200, damping: 20, mass: 0.8 });
  const ringX = useTransform(ringSpringX, v => v - 16);
  const ringY = useTransform(ringSpringY, v => v - 16);


  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);

    // motion value .set() does NOT trigger React re-renders
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{ background: 'white', x: dotX, y: dotY }}
        animate={{ scale: isHovering ? 0.8 : 1 }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.5 }}
      />

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border-2"
        style={{ borderColor: 'rgba(255, 255, 255, 0.5)', x: ringX, y: ringY }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.8 }}
      />

    </>
  );
};

export default CustomCursor;
