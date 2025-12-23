
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Filter } from 'lucide-react';
import { Event } from '../../types';
import { getTableData } from '../../services/supabase';

const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getTableData<Event>('events', { order: 'event_date', ascending: false });
        setEvents(data);
      } catch (err) {
        console.error("Events error", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <header className="space-y-4 max-w-2xl">
          <h2 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">Club Chronicles</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            From sports tournaments to community workshops, stay updated with the heartbeats of our club.
          </p>
        </header>
        
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition shadow-sm">
             <Filter size={16} /> <span>Filter</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, idx) => {
          const date = new Date(event.event_date);
          const month = date.toLocaleString('default', { month: 'short' });
          const day = date.getDate();
          
          return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all group flex flex-col"
            >
              <div className="h-60 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img 
                  src={event.cover_image_url || 'https://picsum.photos/seed/event/800/600'} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={event.title} 
                />
                <div className="absolute top-6 right-6 bg-white dark:bg-slate-900 rounded-2xl p-3 text-center shadow-2xl min-w-[70px]">
                  <span className="block text-[10px] font-black text-blue-600 uppercase tracking-widest">{month}</span>
                  <span className="block text-2xl font-black text-slate-800 dark:text-white leading-tight">{day}</span>
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col space-y-6">
                <div className="space-y-3">
                  <h4 className="text-2xl font-black text-slate-800 dark:text-white line-clamp-1 leading-tight">{event.title}</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <Clock size={12} className="text-blue-500" />
                      <span>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <MapPin size={12} className="text-red-500" />
                      <span>Dikhengama</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                  {event.description || "Join us for an exciting day of sports and community bonding. Everyone is welcome to participate and cheer!"}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                  <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                    View Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsSection;
