import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, Truck, Star, CheckCircle2 } from 'lucide-react';

// --- Sub-component for the 3D Tilt Effect (Clean JS Version) ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Safety First",
    subtitle: "100% Non-Toxic",
    text: "Rigorously lab-tested components. Because your child's safety is our non-negotiable priority.",
    color: "from-orange-400 to-red-500",
    lightColor: "bg-orange-50",
    accent: "text-orange-600"
  },
  {
    icon: <Sparkles size={32} />,
    title: "Expert Curation",
    subtitle: "Education-led",
    text: "Handpicked by child psychologists to spark cognitive growth and sensory development.",
    color: "from-blue-400 to-indigo-600",
    lightColor: "bg-blue-50",
    accent: "text-blue-600"
  },
  {
    icon: <Truck size={32} />,
    title: "Swift Delivery",
    subtitle: "Global Tracking",
    text: "Priority dispatch within 24 hours. From our castle to yours, with love and speed.",
    color: "from-emerald-400 to-teal-600",
    lightColor: "bg-emerald-50",
    accent: "text-emerald-600"
  },
  {
    icon: <Heart size={32} />,
    title: "Premium Gifting",
    subtitle: "Magical Unboxing",
    text: "Sustainable luxury wrapping and handwritten notes included in every single order.",
    color: "from-pink-400 to-rose-600",
    lightColor: "bg-pink-50",
    accent: "text-pink-600"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#FDFDFF] relative overflow-hidden">
      {/* Decorative Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-widest mb-4"
            >
              <Star size={16} fill="currentColor" />
              <span>The Kids Castle Difference</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1]">
              Why Parents <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Trust Us</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-lg leading-relaxed border-l-2 border-orange-500/20 pl-6">
            We don't just sell toys; we curate childhood milestones through safety and imagination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <TiltCard key={i} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="group relative h-full bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500"
              >
                {/* Floating Icon Container */}
                <div className={`relative w-16 h-16 rounded-2xl ${f.lightColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-out`}>
                   <div className={`${f.accent} z-10`}>{f.icon}</div>
                   <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className={`absolute inset-0 rounded-2xl ${f.lightColor} blur-lg`} 
                   />
                </div>

                <div className="space-y-3 relative">
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${f.accent}`}>
                    {f.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed pb-8">
                    {f.text}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="absolute bottom-8 left-8 right-8 h-1 rounded-full bg-slate-50 overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                    className={`h-full bg-gradient-to-r ${f.color} opacity-60`}
                   />
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Dynamic Trust Badge Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8 py-8 border-y border-slate-100"
        >
          {['Global Safety Certified', 'Eco-Friendly Materials', '24/7 Parent Support'].map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <CheckCircle2 size={18} className="text-emerald-500" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}