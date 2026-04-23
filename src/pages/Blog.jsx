import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Search, User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { use3DTilt } from '../hooks/use3DTilt';
import { blogCategories, blogPosts } from '../data/blogPosts';
import ImageWithFallback from '../components/ImageWithFallback';

function BlogCard({ post, index, onClick }) {
  const { tilt, elementRef } = use3DTilt(7, typeof window === 'undefined' ? false : window.innerWidth > 768);

  return (
    <motion.article
      ref={elementRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="tilt-shell group cursor-pointer"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
    >
      <div className="premium-card h-full overflow-hidden p-3 transition duration-500 group-hover:shadow-[0_30px_60px_-34px_rgba(30,41,59,0.4)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/38 to-transparent" />
          <div className="absolute left-4 top-4 inline-flex rounded-full bg-white/86 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
            {post.category}
          </div>
        </div>

        <div className="p-3 pt-5">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <User2 size={14} />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h2
            className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 transition group-hover:text-brand-primary"
          >
            {post.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">{post.excerpt}</p>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-full bg-brand-mist px-3 py-1 text-xs font-semibold text-slate-600">
                  #{tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary">
              Read story
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const inCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const query = search.toLowerCase();
      const inSearch =
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      return inCategory && inSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="premium-section relative overflow-hidden px-6 py-14 sm:px-10">
          <div className="hero-grid absolute inset-0 opacity-45" />
          <div className="absolute -left-6 top-10 h-40 w-40 rounded-full bg-brand-primary/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-kids-purple/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Journal</div>
            <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
              Premium stories for playful homes and thoughtful parents.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Browse buying guides, safety notes, styling ideas, and gentle parenting inspiration designed to make toy shopping feel elevated and easy.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search stories, ideas, or topics"
                  className="w-full rounded-[24px] border border-white/70 bg-white/76 py-4 pl-12 pr-4 text-base text-slate-900 outline-none transition focus:border-brand-primary focus:bg-white"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      selectedCategory === category
                        ? 'bg-slate-900 text-white shadow-[0_16px_28px_-18px_rgba(15,23,42,0.7)]'
                        : 'bg-white/76 text-slate-700 hover:bg-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                onClick={() => navigate(`/blog/${post.id}`)}
              />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="premium-card mt-8 p-10 text-center"
            >
              <h2 className="text-2xl font-bold text-slate-900">No stories match that filter yet.</h2>
              <p className="mt-3 text-base text-slate-600">Try a broader search or switch to another category.</p>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
