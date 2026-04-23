import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (data.success) {
        login(data.user, data.token);
        window.location.href = '/';
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-orange-50 -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-12">
          <div className="text-center mb-10">
            <div className="text-4xl mb-4">👑</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">Join the Family</h1>
            <p className="text-slate-500 text-sm">Start your child's journey with us</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-500 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2">
               ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-2">Full Name</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all" 
                placeholder="Jane Doe"
              />
            </div>
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
              {loading ? 'Creating Account...' : 'Continue'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
             <span className="text-slate-500">Already a member? </span>
             <a href="/login" className="text-brand-primary font-bold hover:underline">Log In</a>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
