import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Blocks, CarFront, Sparkles, Stars, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { useTypingText } from '../hooks/useTypingText';
import ImageWithFallback from '../components/ImageWithFallback';

const typedWords = ['Magic Ride', 'Bright Adventure', 'Happy Memory'];
const headlineWords = ['Let', 'Playtime', 'Take', 'Your', 'Child', 'on', 'a'];
const floatingToys = [
  { Icon: CarFront, className: 'left-6 top-28 md:left-12 md:top-36', color: 'bg-brand-accent/20 text-brand-primary', yRange: [0, 85] },
  { Icon: Blocks, className: 'right-10 top-24 md:right-20 md:top-32', color: 'bg-kids-blue/20 text-kids-blue', yRange: [0, -70] },
  { Icon: Trophy, className: 'left-[14%] bottom-28', color: 'bg-kids-pink/20 text-kids-pink', yRange: [0, 55] },
  { Icon: Stars, className: 'right-[20%] bottom-24', color: 'bg-kids-purple/20 text-kids-purple', yRange: [0, -48] }
];

const familyPhotos = [
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1528460033277-8d8fd42e8f76?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=300'
];

function FloatingToy({ Icon, className, color, scrollYProgress, yRange }) {
  const motionY = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      style={{ y: motionY }}
      animate={{ rotate: [0, 10, -8, 0] }}
      transition={{ duration: 7.5, ease: 'easeInOut', repeat: Infinity }}
      className={`absolute hidden md:flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[28px] border border-white/35 backdrop-blur-md ${className}`}
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-[22px] shadow-[0_20px_34px_-22px_rgba(15,23,42,0.38)] ${color}`}>
        <Icon size={28} strokeWidth={1.8} />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const typedLine = useTypingText(typedWords, 80, 1800);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const tiltRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const horseX = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const puzzleY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-24 md:pt-28"
    >
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1600"
        alt="Kids enjoying colorful ride-on toys"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,15,34,0.85),rgba(15,23,42,0.55),rgba(30,41,59,0.42))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,107,0.35),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(119,199,255,0.24),transparent_30%),radial-gradient(circle_at_center,rgba(255,143,177,0.14),transparent_38%)]" />
      <motion.div
        style={{ y: heroY }}
        className="hero-orb right-[-80px] top-10 h-[360px] w-[360px] bg-brand-primary/25"
      />
      <motion.div
        style={{ y: cardY }}
        className="hero-orb bottom-0 left-[-60px] h-[320px] w-[320px] bg-kids-blue/22"
      />
      <div className="hero-grid absolute inset-0 opacity-20" />
      <motion.div
        style={{ x: horseX }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-2 hidden items-end gap-3 md:flex"
      >
        <div className="rounded-full bg-white/14 px-4 py-2 text-4xl backdrop-blur-md">{'\u{1F40E}'}</div>
        <div className="h-1 w-28 rounded-full bg-white/30" />
      </motion.div>
      <motion.div
        style={{ y: puzzleY }}
        animate={{ rotate: [0, 8, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[9%] top-[18%] hidden rounded-[28px] border border-white/25 bg-white/16 px-4 py-3 text-3xl backdrop-blur-md md:block"
      >
        {'\u{1F9E9}'}
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[8%] top-[22%] hidden rounded-[26px] border border-white/25 bg-white/16 px-4 py-3 text-3xl backdrop-blur-md md:block"
      >
        {'\u{1F3A0}'}
      </motion.div>

      {floatingToys.map((toy) => (
        <FloatingToy
          key={toy.className}
          Icon={toy.Icon}
          className={toy.className}
          color={toy.color}
          scrollYProgress={scrollYProgress}
          yRange={toy.yRange}
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-8">
        <motion.div
          style={{ y: contentY, rotate: tiltRotate }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/12 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white/90 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-brand-accent" />
            Premium kids toys made for Indian families
          </motion.div>

          <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[0.92] text-white sm:text-6xl lg:text-8xl">
            {headlineWords.map((word, index) => (
              <span key={word} className="word-reveal mr-3">
                <motion.span
                  initial={{ y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="mt-3 block gradient-text drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)]">
              {typedLine}
              <span className="text-white">|</span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-slate-100/90 md:text-xl"
          >
            Ride-on cars, playful puzzle sets, and joyful outdoor toys designed to feel magical for children and dependable for parents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <button
              onClick={() => navigate('/products')}
              className="rounded-2xl bg-white px-6 py-4 text-sm font-bold text-slate-900 shadow-[0_20px_34px_-20px_rgba(255,255,255,0.6)] transition hover:-translate-y-1 hover:bg-brand-accent"
            >
              Explore Toys
            </button>
            <button
              onClick={() => navigate('/testimonials')}
              className="rounded-2xl border border-white/25 bg-white/8 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/14"
            >
              Hear from Parents
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <ImageWithFallback
                  key={i}
                  src={familyPhotos[i - 1]}
                  className="h-12 w-12 rounded-full border-4 border-white/90 object-cover shadow-lg"
                  alt="Happy customer"
                />
              ))}
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.24em] text-white/60">Trusted by families</div>
              <div className="mt-1 text-base font-semibold text-white">12,000+ joyful deliveries across India</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 32 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: cardY }}
          className="relative"
        >
          <motion.div
            whileHover={{ rotateY: 8, rotateX: -5, y: -10 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-3 shadow-[0_38px_80px_-38px_rgba(15,23,42,0.8)] backdrop-blur-xl"
            style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.16),transparent_30%,rgba(255,255,255,0.04)_70%)]" />
            <div className="relative h-[320px] overflow-hidden rounded-[30px] sm:h-[420px] lg:h-[560px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=1200"
                alt="Kids enjoying premium toys"
                className="h-full w-full object-cover"
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/88 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-800 shadow-lg"
              >
                <Stars size={14} className="text-brand-primary" />
                Premium Play
              </motion.div>

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute bottom-6 left-6 max-w-xs rounded-[28px] bg-white/88 p-5 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.42)]"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-primary">Curated for joy</div>
                <div className="mt-2 text-lg font-bold text-slate-900">Safe details, polished design, and toys children actually return to.</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -9, 0], x: [0, 4, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-20 right-6 rounded-[26px] bg-slate-900/82 px-4 py-3 text-white shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  <CarFront size={16} />
                  Ride-On Favorites
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <GlassCard className="interactive-lift p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/14 text-brand-primary">
                  <CarFront size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Best Sellers</div>
                  <div className="mt-1 text-base font-bold text-slate-900">Ride-on stars</div>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="interactive-lift p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-kids-blue/14 text-kids-blue">
                  <Blocks size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Learning Kits</div>
                  <div className="mt-1 text-base font-bold text-slate-900">Smart play picks</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
