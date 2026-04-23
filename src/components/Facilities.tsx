import { motion } from 'motion/react';

const facilities = [
  { name: "Activity Room", img: "https://picsum.photos/seed/activity/800/600", span: "md:col-span-2 md:row-span-2" },
  { name: "Digital Lab", img: "https://picsum.photos/seed/lab/600/400", span: "" },
  { name: "Outdoor Playground", img: "https://picsum.photos/seed/play/600/400", span: "" },
  { name: "Music Studio", img: "https://picsum.photos/seed/music/600/400", span: "" },
  { name: "Safe Dining", img: "https://picsum.photos/seed/dining/800/600", span: "md:col-span-1" }
];

export default function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">World-Class Facilities</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            We provide a world-class environment designed to spark imagination and ensure physical safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {facilities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`relative group rounded-3xl overflow-hidden cursor-pointer ${item.span}`}
            >
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-bold text-lg">{item.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
