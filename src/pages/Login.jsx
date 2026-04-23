import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (data.success) {
        login(data.user, data.token);
        window.location.href = '/';
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-slate-50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-12">
          <div className="text-center mb-10">
            <div className="text-4xl mb-4">🏰</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">Welcome Back</h1>
            <p className="text-slate-500 text-sm">Access your parent dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-500 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2">
               ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-2">Email Address</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" 
                placeholder="parent@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-2">Password</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" 
                placeholder="••••••••"
              />
            </div>
            <Button disabled={loading} className="w-full py-5 text-lg" type="submit">
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
             <span className="text-slate-500">New parent? </span>
             <a href="/register" className="text-brand-primary font-bold hover:underline">Create Account</a>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
