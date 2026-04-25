import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Truck, HeartHandshake } from 'lucide-react';

const trustItems = [
  {
    title: 'Trusted Parents',
    description: '12k+ Happy families.',
    icon: ShieldCheck,
    color: '#3b82f6', // Blue
    bg: 'bg-blue-50'
  },
  {
    title: 'Top Quality',
    description: 'ISO Certified safety.',
    icon: Sparkles,
    color: '#ec4899', // Pink
    bg: 'bg-pink-50'
  },
  {
    title: 'Fast Delivery',
    description: 'Pan India Shipping.',
    icon: Truck,
    color: '#f97316', // Orange
    bg: 'bg-orange-50'
  },
  {
    title: 'Care Promise',
    description: 'Joy Guaranteed.',
    icon: HeartHandshake,
    color: '#22c55e', // Green
    bg: 'bg-green-50'
  }
];

function TiltCard({ item, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-full cursor-pointer"
    >
      {/* THE MAIN CARD */}
      <div 
        className="relative h-full p-5 md:p-8 rounded-[32px] md:rounded-[40px] border transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
        style={{ 
          // Card turns into the item's color on hover
          backgroundColor: isHovered ? item.color : 'rgba(255, 255, 255, 0.7)',
          borderColor: isHovered ? item.color : 'rgba(255, 255, 255, 1)',
          boxShadow: isHovered ? `0 20px 40px ${item.color}40` : '0 10px 30px rgba(0,0,0,0.03)'
        }}
      >
        {/* ICON CONTAINER */}
        <motion.div 
          style={{ transform: "translateZ(40px)" }}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-500 ${isHovered ? 'bg-white' : item.bg}`}
        >
          <Icon 
            size={28} 
            className="transition-colors duration-500"
            style={{ color: isHovered ? item.color : item.color }} 
          />
        </motion.div>

        {/* TEXT CONTENT */}
        <div style={{ transform: "translateZ(20px)" }}>
          <h3 className={`text-sm md:text-xl font-black mb-1 md:mb-2 transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
            {item.title}
          </h3>
          <p className={`text-[10px] md:text-sm font-medium transition-colors duration-500 ${isHovered ? 'text-white/80' : 'text-slate-500'}`}>
            {item.description}
          </p>
        </div>

        {/* FLOATING PARTICLES (Visible only on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
               <div className="absolute top-2 right-4 w-2 h-2 bg-white/30 rounded-full animate-ping" />
               <div className="absolute bottom-4 left-6 w-1 h-1 bg-white/40 rounded-full animate-bounce" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TrustBar() {
  return (
    <section className="py-16 md:py-24 bg-[#FDFDFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* CENTERED HEADER */}
        <div className="text-center mb-12 md:mb-20">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-orange-500 font-black mb-3">Safety & Trust</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            Built for <span className="text-slate-400 italic">Peace of Mind.</span>
          </h2>
        </div>

        {/* THE GRID: 2 columns on mobile, 4 on desktop */}
        <div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          style={{ perspective: "1000px" }}
        >
          {trustItems.map((item, index) => (
            <TiltCard key={index} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}