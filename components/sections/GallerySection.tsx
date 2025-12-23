
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, ArrowLeft, Maximize2, X, Download, Share2, Calendar } from 'lucide-react';
import { Album, GalleryImage } from '../../types';
import { getTableData } from '../../services/supabase';

const GallerySection: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getTableData<Album>('gallery_albums', { eq: ['is_hidden', false], order: 'event_date', ascending: false });
        setAlbums(data);
      } catch (err) {
        console.error("Gallery albums error", err);
      }
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (!selectedAlbum) return;
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const data = await getTableData<GalleryImage>('gallery_images', { eq: ['album_id', selectedAlbum.id] });
        setImages(data.filter(img => !img.is_hidden));
      } catch (err) {
        console.error("Gallery images error", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [selectedAlbum]);

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        {!selectedAlbum ? (
          <motion.div 
            key="albums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            <header className="space-y-4">
              <h2 className="text-5xl font-black text-slate-800 dark:text-white tracking-tight">Memories Captured</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">A visual journey through our triumphs and milestones.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {albums.map((album) => (
                <motion.div 
                  key={album.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedAlbum(album)}
                  className="cursor-pointer group space-y-4"
                >
                  <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-lg relative">
                    <img 
                      src={album.cover_image_url} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={album.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                       <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                         <ImageIcon size={14} /> Open Album
                       </span>
                    </div>
                  </div>
                  <div className="px-4">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">{album.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={10} /> {new Date(album.event_date).toDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="images"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <button 
              onClick={() => setSelectedAlbum(null)}
              className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-all font-black text-xs uppercase tracking-widest bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <ArrowLeft size={16} /> <span>Back to Collections</span>
            </button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">{selectedAlbum.title}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recorded on {new Date(selectedAlbum.event_date).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-4">
                <button className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition shadow-sm">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 text-center text-slate-400 font-medium">Loading gallery...</div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {images.map((img) => (
                  <motion.div 
                    key={img.id}
                    layoutId={`img-${img.id}`}
                    className="relative rounded-3xl overflow-hidden group break-inside-avoid shadow-lg"
                  >
                    <img src={img.image_url} className="w-full h-auto block" alt={img.caption || "Gallery"} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={() => setLightboxImage(img.image_url)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 transition"
                      >
                        <Maximize2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition p-3 hover:bg-white/10 rounded-full"
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={lightboxImage} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
              <a 
                href={lightboxImage} 
                download 
                target="_blank"
                className="flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition shadow-2xl"
              >
                <Download size={18} /> Download High-Res
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GallerySection;
