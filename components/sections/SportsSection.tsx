
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, User, ArrowRight, Activity } from 'lucide-react';
import { SportsTeam } from '../../types';
import { getTableData } from '../../services/supabase';

const SportsSection: React.FC = () => {
  const [teams, setTeams] = useState<SportsTeam[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTableData<SportsTeam>('sports_teams');
        setTeams(data);
      } catch (err) {
        console.error("Sports error", err);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="space-y-12">
      <header className="space-y-4 max-w-2xl">
        <h2 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">Our Sports Teams</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Excellence on and off the field. Our athletic programs are designed to build 
          teamwork, resilience, and competitive spirit.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map((team, idx) => (
          <motion.div 
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all"
          >
            {/* Image/Cover */}
            <div className="h-64 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
              {team.team_photo_url ? (
                <img 
                  src={team.team_photo_url} 
                  alt={team.sport_name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Activity size={64} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-6 left-6 flex gap-2">
                 <div className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Active Team</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-10 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{team.sport_name}</h3>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mt-1 font-bold">
                    <User size={14} />
                    <span className="text-xs">Captain: {team.captain_name || 'TBA'}</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Trophy size={24} />
                </div>
              </div>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
                {team.description || "Representing Dikhengama in local and national tournaments with pride and excellence."}
              </p>

              <button className="w-full py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center gap-3 text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all">
                Learn More <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SportsSection;
