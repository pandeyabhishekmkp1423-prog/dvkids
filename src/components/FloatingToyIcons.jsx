import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, CarFront, Crown, Gift, Sparkles, Stars } from 'lucide-react';

const toys = [
  { Icon: CarFront, className: 'left-[4%] top-[18%] text-brand-primary/26', y: 18, x: 12, rotate: 8, duration: 8.5 },
  { Icon: Blocks, className: 'right-[8%] top-[24%] text-kids-blue/24', y: 24, x: -10, rotate: -10, duration: 9.5 },
  { Icon: Gift, className: 'left-[10%] bottom-[18%] text-kids-pink/24', y: 22, x: 14, rotate: 10, duration: 10.5 },
  { Icon: Crown, className: 'right-[11%] bottom-[22%] text-brand-accent/24', y: 20, x: -16, rotate: -8, duration: 8.8 },
  { Icon: Stars, className: 'left-1/2 top-[11%] text-kids-purple/22', y: 18, x: 8, rotate: 12, duration: 7.8 },
  { Icon: Sparkles, className: 'left-[56%] bottom-[14%] text-kids-green/20', y: 16, x: -12, rotate: -6, duration: 9.2 }
];

export default function FloatingToyIcons() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {toys.map(({ Icon, className, y, x, rotate, duration }, index) => (
        <motion.div
          key={index}
          animate={{
            x: [0, x, 0],
            y: [0, -y, 0],
            rotate: [0, rotate, 0]
          }}
          transition={{
            duration,
            delay: index * 0.35,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`absolute hidden md:block ${className}`}
        >
          <div className="rounded-[22px] border border-white/35 bg-white/20 p-3 backdrop-blur-md shadow-[0_18px_30px_-22px_rgba(15,23,42,0.28)]">
            <Icon size={24} strokeWidth={1.8} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
