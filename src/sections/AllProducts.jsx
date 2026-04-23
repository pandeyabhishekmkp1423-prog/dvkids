import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/cart/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products.slice(0, 8));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="premium-section px-6 py-10 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-primary">
                <Sparkles size={14} />
                Full collection
              </div>
              <h2 className="mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">Browse the wider toy collection with a cleaner premium layout.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              This section now sits inside the same elevated visual system as the rest of the site, with softer depth and stronger content hierarchy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-brand-primary"
            >
              View All Products
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
