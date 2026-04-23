import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    title: 'Wooden Building Blocks',
    age: '3+ Years',
    desc: 'Classic natural wood blocks designed to enhance spatial awareness and architectural creativity.',
    img: 'https://images.unsplash.com/photo-1587654062353-ef9200958a46?auto=format&fit=crop&q=80&w=600',
    color: 'from-orange-400 to-orange-500'
  },
  {
    title: 'Interactive Robot Kit',
    age: '6+ Years',
    desc: 'Introduce basic coding principles through fun, hands-on assembly and remote-controlled play.',
    img: 'https://images.unsplash.com/photo-1546776310-eef45dd6d39c?auto=format&fit=crop&q=80&w=600',
    color: 'from-blue-400 to-blue-500'
  },
  {
    title: 'Magical Playhouse',
    age: '2+ Years',
    desc: 'A spacious, safe haven for imaginative play, perfect for both indoor and outdoor adventures.',
    img: 'https://images.unsplash.com/photo-1563177441-df071536b566?auto=format&fit=crop&q=80&w=600',
    color: 'from-brand-secondary to-green-600'
  }
];

export default function ProgramsOverview() {
  return (
    <section id="programs" className="py-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-display">
              Bestsellers for <span className="text-brand-primary">Curious Minds</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Explore our top-rated toys that have captured the hearts of kids and parents alike.
            </p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/programs'} className="h-fit">
            View All Collections <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <GlassCard className="group flex flex-col h-full bg-white border-none shadow-premium hover:shadow-2xl transition-all duration-700">
                <div className="relative h-64 overflow-hidden">
                   <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700 z-10`} />
                   <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-bold text-slate-900 uppercase tracking-widest z-20">
                      {p.age}
                   </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                   <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-primary transition-colors">{p.title}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                      {p.desc}
                   </p>
                   <div className="pt-6 border-t border-slate-50">
                      <a href="/admission" className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                        Buy Now <ArrowRight size={16} />
                      </a>
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
