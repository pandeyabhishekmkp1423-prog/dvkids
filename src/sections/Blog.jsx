import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { use3DTilt } from '../hooks/use3DTilt';
import ImageWithFallback from '../components/ImageWithFallback';

const blogPosts = [
  {
    id: 1,
    title: 'The Benefits of Outdoor Play for Child Development',
    excerpt: 'Discover how outdoor activities support physical health, creativity, and emotional confidence in growing children.',
    image: 'https://images.unsplash.com/photo-1544569226-44165ff6e324?auto=format&fit=crop&q=80&w=600',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Choosing the Right Educational Toys for Different Ages',
    excerpt: "A premium guide to selecting toys that truly match your child's stage, interests, and learning rhythm.",
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600',
    author: 'Mike Chen',
    date: '2024-01-12',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Safety Standards for Kids Ride-On Toys',
    excerpt: 'What to look for in build quality, stability, and safety features before bringing home a ride-on favorite.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    author: 'Emma Williams',
    date: '2024-01-10',
    readTime: '6 min read'
  }
];

function ArticleCard({ post, index, onClick }) {
  const { tilt, elementRef } = use3DTilt(8, typeof window === 'undefined' ? false : window.innerWidth > 768);

  return (
    <motion.article
      ref={elementRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="tilt-shell group cursor-pointer"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
    >
      <div className="premium-card h-full overflow-hidden p-3">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/45 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-white/86 px-3 py-1 text-xs font-bold text-slate-700">
            {post.readTime}
          </div>
        </div>

        <div className="p-3 pt-5">
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <User size={14} />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 transition group-hover:text-brand-primary">
            {post.title}
          </h3>
          <p className="mt-3 text-base leading-7 text-slate-600">{post.excerpt}</p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-primary">
            Read More
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const navigate = useNavigate();

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
                Journal Highlights
              </div>
              <h2 className="mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">Thoughtful stories with more depth, motion, and polish.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              The home blog preview now matches the newer page style so the site feels consistent from the first scroll to the deeper content.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post, index) => (
              <ArticleCard key={post.id} post={post} index={index} onClick={() => navigate(`/blog/${post.id}`)} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-brand-primary"
            >
              View All Blog Posts
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
