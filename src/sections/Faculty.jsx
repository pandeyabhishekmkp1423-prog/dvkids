import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { Linkedin, Mail } from 'lucide-react';

const staff = [
  { 
    name: 'Emma Sterling', 
    role: 'Chief Joy Officer', 
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    bio: 'Finding the magic in every wooden piece and colorful playset for over 10 years.'
  },
  { 
    name: 'Olivia Rhodes', 
    role: 'Creative Design Head', 
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Passionate about toys that bridge the gap between education and pure fun.'
  },
  { 
    name: 'Julian Vance', 
    role: 'Lead Toy Safety Auditor', 
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    bio: 'Ensuring every product meets the highest international safety standards for your peace of mind.'
  }
];

export default function Faculty() {
  return (
    <section className="py-32 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
           <div className="text-brand-primary font-bold text-xs uppercase tracking-[0.3em] mb-4">Our Curators</div>
           <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-display">Guided by the <span className="text-brand-primary">Experts</span></h2>
           <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
             Our team isn't just selling toys; they are meticulously selecting the tools for your child's next big discovery.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {staff.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="h-full bg-white border-none shadow-premium hover:shadow-2xl transition-all duration-700 overflow-hidden group">
                 <div className="relative h-[300px] overflow-hidden">
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                 </div>
                 <div className="p-8 text-center relative z-10 -mt-16 bg-white mx-6 rounded-3xl shadow-xl transition-transform group-hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                    <div className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">{p.role}</div>
                    <p className="text-slate-500 text-xs leading-relaxed mb-6 italic">"{p.bio}"</p>
                    <div className="flex justify-center gap-4">
                       <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all"><Linkedin size={16} /></a>
                       <a href="#" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all"><Mail size={16} /></a>
                    </div>
                 </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
