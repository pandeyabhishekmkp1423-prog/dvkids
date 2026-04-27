import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import GlassCard from './GlassCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { use3DTilt } from '../hooks/use3DTilt';
import ImageWithFallback from './ImageWithFallback';
import { formatCurrencyINR } from '../utils/formatCurrency';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const { tilt, elementRef } = use3DTilt(14); // softer tilt
  const wishlisted = isWishlisted(product.id);

  const hasDiscount =
    product.original_price && product.original_price > product.price;

  const discountPercent =
    product.discount ||
    (hasDiscount
      ? Math.round(
          ((product.original_price - product.price) /
            product.original_price) *
            100
        )
      : 0);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <GlassCard className="p-4 h-full bg-white border-none shadow-md group-hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-[28px]">

        {/* IMAGE */}
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-50 kid-float">
          <motion.div whileHover={{ scale: 1.08 }}>
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </motion.div>

          {/* 🎯 STICKERS */}
          {product.best_seller && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-400 text-black text-[10px] font-bold rounded-full shadow-md">
              🔥 Hot
            </div>
          )}

          {product.new_arrival && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-green-400 text-white text-[10px] font-bold rounded-full shadow-md">
              ✨ New
            </div>
          )}

          {hasDiscount && (
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full shadow-md">
              {discountPercent}% OFF
            </div>
          )}

          {/* ❤️ WISHLIST */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition ${
              wishlisted
                ? 'text-red-500 bg-red-50'
                : 'text-slate-400 hover:text-red-500'
            }`}
          >
            <Heart size={18} className={wishlisted ? 'fill-red-500' : ''} />
          </motion.button>
        </div>

        {/* CONTENT */}
        <div className="px-2">

          {/* CATEGORY + RATING */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {product.category}
            </span>

            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-slate-600">
                {product.rating}
              </span>
            </div>
          </div>

          {/* TITLE */}
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#FF4D8D] transition">
            {product.name}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* AGE */}
          <div className="inline-block mb-3 px-3 py-1 bg-blue-100 text-blue-700 text-[10px] rounded-full font-bold">
            {product.age_range}
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-slate-900">
              {formatCurrencyINR(product.price)}
            </span>

            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through">
                {formatCurrencyINR(product.original_price)}
              </span>
            )}
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full h-11 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF4D8D] text-white text-sm font-bold shadow-lg hover:scale-[1.03] transition"
          >
            Grab It 🚀
          </motion.button>
        </div>

        {/* ✨ HOVER GLOW */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
      </GlassCard>
    </motion.div>
  );
}