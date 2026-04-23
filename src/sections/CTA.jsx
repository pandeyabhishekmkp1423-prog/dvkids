import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section id="admission" className="py-32 relative overflow-hidden bg-brand-primary">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)] -z-10" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white rounded-full blur-[100px] -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <GlassCard className="glass-effect-dark p-12 md:p-24 text-center max-w-5xl mx-auto border-white/10 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
               <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 bg-white/10 rounded-full text-brand-accent text-xs font-bold uppercase tracking-[0.3em]">
                  <Sparkles size={16} /> Exclusive Holiday Collections
               </div>
               <h2 className="text-5xl md:text-8xl font-bold text-white mb-10 font-display leading-[0.9]">
                 Begin the <br />Adventure Today.
               </h2>
               <p className="text-white/70 text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
                 Discover toys that inspire, educate, and delight. Our collections are curated to bring infinite smiles to every home.
               </p>
               <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <a href="/programs" className="w-full sm:w-auto">
                    <Button variant="glass" className="w-full px-16 py-6 text-xl">Shop the Collection</Button>
                  </a>
                  <a href="/about" className="text-white/60 font-bold uppercase tracking-[0.2em] hover:text-white transition-all flex items-center gap-3 group">
                    Gift Guide <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </a>
               </div>
            </motion.div>

            {/* Subtle floating shapes inside card */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-brand-accent rounded-full animate-ping" />
            <div className="absolute bottom-10 right-10 w-2 h-2 bg-brand-accent rounded-full animate-ping" style={{ animationDelay: '1s' }} />
         </GlassCard>
      </div>
    </section>
  );
}
