import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, ShieldCheck, Smile, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTypingText } from '../hooks/useTypingText';
import { use3DTilt } from '../hooks/use3DTilt';
import ImageWithFallback from '../components/ImageWithFallback';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

function TiltImage({ src, alt, className = "" }) {
  const { tilt, elementRef } = use3DTilt(8, typeof window === 'undefined' ? false : window.innerWidth > 768);

  return (
    <motion.div
      ref={elementRef}
      whileHover={{ y: -6 }}
      className={`tilt-shell overflow-hidden rounded-[30px] ${className}`}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
    >
      <ImageWithFallback src={src} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  );
}

export default function About() {
  const typed = useTypingText(['Every Child', 'Every Adventure', 'Every Smile'], 85, 1700);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -40]);

  return (
    <div className="overflow-hidden pt-28">
      <section className="relative px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="premium-section isolate px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <div className="hero-grid absolute inset-0 opacity-50" />
            <motion.div style={{ y }} className="pointer-events-none absolute -right-10 top-12 h-48 w-48 rounded-full bg-brand-primary/16 blur-3xl" />
            <div className="pointer-events-none absolute left-0 top-1/2 h-44 w-44 -translate-x-1/3 rounded-full bg-kids-blue/14 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div initial="hidden" animate="visible" variants={reveal}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-primary">
                  <Sparkles size={14} />
                  Our Story
                </div>
                <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
                  Bringing Joy to
                  <span className="block gradient-text"> {typed}<span className="text-brand-primary">|</span></span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  DV Kids Castle was shaped around a simple idea: the best toys do more than entertain. They create rituals, spark confidence, and give families small moments that feel unforgettable.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_34px_-18px_rgba(15,23,42,0.75)] transition hover:-translate-y-0.5 hover:bg-brand-primary"
                  >
                    Explore Our Toys
                    <ArrowRight size={16} />
                  </Link>
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-5 py-3 text-sm text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-kids-green animate-pulse-soft" />
                    Trusted by playful families across Rajasthan
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative"
              >
                <TiltImage
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200"
                  alt="Children enjoying outdoor ride-on toys"
                  className="aspect-[4/4.4] premium-card p-3"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-4 max-w-xs rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_24px_50px_-28px_rgba(30,41,59,0.38)]"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Built for families</div>
                  <div className="mt-2 text-lg font-bold text-slate-900">Safe details, sturdy finishes, and joy that lasts longer than one season.</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            className="premium-card p-8 sm:p-10"
          >
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Our Story</div>
            <div className="story-line mt-6 space-y-8 pl-8">
              {[
                {
                  title: 'It started with family questions',
                  body: 'Parents wanted toys that looked exciting to children but still felt dependable when they arrived at home.'
                },
                {
                  title: 'We curated for trust first',
                  body: 'That meant choosing products that feel sturdy, thoughtful, and easy to love without overwhelming the space around them.'
                },
                {
                  title: 'Now we build memorable play',
                  body: 'Every product we feature is meant to turn ordinary afternoons into little adventures parents and kids remember together.'
                }
              ].map((item) => (
                <div key={item.title} className="relative">
                  <span className="story-dot" />
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="mt-3 text-base leading-7 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={reveal}
            className="premium-card p-8 sm:p-10"
          >
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Why Choose Us</div>
            <div className="mt-6 grid gap-5">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Safety',
                  text: 'Stable builds, parent-friendly details, and products selected with peace of mind in view.'
                },
                {
                  icon: Award,
                  title: 'Quality',
                  text: 'Premium finish, comfortable design, and durability that holds up to repeat play.'
                },
                {
                  icon: Smile,
                  title: 'Fun',
                  text: 'Playful styling, exciting ride-on moments, and designs that invite imagination instead of noise.'
                }
              ].map(({ icon: Icon, title, text }) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -6 }}
                  className="rounded-[28px] border border-white/75 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,245,236,0.76))] p-6 shadow-[0_18px_40px_-28px_rgba(51,65,85,0.45)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(255,178,111,0.18),rgba(119,199,255,0.18))] text-brand-primary">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{title}</h3>
                      <p className="mt-2 text-base leading-7 text-slate-600">{text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="premium-section px-6 py-10 sm:px-10"
          >
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Play In Motion</div>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A visual world designed to feel lively, warm, and full of possibility.</h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-slate-600">
                These moments are what shape the brand: soft energy, movement, and products that feel special without feeling overdone.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <TiltImage
                src="https://images.unsplash.com/photo-1516627145497-749d90539e26?auto=format&fit=crop&q=80&w=1200"
                alt="Kids playing with toys outside"
                className="aspect-[16/10] premium-card p-3"
              />
              <div className="grid gap-5">
                <TiltImage
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=1200"
                  alt="Playful toy moment"
                  className="aspect-[16/9] premium-card p-3"
                />
                <motion.div
                  whileHover={{ y: -6 }}
                  className="premium-card flex items-center justify-between gap-4 p-6"
                >
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">A Premium Promise</div>
                    <div className="mt-2 text-xl font-bold text-slate-900">Joy for kids. Confidence for parents.</div>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-[linear-gradient(145deg,#ffedd7,#cfeeff)]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            className="premium-section overflow-hidden px-6 py-10 sm:px-10"
          >
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,178,111,0.18),transparent_64%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Ready to Explore?</div>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Bring home toys that feel playful, polished, and made to last.</h2>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary"
              >
                Explore Our Toys
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
