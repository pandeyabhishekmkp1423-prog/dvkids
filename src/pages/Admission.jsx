import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { CheckCircle, ShieldCheck, Heart, Sparkles, Phone, Mail } from 'lucide-react';

export default function Admission() {
  const [formData, setFormData] = useState({
    parent_name: '',
    phone: '',
    child_age: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/admission/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-transparent -z-10" />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <GlassCard className="p-16 text-center max-w-lg border-blue-100 shadow-2xl">
             <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-blue-100">
                <Sparkles size={48} />
             </div>
             <h2 className="text-4xl font-bold text-slate-900 mb-6 font-display">Journey Started!</h2>
             <p className="text-slate-500 mb-12 leading-relaxed text-lg">
               We've received your inquiry. A happiness counselor will call you shortly to guide you through the next steps and schedule your tour.
             </p>
             <a href="/">
               <Button className="w-full py-5 text-lg">Return to Village</Button>
             </a>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 bg-slate-50/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
         <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1 }}
         >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
               <ShieldCheck size={14} /> Admissions 2024-25
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-10 font-display leading-[0.9]">
              Gift Your Child <br /><span className="text-brand-primary italic">A Head Start</span>
            </h1>
            <p className="text-slate-500 text-xl mb-12 max-w-md leading-relaxed">
              Experience the warmth of our community. Fill out the application, and let's build the future together.
            </p>
            
            <div className="space-y-6">
               {[
                 { icon: <Phone size={20} />, label: "Direct Support", val: "+1 (555) KIDS-EDU" },
                 { icon: <Mail size={20} />, label: "Admissions Email", val: "apply@kidscastle.com" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm w-fit">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary">
                       {item.icon}
                    </div>
                    <div>
                       <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                       <div className="text-lg font-bold text-slate-800">{item.val}</div>
                    </div>
                 </div>
               ))}
            </div>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
         >
            <GlassCard className="p-10 md:p-14 border-none shadow-2xl bg-white/70">
               <div className="mb-12">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Inquiry Form</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Takes less than 2 minutes</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Parent's Full Name</label>
                     <input 
                       required
                       type="text" 
                       value={formData.parent_name}
                       onChange={(e) => setFormData({...formData, parent_name: e.target.value})}
                       className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-300" 
                       placeholder="Sarah Johnson"
                     />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Phone Line</label>
                        <input 
                          required
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-300" 
                          placeholder="+1 (---) --- ----"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Child's Age</label>
                        <input 
                          required
                          type="text" 
                          value={formData.child_age}
                          onChange={(e) => setFormData({...formData, child_age: e.target.value})}
                          className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-300" 
                          placeholder="e.g. 3.5 Years"
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Specific Interests / Notes</label>
                     <textarea 
                       rows={4} 
                       value={formData.message}
                       onChange={(e) => setFormData({...formData, message: e.target.value})}
                       className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none transition-all resize-none placeholder:text-slate-300" 
                       placeholder="I'm interested in the morning session..."
                     />
                  </div>
                  <div className="pt-6">
                    <Button disabled={loading} className="w-full py-6 text-xl shadow-xl shadow-brand-primary/20" type="submit">
                      {loading ? (
                        <div className="flex items-center gap-3">
                           <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                           Submitting...
                        </div>
                      ) : 'Secure My Spot'}
                    </Button>
                  </div>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                     <ShieldCheck size={12} /> Your data is encrypted & safe
                  </p>
               </form>
            </GlassCard>
         </motion.div>
      </div>
    </div>
  );
}
