import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, PartyPopper } from 'lucide-react';

export default function PlayfulBubbleCTA() {
  const bubbleColors = [
    'from-pink-300/60 to-purple-400/40',
    'from-yellow-200/60 to-orange-400/40',
    'from-cyan-200/60 to-blue-400/40',
    'from-green-200/60 to-emerald-400/40'
  ];

  // Reduced bubble count for a cleaner look in a smaller height
  const [bubbles, setBubbles] = useState([...Array(8)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * (60 - 30) + 30, // Smaller bubbles
    delay: Math.random() * 5,
    duration: Math.random() * (6 - 4) + 4,
    color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
  })));

  const popBubble = (id) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setTimeout(() => {
      setBubbles(prev => [...prev, {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * (60 - 30) + 30,
        delay: 0,
        duration: Math.random() * (6 - 4) + 4,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
      }]);
    }, 400);
  };

  return (
    // Reduced Padding (py-10 lg:py-14) to minimize height
    <section className="relative py-10 lg:py-14 bg-gradient-to-b from-blue-50 via-white to-orange-50 overflow-hidden border-y border-blue-100 cursor-default">
      
      {/* Background Decor */}
      <div className="absolute top-4 left-10 w-24 h-24 bg-white rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-4 right-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-60" />

      {/* Bubble Engine */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              initial={{ y: "110%", opacity: 0, x: `${bubble.left}%` }}
              animate={{ 
                y: "-10%", 
                opacity: [0, 1, 1, 0],
                x: [`${bubble.left}%`, `${bubble.left + 3}%`, `${bubble.left - 3}%`, `${bubble.left}%`] 
              }}
              exit={{ scale: 2, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: bubble.duration, repeat: Infinity, delay: bubble.delay, ease: "linear" }}
              className="absolute pointer-events-auto"
              style={{ width: bubble.size, height: bubble.size }}
            >
              <button
                onClick={() => popBubble(bubble.id)}
                className={`w-full h-full rounded-full border border-white/50 bg-gradient-to-br ${bubble.color} shadow-md backdrop-blur-[1px] transition-transform active:scale-75 hover:scale-110 relative`}
              >
                <div className="absolute top-[15%] left-[20%] w-1/3 h-1/4 bg-white/40 rounded-full blur-[1px] -rotate-45" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 pointer-events-none text-center">
        {/* Header Block - Compact Gaps */}
        <div className="flex flex-col items-center gap-3">
          <motion.div 
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white shadow-sm border border-blue-100 rounded-full text-blue-500 text-[10px] font-black uppercase tracking-widest"
          >
            <PartyPopper size={12} /> Tap the bubbles!
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
            Play Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Anytime.</span>
          </h2>
          
          <p className="text-slate-500 text-sm max-w-xs font-semibold">
            Sparking imagination and joy with toys that pop with personality!
          </p>
        </div>

        {/* Action Button - Reduced margins */}
        <div className="mt-6 pointer-events-auto">
          <motion.a 
            href="/products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex flex-col items-center gap-2 group"
          >
            <div className="px-8 py-3.5 bg-orange-500 text-white rounded-full flex items-center gap-3 shadow-lg hover:bg-orange-600 transition-all">
              <span className="font-black text-base">Start Exploring</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-yellow-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Free Shipping on first order!</span>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-slate-100">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-pink-400 via-orange-400 to-blue-400" 
        />
      </div>
    </section>
  );
}