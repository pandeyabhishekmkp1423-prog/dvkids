import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { use3DTilt } from '../hooks/use3DTilt';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Mother of 4yo",
    text: "The transition to preschool was so smooth. The teachers are incredibly patient and keep us updated with daily photos. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Michael Chen",
    role: "Father of 3yo",
    text: "Safety was our top priority. Seeing how disciplined the staff is with campus security really put our minds at ease.",
    avatar: "https://i.pravatar.cc/150?u=mike"
  },
  {
    name: "Emma Williams",
    role: "Mother of 5yo",
    text: "My daughter's vocabulary and social skills have improved tremendously in just six months. The curriculum is truly child-centric.",
    avatar: "https://i.pravatar.cc/150?u=emma"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const { tilt, elementRef } = use3DTilt(18);

  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <section id="testimonials" className="py-24 bg-brand-soft overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-kids-pink rounded-full floating opacity-30 glow-effect"></div>
      <div className="absolute bottom-10 right-10 w-6 h-6 bg-kids-blue rounded-full floating-delayed opacity-40 glow-effect"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="text-6xl mb-8 bounce-gentle">💬</div>
        
        <div className="relative h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0"
            >
              <p
                className="text-2xl md:text-3xl text-slate-800 leading-relaxed mb-10 italic text-3d"
              >
                "{reviews[index].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={reviews[index].avatar}
                  alt=""
                  ref={elementRef}
                  className="w-14 h-14 rounded-full border-2 border-white shadow-md card-3d card-hover-yellow glow-effect"
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                />
                <div className="text-left">
                  <div className="font-bold text-slate-900">{reviews[index].name}</div>
                  <div className="text-sm text-slate-500">{reviews[index].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prev} className="p-3 bg-white rounded-full shadow-md text-slate-600 hover:text-brand-primary hover:shadow-lg transition-all">
            <ChevronLeft />
          </button>
          <button onClick={next} className="p-3 bg-white rounded-full shadow-md text-slate-600 hover:text-brand-primary hover:shadow-lg transition-all">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
