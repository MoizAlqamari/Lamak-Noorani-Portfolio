'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { galleryImages } from '@/lib/data';

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    },
    [selectedIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="gallery" className="relative py-32 px-4 md:px-8 lg:px-16 bg-[#2A281B]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-[#EF7373] uppercase mb-4">Portfolio</p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#E4DBC2]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Featured
            <br />
            <span className="text-[#E4DBC2]">Gallery</span>
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 ? 'col-span-2 row-span-2' :
                index === 4 ? 'col-span-2' :
                index === 8 ? 'col-span-2' : ''
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="aspect-[3/4] w-full relative bg-color-[#2E2E46]">
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A281B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                
                {/* Image placeholder with category */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs text-[#EF7373] mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {image.category}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-[#E4DBC2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {image.title}
                  </h3>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-8 rounded-full bg-[#E4DBC2]/20 backdrop-blur-md flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-[#E4DBC2]" />
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border border-[#E4DBC2]/0 group-hover:border-[#E4DBC2]/20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#2A281B] backdrop-blur-xl flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="aspect-video relative bg-[#2A281B] rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={galleryImages[selectedIndex].src}
                  alt={galleryImages[selectedIndex].title}
                  className="w-full h-full object-contain"
                />
                
                {/* Image info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#2A281B]/80 to-transparent">
                  <p className="text-xs text-[#EF7373] tracking-wider uppercase">
                    {galleryImages[selectedIndex].category}
                  </p>
                  <h3 className="text-xl font-semibold text-[#E4DBC2]">
                    {galleryImages[selectedIndex].title}
                  </h3>
                </div>

                {/* Counter */}
                <div className="absolute top-4 right-4 text-sm text-[#E4DBC2]/60 font-mono">
                  {selectedIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Navigation */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#E4DBC2]/10 backdrop-blur-md flex items-center justify-center text-[#E4DBC2] hover:bg-[#EF7373]/20 hover:text-[#EF7373] transition-all"
                onClick={() =>
                  setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))
                }
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#E4DBC2]/10 backdrop-blur-md flex items-center justify-center text-[#E4DBC2] hover:bg-[#EF7373]/20 hover:text-[#EF7373] transition-all"
                onClick={() =>
                  setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))
                }
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Close */}
              <button
                className="absolute -top-12 right-0 text-[#E4DBC2]/60 hover:text-[#EF7373] transition-colors"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}