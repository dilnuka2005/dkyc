
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, Send, CheckCircle } from 'lucide-react';
import { SiteSettings } from '../../types';
import { supabase } from '../../services/supabase';

// Custom Original WhatsApp Icon
const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.006 12.039a11.81 11.81 0 001.573 5.955L0 24l6.109-1.603a11.805 11.805 0 005.937 1.603h.005c6.637 0 12.043-5.403 12.047-12.039a11.79 11.79 0 00-3.646-8.514z"/>
  </svg>
);

interface ContactSectionProps {
  settings: SiteSettings | null;
}

const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('messages').insert([formData]);
      if (error) throw error;
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16">
      <header className="space-y-4 max-w-2xl">
        <h2 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">Let's Talk</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Have a project in mind or want to join our journey? We're just a message away.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-900 p-10 lg:p-14 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5"
        >
          {submitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                <CheckCircle size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Message Sent!</h3>
                <p className="text-slate-500 font-medium">Thank you for reaching out. We'll be in touch soon.</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-600/20"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Message</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-5 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none"
                />
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full py-5 bg-blue-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? "Delivering..." : "Deliver Message"}
                <Send size={18} />
              </button>
            </form>
          )}
        </motion.div>

        {/* Info Container */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-900 text-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-3xl font-black mb-10 tracking-tight">Contact Hub</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-1">Our Base</p>
                  <p className="text-lg font-medium leading-snug">{settings?.address || 'Dikhengama, Horana'}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-lg font-medium">{settings?.contact_number || '+94 XX XXX XXXX'}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-lg font-medium">{settings?.email || 'contact@dreammakers.lk'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLOR MODE SOCIAL LINKS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <h4 className="text-xs font-black text-slate-400 mb-8 tracking-[0.2em] text-center uppercase">Join our digital family</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-2 hover:shadow-xl">
                  <Facebook size={28} fill="currentColor" />
                </a>
              )}
              {settings?.youtube_url && (
                <a href={settings.youtube_url} target="_blank" className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all transform hover:-translate-y-2 hover:shadow-xl">
                  <Youtube size={28} fill="currentColor" />
                </a>
              )}
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-[#E4405F] hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all transform hover:-translate-y-2 hover:shadow-xl">
                  <Instagram size={28} />
                </a>
              )}
              {settings?.whatsapp_url && (
                <a href={settings.whatsapp_url} target="_blank" className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all transform hover:-translate-y-2 hover:shadow-xl">
                  <WhatsAppIcon size={32} />
                </a>
              )}
              {settings?.telegram_url && (
                <a href={settings.telegram_url} target="_blank" className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all transform hover:-translate-y-2 hover:shadow-xl">
                  <Send size={28} fill="currentColor" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
