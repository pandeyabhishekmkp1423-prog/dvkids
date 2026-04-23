import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'All Toys', to: '/products' },
  { label: 'Shop by Age', to: '/products?filter=age' },
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
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Mail, href: 'mailto:dvkidscastlebwd@gmail.com', label: 'Email' }
];

function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
      className="group inline-flex items-center text-sm text-slate-200/82 transition duration-300 hover:text-white"
    >
      <span className="relative">
        {label}
        <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#ffb26f,#77c7ff)] transition-transform duration-300 group-hover:scale-x-100" />
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,178,111,0.24),transparent_26%),radial-gradient(circle_at_top_right,rgba(119,199,255,0.16),transparent_24%),linear-gradient(180deg,#182232_0%,#111827_54%,#0f172a_100%)] text-white">
      <div className="absolute inset-0">
        <div className="floating absolute left-[8%] top-16 h-24 w-24 rounded-full bg-white/6 blur-xl" />
        <div className="floating-delayed absolute right-[12%] top-28 h-32 w-32 rounded-full bg-brand-primary/12 blur-2xl" />
        <div className="floating absolute bottom-16 left-1/2 h-20 w-20 rounded-full bg-kids-blue/10 blur-xl" />
        <div className="noise-overlay" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:grid-cols-4 lg:p-10">
          <div className="lg:pr-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(145deg,#ffb26f,#ff7b54)] font-display text-lg font-extrabold text-white shadow-[0_18px_30px_-18px_rgba(255,123,84,0.85)]">
                DV
              </div>
              <div>
                <div className="font-display text-xl font-extrabold">DV Kids Castle</div>
                <div className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/55">
                  <Sparkles size={12} />
                  Premium Play
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              Premium ride-on toys and electric vehicles for kids. Safe, durable, designed for endless outdoor fun and adventure.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ y: -4, scale: 1.05 }}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/80 transition hover:border-brand-secondary/50 hover:text-white"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/55">Quick Links</h3>
            <div className="mt-5 grid gap-4">
              {quickLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/55">Support</h3>
            <div className="mt-5 grid gap-4">
              {supportLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white/55">Contact Info</h3>
            <div className="mt-5 space-y-4">
              <a
                href="mailto:dvkidscastlebwd@gmail.com"
                className="group flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/6 p-4 transition hover:border-brand-secondary/35 hover:bg-white/10"
              >
                <Mail size={18} className="mt-0.5 text-brand-secondary" />
                <span className="text-sm leading-6 text-slate-200">dvkidscastlebwd@gmail.com</span>
              </a>
              <a
                href="tel:+919521843071"
                className="group flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/6 p-4 transition hover:border-brand-secondary/35 hover:bg-white/10"
              >
                <Phone size={18} className="mt-0.5 text-brand-secondary" />
                <span className="text-sm leading-6 text-slate-200">+91-9521843071</span>
              </a>
              <div className="flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/6 p-4">
                <MapPin size={18} className="mt-0.5 text-brand-secondary" />
                <span className="text-sm leading-6 text-slate-200">
                  In front of Get Together Restaurant, Alwar Bypass Road, Bhiwadi, Rajasthan 301019
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 DV Kids Castle. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {supportLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
