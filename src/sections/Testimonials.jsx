import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

const reviews = [
  {
    text: "The wooden block quality is exceptional. My kids haven't stopped building since they arrived!",
    author: "Elena Rodriguez",
    role: "Verified Parent",
    img: "https://i.pravatar.cc/150?u=elena",
    color: "#F97316"
  },
  {
    text: "Robot kit was a massive hit! Arrived perfectly on time for the birthday. Exceptional service.",
    author: "James Wilson",
    role: "Gift Buyer",
    img: "https://i.pravatar.cc/150?u=james",
    color: "#3B82F6"
  },
  {
    text: "Finally, toys that are both safe and educational! My daughter is learning so much while having fun.",
    author: "Sarah Chen",
    role: "Mother of Two",
    img: "https://i.pravatar.cc/150?u=sarah",
    color: "#A855F7"
  },
  {
    text: "The sensory play kits are a game changer for my toddler. The materials are so soft and durable.",
    author: "Marcus Thorne",
    role: "Early Educator",
    img: "https://i.pravatar.cc/150?u=marcus",
    color: "#22C55E"
  },
  {
    text: "The best customer support I've ever experienced. They helped me pick the perfect age-appropriate gift.",
    author: "Aria Montgomery",
    role: "First-time Aunt",
    img: "https://i.pravatar.cc/150?u=aria",
    color: "#EC4899"
  }
];

export default function PerfectTestimonials() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = useCallback((newDir) => {
    setDirection(newDir);
    setIdx(prev => (prev + newDir + reviews.length) % reviews.length);
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => slide(1), 5000);
    return () => clearInterval(timer);
  }, [slide]);

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#f8fafc_0%,_transparent_100%)] -z-10" />
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20 lg:mb-28">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-orange-500 mb-4"
            >
              <Heart size={16} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Community Love</span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
              VOICES OF <br />
              <span className="text-slate-200 font-serif italic">Happy Families</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <div className="flex gap-1 text-orange-500 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Avg Rating 4.9/5.0</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => slide(-1)} className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => slide(1)} className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition-all shadow-xl">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* MULTI-CARD STAGE */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              {[-1, 0, 1].map((offset) => {
                const currentIdx = (idx + offset + reviews.length) % reviews.length;
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={`${currentIdx}-${offset}`}
                    custom={direction}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      x: offset * 400,
                      rotateY: offset * 30,
                      z: -100 
                    }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.3, 
                      scale: isActive ? 1 : 0.85, 
                      x: offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 350),
                      rotateY: offset * -15,
                      z: isActive ? 0 : -200,
                      filter: isActive ? 'blur(0px)' : 'blur(4px)'
                    }}
                    exit={{ opacity: 0, scale: 0.5, x: direction * -500 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-[320px] md:w-[500px] cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className={`relative bg-white p-8 md:p-14 rounded-[40px] md:rounded-[60px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-50 transition-all duration-500 ${isActive ? 'ring-1 ring-orange-500/20' : ''}`}>
                      <Quote className="absolute top-10 right-10 text-slate-100" size={60} />
                      
                      <div className="flex gap-1 text-orange-500 mb-8">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>

                      <p className="text-lg md:text-2xl font-medium text-slate-700 leading-relaxed italic mb-10 relative z-10">
                        "{reviews[currentIdx].text}"
                      </p>

                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                          <img src={reviews[currentIdx].img} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 text-lg leading-none mb-1">{reviews[currentIdx].author}</h4>
                          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{reviews[currentIdx].role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* PROGRESS DOTS */}
        <div className="flex justify-center gap-3 mt-12">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > idx ? 1 : -1);
                setIdx(i);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${idx === i ? 'w-12 bg-orange-500' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}