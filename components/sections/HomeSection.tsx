
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, ExternalLink, ArrowRight, Facebook, Youtube, Instagram, Send, MapPin, Phone, Mail, Award, Rocket, Trophy, Users, Calendar
} from 'lucide-react';
import { SlideshowImage, QuickLink, SiteSettings } from '../../types';
import { getTableData, getCount } from '../../services/supabase';

interface HomeSectionProps {
  onJoinClick: () => void;
  settings: SiteSettings | null;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onJoinClick, settings }) => {
  const [slides, setSlides] = useState<SlideshowImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [stats, setStats] = useState({ members: 0, events: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slidesData, linksData, memberCount, eventCount] = await Promise.all([
          getTableData<SlideshowImage>('slideshow_images', { order: 'display_order' }),
          getTableData<QuickLink>('quick_links', { eq: ['is_active', true], order: 'display_order' }),
          getCount('members'),
          getCount('events')
        ]);
        setSlides(slidesData);
        setQuickLinks(linksData);
        setStats({ members: memberCount, events: eventCount });
      } catch (err) {
        console.error("Home data error", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-[3rem] overflow-hidden min-h-[500px] flex items-center p-8 lg:p-20 text-white shadow-2xl shadow-blue-900/10">
        <AnimatePresence mode="wait">
          {slides.length > 0 ? (
            <motion.div
              key={currentSlide}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slides[currentSlide].image_url}')` }}
            />
          ) : (
            <div className="absolute inset-0 bg-slate-900" />
          )}
        </AnimatePresence>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-slate-950/20 z-0" />

        <div className="relative z-20 max-w-2xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-yellow-400 font-bold text-xs uppercase tracking-widest shadow-xl"
          >
            <Award size={14} /> <span>The Pride of Dikhengama</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-2xl"
          >
            Shaping Futures, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-yellow-200 to-yellow-500">Making Dreams.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-blue-100/90 font-medium leading-relaxed max-w-lg"
          >
            Dikhengama's premier youth organization dedicated to athletic excellence, 
            personal development, and community impact.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <button 
              onClick={onJoinClick}
              className="px-10 py-5 bg-white text-blue-900 rounded-[2rem] font-bold shadow-2xl hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
            >
              <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Join the Club</span>
            </button>
            
            <div className="flex gap-4">
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                  <Facebook size={20} />
                </a>
              )}
              {settings?.youtube_url && (
                <a href={settings.youtube_url} target="_blank" className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all">
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bento */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {[
          { label: 'Total Members', value: `${stats.members}+`, icon: Users, color: 'blue' },
          { label: 'Club Projects', value: `${stats.events}+`, icon: Rocket, color: 'indigo' },
          { label: 'Championships', value: '5+', icon: Trophy, color: 'yellow' },
          { label: 'Years Active', value: '2+', icon: Calendar, color: 'emerald' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center space-y-3"
          >
            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}>
              <stat.icon size={28} />
            </div>
            <div className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{stat.value}</div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Quick Links Section */}
      {quickLinks.length > 0 && (
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Essential Access</h2>
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((link) => (
              <motion.div 
                key={link.id}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="absolute top-8 right-8 text-slate-200 dark:text-slate-800 transition-colors group-hover:text-blue-500">
                  <ExternalLink size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 pr-10">{link.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                  {link.description || "Quick access to club resources, registrations, and important updates."}
                </p>
                <a 
                  href={link.link_url} 
                  target="_blank"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all group-hover:shadow-lg shadow-blue-600/20"
                >
                  Visit Now <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomeSection;
