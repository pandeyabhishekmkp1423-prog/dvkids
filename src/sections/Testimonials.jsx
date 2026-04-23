import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const reviews = [
  {
    text: "The quality of the wooden blocks is exceptional. My kids haven't stopped building since they arrived!",
    author: "Elena Rodriguez",
    role: "Verified Parent",
    img: "https://i.pravatar.cc/150?u=elena"
  },
  {
    text: "Beautifully packaged and arrived right on time for the birthday. The robot kit is a massive hit with my 7-year-old.",
    author: "James Wilson",
    role: "Gift Buyer",
    img: "https://i.pravatar.cc/150?u=james"
  },
  {
    text: "Finally, toys that are both safe and educational! My daughter is learning so much while having fun.",
    author: "Sarah Chen",
    role: "Mother of Two",
    img: "https://i.pravatar.cc/150?u=sarah"
  }
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
           <Quote className="w-16 h-16 text-brand-primary/10 mx-auto mb-6" />
           <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 font-display">Voices of <span className="text-brand-primary">Happy Parents</span></h2>
           <div className="flex items-center justify-center gap-1 text-brand-accent">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              <span className="ml-2 text-sm font-bold text-slate-400">4.9/5 RATING</span>
           </div>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[400px]">
           <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                 <GlassCard className="p-12 md:p-20 text-center bg-white/40 border-slate-100 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    
                    <p className="text-2xl md:text-4xl font-display text-slate-800 italic leading-relaxed mb-12">
                      "{reviews[idx].text}"
                    </p>
                    
                    <div className="flex flex-col items-center">
                       <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-4 overflow-hidden">
                          <img src={reviews[idx].img} alt={reviews[idx].author} className="w-full h-full object-cover" />
                       </div>
                       <div className="font-bold text-slate-900 text-xl">{reviews[idx].author}</div>
                       <div className="text-brand-primary text-xs font-bold uppercase tracking-[0.3em] mt-1">{reviews[idx].role}</div>
                    </div>
                 </GlassCard>
              </motion.div>
           </AnimatePresence>
        </div>

        <div className="flex justify-center gap-10 mt-10">
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setIdx(prev => (prev - 1 + reviews.length) % reviews.length)}
             className="w-16 h-16 bg-white rounded-2xl shadow-premium flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all border border-slate-50 text-slate-400"
           >
              <ChevronLeft size={28} />
           </motion.button>
           <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setIdx(prev => (prev + 1) % reviews.length)}
             className="w-16 h-16 bg-white rounded-2xl shadow-premium flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all border border-slate-50 text-slate-400"
           >
              <ChevronRight size={28} />
           </motion.button>
        </div>
      </div>
    </section>
  );
}
