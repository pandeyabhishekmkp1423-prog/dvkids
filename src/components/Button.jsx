import React from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../hooks/use3DTilt';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  const { tilt, elementRef } = use3DTilt(8); // reduced tilt for smoothness

  const variants = {
    primary:
      'bg-gradient-to-r from-[#FF8A00] to-[#FF4D8D] text-white shadow-lg hover:shadow-xl',

    secondary:
      'bg-gradient-to-r from-[#3ABEFF] to-[#4ADE80] text-white shadow-md hover:shadow-lg',

    outline:
      'bg-transparent border-2 border-[#FF8A00] text-[#FF8A00] hover:bg-[#FF8A00] hover:text-white',

    glass:
      'bg-white/20 backdrop-blur-lg border border-white/30 text-white hover:bg-white/30',

    ghost:
      'bg-transparent text-slate-600 hover:bg-orange-50 hover:text-[#FF4D8D]',
  };

  return (
    <motion.button
      ref={elementRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        fontFamily: 'Fredoka, sans-serif',
      }}
      className={`relative inline-flex items-center justify-center px-7 py-3 rounded-full font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {/* TEXT */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* 🎨 SOFT GLOW */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default Button;