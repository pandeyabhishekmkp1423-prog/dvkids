import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    title: "Playgroup",
    age: "1.5 - 2.5 Years",
    desc: "Social and physical exploration through music, movement, and sensory games.",
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600",
    color: "bg-brand-accent/20"
  },
  {
    title: "Nursery",
    age: "2.5 - 3.5 Years",
    desc: "Developing pre-literacy skills, vocabulary, and creative expression through arts.",
    img: "https://images.unsplash.com/photo-1160606060606-25f0a0a0a0a0?auto=format&fit=crop&q=80&w=600", // placeholder
    fallbackImg: "https://picsum.photos/seed/nursery/600/400",
    color: "bg-brand-secondary/20"
  },
  {
    title: "Kindergarten",
    age: "3.5 - 5.5 Years",
    desc: "Formal schooling readiness with logic, numbers, and early math concepts.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    color: "bg-brand-primary/10"
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Tailored Programs</h2>
            <p className="text-slate-500">Every age has unique milestones. Our curriculum is designed to respect the developmental pace of each child.</p>
          </div>
          <button className="flex items-center gap-2 text-brand-primary font-bold group">
            View Curriculum <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="h-64 relative">
                <img 
                  src={item.img.includes('1160606060606') ? item.fallbackImg : item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-bold text-slate-800 ${item.color} backdrop-blur-sm`}>
                  Age: {item.age}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <button className="w-full py-4 border-2 border-slate-50 rounded-2xl text-slate-700 font-bold hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
                  Join Program
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
