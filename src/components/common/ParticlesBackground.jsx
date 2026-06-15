import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        const color = theme === 'dark'
          ? `rgba(0, 200, 255, ${this.opacity})`
          : `rgba(100, 120, 150, ${this.opacity * 0.4})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      const numberOfParticles = Math.min(60, Math.floor(canvas.width / 28));
      particles = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();

    let isScrolling = false;
    let scrollTimeout;

    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => { isScrolling = false; }, 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop — skips frames while user is scrolling
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isScrolling) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 10000) {
            const distance = Math.sqrt(distSq);
            const lineColor = theme === 'dark'
              ? `rgba(0, 200, 255, ${0.15 * (1 - distance / 100)})`
              : `rgba(100, 120, 150, ${0.06 * (1 - distance / 100)})`;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
    };
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default ParticlesBackground;
