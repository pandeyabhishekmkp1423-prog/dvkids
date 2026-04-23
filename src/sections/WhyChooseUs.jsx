import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { ShieldCheck, Heart, Users, Laptop } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="text-orange-500" size={32} />,
    title: "Safe & Non-Toxic",
    text: "Every toy in our collection is rigorously tested and 100% certified non-toxic and child-safe.",
    color: "bg-orange-50"
  },
  {
    icon: <Users className="text-blue-500" size={32} />,
    title: "Expert Curation",
    text: "Our team of parents and educators handpicks each toy to ensure maximum developmental value.",
    color: "bg-blue-50"
  },
  {
    icon: <Laptop className="text-brand-secondary" size={32} />,
    title: "Fast Global Shipping",
    text: "We ship worldwide with real-time tracking so your little one never has to wait long for joy.",
    color: "bg-green-50"
  },
  {
    icon: <Heart className="text-pink-500" size={32} />,
    title: "Gift with Love",
    text: "Premium gift wrapping and personalized notes included to make every unboxing magical.",
    color: "bg-pink-50"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-bold text-xs uppercase tracking-[0.3em] mb-4"
          >
            The Kids Castle Difference
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-display">
            Why Parents <span className="text-brand-primary">Choose Us</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Beyond just toys, we provide tools for imagination and bridges to a brighter future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-10 h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white/40">
                <div className={`w-20 h-20 rounded-[1.5rem] ${f.color} flex items-center justify-center mb-8 shadow-inner`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {f.text}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
