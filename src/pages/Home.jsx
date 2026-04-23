import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from '../sections/Hero';
import TrustBar from '../components/TrustBar';
import ShopByAge from '../sections/ShopByAge';
import ShopByCategory from '../sections/ShopByCategory';
import FeaturedProducts from '../sections/FeaturedProducts';
import AllProducts from '../sections/AllProducts';
import Blog from '../sections/Blog';
import WhyChooseUs from '../sections/WhyChooseUs';
import Testimonials from '../sections/Testimonials';
import Newsletter from '../sections/Newsletter';
import CTA from '../sections/CTA';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-kids-pink to-kids-blue z-[60] origin-left"
        style={{ scaleX }}
      />

      <Hero />
      <TrustBar />
      <ShopByAge />
      <ShopByCategory />
      <FeaturedProducts title="Best Sellers" filter="best_seller" />
      <FeaturedProducts title="New Arrivals" filter="new_arrival" />
      <AllProducts />
      <Blog />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <CTA />
    </motion.div>
  );
}
