import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Scale, 
  FileText, 
  UserCheck, 
  HelpCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Simple Wrapper for Legal Sections to keep code clean
const LegalSection = ({ icon: Icon, title, children }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="space-y-4"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shadow-sm">
        <Icon size={22} />
      </div>
      <h2 className="text-2xl font-black text-blue-900 tracking-tight">{title}</h2>
    </div>
    <div className="pl-1 text-blue-900/70 leading-relaxed space-y-4 font-medium">
      {children}
    </div>
  </motion.section>
);

export default function LegalPage({ title }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#F0F9FF] to-white">
      {/* 🌤️ Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-400/20 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto pt-32 pb-20 px-6 relative z-10">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-900/60 hover:text-blue-900 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Main Content Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-2xl border border-white rounded-[3rem] shadow-2xl shadow-blue-500/10 overflow-hidden"
        >
          {/* Header Strip */}
          <div className="bg-blue-900 p-8 md:p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <FileText size={200} className="absolute -right-10 -bottom-10 rotate-12" />
             </div>
             
             <motion.div
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
             >
               <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                 {title}
               </h1>
               <div className="flex items-center justify-center gap-2 text-blue-200 font-bold uppercase tracking-widest text-xs">
                 <Clock size={14} />
                 Last Updated: April 27, 2026
               </div>
             </motion.div>
          </div>

          {/* Policy Content */}
          <div className="p-8 md:p-16 space-y-12">
            
            <LegalSection icon={Eye} title="1. Introduction">
              <p>
                Welcome to <strong>DV Kids Castle</strong>. We value the trust you place in us when purchasing toys for your children. 
                This document outlines how we handle your data, your rights as a consumer, and our commitment to safety 
                and transparency. By using our platform, you agree to the terms outlined herein.
              </p>
            </LegalSection>

            <LegalSection icon={UserCheck} title="2. Information We Collect">
              <p>To provide a premium shopping experience, we collect the following:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Identity Data:</strong> Name, email address, and contact numbers for order updates.</li>
                <li><strong>Delivery Data:</strong> Physical addresses for shipping your ride-on vehicles and toys.</li>
                <li><strong>Transaction Data:</strong> Details about payments and products you've purchased from us.</li>
                <li><strong>Technical Data:</strong> IP addresses and cookies to improve website performance and security.</li>
              </ul>
            </LegalSection>

            <LegalSection icon={Lock} title="3. Data Security">
              <p>
                We implement industry-standard 256-bit SSL encryption for all data transmissions. Your payment information 
                is processed through secure, PCI-compliant gateways. We never store raw credit card or UPI pin details 
                on our servers.
              </p>
            </LegalSection>

            <LegalSection icon={Scale} title="4. Usage Rights & Licensing">
              <p>
                All content on this website, including product descriptions, images, and brand assets, are the intellectual 
                property of DV Kids Castle. You are granted a limited license to access this information for personal, 
                non-commercial shopping purposes only.
              </p>
            </LegalSection>

            <LegalSection icon={ShieldCheck} title="5. Safety & Standards">
              <p>
                As a provider of children's electric vehicles and toys, we comply with Rajasthan and National toy safety 
                standards. Every product is checked for non-toxic materials and mechanical safety before being listed.
              </p>
            </LegalSection>

            <LegalSection icon={HelpCircle} title="6. Contact Our Legal Team">
              <p>
                If you have questions regarding your privacy or our service terms, please reach out to our 
                dedicated support desk:
              </p>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-blue-900 font-black">Email Support</p>
                  <p className="text-sm">dvkidscastlebwd@gmail.com</p>
                </div>
                <div className="h-px md:h-10 w-full md:w-px bg-blue-200" />
                <div className="text-center md:text-left">
                  <p className="text-blue-900 font-black">Office Address</p>
                  <p className="text-sm text-center md:text-left">Bhiwadi, Rajasthan 301019</p>
                </div>
              </div>
            </LegalSection>

          </div>

          {/* Footer of the card */}
          <div className="bg-slate-50 p-8 text-center">
            <p className="text-xs font-bold text-blue-900/40 uppercase tracking-widest">
              © 2026 DV Kids Castle • All Rights Reserved
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}