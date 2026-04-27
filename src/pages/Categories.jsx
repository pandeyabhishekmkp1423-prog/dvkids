import React from 'react';
import ShopByAge from '../sections/ShopByAge';
import ShopByCategory from '../sections/ShopByCategory';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen pt-40 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-4">Shop by Age & Category</h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Find the right toys for every stage of growing children, with category collections designed for easy browsing.
          </p>
        </div>

        <ShopByAge />
        <div className="mt-20">
          <ShopByCategory />
        </div>
      </div>
    </div>
  );
}
