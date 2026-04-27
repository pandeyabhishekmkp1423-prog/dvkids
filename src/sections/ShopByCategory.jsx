import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  AnimatePresence,
  useTransform,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import categories from "../data/categories";

export default function NexusInfinity() {
  const navigate = useNavigate();

  const [dims, setDims] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📱 TUNED RESPONSIVE CONFIG
  const config = useMemo(() => {
    const mobile = dims.w < 640;
    const tablet = dims.w < 1024;
    return {
      // Tighter radius on mobile prevents cards from flying off-screen
      radius: mobile ? 150 : tablet ? 350 : 550, 
      cardW: mobile ? 120 : tablet ? 200 : 260,
      perspective: mobile ? "1000px" : "2800px",
      fontSize: mobile ? "24vw" : "22vw", // Larger background text for impact on small screens
      yOffset: mobile ? -20 : 0,
    };
  }, [dims.w]);

  const angle = 360 / categories.length;
  const rawRotation = useMotionValue(0);
  const rotation = useSpring(rawRotation, { stiffness: 40, damping: 26, mass: 1.5 });
  const bgParallax = useTransform(rotation, (r) => r * 0.1);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const snapTo = useCallback((index) => {
    const targetRotation = -index * angle;
    animate(rawRotation, targetRotation, { type: "spring", stiffness: 45, damping: 28 });
    const normalized = ((index % categories.length) + categories.length) % categories.length;
    setActiveIndex(normalized);
  }, [angle, rawRotation]);

  const next = useCallback(() => {
    const currentIndex = Math.round(-rawRotation.get() / angle);
    snapTo(currentIndex + 1);
  }, [angle, rawRotation, snapTo]);

  const prev = useCallback(() => {
    const currentIndex = Math.round(-rawRotation.get() / angle);
    snapTo(currentIndex - 1);
  }, [angle, rawRotation, snapTo]);

  useEffect(() => {
    if (isDragging || isHovering || !autoPlay) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isDragging, isHovering, autoPlay, next]);

  const onDragEnd = (_, info) => {
    setIsDragging(false);
    // Increased sensitivity for mobile swipes
    const threshold = dims.w < 640 ? 50 : 100;
    if (Math.abs(info.offset.x) > threshold) {
      info.offset.x < 0 ? next() : prev();
    } else {
      snapTo(Math.round(-rawRotation.get() / angle));
    }
  };

  const active = categories[activeIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#F8F9FB] text-slate-900 touch-none">
      
      {/* 🌤️ AMBIENT BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[60%] bg-orange-100/40 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[70%] h-[50%] bg-blue-50/50 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* 🏷️ HEADER */}
      <header className="absolute top-6 sm:top-16 left-0 w-full px-6 sm:px-20 z-[60]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Sparkles size={12} className="fill-current" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Curated Wonders</span>
          </div>
          <h1 className="text-4xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.8] uppercase text-slate-900">
            Shop by <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-rose-400 italic font-serif font-light lowercase">
              category
            </span>
          </h1>
        </motion.div>
      </header>

      {/* 🌀 THE STAGE */}
      <main
        className="relative w-full h-full flex items-center justify-center"
        style={{ 
          perspective: config.perspective, 
          perspectiveOrigin: "center 45%", // Tweaked for mobile viewing angle
          transform: `translateY(${config.yOffset}px)` 
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* PARALLAX BG TEXT */}
        <motion.div style={{ x: bgParallax }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.04, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              style={{ fontSize: config.fontSize }}
              className="font-black uppercase text-slate-900 whitespace-nowrap"
            >
              {active.name}
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        {/* 3D CAROUSEL RING */}
        <motion.div
          drag="x"
          onDragStart={() => setIsDragging(true)}
          onDragEnd={onDragEnd}
          style={{ rotateY: rotation, transformStyle: "preserve-3d" }}
          className="relative flex items-center justify-center cursor-grab active:cursor-grabbing z-20"
        >
          {categories.map((cat, i) => {
            const isSelected = activeIndex === i;

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  transform: `rotateY(${i * angle}deg) translateZ(${config.radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{
                    scale: isSelected ? 1.1 : 0.75,
                    opacity: isSelected ? 1 : 0.4,
                    filter: isSelected ? "blur(0px) saturate(1.1)" : "blur(2px) saturate(0.8)",
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onClick={() => isSelected && navigate(`/products?category=${cat.name}`)}
                  className={`relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-white border transition-all duration-700 ${isSelected ? 'border-orange-200 shadow-2xl' : 'border-slate-200 shadow-sm'}`}
                  style={{ width: config.cardW, height: config.cardW * 1.5 }}
                >
                  <img src={cat.image} alt="" className="w-full h-full object-cover select-none pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-6 sm:bottom-8 left-0 w-full px-4 text-center"
                      >
                        <h3 className="text-lg sm:text-2xl font-black italic font-serif leading-none uppercase tracking-tighter text-white drop-shadow-md">
                          {cat.name}
                        </h3>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </main>

      {/* 📊 FOOTER - Optimized for Mobile Stacking */}
      <footer className="absolute bottom-6 sm:bottom-16 w-full px-6 sm:px-20 z-[60] flex flex-col items-center justify-between gap-6 sm:flex-row pointer-events-none">
        <div className="max-w-xs w-full pointer-events-auto text-center sm:text-left order-2 sm:order-1">
          <motion.div key={activeIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 sm:space-y-4">
            <p className="text-slate-500 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold leading-relaxed line-clamp-2 sm:line-clamp-none">
              {active.description || "Discover high-quality, safe, and imaginative toys for every stage of growth."}
            </p>
            <button
              onClick={() => navigate(`/products?category=${active.name}`)}
              className="group relative w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 overflow-hidden rounded-full font-black text-[9px] tracking-[0.4em] transition-all bg-slate-900 text-white active:scale-95 shadow-xl"
            >
               <span className="relative flex items-center justify-center gap-2">
                 EXPLORE COLLECTION <Zap size={12} fill="currentColor" />
               </span>
            </button>
          </motion.div>
        </div>

        {/* PROGRESS PILLS */}
        <div className="flex flex-col items-center sm:items-end gap-3 pointer-events-auto order-1 sm:order-2">
          <div className="flex gap-1.5 bg-white/60 backdrop-blur-md p-2 rounded-full border border-white shadow-sm">
            {categories.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => snapTo(i)}
                animate={{
                  width: activeIndex === i ? 24 : 6,
                  backgroundColor: activeIndex === i ? "#ea580c" : "rgba(15, 23, 42, 0.1)"
                }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
          <span className="hidden sm:block text-[10px] font-black text-slate-400 tracking-[0.5em]">
            {activeIndex + 1} / {categories.length}
          </span>
        </div>
      </footer>

      {/* NAVIGATION ARROWS - Sized down for mobile */}
      <div className="absolute inset-x-4 sm:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between z-[70] pointer-events-none">
        <button onClick={prev} className="pointer-events-auto w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-900 active:scale-90 shadow-lg">
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button onClick={next} className="pointer-events-auto w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-900 active:scale-90 shadow-lg">
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}