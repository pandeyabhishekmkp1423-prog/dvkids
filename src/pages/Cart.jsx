import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import { formatCurrencyINR } from '../utils/formatCurrency';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 bg-slate-50">
        <div className="text-8xl mb-8">🎒</div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Your bag is empty</h2>
        <p className="text-slate-500 mb-10">Add some educational kits or services to get started.</p>
        <a href="/programs">
          <Button>Browse Products</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 font-display">Your Shopping Bag</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard className="p-6 flex items-center gap-8 border-none">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{item.description}</p>
                    <div className="flex items-center gap-4">
                       <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-white rounded-lg transition-colors"><Minus size={16} /></button>
                          <span className="px-4 font-bold text-slate-800">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-white rounded-lg transition-colors"><Plus size={16} /></button>
                       </div>
                       <div className="text-lg font-bold text-brand-primary">{formatCurrencyINR(item.price * item.quantity)}</div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-4 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={24} />
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <GlassCard className="p-8 sticky top-32">
               <h3 className="text-xl font-bold text-slate-900 mb-8">Order Summary</h3>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-500">
                     <span>Subtotal</span>
                     <span className="font-bold text-slate-900">{formatCurrencyINR(total)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                     <span>Shipping</span>
                     <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Calculated at Checkout</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                     <span className="text-lg font-bold text-slate-900">Total</span>
                     <span className="text-2xl font-bold text-brand-primary">{formatCurrencyINR(total)}</span>
                  </div>
               </div>
               <a href="/checkout">
                 <Button className="w-full py-5 text-lg">Checkout</Button>
               </a>
               <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
                  🔒 Secure transaction via Stripe
               </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
