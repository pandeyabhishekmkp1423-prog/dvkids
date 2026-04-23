import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Truck, HeartHandshake } from 'lucide-react';

const trustItems = [
  {
    title: 'Trusted by Parents',
    description: 'Over 12,000 families love our toys.',
    icon: ShieldCheck,
    accent: 'bg-brand-primary'
  },
  {
    title: 'Premium Quality',
    description: 'Safe materials and certified designs.',
    icon: Sparkles,
    accent: 'bg-kids-pink'
  },
  {
    title: 'Fast Delivery',
    description: 'Quick shipping across India.',
    icon: Truck,
    accent: 'bg-kids-blue'
  },
  {
    title: 'Toy Care Promise',
    description: 'Happiness guaranteed with every purchase.',
    icon: HeartHandshake,
    accent: 'bg-kids-green'
  }
];

export default function TrustBar() {
  return (
    <div className="py-14 bg-gradient-to-b from-white to-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-primary font-bold">Why DV Kids Castle</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 font-display">Built with trust, safety and endless play in mind.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="trust-item"
              >
                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-white ${item.accent} shadow-lg mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
