
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Upload } from 'lucide-react';
import { supabase } from '../services/supabase';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    name_with_initials: '',
    dob: '',
    nic: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    bio: '',
    status: 'pending'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('members').insert([formData]);
      if (error) throw error;
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
            full_name: '',
            name_with_initials: '',
            dob: '',
            nic: '',
            address: '',
            phone: '',
            whatsapp: '',
            email: '',
            bio: '',
            status: 'pending'
          });
      }, 3000);
    } catch (err) {
      alert("Submission failed. Please check your data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-8 lg:p-12 overflow-y-auto no-scrollbar">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>

              {isSuccess ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                    <CheckCircle size={56} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Application Sent!</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">We'll review your application and contact you soon.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-10">
                  <header className="space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">Membership</div>
                    <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Start Your Journey</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Join the Dream Makers community and unlock your true potential.</p>
                  </header>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                        <input 
                          type="text" required
                          value={formData.full_name}
                          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Initials & Name</label>
                        <input 
                          type="text" required
                          value={formData.name_with_initials}
                          onChange={(e) => setFormData({...formData, name_with_initials: e.target.value})}
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Date of Birth</label>
                        <input 
                          type="date" required
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">NIC Number</label>
                        <input 
                          type="text" required
                          value={formData.nic}
                          onChange={(e) => setFormData({...formData, nic: e.target.value})}
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Home Address</label>
                      <input 
                        type="text" required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                        <input 
                          type="tel" required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email</label>
                        <input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Bio & Special Skills</label>
                      <textarea 
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 font-medium resize-none" 
                      />
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-blue-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing Application..." : "Submit Application"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JoinModal;
