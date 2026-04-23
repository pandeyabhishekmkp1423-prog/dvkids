import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, User2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <motion.div
          animate={{
            y: isScrolled ? 0 : 8,
            scale: isScrolled ? 0.985 : 1
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto max-w-7xl rounded-[30px] ${
            isScrolled ? 'glass-effect shadow-[0_24px_60px_-34px_rgba(42,28,17,0.38)]' : 'bg-white/48 backdrop-blur-xl'
          }`}
        >
          <div className={`flex items-center justify-between px-4 sm:px-6 ${isScrolled ? 'h-16' : 'h-20'} transition-all duration-300`}>
            <Link to="/" className="group flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: -6, y: -2 }}
                className="relative flex h-11 w-11 items-center justify-center rounded-[18px] bg-[linear-gradient(145deg,#ffb26f,#ff7b54)] text-lg font-extrabold text-white shadow-[0_16px_30px_-18px_rgba(255,123,84,0.9)]"
              >
                DV
                <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-kids-blue/90 ring-4 ring-white/80" />
              </motion.div>
              <div>
                <div className="font-display text-lg font-extrabold leading-none text-slate-900 sm:text-xl">
                  DV Kids Castle
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">
                  Ride-On Joy
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/cart"
                className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-slate-700 shadow-[0_16px_30px_-22px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-0.5 hover:text-brand-primary"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </Link>

              {user ? (
                <button
                  onClick={logout}
                  className="hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/72 px-4 py-2 text-left shadow-[0_16px_30px_-22px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-0.5 sm:flex"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#fff4d8,#ffd7b3)] font-bold text-brand-primary">
                    {(user.name || 'U').charAt(0)}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold text-slate-900">{user.name}</span>
                    <span className="block text-[11px] text-slate-500">Sign out</span>
                  </span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-[0_18px_30px_-18px_rgba(15,23,42,0.65)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-primary sm:flex"
                >
                  <User2 size={16} />
                  Login
                </Link>
              )}

              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/72 text-slate-800 shadow-[0_16px_30px_-22px_rgba(15,23,42,0.45)] lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/35 p-3 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="glass-effect mx-auto flex min-h-[calc(100vh-24px)] max-w-xl flex-col rounded-[34px] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-xl font-extrabold text-slate-900">DV Kids Castle</div>
                  <div className="text-xs text-slate-500">Premium play, made simple</div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-800 shadow-sm"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8 grid gap-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-[24px] px-5 py-4 text-lg font-bold transition ${
                          isActive ? 'bg-slate-900 text-white' : 'bg-white/70 text-slate-800'
                        }`
                      }
                    >
                      {item.label}
                      <span className="text-sm text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto rounded-[28px] bg-[linear-gradient(135deg,rgba(255,178,111,0.25),rgba(119,199,255,0.2))] p-5">
                <div className="text-sm font-bold text-slate-900">Your account</div>
                <div className="mt-1 text-sm text-slate-600">
                  {user ? `Signed in as ${user.name}` : 'Log in to manage orders and save favorites.'}
                </div>
                {user ? (
                  <button
                    onClick={logout}
                    className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="mt-4 flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
                  >
                    Continue to Login
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
