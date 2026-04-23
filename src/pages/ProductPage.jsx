import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { ShoppingCart, Star, Shield, Truck, RotateCcw, Heart } from 'lucide-react';
import FeaturedProducts from '../sections/FeaturedProducts';
import ImageWithFallback from '../components/ImageWithFallback';
import { formatCurrencyINR } from '../utils/formatCurrency';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/cart/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const found = data.products.find(p => p.id === parseInt(id));
          setProduct(found);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen pt-40 flex justify-center uppercase tracking-widest font-bold text-slate-400">Loading Toy Details...</div>;
  if (!product) return <div className="min-h-screen pt-40 text-center text-2xl font-bold">Toy not found.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-4 aspect-square bg-slate-50 border-none overflow-hidden group">
              <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-105" />
            </GlassCard>
            <div className="grid grid-cols-4 gap-4 mt-6">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-slate-50 rounded-2xl border-2 border-transparent hover:border-brand-primary transition-all cursor-pointer overflow-hidden">
                    <ImageWithFallback src={product.image} alt={`${product.name} preview ${i}`} className="w-full h-full object-cover opacity-50 hover:opacity-100" />
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
               <span className="px-4 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
               <div className="flex items-center gap-1 text-orange-400">
                  <Star fill="currentColor" size={16} />
                  <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                  <span className="text-xs text-slate-400 font-normal ml-1">(120+ Reviews)</span>
               </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-display">{product.name}</h1>
            
            <div className="text-3xl font-bold text-slate-900 mb-10">{formatCurrencyINR(product.price)}</div>
            
            <p className="text-slate-500 text-lg leading-relaxed mb-10 border-l-4 border-brand-primary/20 pl-8 font-medium">
              {product.description}
            </p>

            <div className="space-y-8 mb-12">
               <div className="flex items-center gap-6">
                  <div className="flex items-center bg-slate-100 rounded-2xl p-1">
                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-xl font-bold text-slate-400 hover:text-slate-900">-</button>
                     <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                     <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-xl font-bold text-slate-400 hover:text-slate-900">+</button>
                  </div>
                  <Button onClick={() => addToCart({...product, quantity})} className="flex-1 h-14 text-lg gap-4">
                     Add to Bag <ShoppingCart size={24} />
                  </Button>
                  <button className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                     <Heart size={24} />
                  </button>
               </div>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-100">
               {[
                 { icon: <Shield size={20} />, label: 'Safety Verified', color: 'text-brand-primary' },
                 { icon: <Truck size={20} />, label: 'Fast Delivery', color: 'text-brand-secondary' },
                 { icon: <RotateCcw size={20} />, label: '30-Day Returns', color: 'text-brand-accent' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-3 text-center">
                    <div className={`${item.color} bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner`}>
                       {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* More Products */}
        <FeaturedProducts title="You May Also Like" filter="new_arrival" />
      </div>
    </div>
  );
}
