import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Phone, Sparkles, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'All Toys', to: '/products' },
  { label: 'New Arrivals', to: '/products?filter=new' },
  { label: 'Offers', to: '/products?filter=offers' },
  { label: 'About Us', to: '/about' }
];

const supportLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Refund Policy', to: '/refund' },
  { label: 'Terms of Service', to: '/terms' }
];

const socials = [
  { icon: Instagram, href: 'https://instagram.com' },
  { icon: Facebook, href: 'https://facebook.com' },
  { icon: Mail, href: 'mailto:dvkidscastlebwd@gmail.com' }
];

function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="text-[13px] text-slate-400 hover:text-orange-500 transition-colors duration-300 font-medium block"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      
      {/* 1. COMPACT LOGO & DESCRIPTION SECTION */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          
          {/* LOGO COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <img 
                src="/logo.png" 
                alt="DV Kids Castle" 
                className="h-14 lg:h-16 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Crafting premium adventures with high-performance ride-on toys. Safety, speed, and style for the next generation of explorers.
            </p>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -3, backgroundColor: '#F97316' }}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white transition-all border border-white/5"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Navigation</h4>
            <div className="space-y-4">
              {quickLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          {/* SUPPORT LINKS */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Service</h4>
            <div className="space-y-4">
              {supportLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          {/* CONTACT INFO CARD */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Find Us</h4>
            <div className="p-6 rounded-[30px] bg-white/[0.02] border border-white/5 space-y-5">
              <div className="flex gap-4">
                <MapPin className="text-orange-500 shrink-0" size={18} />
                <span className="text-sm text-slate-400 leading-tight">Alwar Bypass Road, Bhiwadi, Rajasthan 301019</span>
              </div>
              <div className="flex gap-4">
                <Phone className="text-orange-500 shrink-0" size={18} />
                <span className="text-sm text-slate-400">+91 95218 43071</span>
              </div>
              <div className="flex gap-4 pt-2 border-t border-white/5">
                <Mail className="text-orange-500 shrink-0" size={18} />
                <span className="text-sm text-slate-400 break-all">dvkidscastlebwd@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. BOTTOM BAR (REDUCED SPACING) */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              &copy; 2026 DV KIDS CASTLE — SITE BY ABHISHEK PANDEY
            </p>
          </div>

          {/* PAYMENT/TRUST ICONS */}
          <div className="flex gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
             <span className="text-[10px] font-black text-white tracking-tighter">SECURE PAYMENT GATEWAY</span>
             <div className="h-4 w-[1px] bg-white/20" />
             <span className="text-[10px] font-black text-white tracking-tighter">PREMIUM SHIPPING</span>
          </div>
        </div>
      </div>

      {/* BACKGROUND DECORATION (NO DOTS, ONLY VELOCITY TEXT) */}
      <div className="absolute -bottom-8 right-0 text-[15vw] font-black text-white/[0.01] select-none pointer-events-none italic leading-none">
        KIDS CASTLE
      </div>
    </footer>
  );
}