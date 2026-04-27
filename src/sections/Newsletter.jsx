import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Send, BellRing } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-14 bg-[#FDFDFF] relative overflow-hidden">
      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-10 left-[10%] text-orange-200 opacity-50 hidden md:block"
      >
        <Sparkles size={40} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="relative group">
          {/* Subtle Glow Behind the Card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          
          <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-xl">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* LEFT: Content */}
              <div className="text-center lg:text-left flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <BellRing size={12} /> Don't miss out
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  Join the <span className="text-orange-500 font-serif italic font-normal lowercase">Toy Club</span>
                </h2>
                <p className="text-slate-500 text-base max-w-md mx-auto lg:mx-0 font-medium">
                  Get <span className="text-slate-900 font-bold">15% off</span> your first order and creative play ideas every week.
                </p>
              </div>

              {/* RIGHT: Modern Form */}
              <div className="w-full max-w-md">
                <form className="relative flex flex-col sm:flex-row gap-3 p-2 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner" 
                      onSubmit={(e) => e.preventDefault()}>
                  <div className="relative flex-1 group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full h-12 bg-transparent pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-medium"
                    />
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-12 px-8 bg-slate-900 hover:bg-orange-500 text-white rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-200"
                  >
                    <span className="font-bold text-sm tracking-wide">Join Now</span>
                    <Send size={14} />
                  </motion.button>
                </form>
                
                <div className="mt-4 flex items-center justify-center lg:justify-start gap-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    No Spam • One-Click Unsubscribe
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}