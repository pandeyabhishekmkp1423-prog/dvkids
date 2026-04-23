import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Camera, TreePine, Palette, ShieldCheck } from 'lucide-react';

const facilities = [
  { img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800', title: 'Imagination Zones', tag: 'Discovery', icon: <Camera size={20} /> },
  { img: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800', title: 'Learning Corners', tag: 'Knowledge', icon: <TreePine size={20} /> },
  { img: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=800', title: 'Creativity Studios', tag: 'Artistic', icon: <Palette size={20} /> },
  { img: 'https://images.unsplash.com/photo-1587654062353-ef9200958a46?auto=format&fit=crop&q=80&w=800', title: 'Safety Hub', tag: 'Care', icon: <ShieldCheck size={20} /> }
];

export default function Facilities() {
  return (
    <section className="py-32 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
           <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-display">The Boutique <span className="text-brand-primary">Experience</span></h2>
           <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
             Step into a curated world where every corner is designed to inspire wonder and facilitate the perfect find for your child.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {facilities.map((fac, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="relative overflow-hidden h-[400px] border-none group">
                 <img 
                   src={fac.img} 
                   alt={fac.title} 
                   className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent p-12 flex flex-col justify-end">
                    <div className="flex items-center gap-3 text-brand-accent font-bold text-xs uppercase tracking-[0.3em] mb-4">
                       <span className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">{fac.icon}</span>
                       {fac.tag}
                    </div>
                    <h3 className="text-3xl font-bold text-white font-display mb-2">{fac.title}</h3>
                    <div className="w-12 h-1 bg-brand-primary group-hover:w-24 transition-all duration-500" />
                 </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
