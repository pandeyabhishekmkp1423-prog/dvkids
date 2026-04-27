import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  HeartHandshake, 
  Star, 
  Cloud, 
  Circle, 
  Rocket,
  Gift,
  CheckCircle2
} from 'lucide-react';

// --- CONFIGURATION ---
const trustItems = [
  {
    title: 'Safe For Play',
    description: '100% Non-toxic materials and rounded edges.',
    icon: ShieldCheck,
    color: '#3b82f6', 
    glow: 'rgba(59, 130, 246, 0.6)',
    sticker: '🛡️'
  },
  {
    title: 'Top Quality',
    description: 'Premium wood & fabrics built to last generations.',
    icon: Sparkles,
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.6)',
    sticker: '✨'
  },
  {
    title: 'Turbo Delivery',
    description: 'Lightning fast 2-day delivery across major cities.',
    icon: Truck,
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.6)',
    sticker: '🚀'
  },
  {
    title: 'Care Promise',
    description: 'Not happy? 30-day "No-Questions" returns.',
    icon: HeartHandshake,
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.6)',
    sticker: '💝'
  }
];

// --- SUB-COMPONENTS ---

function FloatingDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] text-blue-200/30"
      >
        <Cloud size={100} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[15%] right-[8%] text-pink-200/30"
      >
        <Star size={80} fill="currentColor" />
      </motion.div>
      
      <div className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] bg-blue-400/5 blur-[100px] rounded-full animate-blob" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30vw] h-[30vw] bg-purple-400/5 blur-[100px] rounded-full animate-blob animation-delay-2000" />
    </div>
  );
}

function MagicalParticle({ containerRef }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newParticle = {
        id: Date.now() + Math.random(),
        x, y,
        size: Math.random() * 6 + 3,
        color: ['#FFD700', '#FF69B4', '#00BFFF', '#7CFC00'][Math.floor(Math.random() * 4)]
      };

      setParticles(prev => [...prev.slice(-10), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: p.y + 25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'absolute',
              left: p.x, top: p.y,
              width: p.size, height: p.size,
              backgroundColor: p.color,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${p.color}`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function TiltCard({ item, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 150 });
  
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { damping: 25 });
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0); mouseY.set(0);
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: "spring", bounce: 0.3, duration: 0.8 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group h-[260px] lg:h-[300px] w-full cursor-pointer"
    >
      <div 
        className="absolute inset-6 rounded-[40px] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500 -z-10"
        style={{ backgroundColor: item.color }}
      />

      <div 
        className="relative h-full w-full p-6 lg:p-8 rounded-[40px] lg:rounded-[48px] border-2 transition-all duration-500 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ 
          backgroundColor: isHovered ? item.color : 'rgba(255, 255, 255, 0.95)',
          borderColor: isHovered ? 'white' : 'rgba(226, 232, 240, 0.5)',
          boxShadow: isHovered 
            ? `0 30px 60px -12px ${item.glow}` 
            : '0 10px 30px -15px rgba(0,0,0,0.03)'
        }}
      >
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at ${spotlightX.get()}% ${spotlightY.get()}%, white 0%, transparent 60%)` }}
        />

        <motion.div
          animate={isHovered ? { y: -15, opacity: 1, scale: 1.2, rotate: 10 } : { y: 15, opacity: 0, scale: 0.5 }}
          className="absolute top-4 right-6 text-3xl pointer-events-none z-30"
        >
          {item.sticker}
        </motion.div>

        <motion.div 
          style={{ transform: "translateZ(60px)" }}
          className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-[24px] flex items-center justify-center mb-4 lg:mb-6 shadow-lg transition-all duration-500 ${isHovered ? 'bg-white/20 backdrop-blur-md scale-110' : 'bg-white border border-slate-100'}`}
        >
          <Icon 
            size={32} 
            className="relative z-10 transition-colors duration-500"
            style={{ color: isHovered ? '#fff' : item.color }} 
          />
        </motion.div>

        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 px-1">
          <h3 className={`text-xl lg:text-2xl font-black mb-1 lg:mb-2 tracking-tighter transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
            {item.title}
          </h3>
          <p className={`text-xs lg:text-sm font-bold leading-tight transition-colors duration-500 ${isHovered ? 'text-white/90' : 'text-slate-500'}`}>
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrustBar() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="bg-[#FDFDFF] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-600 overflow-x-hidden">
      <section className="relative py-16 lg:py-24">
        <FloatingDecor />
        <MagicalParticle containerRef={containerRef} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-md flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Verified Safety</span>
            </motion.div>

            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-none tracking-tighter">
              Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">Smiles</span> <br /> 
              Guaranteed <span className="italic text-slate-300">Safety.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" style={{ perspective: "2000px" }}>
            {trustItems.map((item, index) => (
              <TiltCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 lg:mt-24 p-1 relative rounded-[40px] lg:rounded-[48px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 overflow-hidden"
          >
             <div className="bg-white/10 backdrop-blur-2xl rounded-[38px] lg:rounded-[46px] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="space-y-2">
                   <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">The Playroom is Waiting!</h3>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto px-10 py-4 bg-white text-slate-900 font-black text-lg rounded-2xl shadow-xl flex items-center justify-center gap-3"
                >
                  <span>Explore Store</span>
                  <Sparkles size={20} className="text-orange-500" />
                </motion.button>
             </div>
          </motion.div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-10px, 15px) scale(0.95); }
        }
        .animate-blob { animation: blob 10s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}} />
    </div>
  );
}