import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Zap, Sparkles } from 'lucide-react';

const categories = [
  { name: 'Ride-ons', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&w=800' },
  { name: 'Building', image: 'https://images.unsplash.com/photo-1611676279444-5577698aa13c?auto=format&w=800' },
  { name: 'Dolls', image: 'https://images.unsplash.com/photo-1612506001235-f0d0892aa11b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9sbHxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Stem Toys', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&w=800' },
  { name: 'Outdoor', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&w=800' },
  { name: 'Board Games', image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*ohbyb9_Hp0wHG0zi8OzidA@2x.jpeg' },
  { name: 'Plushies', image: 'https://images.unsplash.com/photo-1559440666-3027b1632731?auto=format&w=800' },
  { name: 'Safety Gear', image: 'https://ohhbabies.com/cdn/shop/files/image_jU8.jpg?v=1729346495&width=1946' },
];

export default function NexusInfinity() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const autoPlayRef = useRef();

  const angle = 360 / categories.length;

  const handleRotate = useCallback((direction) => {
    setRotation(prev => direction === 'next' ? prev - angle : prev + angle);
    setActiveIndex(prev => direction === 'next' 
      ? (prev + 1) % categories.length 
      : (prev - 1 + categories.length) % categories.length
    );
  }, [angle]);

  // AUTO-SCROLL ENGINE (Desktop & Mobile)
  useEffect(() => {
    if (isHovering) return;
    autoPlayRef.current = setInterval(() => handleRotate('next'), 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [isHovering, handleRotate]);

  // SHAKE ANIMATION VARIANTS
  const shakeVariants = {
    idle: { x: 0 },
    shaking: {
      x: [0, -4, 4, -4, 4, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
    }
  };

  return (
    <section 
      className="relative w-full h-[90vh] lg:h-screen bg-white flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      
      {/* 1. STICKY HEADER */}
      <div className="absolute top-12 left-0 w-full px-6 lg:px-20 z-50 pointer-events-none">
        <div className="flex flex-col gap-1">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <Sparkles size={12} className="text-orange-500 fill-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Station 0.3</span>
          </motion.div>
          <h2 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-none">
            Shop by <span className="text-orange-500 font-serif italic">Category</span>
          </h2>
        </div>
      </div>

      {/* 2. THE 3D STAGE - Optimized perspective to prevent card cutting */}
      <div className="relative w-full h-[500px] flex items-center justify-center" style={{ perspective: '2000px' }}>
        
        {/* SHAKING NAVIGATION - LEFT */}
        <div className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-50">
          <motion.button 
            variants={shakeVariants}
            animate="shaking"
            onClick={() => handleRotate('prev')}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-slate-100 bg-white shadow-2xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all text-slate-400"
          >
            <ChevronLeft size={32} />
          </motion.button>
        </div>

        {/* SHAKING NAVIGATION - RIGHT */}
        <div className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-50">
          <motion.button 
            variants={shakeVariants}
            animate="shaking"
            onClick={() => handleRotate('next')}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-slate-900 text-white shadow-2xl flex items-center justify-center hover:bg-orange-500 transition-all"
          >
            <ChevronRight size={32} />
          </motion.button>
        </div>

        {/* --- THE REVOLVING RING --- */}
        <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[450px]" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            animate={{ rotateY: rotation }}
            transition={{ type: 'spring', stiffness: 40, damping: 18 }}
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {categories.map((cat, i) => {
              const itemAngle = i * angle;
              // Dynamically calculated radius to ensure 0% card cutting on small/large screens
              const radius = typeof window !== 'undefined' && window.innerWidth < 1024 ? 280 : 520; 

              return (
                <div
                  key={i}
                  className="absolute inset-0 origin-center"
                  style={{
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <motion.div 
                    onClick={() => navigate(`/products?category=${cat.name}`)}
                    className={`relative w-full h-full rounded-[40px] overflow-hidden cursor-pointer border-[1px] transition-all duration-700
                      ${activeIndex === i 
                        ? 'border-orange-500 shadow-[0_50px_100px_-20px_rgba(249,115,22,0.2)] scale-110 z-50' 
                        : 'border-transparent opacity-20 scale-75 blur-[1px]'}`}
                  >
                    <img src={cat.image} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                    {/* CARD NAME - BEAUTIFUL FONT STYLE */}
                    <div className="absolute bottom-10 left-0 w-full px-8 text-center">
                       <AnimatePresence>
                         {activeIndex === i && (
                           <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="space-y-1"
                           >
                             <h3 className="text-3xl font-black text-white tracking-tighter font-serif italic leading-none">
                                {cat.name}
                             </h3>
                             <div className="w-8 h-[2px] bg-orange-500 mx-auto mt-2" />
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 3. DYNAMIC BACKGROUND TEXT (Optimized for desktop) */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden">
             <motion.h1
               key={activeIndex}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 0.05, scale: 1.1 }}
               className="text-[30vw] font-black text-slate-900 leading-none whitespace-nowrap"
             >
               {categories[activeIndex].name.toUpperCase()}
             </motion.h1>
        </div>
      </div>

      {/* 4. SYNCED DATA FOOTER */}
      <div className="absolute bottom-0 w-full h-24 border-t border-slate-50 flex items-center justify-between px-6 lg:px-20 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-orange-500 tracking-[0.4em] mb-1">AUTO-SYNC ACTIVE</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{categories[activeIndex].name}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 border-l border-slate-100 pl-12">
            <span className="font-bold text-slate-900 text-sm italic">0{activeIndex+1}</span>
            <div className="w-24 h-[3px] bg-slate-100 relative overflow-hidden rounded-full">
               <motion.div 
                 key={activeIndex}
                 initial={{ x: "-100%" }}
                 animate={{ x: "0%" }}
                 transition={{ duration: 4, ease: "linear" }}
                 className="absolute inset-0 bg-orange-500" 
               />
            </div>
            <span className="font-bold text-slate-300 text-sm">0{categories.length}</span>
          </div>
        </div>

        <button 
          onClick={() => navigate(`/products?category=${categories[activeIndex].name}`)}
          className="group flex items-center gap-4 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] tracking-[0.3em] transition-all hover:bg-orange-500 shadow-xl"
        >
          EXPLORE NOW <Zap size={14} fill="currentColor" className="group-hover:animate-bounce" />
        </button>
      </div>
    </section>
  );
}