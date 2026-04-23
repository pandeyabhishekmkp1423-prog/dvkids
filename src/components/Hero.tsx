import { motion } from 'motion/react';
import { use3DTilt } from '../hooks/use3DTilt';

export default function Hero() {
  const { tilt, elementRef } = use3DTilt(25);
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-brand-soft to-white">
      {/* Abstract Background Shapes */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Floating 3D Elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-kids-pink rounded-full floating opacity-20 glow-effect depth-1"></div>
      <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-kids-blue rounded-full floating-delayed opacity-30 glow-effect depth-2"></div>
      <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-kids-purple rounded-full floating opacity-25 glow-effect depth-3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-semibold mb-6 text-bubble bounce-gentle">
              ✨ 2024 Admissions Now Open
            </div>
            <h1
              ref={elementRef}
              className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6 text-3d"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              Where Little Minds Grow <span className="text-kids rainbow-bg bg-clip-text text-transparent">Big Dreams</span>
            </h1>
            <p
              className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl"
            >
              Nurturing creativity and building strong foundations through play-based learning. Discover a world where your child's natural curiosity leads the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href="#contact" 
                className="px-10 py-5 bg-brand-primary text-white font-bold rounded-2xl shadow-3d hover:shadow-xl transition-all hover:-translate-y-2 block text-center card-3d card-hover-pink glow-effect text-bubble"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Visit
              </motion.a>
              <motion.a 
                href="#programs" 
                className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all hover:-translate-y-1 block text-center card-3d card-hover-blue glow-effect text-comfort"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Programs
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl card-3d card-hover-purple parallax-3d">
               <img 
                 src="https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=1200" 
                 alt="Kids playing in class" 
                 className="w-full h-auto aspect-[4/3] object-cover"
               />
            </div>
            {/* Playful Floating Cards */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 card-3d card-hover-pink glow-effect"
              whileHover={{ rotateY: 10, rotateX: 5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-kids-pink rounded-full flex items-center justify-center text-white text-xl bounce-gentle">❤️</div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider text-bubble">Quality Care</div>
                  <div className="text-sm font-bold text-slate-800 text-comfort">100% Certified Staff</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 card-3d card-hover-blue glow-effect"
              whileHover={{ rotateY: -10, rotateX: -5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-kids-blue rounded-full flex items-center justify-center text-white text-xl floating">🎓</div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider text-bubble">Fun Learning</div>
                  <div className="text-sm font-bold text-slate-800 text-comfort">Play-Based Education</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
