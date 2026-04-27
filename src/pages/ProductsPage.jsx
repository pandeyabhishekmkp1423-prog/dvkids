import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Search, Filter, X } from 'lucide-react';
import { getProducts } from '../utils/productApi';
import categoriesData from '../data/categories';

export default function ProductsPage({ defaultFilter, defaultCategory, defaultAge }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const queryCategory = queryParams.get('category');
  const queryAge = queryParams.get('age');
  const queryFilter = queryParams.get('filter');
  const querySearch = queryParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(querySearch);
  const [activeCategory, setActiveCategory] = useState(queryCategory || defaultCategory || 'All');
  const [activeAge, setActiveAge] = useState(queryAge || defaultAge || 'All');

  const categories = ['All', ...categoriesData.map((category) => category.name)];
  const ageGroups = ['All', '0-2', '3-5', '6-8', '9-12', '13+'];
  const activeFilter = queryFilter || defaultFilter;

  useEffect(() => {
    let mounted = true;

    getProducts()
      .then((allProducts) => {
        if (!mounted) return;
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setActiveCategory(queryCategory || defaultCategory || 'All');
        setActiveAge(queryAge || defaultAge || 'All');
        setSearch(querySearch);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [queryCategory, queryAge, queryFilter, querySearch, defaultCategory, defaultAge]);

  useEffect(() => {
    let result = products;

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activeAge !== 'All') {
      result = result.filter((p) => String(p.age_range || '').includes(activeAge));
    }

    if (activeFilter === 'new') {
      result = result.filter((p) => p.new_arrival);
    }

    if (activeFilter === 'offers') {
      result = result.filter((p) => p.best_seller || p.new_arrival);
    }

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        String(p.age_range || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [search, activeCategory, activeAge, products, activeFilter]);

  const sectionTitle = activeFilter === 'new' ? 'New Arrivals' : activeFilter === 'offers' ? 'Offers' : 'All Toys';

  return (
    <div className="min-h-screen pt-40 pb-24 px-4 bg-linear-to-br from-[#fff3f3] via-[#fff8e1] to-[#d9f7ff] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }} className="absolute left-10 top-20 h-28 w-28 rounded-full bg-pink-200/50 blur-3xl" />
        <motion.div animate={{ y: [0, -24, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }} className="absolute right-14 top-36 h-24 w-24 rounded-full bg-sky-200/50 blur-3xl" />
        <motion.div animate={{ rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }} className="absolute left-1/2 top-10 h-16 w-16 rounded-full bg-amber-200/70 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-8">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 font-display">{sectionTitle}</h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
              Handpicked toys designed to spark wonder, encourage exploration, and support every developmental milestone. Play, learn, and collect your favourite buddies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search toys..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const params = new URLSearchParams(location.search);
                    if (e.target.value) params.set('q', e.target.value);
                    else params.delete('q');
                    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
                  }
                }}
                className="w-full h-14 bg-white/95 border border-slate-200 rounded-3xl pl-12 pr-6 text-slate-900 focus:outline-none focus:border-orange-300 transition-all shadow-[0_20px_50px_-20px_rgba(249,115,22,0.9)]"
              />
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-4xl bg-linear-to-r from-orange-100 via-white to-sky-100 border border-orange-100 px-6 py-6 text-slate-700 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-semibold text-orange-600">Free shipping all over India</p>
            <p className="text-sm text-slate-500">Every toy ships with free delivery, bright discounts, and a happy surprise sticker.</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-lg">
            <span>Price starts from ₹799</span>
          </div>
        </div>

        <div className="mb-12 rounded-4xl bg-white/95 border border-slate-200 p-6 shadow-xl">
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Filter size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Categories</span>
              </div>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-3 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {(activeCategory !== 'All' || activeAge !== 'All' || search) && (
              <button
                onClick={() => { setActiveCategory('All'); setActiveAge('All'); setSearch(''); navigate({ pathname: location.pathname, search: '' }, { replace: true }); }}
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-500 hover:text-red-500 transition-colors"
              >
                Clear All <X size={14} />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-xs font-bold uppercase tracking-widest">Age</span>
            </div>
            {ageGroups.map(age => (
              <button
                key={age}
                onClick={() => setActiveAge(age)}
                className={`px-4 py-3 rounded-full text-sm font-semibold transition-all ${activeAge === age
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/10'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Unboxing Play...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-40 text-center space-y-6">
                <div className="text-6xl">🧩</div>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">No toys found matching your search.</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
