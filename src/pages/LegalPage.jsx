import React from 'react';
import GlassCard from '../components/GlassCard';

export default function LegalPage({ title }) {
  return (
    <div className="min-h-screen pt-40 pb-20 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-12 md:p-20">
          <h1 className="text-4xl font-bold text-slate-900 mb-12 font-display">{title}</h1>
          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
             <p className="text-lg">Last updated: April 23, 2024</p>
             
             <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">1. Introduction</h2>
                <p>Welcome to Kids Castle. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this policy, or our practices with regards to your personal information, please contact us at privacy@kidscastle.com.</p>
             </section>

             <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">2. Information Collection</h2>
                <p>We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on our website or otherwise when you contact us.</p>
                <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use.</p>
             </section>

             <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">3. Usage Rights</h2>
                <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
             </section>

             <section className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">4. Legal Boundaries</h2>
                <p>Kids Castle complies with all relevant data protection regulations and educational standards to ensure the highest level of trust and security for our parents and students.</p>
             </section>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
