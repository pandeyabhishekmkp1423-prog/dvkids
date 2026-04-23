import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { CreditCard, Truck, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import { formatCurrencyINR } from '../utils/formatCurrency';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: ''
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);
    
    try {
      const res = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          items: cart,
          total
        })
      });
      const data = await res.json();
      if (data.success) {
        setTimeout(() => {
          setSuccess(true);
          clearCart();
          setLoading(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-50 via-white to-white -z-10" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <GlassCard className="p-16 text-center max-w-lg border-green-100">
             <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-200">
                <CheckCircle size={48} />
             </div>
             <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display text-green-600">Order Confirmed!</h2>
             <p className="text-slate-500 mb-10 leading-relaxed text-lg">
               Your DV Kids Castle order is on the way. We've sent your invoice and updates to your email.
             </p>
             <div className="flex flex-col gap-4">
                <a href="/">
                  <Button className="w-full">Explore Dashboard</Button>
                </a>
                <a href="/programs" className="text-sm font-bold text-slate-400 uppercase tracking-widest hover:text-brand-primary transition-colors">
                  Keep Shopping
                </a>
             </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
            <h1 className="text-4xl font-bold text-slate-900 font-display">Secure Checkout</h1>
            <div className="h-px flex-grow bg-slate-100 hidden md:block" />
            <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest px-4 py-2 bg-green-50 rounded-full border border-green-100">
               <ShieldCheck size={14} /> End-to-End Encrypted
            </div>
        </div>
        
        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <GlassCard depth={false} className="p-10 border-none shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Truck className="text-brand-primary" size={24} /> 1. Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Full Recipient Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Sarah Parker" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                 </div>
                 <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Email Contact</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="name@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                 </div>
                 <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Complete Address</label>
                    <input required type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Street, H.No, Apartment" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">City</label>
                    <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="City" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">PIN Code</label>
                    <input required type="text" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} placeholder="302019" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" />
                 </div>
              </div>
            </GlassCard>

            <GlassCard depth={false} className="p-10 border-none shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <CreditCard className="text-brand-primary" size={24} /> 2. Payment Method
              </h3>
              <div className="grid grid-cols-1 gap-4">
                 <div className="p-6 bg-slate-50 border-2 border-brand-primary rounded-[1.5rem] flex items-center justify-between group cursor-pointer transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">🇮🇳</div>
                       <div>
                          <span className="block font-bold text-slate-900">UPI / Cards</span>
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Fast payment for India</span>
                       </div>
                    </div>
                    <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center p-1.5 shadow-inner">
                       <div className="w-full h-full bg-white rounded-full" />
                    </div>
                 </div>
                 <div className="p-6 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-between opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl">📦</div>
                       <div>
                          <span className="block font-bold text-slate-400">Cash on Delivery</span>
                          <span className="text-xs text-slate-300 font-bold uppercase tracking-widest">(Coming soon)</span>
                       </div>
                    </div>
                 </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5">
             <GlassCard className="p-8 sticky top-32 lg:translate-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-10 border-b border-slate-50 pb-6 uppercase tracking-wider text-xs">Order Summary</h3>
                <div className="space-y-6 mb-10 overflow-y-auto max-h-[300px] pr-2">
                   <AnimatePresence>
                   {cart.map(item => (
                     <motion.div 
                        key={item.id} 
                        layout
                        className="flex justify-between items-center group"
                     >
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden shadow-inner">
                              <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                           </div>
                           <div className="text-sm">
                              <div className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{item.name}</div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</div>
                           </div>
                        </div>
                        <span className="font-bold text-slate-700">{formatCurrencyINR(item.price * item.quantity)}</span>
                     </motion.div>
                   ))}
                   </AnimatePresence>
                </div>
                
                <div className="pt-8 border-t border-slate-100 space-y-4">
                   <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-widest">
                      <span>Bag Subtotal</span>
                      <span>{formatCurrencyINR(total)}</span>
                   </div>
                   <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-widest">
                      <span>Shipping/Tax</span>
                      <span className="text-green-500">Free</span>
                   </div>
                   <div className="flex justify-between text-3xl font-bold pt-4">
                      <span className="text-slate-900 font-display">Total</span>
                      <span className="text-brand-primary font-display">{formatCurrencyINR(total)}</span>
                   </div>
                   <Button disabled={loading || cart.length === 0} className="w-full py-5 text-lg mt-6 shadow-2xl shadow-brand-primary/20" type="submit">
                      {loading ? (
                        <div className="flex items-center gap-3">
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           Processing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                           Place Secure Order <ArrowRight size={20} />
                        </div>
                      )}
                   </Button>
                </div>
             </GlassCard>
             
             <div className="mt-8 flex flex-col gap-4">
                 <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-widest bg-white p-4 rounded-2xl border border-slate-100">
                    <span className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center text-sm">🔒</span>
                    128-bit SSL encrypted connection
                 </div>
                 <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-widest bg-white p-4 rounded-2xl border border-slate-100">
                    <span className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-sm">🔄</span>
                    60-day Easy Refund Policy
                 </div>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
}
