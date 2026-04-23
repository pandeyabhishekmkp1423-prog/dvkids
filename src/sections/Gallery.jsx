import React from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1587654062353-ef9200958a46?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1560243563-062bff001d68?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1546776310-eef45dd6d39c?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
];

export default function Gallery() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
           <div className="text-brand-primary font-bold text-xs uppercase tracking-[0.3em] mb-4">Magic in Action</div>
           <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-display">Playtime <span className="text-brand-primary italic">Inspiration</span></h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
          {images.map((src, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
               className="relative group rounded-[2.5rem] overflow-hidden cursor-crosshair shadow-lg bg-slate-100"
             >
                <img 
                  src={src} 
                  alt="Gallery" 
                  className="w-full h-auto object-cover group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-primary scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                      🔍
                   </div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
