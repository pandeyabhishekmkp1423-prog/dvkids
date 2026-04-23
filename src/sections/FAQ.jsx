import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping usually takes 3-5 business days. Express options are available at checkout for next-day delivery.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy for all unopened and unused toys in their original packaging.' },
  { q: 'Are your toys safe for toddlers?', a: 'Yes, all our toys are certified BPA-free, lead-free, and meet or exceed all international toy safety standards.' },
  { q: 'Do you offer gift wrapping?', a: 'Absolutely! You can select our premium gift wrapping service at the shopping cart page for a small additional fee.' }
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Shopping <span className="text-brand-primary">FAQ</span></h2>
          <p className="text-slate-500 text-lg">Everything you need to know about your order and our products.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
             <GlassCard key={i} depth={false} className="border-none">
                <button 
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left"
                >
                   <span className="text-lg font-bold text-slate-900">{faq.q}</span>
                   <div className={`transition-transform duration-300 ${active === i ? 'rotate-180' : ''}`}>
                      {active === i ? <Minus className="text-brand-primary" /> : <Plus className="text-slate-400" />}
                   </div>
                </button>
                <AnimatePresence>
                   {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                         <p className="px-8 pb-8 text-slate-500 leading-relaxed">
                            {faq.a}
                         </p>
                      </motion.div>
                   )}
                </AnimatePresence>
             </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
