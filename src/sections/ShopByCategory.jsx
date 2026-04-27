import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
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

/**
 * 📱 MOBILE UI COMPONENT
 * Features: Auto-scroll, manual buttons, and swipe gestures.
 */
const MobileUI = ({ activeIndex, snapTo, navigate, next, prev }) => {
  const active = categories[activeIndex];

  return (
    <section className="relative w-full h-screen bg-[#F8F9FB] flex flex-col overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/50 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 pt-10">
        <div className="flex items-center gap-2 text-orange-600 mb-1">
          <Sparkles size={12} className="fill-current" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curated Wonders</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter leading-none uppercase text-slate-900">
          Shop by <br />
          <span className="text-orange-500 italic font-serif font-light lowercase">category</span>
        </h1>
      </header>

      {/* Hero Swiper Area */}
      <main className="relative flex-1 flex items-center justify-center px-4">
        {/* Mobile Left Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-2 z-30 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200 active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} className="text-slate-800" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -50 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) next();
              if (info.offset.x > 50) prev();
            }}
            className="relative w-[85%] aspect-[4/5.5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white active:cursor-grabbing"
          >
            <img 
              src={active.image} 
              alt={active.name} 
              className="w-full h-full object-cover pointer-events-none" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-0 w-full text-center px-4">
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter font-serif">
                {active.name}
              </h2>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Right Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-2 z-30 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200 active:scale-90 transition-transform"
        >
          <ChevronRight size={20} className="text-slate-800" />
        </button>
      </main>

      {/* Footer Details */}
      <footer className="relative z-20 px-6 pb-12 flex flex-col gap-6">
        <div className="text-center space-y-4">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-1.5">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => snapTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-orange-500' : 'w-1.5 bg-slate-300'}`}
              />
            ))}
          </div>
          <p className="text-slate-500 text-xs font-medium leading-relaxed italic px-8 min-h-[32px] flex items-center justify-center">
            {active.description || "Explore our premium collection of favorites."}
          </p>
        </div>

        <button
          onClick={() => navigate(`/products?category=${active.name}`)}
          className="w-full py-5 bg-slate-900 text-white rounded-full font-black text-[11px] tracking-[0.4em] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-slate-200"
        >
          EXPLORE COLLECTION <Zap size={14} fill="currentColor" />
        </button>
      </footer>
    </section>
  );
};

/**
 * 💻 MAIN COMPONENT
 */
