
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, File, Download, Search, HardDrive } from 'lucide-react';
import { Download as DownloadType } from '../../types';
import { getTableData } from '../../services/supabase';

const DownloadsSection: React.FC = () => {
  const [items, setItems] = useState<DownloadType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const data = await getTableData<DownloadType>('downloads');
        setItems(data);
      } catch (err) {
        console.error("Downloads error", err);
      }
    };
    fetchDownloads();
  }, []);

  const filtered = items.filter(i => 
    i.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <header className="space-y-4 max-w-2xl">
          <h2 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">Resource Vault</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            Access official club documents, registration forms, and media kits.
          </p>
        </header>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search files..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item, idx) => {
          const isPdf = item.file_name.toLowerCase().includes('.pdf');
          return (
            <motion.a 
              key={item.id}
              href={item.file_url}
              target="_blank"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${isPdf ? 'bg-red-50 text-red-500 dark:bg-red-900/20' : 'bg-blue-50 text-blue-500 dark:bg-blue-900/20'}`}>
                {isPdf ? <FileText size={32} /> : <File size={32} />}
              </div>
              <div className="flex-1 space-y-1">
                <h5 className="font-bold text-slate-800 dark:text-white text-lg line-clamp-1 leading-tight">{item.file_name}</h5>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category || 'Official Document'}</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                <Download size={18} />
              </div>
            </motion.a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center space-y-4">
           <HardDrive size={64} className="mx-auto text-slate-200 dark:text-slate-800" />
           <p className="text-slate-400 font-medium">No files found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DownloadsSection;
