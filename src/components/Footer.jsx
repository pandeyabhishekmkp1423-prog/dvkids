import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Phone, ShieldCheck, Sun, ArrowRight, Cloud, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const CloudLayer = ({ delay = 0, duration = 25, top = "10%", scale = 1, opacity = 0.5 }) => (
  <motion.div
    initial={{ x: "-30%" }}
    animate={{ x: "130%" }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    className="absolute pointer-events-none z-0"
    style={{ top, scale, opacity }}
  >
    <Cloud size={120} fill="white" className="text-white drop-shadow-2xl" />
  </motion.div>
);

function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group flex items-center gap-2 text-[13px] text-blue-900/70 hover:text-orange-600 transition-all duration-300 font-bold"
    >
      <motion.span
        initial={{ x: -10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
        className="hidden sm:inline-block transition-all"
      >
        <ArrowRight size={14} />
      </motion.span>
      {label}
    </Link>
  );
}

export default function DVFooter() {
  return (
    <footer className="relative py-10 lg:py-14 overflow-hidden bg-gradient-to-b from-[#87CEEB] to-[#F0F9FF]">
      
      {/* 🌤️ DYNAMIC CLOUD ENGINE */}
      <CloudLayer duration={35} top="5%" scale={0.7} opacity={0.3} />
      <CloudLayer duration={22} top="20%" delay={7} scale={1.1} opacity={0.6} />
      <CloudLayer duration={45} top="12%" delay={15} scale={0.5} opacity={0.4} />

      {/* ☀️ MINI GLOWING SUN */}
      <div className="absolute top-6 right-8 lg:right-20 z-0">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
          <Sun size={60} className="text-yellow-400 opacity-80 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 items-start mb-12">
          
          {/* 🏰 BRAND INFO */}
          <div className="space-y-5">
            <img src="/logo.png" alt="DV Kids Castle" className="h-14 w-auto drop-shadow-xl" />
            <p className="text-blue-900/70 text-sm font-semibold leading-relaxed">
              Premium ride-on toys and electric vehicles. Safe, durable, and designed for endless outdoor adventures.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: 'https://instagram.com' },
                { Icon: Facebook, href: 'https://facebook.com' },
                { Icon: Mail, href: 'mailto:dvkidscastlebwd@gmail.com' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: '#F97316' }}
                  className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-xl flex items-center justify-center text-blue-900 border border-white transition-all shadow-sm hover:text-white"
                  href={social.href}
                >
                  <social.Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 🔗 QUICK LINKS */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Explore</h4>
            <nav className="flex flex-col gap-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/products" label="All Toys" />
              <FooterLink to="/age-group" label="Shop by Age" />
              <FooterLink to="/new" label="New Arrivals" />
              <FooterLink to="/offers" label="Offers" />
            </nav>
          </div>

          {/* 🛠️ SUPPORT */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Help Desk</h4>
            <nav className="flex flex-col gap-3">
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/refund" label="Refund Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
            </nav>
          </div>

          {/* 📍 CONTACT CARD (STRETCHED ON MOBILE) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white shadow-2xl shadow-blue-500/10 space-y-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
                <MapPin size={16} />
              </div>
              <p className="text-xs font-bold text-blue-900 leading-snug">
                In front of Get together restaurant, Alwar bypass road, Bhiwadi, Rajasthan 301019
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
                <Smartphone size={16} />
              </div>
              <p className="text-xs font-bold text-blue-900">+91 95218 43071</p>
            </div>

            <div className="flex items-center gap-4 border-t border-blue-900/5 pt-4">
              <Mail className="text-orange-600 shrink-0" size={16} />
              <p className="text-[11px] font-bold text-blue-900 truncate">dvkidscastlebwd@gmail.com</p>
            </div>
          </motion.div>
        </div>

        {/* 🏅 COMPACT FOOTER BOTTOM */}
        <div className="pt-8 border-t border-blue-900/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md shadow-emerald-200"
            >
              <ShieldCheck size={14} /> Certified Secure
            </motion.div>
            <p className="text-[10px] font-bold text-blue-900/40 uppercase tracking-widest">
              © 2026 DV Kids Castle • <span className="text-blue-900/60">Site by Abhishek</span>
            </p>
          </div>
          
          <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="text-center">
              <p className="text-[10px] font-black text-blue-900">SAFE DELIVERY</p>
              <p className="text-[8px] font-bold text-blue-900/50">Across India</p>
            </div>
            <div className="h-4 w-px bg-blue-900/20" />
            <div className="text-center">
              <p className="text-[10px] font-black text-blue-900">SECURE PAY</p>
              <p className="text-[8px] font-bold text-blue-900/50">100% Encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}