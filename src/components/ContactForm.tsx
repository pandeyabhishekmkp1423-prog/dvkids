import { useState, FormEvent } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    childAge: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', childAge: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Let's Talk About Your <span className="text-brand-primary">Child's Future</span>
            </h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Have questions? Our admissions counselor is here to help you understand our curriculum, fees, and safety policies. 
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-4 bg-brand-soft rounded-2xl border border-slate-50">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">🏫</div>
                <div>
                   <div className="font-bold text-slate-900">Visit Campus</div>
                   <div className="text-sm text-slate-500">Mon-Fri, 9am - 4pm</div>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-brand-soft rounded-2xl border border-slate-50">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">📞</div>
                <div>
                   <div className="font-bold text-slate-900">Call Admissions</div>
                   <div className="text-sm text-slate-500">+1 (555) 000-1234</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-brand-primary/5 border border-slate-50 relative">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-8">We'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="px-8 py-3 bg-brand-primary text-white font-bold rounded-xl"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Parent Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Your mobile number"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Child's Age</label>
                    <input 
                      required
                      type="text" 
                      value={formData.childAge}
                      onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                      placeholder="e.g. 3 years"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message (Optional)</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Anything specific you'd like to ask?"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-brand-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-brand-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : <>Send Inquiry <Send size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
