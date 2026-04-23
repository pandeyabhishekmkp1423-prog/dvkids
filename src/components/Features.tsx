import { motion } from 'motion/react';
import { use3DTilt } from '../hooks/use3DTilt';
import { ShieldCheck, Users, GraduationCap, Heart } from 'lucide-react';

const reasons = [
  {
    icon: "🛡️",
    title: "Safe Environment",
    desc: "CCTV monitored classrooms and secure campus protocols for your peace of mind.",
    color: "bg-blue-50 text-blue-600",
    hoverColor: "card-hover-blue"
  },
  {
    icon: "👩‍🏫",
    title: "Qualified Teachers",
    desc: "Our passionate educators are trained in early childhood development pedagogy.",
    color: "bg-kids-blue/10 text-kids-blue",
    hoverColor: "card-hover-green"
  },
  {
    icon: "🎓",
    title: "Activity Learning",
    desc: "Focus on hands-on experiences that bridge the gap between curiosity and knowledge.",
    color: "bg-kids-purple/10 text-kids-purple",
    hoverColor: "card-hover-purple"
  },
  {
    icon: "❤️",
    title: "Personal Attention",
    desc: "Optimized teacher-student ratios to ensure every child gets the focus they need.",
    color: "bg-kids-pink/10 text-kids-pink",
    hoverColor: "card-hover-pink"
  }
];

export default function Features() {
  const { tilt, elementRef } = use3DTilt(12);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Why Parents Choose Us
          </h2>
          <p
            className="text-slate-500 max-w-xl mx-auto"
          >
            We offer more than just a classroom. We provide a secondary home where foundations are built for a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              ref={elementRef}
              className={`p-8 bg-brand-soft rounded-3xl border border-slate-50 hover:shadow-xl hover:shadow-slate-200/50 transition-all group card-3d ${item.hoverColor} glow-effect`}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bounce-gentle text-3xl`}>
                {item.icon}
              </div>
              <h3
                className="text-xl font-bold text-slate-900 mb-2 text-3d-toy"
              >
                {item.title}
              </h3>
              <p
                className="text-slate-500 text-sm leading-relaxed"
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
