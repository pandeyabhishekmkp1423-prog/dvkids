import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import GlassCard from './GlassCard';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { use3DTilt } from '../hooks/use3DTilt';
import ImageWithFallback from './ImageWithFallback';
import { formatCurrencyINR } from '../utils/formatCurrency';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { tilt, elementRef } = use3DTilt(20);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <GlassCard className="p-4 h-full bg-white border-none shadow-sm group-hover:shadow-2xl transition-all duration-500 overflow-hidden card-3d card-hover-pink glow-effect">
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-50">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.new_arrival && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
              New
            </div>
          )}
          {product.best_seller && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
              Popular
            </div>
          )}
        </div>

        <div className="px-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-orange-400 fill-orange-400" />
              <span className="text-xs font-bold text-slate-600">{product.rating}</span>
            </div>
          </div>

          <h3
            className="text-lg font-bold text-slate-900 mb-2 truncate group-hover:text-brand-primary transition-colors text-3d-toy"
          >
            {product.name}
          </h3>

          <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 h-8 text-comfort">
            {product.description}
          </p>

          <div className="flex items-center justify-between gap-4">
            <div
              className="text-xl font-bold text-slate-900"
            >
              {formatCurrencyINR(product.price)}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-kids-pink hover:rotate-12 transition-all shadow-lg active:scale-90 bounce-gentle glow-effect"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
