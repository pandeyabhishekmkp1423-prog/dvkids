import React from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen pt-40 pb-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-center gap-4">
          <Heart size={32} className="text-red-500" />
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Your Wishlist</h1>
            <p className="text-slate-500">Save your favorite toys and return any time to add them to bag.</p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
            <p className="text-slate-400 uppercase tracking-[0.3em] mb-4">Nothing saved yet</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Your wishlist is empty.</h2>
            <Link to="/products" className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white hover:bg-orange-500 transition-all">
              Shop toys now
            </Link>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