export default function NexusInfinity() {
  const navigate = useNavigate();
  const autoPlayRef = useRef(null);
  
  const [dims, setDims] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  useEffect(() => {
    const handleResize = () => setDims({ w: window.innerWidth });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D & Movement Logic
  const angle = 360 / categories.length;
  const rawRotation = useMotionValue(0);
  const rotation = useSpring(rawRotation, { stiffness: 40, damping: 26, mass: 1.5 });
  const bgParallax = useTransform(rotation, (r) => r * 0.1);

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

  // 🔄 AUTO-SCROLL ENGINE
  useEffect(() => {
    if (isUserInteracting) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      next();
    }, 4500); // Transitions every 4.5 seconds

    return () => clearInterval(autoPlayRef.current);
  }, [isUserInteracting, next]);

  // Interaction handlers to pause auto-scroll
  const handleInteractionStart = () => setIsUserInteracting(true);
  const handleInteractionEnd = () => {
    // Restart auto-scroll after 3 seconds of inactivity
    setTimeout(() => setIsUserInteracting(false), 3000);
  };

  const onDragEnd = (_, info) => {
    handleInteractionEnd();
    if (Math.abs(info.velocity.x) > 100) info.velocity.x < 0 ? next() : prev();
    else snapTo(Math.round(-rawRotation.get() / angle));
  };

  // --- RENDER ---

  if (dims.w < 640) {
    return (
      <div 
        onTouchStart={handleInteractionStart} 
        onTouchEnd={handleInteractionEnd}
        className="w-full h-full"
      >
        <MobileUI 
          activeIndex={activeIndex} 
          snapTo={snapTo} 
          navigate={navigate} 
          next={next} 
          prev={prev} 
        />
      </div>
    );
  }

  const active = categories[activeIndex];
  const config = { radius: 550, cardW: 260, perspective: "2800px", fontSize: "22vw" };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-[#F8F9FB] text-slate-900"
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
    >
      {/* 🌤️ BACKGROUND AMBIANCE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-orange-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-50/60 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-[35vh] bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* 🏷️ HEADER */}
      <header className="absolute top-16 left-0 w-full px-20 z-[60]">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Sparkles size={12} className="fill-current" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Curated Wonders</span>
          </div>
          <h1 className="text-9xl font-black tracking-tighter leading-[0.8] uppercase text-slate-900">
            Shop by <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-rose-400 italic font-serif font-light lowercase">
              category
            </span>
          </h1>
        </motion.div>
      </header>

      {/* 🌀 3D STAGE */}
      <main
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: config.perspective }}
      >
        <motion.div style={{ x: bgParallax }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.04, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              style={{ fontSize: config.fontSize }}
              className="font-black uppercase text-slate-900 whitespace-nowrap"
            >
              {active.name}
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        <motion.div
          drag="x"
          onDragStart={handleInteractionStart}
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
                    scale: isSelected ? 1.15 : 0.75,
                    opacity: isSelected ? 1 : 0.6,
                    filter: isSelected ? "blur(0px) saturate(1.1)" : "blur(2px) saturate(0.8)",
                    translateZ: isSelected ? 100 : -100 
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => isSelected && navigate(`/products?category=${cat.name}`)}
                  className={`relative rounded-[2.5rem] overflow-hidden bg-white border transition-all duration-700 ${isSelected ? 'border-orange-200 shadow-2xl' : 'border-slate-200 shadow-lg'}`}
                  style={{ width: config.cardW, height: config.cardW * 1.5 }}
                >
                  <img src={cat.image} alt="" className="w-full h-full object-cover select-none pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent opacity-60" />
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-8 left-0 w-full px-4 text-center">
                        <h3 className="text-2xl font-black italic font-serif leading-none uppercase tracking-tighter text-white">
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

      {/* 📊 FOOTER */}
      <footer className="absolute bottom-16 w-full px-20 z-[60] flex items-center justify-between pointer-events-none">
        <div className="max-w-xs w-full pointer-events-auto">
          <motion.div key={activeIndex} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold leading-relaxed">
              {active.description || "Discover high-quality, safe, and imaginative treasures."}
            </p>
            <button
              onClick={() => navigate(`/products?category=${active.name}`)}
              className="group px-10 py-4 rounded-full font-black text-[9px] tracking-[0.4em] transition-all bg-slate-900 text-white hover:bg-orange-600 shadow-xl shadow-slate-200"
            >
              EXPLORE COLLECTION <Zap size={14} fill="currentColor" className="inline ml-2" />
            </button>
          </motion.div>
        </div>

        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          <div className="flex gap-1.5 bg-slate-200/50 backdrop-blur-xl p-2 rounded-full border border-white">
            {categories.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => snapTo(i)}
                animate={{
                  width: activeIndex === i ? 30 : 6,
                  backgroundColor: activeIndex === i ? "#ea580c" : "rgba(15, 23, 42, 0.15)"
                }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
          <span className="text-[10px] font-black text-slate-400 tracking-[0.5em]">
            {activeIndex + 1} / {categories.length}
          </span>
        </div>
      </footer>

      {/* DESKTOP NAVIGATION ARROWS */}
      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 flex justify-between z-[70] pointer-events-none">
        <button onClick={prev} className="pointer-events-auto w-16 h-16 flex items-center justify-center rounded-full bg-white backdrop-blur-md border border-slate-200 text-slate-900 hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-90">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="pointer-events-auto w-16 h-16 flex items-center justify-center rounded-full bg-white backdrop-blur-md border border-slate-200 text-slate-900 hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-90">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}