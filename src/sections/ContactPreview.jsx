import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Mail, Phone, MapPin, Send, MessageSquareHeart } from 'lucide-react';

export default function ContactPreview() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-orange-50/50 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8"
              >
                 <MessageSquareHeart size={32} />
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 font-display leading-[1]">
                Questions? <br /><span className="text-brand-primary italic">We're Listening.</span>
              </h2>
              <p className="text-slate-500 text-xl mb-16 leading-relaxed max-w-lg">
                Whether it's about the curriculum, dietary plans, or campus safety—our team is here to provide clarity.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                 {[
                   { icon: <Phone size={24} />, title: "Voice Support", val: "1-800-KIDS-CASTLE", color: "bg-orange-50 text-orange-600" },
                   { icon: <Mail size={24} />, title: "Digital Mailbox", val: "hello@kidscastle.edu", color: "bg-blue-50 text-blue-600" },
                   { icon: <MapPin size={24} />, title: "Global Village", val: "123 Education Pkwy, CA", color: "bg-green-50 text-green-600" }
                 ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 12 }}
                      className="flex items-center gap-6 group cursor-pointer"
                    >
                       <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm`}>
                          {item.icon}
                       </div>
                       <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.title}</div>
                          <div className="text-xl font-bold text-slate-800">{item.val}</div>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>

           <div className="relative">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-10"
                  >
                     <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-200">
                        <Send size={32} />
                     </div>
                     <h3 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h3>
                     <p className="text-slate-500 text-lg">Our team will get back to you within 2 business hours.</p>
                     <Button variant="ghost" onClick={() => setSent(false)} className="mt-8">Send another message</Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <GlassCard className="p-12 md:p-14 border-none shadow-2xl bg-white/60">
                       <form onSubmit={handleSubmit} className="space-y-8">
                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Your Name</label>
                                <input required type="text" className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" placeholder="Sarah P." />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Contact Email</label>
                                <input required type="email" className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" placeholder="sarah@example.com" />
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Inquiry</label>
                             <textarea required rows={5} className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all resize-none" placeholder="Tell us what's on your mind..."></textarea>
                          </div>
                          <Button disabled={loading} className="w-full py-6 text-xl shadow-xl shadow-brand-primary/20" type="submit">
                            {loading ? 'Transmitting...' : 'Send Message'}
                          </Button>
                       </form>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
}
