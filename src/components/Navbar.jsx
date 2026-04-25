import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  User2, 
  Heart, 
  Search, 
  Home, 
  Gamepad2, 
  Zap, 
  Phone, 
  LayoutGrid,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'All Toys', to: '/products', icon: <Gamepad2 size={22} /> },
  { label: 'Shop by Age', to: '/categories', icon: <LayoutGrid size={22} /> },
  { label: 'Home', to: '/', icon: <Home size={26} />, isCenter: true },
  { label: 'New Arrivals', to: '/new', icon: <Zap size={22} /> },
  { label: 'Contact', to: '/contact', icon: <Phone size={22} /> },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  const isHighlighted = !isHomePage || isScrolled;

  return (
    <>
      {/* --- NEXT-LEVEL DESKTOP HEADER --- */}
      <header className="fixed inset-x-0 top-0 z-[100] hidden lg:flex justify-center transition-all duration-500 pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            width: isScrolled ? "90%" : "100%",
            marginTop: isScrolled ? "15px" : "0px",
            backgroundColor: isHighlighted ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0)",
            backdropFilter: isHighlighted ? "blur(24px)" : "blur(0px)",
            borderRadius: isScrolled ? "40px" : "0px",
            padding: isScrolled ? "8px 30px" : "20px 60px",
            boxShadow: isScrolled ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)" : "none",
            border: isScrolled ? "1px solid rgba(255, 255, 255, 0.4)" : "1px solid rgba(255, 255, 255, 0)"
          }}
          className="flex items-center justify-between pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          {/* 1. LEFT: 3D Pivot Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotateY: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center p-1 border border-orange-50"
            >
              <img src="/logo.png" alt="DV" className="w-full h-full object-contain" />
            </motion.div>
            <div className="flex flex-col overflow-hidden">
              <span className={`font-black text-xl leading-none transition-colors duration-300 ${isHighlighted ? 'text-slate-900' : 'text-slate-800'}`}>
                Kids <span className="text-orange-500">Castle</span>
              </span>
              <motion.span 
                animate={{ x: isScrolled ? 0 : 0, opacity: isScrolled ? 0.6 : 1 }}
                className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500"
              >
                Premium Play
              </motion.span>
            </div>
          </Link>

          {/* 2. MIDDLE: Floating Pill Navigation */}
          <nav className="flex items-center p-1 bg-slate-200/20 rounded-[24px] border border-white/30 backdrop-blur-md">
            {navLinks.map((item) => (
              <NavLink 
                key={item.label} 
                to={item.to}
                className={({ isActive }) => `
                  relative px-6 py-2.5 text-sm font-black transition-all duration-300 rounded-[18px]
                  ${isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="nav-glow"
                        className="absolute inset-0 bg-slate-900 rounded-[18px] shadow-lg shadow-slate-300"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 3. RIGHT: Utility Group */}
          <div className="flex items-center gap-2">
            <motion.div className="flex items-center gap-1 bg-white/40 p-1 rounded-2xl border border-white/50">
              <button className="p-2.5 hover:bg-white rounded-xl transition-all text-slate-700 active:scale-90"><Search size={20} /></button>
              <Link to="/wishlist" className="p-2.5 hover:bg-white rounded-xl transition-all text-red-500 active:scale-90"><Heart size={20} /></Link>
            </motion.div>

            <Link to="/cart" className="relative p-3 bg-slate-900 text-white rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
              <ShoppingBag size={22} />
              <motion.span 
                key={cart?.length}
                initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 border-2 border-white text-[10px] font-black rounded-full flex items-center justify-center"
              >
                {cart?.length || 0}
              </motion.span>
            </Link>

            <Link to="/login" className="p-3 bg-white border border-slate-100 rounded-2xl text-orange-500 hover:shadow-lg transition-all active:scale-95">
              <User2 size={22} />
            </Link>
          </div>
        </motion.div>
      </header>

      {/* --- MOBILE TOP BRANDING --- */}
      <div className={`fixed top-0 inset-x-0 z-[100] lg:hidden flex items-center justify-between px-6 h-16 transition-all duration-500 ${
        isHighlighted ? 'bg-white/80 backdrop-blur-lg border-b' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2">
           <img src="/logo.png" alt="Logo" className="h-9 w-9 object-contain" />
           <span className="font-black text-slate-900">DV KIDS</span>
        </div>
        <div className="flex items-center gap-2">
           <Link to="/wishlist" className="p-2 text-red-500"><Heart size={22} /></Link>
           <Link to="/login" className="p-2 text-orange-500"><User2 size={22} /></Link>
        </div>
      </div>

      {/* --- MOBILE BOTTOM DOCK (Myntra Style with Floating Home) --- */}
      <nav className="fixed bottom-6 inset-x-4 h-20 bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[35px] z-[100] flex lg:hidden items-center justify-around px-2">
        {navLinks.map((item) => (
          <NavLink key={item.label} to={item.to} className="relative flex flex-col items-center justify-center w-full">
            {({ isActive }) => (
              <>
                {item.isCenter ? (
                  <motion.div 
                    whileTap={{ scale: 0.8 }}
                    className={`-mt-12 p-5 rounded-full shadow-2xl border-4 border-white transition-colors ${isActive ? 'bg-orange-500 text-white' : 'bg-slate-900 text-white'}`}
                  >
                    {item.icon}
                  </motion.div>
                ) : (
                  <>
                    <motion.div animate={{ y: isActive ? -4 : 0, scale: isActive ? 1.1 : 1, color: isActive ? "#f97316" : "#64748b" }}>
                      {item.icon}
                    </motion.div>
                    <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </>
                )}
                {isActive && !item.isCenter && (
                  <motion.div layoutId="mobile-dot" className="absolute -top-1 h-1 w-5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}