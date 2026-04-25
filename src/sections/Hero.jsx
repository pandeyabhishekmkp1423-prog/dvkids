import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles, ArrowRight, Star, PlayCircle, ShieldCheck, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PremiumLightHero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Mouse Tracking for subtle depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // 3D Parallax Offsets
  const heroRotateY = useTransform(springX, [-0.5, 0.5], [5, -5]);
  const heroRotateX = useTransform(springY, [-0.5, 0.5], [-5, 5]);
  const kidTranslateX = useTransform(springX, [-0.5, 0.5], [-20, 20]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#FDFDFF] py-20"
    >
      {/* --- PREMIUM LIGHT BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] bg-blue-50/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[50%] bg-orange-50/50 blur-[100px] rounded-full" />
        {/* Subtle Mesh Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* --- LEFT: TEXT CONTENT (6 Cols) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8 z-30 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 shadow-sm">
              <Sparkles size={16} className="text-orange-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">Premium Indian Toy Boutique</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Playtime Made <br />
              <span className="text-orange-500">Extraordinary.</span>
            </h1>

            <p className="text-lg text-slate-500 max-w-md font-medium leading-relaxed mx-auto lg:mx-0">
              Transform every afternoon into a magical adventure with our certified, safe, and futuristic ride-on collection.
            </p>

            {/* CTA SECTION (Below Text) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/products')}
                className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
              >
                Explore Collection <ArrowRight size={20} />
              </motion.button>
              
              <button className="flex items-center gap-3 text-slate-900 font-bold hover:text-orange-500 transition-colors">
                <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm">
                  <PlayCircle size={20} />
                </div>
                See It In Action
              </button>
            </div>
          </motion.div>

          {/* --- MIDDLE: THE KID (Floating bridge) --- */}
          <motion.div 
            style={{ x: kidTranslateX }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="hidden xl:flex absolute left-[42%] top-[55%] -translate-y-1/2 z-40"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white p-4 rounded-[32px] shadow-2xl flex items-center gap-4">
               <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=200" alt="Happy kid" className="w-full h-full object-cover" />
               </div>
               <div>
                  <div className="flex text-orange-400 gap-1 mb-1"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
                  <p className="text-xs font-black text-slate-800">"Best gift ever!"</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Aarav's Mom, Mumbai</p>
               </div>
            </div>
          </motion.div>

          {/* --- RIGHT: HERO IMAGE (7 Cols) --- */}
          <motion.div 
            style={{ rotateX: heroRotateX, rotateY: heroRotateY, transformStyle: 'preserve-3d' }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[1.1/1] w-full rounded-[80px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border-[12px] border-white group">
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                alt="Kid playing with toy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
              
              {/* Floating Badge on Image */}
              <div className="absolute top-10 right-10 flex flex-col gap-3">
                 <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-white flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-xl text-green-600"><ShieldCheck size={20} /></div>
                    <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest">ISO Certified Safety</div>
                 </div>
                 <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-white flex items-center gap-3">
                    <div className="p-2 bg-pink-50 rounded-xl text-pink-500"><Heart size={20} /></div>
                    <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Loved by 15k+ Parents</div>
                 </div>
              </div>
            </div>

            {/* Decorative Background Element for Image */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-slate-100 rounded-[80px] -z-10 translate-x-4 translate-y-4" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}