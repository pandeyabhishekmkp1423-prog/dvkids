import React, { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  X
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const navLinks = [
  { label: "Toys", to: "/products", icon: <Gamepad2 size={20} />, color: "from-pink-500 to-orange-400", hex: "#f43f5e" },
  { label: "Ages", to: "/categories", icon: <LayoutGrid size={20} />, color: "from-blue-500 to-cyan-400", hex: "#0ea5e9" },
  { label: "Home", to: "/", icon: <Home size={22} />, isCenter: true, color: "from-[#87CEEB] to-[#F0F9FF]", hex: "#87CEEB" },
  { label: "New", to: "/new", icon: <Zap size={20} />, color: "from-green-400 to-emerald-500", hex: "#10b981" },
  { label: "Contact", to: "/contact", icon: <Phone size={20} />, color: "from-yellow-400 to-orange-500", hex: "#f59e0b" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const activeTheme = useMemo(() => {
    return navLinks.find(link => link.to === location.pathname) || navLinks[2];
  }, [location.pathname]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
    setIsSearchOpen(false);
    setIsMobileSearchVisible(false);
    setSearch("");
  };

  return (
    <>
      {/* --- 🖥️ DESKTOP NAVBAR --- */}
      <header className="fixed top-0 inset-x-0 z-[100] hidden lg:flex justify-center pt-6 pointer-events-none">
        <motion.div
          layout
          animate={{
            width: isScrolled ? "94%" : "98%",
            backgroundColor: isScrolled ? "rgba(135, 206, 235, 0.9)" : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(20px)",
            padding: "10px 40px",
            borderRadius: "100px",
          }}
          className="flex items-center justify-between border border-white/40 pointer-events-auto shadow-2xl transition-all duration-500"
        >
          {/* 1. LOGO LEFT */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-12 h-12 bg-white rounded-2xl p-1.5 shadow-lg border border-white"
            >
              <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-blue-900 leading-none">
                Kids<span className="text-orange-500">Castle</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-900/60">Premium Play</span>
            </div>
          </Link>

          {/* 2. NAVIGATION CENTER */}
          <nav className="flex items-center gap-2 bg-white/20 p-1 rounded-full border border-white/30">
            {navLinks.map((item) => (
              <NavLink key={item.label} to={item.to} className="relative px-6 py-2.5 rounded-full">
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white shadow-md"
                        style={{ borderRadius: 9999 }}
                      />
                    )}
                    <span className={`relative z-10 text-[11px] font-black uppercase tracking-widest transition-colors ${
                      isActive ? "text-blue-900" : "text-blue-900/70 hover:text-blue-900"
                    }`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 3. ICONS RIGHT */}
          <div className="flex items-center gap-3">
            <motion.form 
              onSubmit={handleSearch}
              animate={{ width: isSearchOpen ? 220 : 42 }}
              className="relative flex items-center h-11 bg-white/40 rounded-full border border-white shadow-inner"
            >
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="absolute left-0 w-10 h-10 flex items-center justify-center text-blue-900"
              >
                <Search size={18} />
              </button>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search toys..."
                className="w-full bg-transparent pl-10 pr-4 outline-none text-sm font-bold text-blue-900"
              />
            </motion.form>

            <Link to="/wishlist" className="p-3 bg-white/30 rounded-full text-blue-900 hover:text-red-500 transition-colors">
              <Heart size={20} />
            </Link>

            <Link to="/cart" className="relative p-3 bg-blue-900 text-white rounded-full shadow-lg hover:bg-orange-500 transition-all">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-[#87CEEB]">
                {cart?.length || 0}
              </span>
            </Link>

            <Link to="/login" className="p-3 bg-white rounded-full text-blue-900 shadow-sm border border-slate-100">
              <User2 size={20} />
            </Link>
          </div>
        </motion.div>
      </header>

      {/* --- 📱 MOBILE TOP HEADER --- */}
      <header className={`fixed top-0 inset-x-0 z-[110] lg:hidden h-20 px-6 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? "bg-[#87CEEB] shadow-xl" : "bg-transparent"
      }`}>
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl p-1 shadow-md">
            <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
          </div>
          <span className="font-black text-blue-900 text-lg tracking-tighter">KIDS CASTLE</span>
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsMobileSearchVisible(true)} className="text-blue-900">
            <Search size={22} />
          </button>
          <Link to="/cart" className="relative bg-blue-900 text-white p-2.5 rounded-xl shadow-lg">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#87CEEB] font-bold">
              {cart?.length || 0}
            </span>
          </Link>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isMobileSearchVisible && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 bg-[#87CEEB] flex items-center px-6 gap-3 z-[120]"
            >
              <form onSubmit={handleSearch} className="flex-1">
                <input 
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search toys..." 
                  className="w-full h-12 bg-white rounded-2xl px-5 font-bold text-blue-900 outline-none"
                />
              </form>
              <button onClick={() => setIsMobileSearchVisible(false)} className="text-blue-900 p-2">
                <X size={26} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- 📱 MOBILE BOTTOM DOCK --- */}
      <div className="fixed bottom-6 inset-x-4 z-[100] lg:hidden">
        <nav className="h-20 bg-white/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[35px] flex items-center justify-around border border-white/50 px-2">
          {navLinks.map((item) => (
            <NavLink key={item.label} to={item.to} className="relative flex flex-col items-center justify-center w-full h-full">
              {({ isActive }) => (
                <>
                  {item.isCenter ? (
                    <motion.div 
                      whileTap={{ scale: 0.8 }}
                      className={`-mt-12 p-5 rounded-full shadow-2xl bg-blue-900 text-white border-[6px] border-white`}
                    >
                      {item.icon}
                    </motion.div>
                  ) : (
                    <div className={`flex flex-col items-center transition-all ${isActive ? "text-orange-500 scale-110" : "text-blue-900/40"}`}>
                      {item.icon}
                      <span className="text-[9px] font-black uppercase mt-1 tracking-tighter">{item.label}</span>
                    </div>
                  )}
                  {isActive && !item.isCenter && (
                    <motion.div layoutId="m-dot" className="absolute -bottom-1 h-1 w-4 bg-orange-500 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}