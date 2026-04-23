import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Puzzle, Paintbrush, Rocket, Baby, ChevronRight } from 'lucide-react';

const collections = [
  { 
    name: 'Educational', 
    act: 'Learning & STEM', 
    desc: 'Science kits, math puzzles, and interactive learning tools.', 
    icon: <Puzzle size={24} />, 
    color: 'bg-orange-500',
    link: '/programs'
  },
  { 
    name: 'Creative', 
    act: 'Arts & Crafts', 
    desc: 'Premium paints, drawing sets, and DIY crafting bundles.', 
    icon: <Paintbrush size={24} />, 
    color: 'bg-blue-500',
    link: '/programs'
  },
  { 
    name: 'Discovery', 
    act: 'Outdoor & Active', 
    desc: 'Explorer gear, ride-ons, and backyard adventure sets.', 
    icon: <Rocket size={24} />, 
    color: 'bg-brand-primary',
    link: '/programs'
  },
  { 
    name: 'Sensory', 
    act: 'Baby & Toddler', 
    desc: 'Soft toys, teether sets, and developmetal sensory play.', 
    icon: <Baby size={24} />, 
    color: 'bg-brand-secondary',
    link: '/programs'
  }
];

export default function DailyActivities() {
  return (
    <section className="py-32 bg-white overflow-hidden" id="collections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-display">Shop by <span className="text-brand-primary">Collection</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our carefully handpicked categories designed to spark imagination and encourage healthy development through play.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {collections.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="relative"
              >
                <GlassCard className="p-10 h-full bg-white border-none shadow-premium hover:shadow-2xl transition-all duration-500 group cursor-pointer" onClick={() => window.location.href = item.link}>
                   <div className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:rotate-12 group-hover:scale-110`}>
                      {item.icon}
                   </div>
                   <div className="text-brand-primary font-bold text-xs uppercase tracking-widest mb-2">{item.name}</div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.act}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8">{item.desc}</p>
                   
                   <div className="flex items-center gap-2 text-brand-primary font-bold text-sm group-hover:gap-4 transition-all">
                      Browse Full Collection <ChevronRight size={16} />
                   </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
