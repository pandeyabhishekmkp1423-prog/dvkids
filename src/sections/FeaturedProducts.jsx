import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/productApi';
import { ArrowRight, Sparkles } from 'lucide-react';

// A palette of premium hover colors to cycle through
const hoverColors = [
  'rgba(249, 115, 22, 0.1)', // Orange
  'rgba(59, 130, 246, 0.1)', // Blue
  'rgba(168, 85, 247, 0.1)', // Purple
  'rgba(34, 197, 94, 0.1)',  // Green
];

export default function FeaturedProducts({ title = "Best Sellers", filter = "best_seller" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProducts().then((allProducts) => {
      if (!mounted) return;
      const filtered = allProducts.filter((product) => product[filter] === 1);
      setProducts(filtered);
      setLoading(false);
    }).catch(() => {
      if (!mounted) return;
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [filter]);

  if (loading || products.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        
        {/* CINEMATIC HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-orange-500 mb-4"
            >
              <Sparkles size={16} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Handpicked Selection</span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.8]">
              {title.split(' ')[0]} <br />
              <span className="text-slate-200 font-serif italic">{title.split(' ').slice(1).join(' ')}</span>
            </h2>
          </div>
          
          <motion.a 
            href="/shop" 
            whileHover={{ x: 10 }}
            className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-orange-500 transition-colors"
          >
            Explore Catalog <ArrowRight size={18} />
          </motion.a>
        </div>

        {/* 3D PERSPECTIVE GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12" style={{ perspective: '1000px' }}>
          {products.map((product, i) => {
            const randomColor = hoverColors[i % hoverColors.length];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative"
              >
                {/* 3D MOTION CONTAINER */}
                <motion.div
                  whileHover={{ 
                    z: 50, 
                    rotateX: 2, 
                    rotateY: -2,
                    scale: 1.05 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full w-full rounded-[30px] lg:rounded-[50px] overflow-hidden bg-white shadow-sm border border-slate-100 transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* DYNAMIC BACKGROUND COLOR OVERLAY */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
                    style={{ backgroundColor: randomColor }}
                  />

                  {/* PRODUCT CARD CONTENT */}
                  <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                    <ProductCard product={product} />
                  </div>

                  {/* GLOWING BORDER EFFECT */}
                  <div className="absolute inset-0 rounded-[30px] lg:rounded-[50px] border-2 border-transparent group-hover:border-orange-500/30 transition-all duration-500 pointer-events-none" />
                </motion.div>

                {/* BACKGROUND DECORATION (Floating Index) */}
                <span className="absolute -bottom-4 -right-2 text-6xl font-black text-slate-50 -z-10 group-hover:text-orange-50 group-hover:scale-125 transition-all duration-700 select-none">
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}