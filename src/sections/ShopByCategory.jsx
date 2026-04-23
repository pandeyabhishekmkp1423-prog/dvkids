import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { use3DTilt } from '../hooks/use3DTilt';

const categories = [
  {
    name: 'Ride-on Toys',
    image: 'https://www.outdoortoys.com/cdn/shop/articles/are-ride-on-toys-suitable-for-toddlers-156584.webp?v=1744117851',
    count: 32,
    color: 'card-hover-blue'
  },
  {
    name: 'Building Blocks',
    image: 'https://m.media-amazon.com/images/I/61gk71RmFnL.jpg',
    count: 28,
    color: 'card-hover-green'
  },
  {
    name: 'Dolls & Accessories',
    image: 'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494377567/TnP8lSy9GYQ-494377567-1.png',
    count: 45,
    color: 'card-hover-pink'
  },
  {
    name: 'Educational Toys',
    image: 'https://www.shumee.in/cdn/shop/files/triangle.jpg?v=1770021843&width=420',
    count: 38,
    color: 'card-hover-purple'
  },
  {
    name: 'Outdoor Play',
    image: 'https://cdn.prod.website-files.com/601195401bde1d94d961140d/62e038c9b0935e063e96049a_robert-collins-tvc5imO5pXk-unsplash.jpg',
    count: 29,
    color: 'card-hover-yellow'
  },
  {
    name: 'Board Games',
    image: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/stock%2Fcustom%20stock%2F2022-11-custom-stock%2Fgames-0228-edit',
    count: 24,
    color: 'card-hover-green'
  }
];

export default function ShopByCategory() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Shop by Category
          </h2>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Discover toys that spark imagination and creativity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const { tilt, elementRef } = use3DTilt(15);
            return (
              <motion.div
                key={category.name}
                ref={elementRef}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/products?category=${category.name}`)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className={`relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 card-3d ${category.color} glow-effect`}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3
                        className="text-2xl font-bold text-white mb-2"
                      >
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-sm">{category.count} Products</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}