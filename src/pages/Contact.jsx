import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Phone, SendHorizonal, Sparkles } from 'lucide-react';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'dvkidscastlebwd@gmail.com',
    href: 'mailto:dvkidscastlebwd@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-9521843071',
    href: 'tel:+919521843071'
  },
  {
    icon: MapPin,
    label: 'Visit us',
    value: 'In front of Get Together Restaurant, Alwar Bypass Road, Bhiwadi, Rajasthan 301019'
  }
];

function FloatingField({ label, name, type = 'text', value, onChange, rows }) {
  const sharedClassName =
    "peer w-full rounded-[24px] border border-white/70 bg-white/78 px-5 pb-4 pt-6 text-base text-slate-900 outline-none transition duration-300 placeholder:text-transparent focus:border-brand-primary focus:bg-white focus:shadow-[0_18px_40px_-30px_rgba(255,123,84,0.55)]";
  const labelClassName = value
    ? "pointer-events-none absolute left-5 top-3 origin-left scale-[0.86] text-sm font-semibold text-brand-primary transition-all duration-300"
    : "pointer-events-none absolute left-5 top-5 origin-left text-base font-semibold text-slate-500 transition-all duration-300 peer-focus:top-3 peer-focus:scale-[0.86] peer-focus:text-brand-primary";

  return (
    <label className="relative block">
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={`${sharedClassName} resize-none`}
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={sharedClassName}
          required
        />
      )}
      <span className={labelClassName}>
        {label}
      </span>
    </label>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData(initialForm);
      window.setTimeout(() => setIsSuccess(false), 2400);
    }, 1300);
  };

  return (
    <div className="overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="premium-section relative overflow-hidden px-6 py-14 sm:px-10">
          <div className="hero-grid absolute inset-0 opacity-40" />
          <div className="absolute -left-8 top-12 h-40 w-40 rounded-full bg-brand-primary/12 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-kids-blue/12 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/78 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-primary">
                <Sparkles size={14} />
                Contact
              </div>
              <h1 className="mt-6 max-w-xl text-5xl font-extrabold leading-[0.96] sm:text-6xl">
                Let's plan a playful next step for your little explorer.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Reach out for product guidance, order support, or help choosing the right ride-on toy. The experience should feel easy from first click to first ride.
              </p>

              <div className="mt-8 grid gap-4">
                {contactItems.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <div className="group flex items-start gap-4 rounded-[26px] border border-white/70 bg-white/74 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-30px_rgba(30,41,59,0.38)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(255,178,111,0.18),rgba(119,199,255,0.18))] text-brand-primary">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{label}</div>
                        <div className="mt-2 text-base font-semibold leading-7 text-slate-900">{value}</div>
                      </div>
                    </div>
                  );

                  if (!href) {
                    return <div key={label}>{content}</div>;
                  }

                  return (
                    <a key={label} href={href}>
                      {content}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="premium-card relative overflow-hidden p-6 sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,178,111,0.16),transparent)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Send a message</div>
                    <h2 className="mt-2 text-2xl font-bold">We'll get back to you quickly.</h2>
                  </div>
                  <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white sm:flex">
                    <SendHorizonal size={20} />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FloatingField label="Name" name="name" value={formData.name} onChange={handleChange} />
                    <FloatingField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <FloatingField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  <FloatingField label="Message" name="message" value={formData.message} onChange={handleChange} rows={5} />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending message...' : 'Submit inquiry'}
                    <SendHorizonal size={16} />
                  </button>

                  <AnimatePresence mode="wait">
                    {isSuccess && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-3 rounded-[22px] border border-kids-green/30 bg-kids-green/10 px-4 py-3 text-sm font-semibold text-slate-800"
                      >
                        <motion.div
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                        >
                          <CheckCircle2 size={20} className="text-kids-green" />
                        </motion.div>
                        Your message has been sent successfully.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="premium-card p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Map Preview</div>
                <h2 className="mt-2 text-2xl font-bold">Visit the DV Kids Castle store</h2>
              </div>
              <MapPin className="text-brand-primary" size={22} />
            </div>

            <div className="mt-5 aspect-[16/9] overflow-hidden rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,#fff6eb,#eef8ff)]">
              <div className="relative flex h-full items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="relative z-10 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-[0_20px_40px_-24px_rgba(15,23,42,0.78)]"
                >
                  Bhiwadi showroom location
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="premium-card p-6"
          >
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-brand-primary">Store Experience</div>
            <h2 className="mt-2 text-2xl font-bold">Thoughtful help, from first question to final delivery.</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">
              <p>We focus on a calm, premium buying experience so parents can choose with confidence and children can look forward to the fun part.</p>
              <p>Ask us about age recommendations, ride-on toy sizing, gifting guidance, or available offers. We're here to help without the pressure.</p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
