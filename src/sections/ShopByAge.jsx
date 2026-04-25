import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Star, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ageGroups = [
  { age: '0-2', label: 'Infants', image: 'https://images.unsplash.com/photo-1544569226-44165ff6e324?auto=format&fit=crop&q=80&w=600', color: '#FF7D45' },
  { age: '3-5', label: 'Toddlers', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600', color: '#45A5FF' },
  { age: '6-8', label: 'Explorers', image: 'https://images.unsplash.com/photo-1558877385-1199c1af4e8f?auto=format&fit=crop&q=80&w=600', color: '#A855F7' },
  { age: '9-12', label: 'Achievers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600', color: '#22C55E' },
  { age: '13+', label: 'Teens', image: 'https://images.unsplash.com/photo-1560415755-bd80d06eda53?auto=format&fit=crop&q=80&w=600', color: '#EC4899' }
];

function AgeCard({ group, index, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/products?age=${group.age}`)}
      className="group relative flex-shrink-0 w-[300px] lg:w-full aspect-[3/4.2] rounded-[56px] overflow-hidden cursor-pointer snap-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
    >
      {/* Background Image with Parallax Effect */}
      <motion.img 
        src={group.image} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
        alt={group.age}
      />
      
      {/* Dynamic Multi-layered Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[56px]" />

      {/* Glassmorphism Header */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
        <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2">
          <Star size={14} className="text-white fill-white" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Premium</span>
        </div>
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 90 }}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-2xl transition-transform"
        >
          <ArrowUpRight size={22} />
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="absolute inset-x-8 bottom-10 z-20">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-8 bg-white/40" />
            <span className="text-[11px] font-bold text-white/70 uppercase tracking-[0.3em]">{group.label}</span>
          </div>
          <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            {group.age}
            <span className="text-xl ml-1 font-medium text-white/50 italic">Years</span>
          </h3>
        </motion.div>

        {/* The Animated "Progress" CTA */}
        <div className="mt-8 overflow-hidden relative group/btn">
          <div className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-[0.2em]">
            <span>Explore Collection</span>
            <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
          </div>
          <motion.div 
            className="h-[3px] w-full bg-white/20 mt-3 rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full w-full origin-left"
              style={{ backgroundColor: group.color }}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Hover Light Reflection */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent_70%)]" />
    </motion.div>
  );
}

export default function AgeStage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  return (
    <section className="py-24 bg-[#FDFDFF] overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        
        {/* HEADER: Ultra-Modern Alignment */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-20">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-orange-500 mb-6"
            >
              <div className="p-2 bg-orange-100 rounded-xl">
                <Sparkles size={20} fill="currentColor" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em]">Curated Milestones</span>
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
              Shop by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-500 to-slate-300">Development.</span>
            </h2>
          </div>

          <div className="lg:max-w-xs space-y-6">
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              We align our collection with the <span className="text-slate-900 font-black">scientific growth</span> stages of your child.
            </p>
            <div className="h-[1px] w-full bg-slate-200" />
            <div className="flex items-center gap-4 text-slate-400">
               <Zap size={18} fill="currentColor" className="text-orange-400" />
               <span className="text-[10px] font-black uppercase tracking-widest">Select an age to begin</span>
            </div>
          </div>
        </div>

        {/* THE STAGE: Enhanced Spacing & Snap */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-16 gap-6 snap-x snap-mandatory no-scrollbar lg:grid lg:grid-cols-5 lg:overflow-visible lg:gap-8"
        >
          {ageGroups.map((group, i) => (
            <AgeCard key={i} group={group} index={i} navigate={navigate} />
          ))}
        </div>

        {/* REDESIGNED FOOTER CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 py-10 border-t border-slate-100"
        >
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
               </div>
             ))}
             <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white tracking-tighter">12k+</div>
          </div>
          
          <p className="text-slate-400 font-bold text-sm tracking-tight text-center md:text-left">
            Join thousands of parents who trust <span className="text-slate-900">DV Kids Castle</span>.
          </p>

          <button className="group px-10 py-5 rounded-[24px] bg-slate-950 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-orange-500 transition-all duration-500 flex items-center gap-3">
             Personal Gift Guide
             <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}