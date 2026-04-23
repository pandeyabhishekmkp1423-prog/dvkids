import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Mail, Sparkles } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
          
          <div className="max-w-3xl mx-auto text-center space-y-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-brand-primary rounded-[1.5rem] flex items-center justify-center text-3xl mx-auto shadow-2xl shadow-brand-primary/40 rotate-12"
            >
              <Sparkles className="text-white" size={32} />
            </motion.div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white font-display">
                Join the <span className="text-brand-primary">Toy Club</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Subscribe to get early access to new arrivals, exclusive discounts, and creative play ideas delivered straight to your inbox.
              </p>
            </div>
            
            <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-primary transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 transition-all text-lg"
                />
              </div>
              <Button className="h-16 px-10 text-lg">Subscribe</Button>
            </form>
            
            <p className="text-white/30 text-xs uppercase tracking-widest font-bold">
              No spam. Just joy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
