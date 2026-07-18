'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn, MousePointer2 } from 'lucide-react';
import { categories } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Reusable animation variants                                       */
/* ------------------------------------------------------------------ */
const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: easeOut },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
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
/*  Divider                                                            */
/* ------------------------------------------------------------------ */
function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-16 md:py-24">
      <svg
        className="w-24 md:w-32 h-auto"
        viewBox="0 0 120 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easeOut }}
          d="M2 8 C 20 0, 30 16, 40 8 C 50 0, 60 16, 70 8 C 80 0, 90 16, 100 8 C 110 0, 118 8, 118 8"
          stroke="url(#dividerGrad)"
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="dividerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#EF7373" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation Card (thumbnail + title + arrow)                       */
/* ------------------------------------------------------------------ */
function NavCard({
  category,
  index,
  isActive,
  onClick,
}: {
  category: (typeof categories)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      variants={cardReveal}
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl
                 backdrop-blur-sm transition-all duration-500 cursor-pointer
                 w-full ${
                   isActive
                     ? 'border-2 border-[#EF7373] bg-[#EF7373]/10 shadow-lg shadow-[#EF7373]/20'
                     : 'border border-[#E4DBC2]/10 bg-[#2A281B]/30 hover:border-[#E4DBC2]/30'
                 }`}
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
    >
      {/* Soft glow on hover */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{
          background: `radial-gradient(circle at 50% 30%, ${category.accentColor}15 0%, transparent 70%)`,
        }}
      />

      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute top-3 right-3 w-2 h-2 rounded-full"
          style={{ backgroundColor: category.accentColor }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}

      {/* Active bottom bar */}
      {isActive && (
        <motion.div
          layoutId="activeBar"
          className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full"
          style={{
            background: `linear-gradient(90deg, ${category.accentColor}, transparent)`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}

      {/* Circular thumbnail */}
      <div className="relative">
        <motion.div
          className={`w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full
                     flex items-center justify-center overflow-hidden
                     transition-all duration-500 ${
                       isActive
                         ? 'border-2'
                         : 'border border-[#E4DBC2]/15 group-hover:border-[#E4DBC2]/40'
                     }`}
          style={{
            background: `linear-gradient(135deg, ${category.accentColor}30, ${category.accentColor}08)`,
            borderColor: isActive ? category.accentColor : undefined,
          }}
          whileHover={{ scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <div className="w-full h-full relative flex items-center justify-center">
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${category.accentColor}25 0%, transparent 60%)`,
              }}
            />
            <div
              className="w-full h-full flex items-center justify-center object-cover rounded-full"
              style={{ color: category.accentColor, opacity: 0.7 }}
              dangerouslySetInnerHTML={{ __html: category.thumbnailSvg }}
            />
          </div>
        </motion.div>
        {/* Thin ring that glows on hover / active */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 0 0 ${category.accentColor}` }}
          whileHover={{ boxShadow: `0 0 20px 2px ${category.accentColor}30` }}
          animate={
            isActive
              ? { boxShadow: `0 0 24px 4px ${category.accentColor}50` }
              : { boxShadow: `0 0 0 0 ${category.accentColor}` }
          }
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Title */}
      <h3
        className={`text-sm md:text-base font-semibold tracking-wide text-center transition-colors duration-300 ${
          isActive ? 'text-[#EF7373]' : 'text-[#E4DBC2]'
        }`}
        style={{ fontFamily: 'Barlow, sans-serif' }}
      >
        {category.title}
      </h3>

      {/* Arrow indicator */}
      <div
        className={`flex items-center gap-1 transition-colors duration-400 ${
          isActive ? 'text-[#EF7373]/70' : 'text-[#E4DBC2]/30 group-hover:text-[#EF7373]/70'
        }`}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] font-medium">Explore</span>
        <motion.div
          className="flex items-center"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ArrowRight className="w-3 h-3" />
        </motion.div>
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  One Gallery Image Tile                                            */
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
    <motion.div
      custom={index}
      variants={galleryItemReveal}
      onClick={onClick}
      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer
                 bg-color-[#2E2E46] border border-[#E4DBC2]/5
                 hover:border-[#E4DBC2]/20 transition-all duration-500"
    >
      {/* Actual image */}
      {!imgError ? (
        <img
          src={src}
          alt={`Gallery image ${index + 1}`}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        /* Placeholder when image is not found */
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl md:text-4xl opacity-15 select-none">
            {index % 3 === 0 ? '📷' : index % 3 === 1 ? '🎬' : '✨'}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2E2E46]/80 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500
                      -translate-y-2 group-hover:translate-y-0">
        <div className="w-8 h-8 rounded-full bg-[#E4DBC2]/15 backdrop-blur-md flex items-center justify-center">
          <ZoomIn className="w-4 h-4 text-[#E4DBC2]" />
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute bottom-0 left-0 w-12 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox Component                                                */
/* ------------------------------------------------------------------ */
function Lightbox({
  images,
  initialIndex,
  onClose,
  accentColor,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  accentColor: string;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [imgError, setImgError] = useState(false);

  // Reset error state when image index changes
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
        {/* Image */}
        <div className="aspect-video w-full rounded-2xl bg-color-[#2E2E46]/100
                        flex items-center justify-center relative overflow-hidden">
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

          {/* Counter */}
          <div className="absolute top-4 right-4 text-sm text-[#E4DBC2]/50 font-mono">
            {current + 1} / {images.length}
          </div>
        </div>

        {/* Previous */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                     bg-[#E4DBC2]/10 backdrop-blur-md flex items-center justify-center
                     text-[#E4DBC2] hover:bg-[#EF7373]/20 hover:text-[#EF7373] transition-all"
          onClick={goPrev}
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                     bg-[#E4DBC2]/10 backdrop-blur-md flex items-center justify-center
                     text-[#E4DBC2] hover:bg-[#EF7373]/20 hover:text-[#EF7373] transition-all"
          onClick={goNext}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Close */}
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
/*  Placeholder when no category is selected                          */
/* ------------------------------------------------------------------ */
function SelectionPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="flex flex-col items-center justify-center py-20 md:py-28"
    >
      {/* Subtle icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E4DBC2]/5 border border-[#E4DBC2]/10 flex items-center justify-center mb-6"
      >
        <MousePointer2 className="w-7 h-7 md:w-8 h-8 text-[#E4DBC2]/30" />
      </motion.div>

      {/* Pulsing ring around icon */}
      <motion.div
        className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#EF7373]/20"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
        className="text-base md:text-lg text-[#E4DBC2]/40 text-center max-w-md font-light"
      >
        Select a category above to explore our work
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
        className="text-xs text-[#E4DBC2]/20 text-center mt-3 max-w-xs"
      >
        Click any service card to view our portfolio, gallery, and detailed services
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase Content – rendered for one category at a time            */
/* ------------------------------------------------------------------ */
function ShowcaseContent({
  category,
}: {
  category: (typeof categories)[0];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);


  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, scale: 0.97, filter: 'blur(6px)' }}
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

        {/* ------ 3. 3×3 Gallery with staggered animations ------ */}
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
          <motion.button
            onClick={() => scrollToSection('#social')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
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
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={category.images}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            accentColor={category.accentColor}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ================================================================== */
/*  MAIN EXPORT — What We Offer Section + Dynamic Showcase            */
/* ================================================================== */
export default function Services() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const selectedCategory = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId) ?? null
    : null;
    const handleCategoryClick = (id: string) => {
      setSelectedCategoryId(id);
      setTimeout(() => {
        showcaseRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50); // gives React a tick to render the new content before measuring scroll position
    };
  return (
    <>
      {/* ============================================================ */}
      {/*  "What We Offer" Section – Navigation Hub                    */}
      {/* ============================================================ */}
      <section id="services" className="relative py-32 px-4 md:px-8 lg:px-16 bg-[#2E2E46] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-6"
          >
            <p className="text-xs tracking-[0.3em] text-[#EF7373] uppercase mb-4">
              Our Services
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black text-[#E4DBC2]"
              style={{ fontFamily: 'Barlow, sans-serif' }}
            >
              What We Offer
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0.15}
            className="text-sm md:text-base text-[#E4DBC2]/50 max-w-xl mx-auto text-center leading-relaxed mb-16"
          >
            Explore our diverse range of photography and videography services, each tailored to capture the essence of your story. From fashion and events to wildlife and street photography, we bring your vision to life with creativity and precision.
          </motion.p>

          {/* Navigation Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            {categories.map((cat, i) => (
              <NavCard
                key={cat.id}
                category={cat}
                index={i}
                isActive={cat.id === selectedCategoryId}
                onClick={() => handleCategoryClick(cat.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Single Dynamic Showcase Container                           */}
      {/* ============================================================ */}
      <div
        ref={showcaseRef}
        className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 bg-[#2E2E46] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {selectedCategory ? (
            <ShowcaseContent key={selectedCategory.id} category={selectedCategory} />
          ) : (
            <SelectionPlaceholder key="placeholder" />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
