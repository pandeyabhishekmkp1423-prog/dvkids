import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

const categories = [
  {
    title: 'STEM & Tech',
    desc: 'Robotics, Coding & Math',
    count: '24+ Toys',
    image: 'https://images.unsplash.com/photo-1531210609132-5d7ad3109a1c?auto=format&fit=crop&q=80&w=600',
    color: 'from-blue-500/10'
  },
  {
    title: 'Creative Arts',
    desc: 'Painting, Crafts & DIY',
    count: '18+ Toys',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
    color: 'from-orange-500/10'
  },
  {
    title: 'Educational',
    desc: 'Puzzles & Activity Books',
    count: '32+ Toys',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600',
    color: 'from-brand-primary/10'
  },
  {
    title: 'Outdoor Play',
    desc: 'Bikes, Tents & Fun',
    count: '12+ Toys',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600',
    color: 'from-brand-accent/10'
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-bold text-xs uppercase tracking-[0.3em] mb-4"
          >
            Explore the World of Play
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-display mb-6">
            Shop by <span className="text-brand-primary italic">Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="cursor-pointer group"
              onClick={() => window.location.href = `/programs?category=${cat.title.split(' ')[0]}`}
            >
              <GlassCard className="p-8 h-full bg-white border-none shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2">{cat.count}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors text-3d-toy">
                    {cat.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{cat.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
