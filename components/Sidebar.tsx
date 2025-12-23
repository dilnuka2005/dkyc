
import React from 'react';
// Import motion from framer-motion to fix the missing definition error
import { motion } from 'framer-motion';
import { 
  Home, Users, Trophy, Calendar, Image as ImageIcon, Download as DownloadIcon, 
  Mail, Moon, Sun, ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  isOpen: boolean;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Us', icon: Users },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'downloads', label: 'Downloads', icon: DownloadIcon },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isOpen, onToggleDarkMode, isDarkMode }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none",
        !isOpen && "-translate-x-full"
      )}>
        {/* Logo Section */}
        <div className="p-8 pb-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-900 dark:bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20 p-2.5 transition-transform hover:scale-105">
            <img src="https://dilnuka13.github.io/Dream_Makers/logo.png" className="w-full h-full object-contain" alt="Dream Makers" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-800 dark:text-white leading-tight tracking-tight">Dream Makers</h1>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em]">Dikhengama</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar py-4">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 opacity-70">Main Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group relative",
                  isActive 
                    ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                )}
              >
                <span className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500"
                )}>
                  <Icon size={18} />
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 mt-auto border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button 
            onClick={onToggleDarkMode}
            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600">
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </div>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Theme</span>
            </div>
            <div className={cn(
              "w-10 h-5 rounded-full transition-all duration-300 relative flex items-center",
              isDarkMode ? "bg-blue-600" : "bg-slate-300"
            )}>
              <div className={cn(
                "absolute w-3.5 h-3.5 bg-white rounded-full transition-transform duration-300",
                isDarkMode ? "translate-x-[22px]" : "translate-x-1"
              )} />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
