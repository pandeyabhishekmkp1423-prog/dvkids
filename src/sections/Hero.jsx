import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'framer-motion';
import {
  Sparkles,
  PlayCircle,
  ShieldCheck,
  Heart,
  Star,
  ArrowRight,
  Rocket,
  Gamepad2,
  Puzzle,
  X,
  Cloud,
  Sun
} from 'lucide-react';

export default function App() {
  const [toast, setToast] = useState(null);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Extraordinary.", "Magical.", "Unforgettable."];
  const ref = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the 3D rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 30, stiffness: 200 });
  
  // Dynamic glare effect based on mouse position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [100, -100]), { damping: 20, stiffness: 150 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [100, -100]), { damping: 20, stiffness: 150 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the screen
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Staggered animation variants for content
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-[#FDFDFF] text-slate-800 font-sans selection:bg-orange-200">
      
      {/* --- CUSTOM TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 24, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-2xl border border-orange-100"
          >
            <Sparkles className="text-orange-500 w-5 h-5" />
            <span className="font-semibold text-slate-700">{toast}</span>
            <button onClick={() => setToast(null)} className="p-1 hover:bg-slate-100 rounded-full ml-4 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* --- AMBIENT BACKGROUND GLOWS --- */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-300/20 blur-[100px] pointer-events-none mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-300/20 blur-[100px] pointer-events-none mix-blend-multiply" />
        
        {/* Subtle dot pattern grid */}
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* --- FLYING CLOUDS & SUN --- */}
        <motion.div 
          className="absolute top-10 right-20 text-yellow-400 opacity-80"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <Sun size={100} fill="currentColor" />
        </motion.div>

        {[
          { top: '15%', duration: 45, size: 120, delay: 0 },
          { top: '35%', duration: 35, size: 80, delay: -10 },
          { top: '20%', duration: 55, size: 160, delay: -25 },
        ].map((cloud, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute text-white pointer-events-none drop-shadow-md opacity-90"
            style={{ top: cloud.top, zIndex: 0 }}
            initial={{ x: '-20vw' }}
            animate={{ x: '120vw' }}
            transition={{
              duration: cloud.duration,
              repeat: Infinity,
              ease: "linear",
              delay: cloud.delay
            }}
          >
            <Cloud size={cloud.size} fill="currentColor" />
          </motion.div>
        ))}

        {/* --- PREMIUM FLOATING ELEMENTS --- */}
        <motion.div
          className="absolute top-24 left-[10%] hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-md border border-white shadow-xl text-blue-500"
          animate={{ y: [0, -24, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <Rocket size={32} />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-[15%] hidden md:flex items-center justify-center w-20 h-20 rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-xl text-purple-500"
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        >
          <Puzzle size={40} />
        </motion.div>

        <motion.div
          className="absolute top-40 right-[8%] hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-xl text-green-500"
          animate={{ y: [0, -18, 0], rotate: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        >
          <Gamepad2 size={28} />
        </motion.div>

        {/* --- MAIN CONTENT CONTAINER --- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: TEXT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 max-w-xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-100 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <span className="text-xs font-bold text-orange-600 tracking-wide uppercase">
                  Fun Starts Here
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="h-40 sm:h-48 md:h-56">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
                Playtime <br /> Made <br />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 pb-2"
                  >
                    {words[currentWord].split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-500 leading-relaxed">
              Discover a world of safe, exciting toys meticulously designed to spark joy, unleash creativity, and provide endless hours of fun.
            </motion.p>

            {/* Feature Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: ShieldCheck, text: "Safe & Tested", color: "text-emerald-500", bg: "bg-emerald-50" },
                { icon: Star, text: "Top Rated", color: "text-amber-500", bg: "bg-amber-50" },
                { icon: Heart, text: "Loved by Kids", color: "text-pink-500", bg: "bg-pink-50" }
              ].map((feature, idx) => (
                <div key={idx} className={`flex items-center gap-2 px-4 py-2 rounded-2xl ${feature.bg} text-slate-700 font-semibold text-sm border border-white shadow-sm`}>
                  <feature.icon size={18} className={feature.color} />
                  {feature.text}
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-6">
              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => showToast("Routing to /products... 🚀")}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                Let’s Play 
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => showToast("Opening video player... 🎬")}
                className="group flex items-center justify-center gap-3 px-8 py-4 font-bold text-slate-700 bg-white border-2 border-slate-100 rounded-2xl hover:border-pink-200 hover:text-pink-500 transition-colors shadow-sm"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-pink-100 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 ease-out" />
                  <PlayCircle size={24} className="relative z-10" />
                </div>
                Watch the Fun
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D INTERACTIVE IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative mx-auto w-full max-w-md lg:max-w-full lg:ml-auto perspective-1000"
          >
            {/* The 3D Card */}
            <div className="group relative rounded-[40px] md:rounded-[60px] overflow-hidden bg-white p-2 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 transform-gpu">
              
              {/* Dynamic Glare Overlay */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)',
                  x: glareX,
                  y: glareY
                }}
              />

              <div className="relative w-full aspect-[4/5] md:aspect-square rounded-[32px] md:rounded-[48px] overflow-hidden">
                <motion.img
                  src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200"
                  alt="Happy kids playing and laughing outdoors"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Image Inner Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
              </div>

              {/* Float Badges on Image (Translated in Z-axis for 3D effect) */}
              <motion.div
                className="absolute -top-6 -right-6 md:top-8 md:-right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-30"
                style={{ transform: 'translateZ(60px)' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-xl">
                    <ShieldCheck className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Certified</p>
                    <p className="text-sm font-black text-slate-700">100% Safe</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 z-30"
                style={{ transform: 'translateZ(80px)' }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              >
                 <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-2 rounded-xl">
                    <Heart className="text-pink-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Happy Kids</p>
                    <p className="text-sm font-black text-slate-700">50k+ Reviews</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
        
        {/* CSS for hover shimmer effect */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}} />
      </section>
    </div>
  );
}