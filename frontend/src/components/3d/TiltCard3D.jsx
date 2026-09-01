import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard3D({
  children,
  className = '',
  maxTilt = 12,
  glare = true,
  scale = 1.02,
  onClick
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), springConfig);
  const currentScale = useSpring(isHovered ? scale : 1, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  // Specular sheen position
  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  return (
    <div
      style={{ perspective: 1200 }}
      className={`relative select-none ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          scale: currentScale,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic 3D Specular Glare Reflection */}
        {glare && isHovered && (
          <motion.div
            style={{
              background: `radial-gradient(circle 240px at 50% 50%, rgba(255, 255, 255, 0.12), transparent 70%)`,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              position: 'absolute',
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 30,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
