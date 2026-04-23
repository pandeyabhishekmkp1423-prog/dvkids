import { motion } from 'motion/react';
import { Menu, X, Castle } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <Castle className="w-8 h-8 text-brand-primary" />
            <span className="text-2xl font-bold font-display text-slate-900">Kids Castle</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#hero" className="hover:text-brand-primary transition-colors">Home</a>
            <a href="#programs" className="hover:text-brand-primary transition-colors">Programs</a>
            <a href="#facilities" className="hover:text-brand-primary transition-colors">Facilities</a>
            <a href="#testimonials" className="hover:text-brand-primary transition-colors">Safety</a>
            <a href="#contact" className="px-6 py-3 bg-brand-primary text-white rounded-full hover:shadow-lg hover:shadow-brand-primary/20 transition-all">Book a Visit</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4"
        >
          <a href="#hero" onClick={() => setIsOpen(false)} className="block text-slate-600">Home</a>
          <a href="#programs" onClick={() => setIsOpen(false)} className="block text-slate-600">Programs</a>
          <a href="#facilities" onClick={() => setIsOpen(false)} className="block text-slate-600">Facilities</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block w-full text-center px-6 py-3 bg-brand-primary text-white rounded-full">Book a Visit</a>
        </motion.div>
      )}
    </nav>
  );
}
