import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GlassCard = ({ children, className = '', depth = true, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e) => {
    if (!depth) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`glass-effect rounded-[2rem] overflow-hidden group transition-shadow duration-500 ${className}`}
    >
      <div 
        style={{ transform: depth ? 'translateZ(20px)' : 'none' }} 
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
      
      {/* Subtle shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: 'translateZ(10px)' }}
      />
    </motion.div>
  );
};

export default GlassCard;
