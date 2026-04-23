import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/productApi';

export default function FeaturedProducts({ title = "Best Sellers", filter = "best_seller" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getProducts()
      .then((allProducts) => {
        if (!mounted) return;
        const filtered = allProducts.filter((product) => product[filter] === 1);
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [filter]);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-bold text-xs uppercase tracking-[0.3em] mb-4"
            >
              Curated for Play
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-display">
              {title}
            </h2>
          </div>
          <a href="/programs" className="text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors flex items-center gap-2 group">
            View All Toys
            <span className="w-10 h-[1px] bg-slate-200 group-hover:bg-brand-primary group-hover:w-16 transition-all" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
