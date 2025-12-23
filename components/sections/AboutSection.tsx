
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Search, Mail, Phone, Calendar } from 'lucide-react';
import { Officer, Member } from '../../types';
import { getTableData } from '../../services/supabase';

const AboutSection: React.FC = () => {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oData, mData] = await Promise.all([
          getTableData<Officer>('officers', { order: 'display_order' }),
          getTableData<Member>('members', { eq: ['status', 'active'], order: 'full_name' })
        ]);
        setOfficers(oData);
        setMembers(mData);
      } catch (err) {
        console.error("About data error", err);
      }
    };
    fetchData();
  }, []);

  const filteredMembers = members.filter(m => 
    m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.name_with_initials?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dob: string) => {
    if (!dob) return 'N/A';
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      {/* Vision & Mission */}
      <section className="grid md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8">
            <Eye size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">Our Vision</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            To be the beacon of hope and empowerment for the youth of Dikhengama, 
            fostering a generation of disciplined, united, and successful individuals 
            who contribute positively to society.
          </p>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm"
        >
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8">
            <Target size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">Our Mission</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            Creating diverse opportunities through sports, education, and community 
            service projects to develop leadership skills and social responsibility 
            among our members.
          </p>
        </motion.div>
      </section>

      {/* Officers Grid */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Executive Officers</h2>
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {officers.map((o) => (
            <motion.div 
              key={o.id}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full mx-auto overflow-hidden border-4 border-slate-50 dark:border-slate-800 ring-4 ring-blue-500/10 shadow-xl">
                  <img src={o.image_url || 'https://via.placeholder.com/150'} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt={o.name} />
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-800 dark:text-white mb-1 leading-tight">{o.name}</h4>
              
              {/* CLEAR APPOINTMENT DISPLAY */}
              <div className="inline-block px-5 py-2 rounded-2xl bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-600/20 mt-2 mb-6">
                 <p className="text-[10px] font-black uppercase tracking-widest">{o.position}</p>
              </div>
              
              {/* OFFICER CONTACT INFO */}
              <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-slate-800 mt-2">
                {o.show_email && o.email ? (
                  <a href={`mailto:${o.email}`} className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group/contact">
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#1877F2] shadow-sm">
                      <Mail size={14} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover/contact:text-blue-600 transition-colors truncate max-w-[140px]">{o.email}</span>
                  </a>
                ) : null}
                
                {o.show_phone && o.phone ? (
                  <a href={`tel:${o.phone}`} className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group/contact">
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#25D366] shadow-sm">
                      <Phone size={14} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover/contact:text-emerald-600 transition-colors">{o.phone}</span>
                  </a>
                ) : null}
                
                {!o.show_email && !o.show_phone && (
                  <p className="text-[10px] font-bold text-slate-400 italic">Contact info private</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Members Directory */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Active Community</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Verified Membership Roll</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Age</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={member.id} 
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                    >
                      <td className="px-10 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-black">
                            {member.name_with_initials ? member.name_with_initials.charAt(0) : member.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 dark:text-white">{member.name_with_initials || member.full_name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Club Member ID: {member.id.substring(0,8).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-5 text-center">
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 dark:text-slate-400">
                           {calculateAge(member.dob)}
                        </span>
                      </td>
                      <td className="px-10 py-5 text-right">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Verified
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-10 py-20 text-center text-slate-400 font-medium italic">
                      No members matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
