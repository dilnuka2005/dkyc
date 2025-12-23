
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Users, Trophy, Calendar, Image as ImageIcon, Download as DownloadIcon, 
  Mail, Menu, X, Moon, Sun, Info, ExternalLink, ArrowRight, UserPlus,
  Facebook, Youtube, Instagram, Send, MapPin, Phone
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import SportsSection from './components/sections/SportsSection';
import EventsSection from './components/sections/EventsSection';
import GallerySection from './components/sections/GallerySection';
import DownloadsSection from './components/sections/DownloadsSection';
import ContactSection from './components/sections/ContactSection';
import JoinModal from './components/JoinModal';
import AIAssistant from './components/AIAssistant';
import { SiteSettings } from './types';
import { getTableData } from './services/supabase';

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

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getTableData<SiteSettings>('site_settings');
        if (data.length > 0) setSiteSettings(data[0]);
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <HomeSection onJoinClick={() => setIsJoinModalOpen(true)} settings={siteSettings} />;
      case 'about': return <AboutSection />;
      case 'sports': return <SportsSection />;
      case 'events': return <EventsSection />;
      case 'gallery': return <GallerySection />;
      case 'downloads': return <DownloadsSection />;
      case 'contact': return <ContactSection settings={siteSettings} />;
      default: return <HomeSection onJoinClick={() => setIsJoinModalOpen(true)} settings={siteSettings} />;
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'sports', label: 'Sports' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900 overflow-x-hidden">
      
      {/* Mobile Header Overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center p-1">
            <img src="https://dilnuka13.github.io/Dream_Makers/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">Dream Makers</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={(id) => { setActiveSection(id); setIsSidebarOpen(false); }}
        isOpen={isSidebarOpen}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
      />

      <main className="flex-1 lg:ml-72 p-4 pt-20 lg:pt-8 lg:p-8 w-full max-w-[1600px] mx-auto overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pb-20 lg:pb-8"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Footer - Always Original Colors */}
        <footer className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 px-4">
            {/* Column 1: Identity & Socials with Original Colors */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center p-2 shadow-lg">
                  <img src="https://dilnuka13.github.io/Dream_Makers/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-black text-xl tracking-tight">Dream Makers</h4>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest">Youth & Sport Club</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs font-medium">
                Empowering the youth of Dikhengama through sport, discipline, and community leadership.
              </p>
              
              {/* VIBRANT SOCIAL BAR */}
              <div className="flex flex-wrap gap-3">
                {siteSettings?.facebook_url && (
                  <a href={siteSettings.facebook_url} target="_blank" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1 shadow-md border border-slate-100 dark:border-slate-700">
                    <Facebook size={18} fill="currentColor" />
                  </a>
                )}
                {siteSettings?.youtube_url && (
                  <a href={siteSettings.youtube_url} target="_blank" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all transform hover:-translate-y-1 shadow-md border border-slate-100 dark:border-slate-700">
                    <Youtube size={18} fill="currentColor" />
                  </a>
                )}
                {siteSettings?.instagram_url && (
                  <a href={siteSettings.instagram_url} target="_blank" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#E4405F] hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all transform hover:-translate-y-1 shadow-md border border-slate-100 dark:border-slate-700">
                    <Instagram size={18} />
                  </a>
                )}
                {siteSettings?.whatsapp_url && (
                  <a href={siteSettings.whatsapp_url} target="_blank" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all transform hover:-translate-y-1 shadow-md border border-slate-100 dark:border-slate-700">
                    <WhatsAppIcon size={20} />
                  </a>
                )}
                {siteSettings?.telegram_url && (
                  <a href={siteSettings.telegram_url} target="_blank" className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all transform hover:-translate-y-1 shadow-md border border-slate-100 dark:border-slate-700">
                    <Send size={18} fill="currentColor" />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Navigation Map */}
            <div className="space-y-6">
              <h5 className="font-black text-xs uppercase tracking-widest text-slate-400 border-l-4 border-blue-600 dark:border-blue-500 pl-3">Navigation</h5>
              <nav className="flex flex-col gap-3.5">
                {navLinks.map(link => (
                  <button 
                    key={link.id}
                    onClick={() => setActiveSection(link.id)}
                    className="text-left text-slate-600 dark:text-slate-400 text-sm font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-blue-500 transition-colors" />
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact Details */}
            <div className="space-y-6">
              <h5 className="font-black text-xs uppercase tracking-widest text-slate-400 border-l-4 border-blue-600 dark:border-blue-500 pl-3">Contact Details</h5>
              <div className="space-y-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Location</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-bold">{siteSettings?.address || 'Dikhengama, Sri Lanka'}</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Direct Line</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-bold">{siteSettings?.contact_number || '+94 XX XXX XXXX'}</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Support Email</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-bold">{siteSettings?.email || 'info@dreammakers.lk'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Official Partners */}
            <div className="space-y-6">
              <h5 className="font-black text-xs uppercase tracking-widest text-slate-400 border-l-4 border-blue-600 dark:border-blue-500 pl-3">Official Partners</h5>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:scale-110">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/1200px-Flag_of_Sri_Lanka.svg.png" className="w-full object-contain" alt="Sri Lanka Flag" title="Government of Sri Lanka" />
                </div>
                <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:scale-110">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Emblem_of_Sri_Lanka.svg" className="w-full object-contain" alt="Sri Lanka Emblem" title="National Emblem" />
                </div>
                <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:scale-110">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Western_Province_Flag_%28SRI_LANKA%29.png" className="w-full object-contain" alt="Western Province Flag" title="Western Province" />
                </div>
                <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:scale-110">
                  <img src="https://dilnuka13.github.io/Dream_Makers/119.png" className="w-full object-contain" alt="Sports Authority" title="Sports Authority of Sri Lanka" />
                </div>
                <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:scale-110">
                  <img src="https://dilnuka13.github.io/Dream_Makers/logo.png" className="w-full object-contain" alt="Club Logo" title="Dream Makers Youth Club" />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 leading-relaxed">
                  Proudly collaborating for youth empowerment.
                </p>
              </div>
            </div>
          </div>

          <div className="py-8 border-t border-slate-100 dark:border-slate-800 text-center space-y-4">
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">
               © {new Date().getFullYear()} Dream Makers Youth & Sport Club. 
             </p>
             <p className="text-xs font-bold text-slate-500">
               Crafted with ❤️ for Dikhengama by <a href="https://dilnuka13.github.io/my/" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline transition-all">Isara Dilnuka</a>
             </p>
          </div>
        </footer>
      </main>

      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
      <AIAssistant />
    </div>
  );
};

export default App;
