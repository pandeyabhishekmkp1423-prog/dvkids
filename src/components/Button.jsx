import React from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../hooks/use3DTilt';

const Button = ({ children, variant = 'primary', className = '', type = 'button', disabled = false, onClick, ...props }) => {
  const { tilt, elementRef } = use3DTilt(10);
  const variants = {
    primary: 'bg-brand-primary text-white shadow-[0_4px_0_rgb(204,82,43)] active:shadow-none active:translate-y-[2px] transition-all hover:bg-kids-pink glow-effect',
    secondary: 'bg-white text-slate-800 border-2 border-slate-100 shadow-[0_4px_0_rgb(226,232,240)] active:shadow-none active:translate-y-[2px] transition-all hover:bg-kids-blue hover:text-white glow-effect',
    outline: 'bg-transparent border-2 border-brand-primary text-brand-primary active:translate-y-[2px] transition-all hover:bg-brand-primary hover:text-white glow-effect',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 glow-effect',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-kids-pink glow-effect'
  };

  return (
    <motion.button
      ref={elementRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        fontFamily: 'Poppins, sans-serif'
      }}
      className={`relative inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      {/* Subtle button glow on hover */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      )}
    </motion.button>
  );
};

export default Button;
