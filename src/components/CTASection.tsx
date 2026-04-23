import { motion } from 'motion/react';

export default function CTASection() {
  return (
    <section className="py-24 bg-brand-primary overflow-hidden relative">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start the Journey?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Admissions are open for the academic year 2024-25. Join our family today and give your child the foundation they deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="px-10 py-5 bg-white text-brand-primary font-bold rounded-2xl hover:scale-105 transition-transform"
            >
              Enroll Now
            </a>
            <button className="px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
              Download Brochure
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
