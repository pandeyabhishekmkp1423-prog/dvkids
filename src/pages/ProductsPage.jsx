import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Search, Filter, X } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeAge, setActiveAge] = useState('All');
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  const initialAge = queryParams.get('age');
  const initialFilter = queryParams.get('filter');

  const categories = ['All', 'Educational', 'STEM', 'Soft Toys', 'Outdoor'];
  const ageGroups = ['All', '0-2', '3-5', '6-8', '9-12', '13+'];

  useEffect(() => {
    fetch('/api/cart/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
          if (initialCategory) {
            setActiveCategory(initialCategory);
          }
          if (initialAge) {
            setActiveAge(initialAge.split(' ')[0]);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [initialCategory, initialAge, initialFilter]);

  useEffect(() => {
    let result = products;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (activeAge !== 'All') {
      result = result.filter((p) => String(p.age_range || '').includes(activeAge));
    }

    if (initialFilter === 'new') {
      result = result.filter((p) => p.new_arrival);
    }

    if (initialFilter === 'offers') {
      result = result.filter((p) => p.best_seller || p.new_arrival);
    }
    
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        String(p.age_range || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [search, activeCategory, activeAge, products, initialFilter]);

  return (
    <div className="min-h-screen pt-40 pb-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-16">
           <div className="max-w-xl">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 font-display">Our <span className="text-brand-primary">Collections</span></h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Handpicked toys designed to spark wonder, encourage exploration, and support every developmental milestone.
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
                  className="w-full h-14 bg-white border border-slate-200 rounded-2xl pl-12 pr-6 text-slate-900 focus:outline-none focus:border-brand-primary/50 transition-all shadow-sm"
                />
              </div>
           </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
            <div className="flex items-center gap-3 mr-4 text-slate-400">
               <Filter size={18} />
               <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Filter by</span>
            </div>
            {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all ${
                   activeCategory === cat 
                   ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                   : 'bg-white text-slate-500 hover:text-brand-primary hover:bg-slate-50 border border-slate-100'
                 }`}
               >
                 {cat}
               </button>
            ))}
            <div className="w-full" />
            <div className="flex items-center gap-3 mr-4 text-slate-400">
               <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Age</span>
            </div>
            {ageGroups.map(age => (
               <button
                 key={age}
                 onClick={() => setActiveAge(age)}
                 className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                   activeAge === age
                   ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20'
                   : 'bg-white text-slate-500 hover:text-brand-primary hover:bg-slate-50 border border-slate-100'
                 }`}
               >
                 {age}
               </button>
            ))}
            { (activeCategory !== 'All' || activeAge !== 'All' || search) && (
              <button 
                onClick={() => { setActiveCategory('All'); setActiveAge('All'); setSearch(''); }}
                className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors ml-auto uppercase tracking-widest"
              >
                Clear All <X size={14} />
              </button>
            )}
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
