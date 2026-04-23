import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Clock3, Share2, User2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFontCycle } from '../hooks/useFontCycle';
import { blogPosts } from '../data/blogPosts';
import ImageWithFallback from '../components/ImageWithFallback';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentFont = useFontCycle(5000);

  const post = blogPosts.find((item) => item.id === Number(id));

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 pt-28">
        <div className="premium-card max-w-lg p-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Story not found</h1>
          <p className="mt-3 text-slate-600">The article you were looking for is not available right now.</p>
          <button
            onClick={() => navigate('/blog')}
            className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="premium-section overflow-hidden px-6 py-10 sm:px-10"
        >
          <div className="hero-grid absolute inset-0 opacity-40" />
          <div className="relative">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 transition hover:text-brand-primary"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </button>

            <div className="mt-6 inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-primary">
              {post.category}
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: currentFont }}>
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <User2 size={15} />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={15} />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} />
                {post.readTime}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="premium-card mt-8 overflow-hidden p-3"
        >
          <div className="aspect-[16/8.6] overflow-hidden rounded-[28px]">
            <ImageWithFallback src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="premium-card mt-8 p-6 sm:p-10"
        >
          <div
            className="article-content max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-10 flex flex-col gap-5 border-t border-slate-200/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand-mist px-3 py-1 text-xs font-semibold text-slate-600">
                  #{tag}
                </span>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:text-brand-primary">
              <Share2 size={16} />
              Share article
            </button>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
