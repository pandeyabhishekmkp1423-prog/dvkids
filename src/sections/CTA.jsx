import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';

export default function BubbleKineticCTA() {
  // Generate random bubbles
  const [bubbles, setBubbles] = useState([...Array(10)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * (60 - 20) + 20,
    delay: Math.random() * 5,
    duration: Math.random() * (6 - 3) + 3
  })));

  const popBubble = (id) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    // Respawn a new bubble after popping to keep it endless
    setTimeout(() => {
      setBubbles(prev => [...prev, {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * (60 - 20) + 20,
        delay: 0,
        duration: Math.random() * (6 - 3) + 3
      }]);
    }, 1000);
  };

  return (
    <section className="relative py-16 lg:py-20 bg-[#050505] overflow-hidden border-y border-white/5 cursor-crosshair">
      
      {/* 1. INTERACTIVE BUBBLE ENGINE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              initial={{ y: "120%", opacity: 0, x: `${bubble.left}%` }}
              animate={{ y: "-20%", opacity: [0, 1, 1, 0] }}
              exit={{ scale: 2, opacity: 0, filter: "blur(10px)" }}
              transition={{ 
                duration: bubble.duration, 
                repeat: Infinity, 
                delay: bubble.delay,
                ease: "linear"
              }}
              className="absolute pointer-events-auto group"
              style={{ width: bubble.size, height: bubble.size }}
            >
              <button
                onClick={() => popBubble(bubble.id)}
                className="w-full h-full rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-[2px] transition-transform active:scale-150"
              >
                {/* Bubble Glint */}
                <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white/30 rounded-full blur-[1px]" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. SPEED LINES (The "Run" Effect) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
            className="absolute h-[1px] w-48 bg-orange-500"
            style={{ top: `${25 * i}%` }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 pointer-events-none">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* CONTENT BLOCK */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-500 text-[9px] font-black uppercase tracking-[0.4em]">
              <Sparkles size={10} fill="currentColor" /> Pop for a Surprise
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase italic">
              Level Up <span className="text-orange-500 not-italic">Together.</span>
            </h2>
            
            <p className="text-slate-500 text-xs md:text-sm max-w-sm mx-auto lg:mx-0 font-medium uppercase tracking-widest">
              Interactive play for the digital generation.
            </p>
          </div>

          {/* ACTION BLOCK */}
          <div className="pointer-events-auto">
            <motion.a 
              href="/shop"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group overflow-hidden px-10 py-4 bg-white rounded-2xl flex items-center gap-4 transition-all"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Enter The Shop</span>
                <span className="text-black font-black text-[12px] tracking-[0.1em] uppercase">Start Adventure</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                <ArrowRight size={18} />
              </div>
            </motion.a>
          </div>

        </div>
      </div>

      {/* 3. DYNAMIC PROGRESS LINE */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" 
        />
      </div>
    </section>
  );
}