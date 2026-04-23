import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Arora',
    role: 'Mother of Aarush, age 4',
    quote:
      'The quality was the first thing I noticed. The excitement on delivery day was incredible, but what really mattered was how safe and sturdy everything felt once we set it up.',
    highlight: 'Elegant product quality'
  },
  {
    name: 'Rohan Mehta',
    role: 'Father of twins',
    quote:
      'We were looking for something premium but not flashy. DV Kids Castle nailed that balance. The toys feel special, and the shopping experience felt calm and trustworthy.',
    highlight: 'Smooth buying experience'
  },
  {
    name: 'Sneha Kapoor',
    role: 'Parent gifting for a birthday',
    quote:
      'It felt like buying from a boutique brand, not a generic toy catalog. The finish, the delivery support, and the way the kids reacted made it completely worth it.',
    highlight: 'Memorable gifting moment'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const active = testimonials[activeIndex];

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const previous = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="premium-section relative overflow-hidden px-6 py-14 sm:px-10">
          <div className="hero-grid absolute inset-0 opacity-40" />
          <div className="absolute left-0 top-12 h-44 w-44 rounded-full bg-brand-primary/12 blur-3xl" />
          <div className="absolute right-0 top-4 h-52 w-52 rounded-full bg-kids-blue/12 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Testimonials</div>
              <h1 className="mt-4 max-w-lg text-5xl font-extrabold leading-[0.95] sm:text-6xl">
                Parents remember how a brand makes them feel.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                These stories reflect the feeling we want across the site: premium, warm, and easy to trust from the very first interaction.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={previous}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-slate-800 transition hover:text-brand-primary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white transition hover:bg-brand-primary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>

            <div className="relative">
              <div className="premium-card min-h-[360px] overflow-hidden p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <Quote className="text-brand-primary" size={34} />
                      <div className="flex gap-1 text-brand-accent">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} size={18} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <p className="mt-8 text-2xl font-bold leading-10 text-slate-900">
                      "{active.quote}"
                    </p>

                    <div className="mt-auto flex flex-col gap-5 pt-10 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <div className="text-xl font-bold text-slate-900">{active.name}</div>
                        <div className="mt-1 text-sm text-slate-500">{active.role}</div>
                      </div>
                      <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(255,178,111,0.18),rgba(119,199,255,0.18))] px-4 py-3 text-sm font-semibold text-slate-700">
                        {active.highlight}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex ? 'w-10 bg-slate-900' : 'w-2.5 bg-slate-300'
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            'Premium product feel',
            'Clear support and communication',
            'Playful products children actually return to'
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="premium-card p-6"
            >
              <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">What stands out</div>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">{item}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                The interface and the brand language now reinforce the same feeling these reviews describe: premium, safe, and emotionally warm.
              </p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
}
