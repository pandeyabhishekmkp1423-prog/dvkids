import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { use3DTilt } from '../hooks/use3DTilt';
import ImageWithFallback from '../components/ImageWithFallback';

const ageGroups = [
  { age: '0-2 Years', image: 'https://images.unsplash.com/photo-1544569226-44165ff6e324?auto=format&fit=crop&q=80&w=400', count: 25, accent: 'from-[#ffe6da] to-[#fff8ef]' },
  { age: '3-5 Years', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400', count: 45, accent: 'from-[#e6f5ff] to-[#f7fbff]' },
  { age: '6-8 Years', image: 'https://images.unsplash.com/photo-1558877385-1199c1af4e8f?auto=format&fit=crop&q=80&w=400', count: 38, accent: 'from-[#f0ebff] to-[#fbf9ff]' },
  { age: '9-12 Years', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400', count: 52, accent: 'from-[#e8fff1] to-[#f8fffb]' },
  { age: '13+ Years', image: 'https://images.unsplash.com/photo-1560415755-bd80d06eda53?auto=format&fit=crop&q=80&w=400', count: 28, accent: 'from-[#fff3da] to-[#fffaf1]' }
];

function AgeCard({ group, index, onClick }) {
  const { tilt, elementRef } = use3DTilt(10, typeof window === 'undefined' ? false : window.innerWidth > 768);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="tilt-shell group cursor-pointer"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
    >
      <div className={`premium-card h-full overflow-hidden bg-gradient-to-br ${group.accent} p-3`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
          <ImageWithFallback
            src={group.image}
            alt={group.age}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/54 via-slate-900/10 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-white/86 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
            {group.count} toys
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-2xl font-extrabold text-white">{group.age}</h3>
            <div className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white/92">
              Explore age picks
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopByAge() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="premium-section px-6 py-10 sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,178,111,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(119,199,255,0.12),transparent_28%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/78 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-primary">
                <Sparkles size={14} />
                Shop by age
              </div>
              <h2 className="mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">Age-perfect picks with a more premium, guided feel.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Each collection is grouped to make choosing easier for parents while still feeling playful and visually rich.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {ageGroups.map((group, index) => (
              <AgeCard
                key={group.age}
                group={group}
                index={index}
                onClick={() => navigate(`/products?age=${encodeURIComponent(group.age)}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
