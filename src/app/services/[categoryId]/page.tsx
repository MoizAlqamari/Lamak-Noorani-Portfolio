'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn, MousePointer2 } from 'lucide-react';
import { categories } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Reusable animation variants                                       */
/* ------------------------------------------------------------------ */
const easeOut = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const galleryItemReveal = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: easeOut },
  }),
};

/* ------------------------------------------------------------------ */
/*  Gallery Tile                                                      */
/* ------------------------------------------------------------------ */
function GalleryTile({
  src,
  index,
  onClick,
  accentColor,
}: {
  src: string;
  index: number;
  onClick: () => void;
  accentColor: string;
}) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.button
      variants={galleryItemReveal}
      custom={index}
      onClick={onClick}
      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-[#2E2E46]/60 border border-[#E4DBC2]/5 hover:border-[#E4DBC2]/20 transition-all duration-500"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
    >
      {!imgError ? (
        <img
          src={src}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-5xl opacity-25 select-none">📷</span>
        </div>
      )}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to top, ${accentColor}30 0%, transparent 50%)`,
        }}
      />
      <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#2E2E46]/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <ZoomIn className="w-3.5 h-3.5 text-[#E4DBC2]" />
      </div>
    </motion.button>
  );
}


/* ------------------------------------------------------------------ */
/*  Lightbox                                                          */
/* ------------------------------------------------------------------ */
function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [current]);

  const goNext = useCallback(() => setCurrent((p) => (p + 1) % images.length), [images.length]);
  const goPrev = useCallback(() => setCurrent((p) => (p - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] bg-[#2E2E46]/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="relative max-w-5xl w-full mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video w-full rounded-2xl bg-color-[#2E2E46]/100 flex items-center justify-center relative overflow-hidden">
          {!imgError ? (
            <img
              src={images[current]}
              alt={`Gallery image ${current + 1}`}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-8xl opacity-25 select-none">
              {current % 3 === 0 ? '📷' : current % 3 === 1 ? '🎬' : '✨'}
            </span>
          )}
          <div className="absolute top-4 right-4 text-sm text-[#E4DBC2]/50 font-mono">
            {current + 1} / {images.length}
          </div>
        </div>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#E4DBC2]/10 backdrop-blur-md flex items-center justify-center text-[#E4DBC2] hover:bg-[#EF7373]/20 hover:text-[#EF7373] transition-all"
          onClick={goPrev}
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#E4DBC2]/10 backdrop-blur-md flex items-center justify-center text-[#E4DBC2] hover:bg-[#EF7373]/20 hover:text-[#EF7373] transition-all"
          onClick={goNext}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className="absolute -top-12 right-0 text-[#E4DBC2]/50 hover:text-[#EF7373] transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );
}


/* ------------------------------------------------------------------ */
/*  Category Page Content                                             */
/* ------------------------------------------------------------------ */
function CategoryContent({ category }: { category: (typeof categories)[0] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="w-full"
    >
      <div className="max-w-7xl mx-auto">
        {/* ------ 1. Large Heading ------ */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-[#E4DBC2] mb-4 text-left"
          style={{ fontFamily: 'Barlow, sans-serif' }}
        >
          {category.title.split('&').length > 1 ? (
            <>
              {category.title.split('&')[0]}<br />
              <span className="text-[#E4DBC2]">&</span>
              {category.title.split('&')[1]}
            </>
          ) : (
            category.title
          )}
        </motion.h2>

        {/* ------ 2. Description ------ */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className="text-sm md:text-base text-[#E4DBC2]/60 max-w-xl leading-relaxed mb-10 text-left"
        >
          {category.description}
        </motion.p>

        {/* ------ 3. 3x3 Gallery with staggered animations ------ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
        >
          {category.images.map((img, i) => (
            <GalleryTile
              key={i}
              src={img}
              index={i}
              onClick={() => setLightboxIndex(i)}
              accentColor={category.accentColor}
            />
          ))}
        </motion.div>

        {/* ------ 4. CTA Button ------ */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/#social"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#social');
            }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full
                       border border-[#E4DBC2]/20 bg-[#2E2E46]/50 backdrop-blur-sm
                       hover:border-[#EF7373]/40 hover:bg-[#EF7373]/10
                       transition-all duration-500 cursor-pointer"
          >
            <span className="text-xs md:text-sm font-semibold text-[#E4DBC2] tracking-wide">
              Interested in this style? Let's Talk
            </span>
            <motion.div
              className="flex items-center"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ArrowRight className="w-4 h-4 text-[#EF7373]" />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={category.images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */
export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-[#2E2E46] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            className="w-20 h-20 rounded-full bg-[#E4DBC2]/5 border border-[#E4DBC2]/10 flex items-center justify-center mx-auto mb-6"
          >
            <MousePointer2 className="w-8 h-8 text-[#E4DBC2]/30" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-[#E4DBC2] mb-4">Category Not Found</h1>
          <p className="text-[#E4DBC2]/50 mb-8">The category you're looking for doesn't exist.</p>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E4DBC2]/20 text-[#E4DBC2] hover:border-[#EF7373]/40 hover:bg-[#EF7373]/10 transition-all duration-500"
          >
            <ArrowRight className="w-4 h-4" />
            Back to Services
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen py-32 px-4 md:px-8 lg:px-16 bg-[#2E2E46] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mb-8"
        >
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-[#E4DBC2]/50 hover:text-[#EF7373] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Services
          </Link>
        </motion.div>
        <CategoryContent category={category} />
      </div>
    </section>
  );
}
