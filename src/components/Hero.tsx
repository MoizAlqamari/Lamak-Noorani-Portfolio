'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Play, MessageCircle } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);


  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2E2E46]">
      {/* Video Placeholder */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#000000]/40 z-10" />
            <video
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/hero-poster.jpg"
            className="w-full h-full object-cover"
            >
            <source src="/videos/hero1.webm" type="video/webm" />
            <source src="/videos/hero1.mp4" type="video/mp4" />
            </video>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
      >

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#E4DBC2] mb-6"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            LAMAK
            <br />
            <span className="text-[#E4DBC2]">NOORANI</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-[#E4DBC2] font-light tracking-wide mb-3">
            Films & Studios
          </p>
          <p className="text-sm md:text-base text-[#E4DBC2]/50 max-w-xl mx-auto mb-10 tracking-wider">
            Premium Photography & Videography
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#about')}
            className="group relative px-8 py-3.5 bg-[#EF7373] text-[#2A281B] font-semibold rounded-full overflow-hidden text-sm tracking-widest uppercase"
          >
            <span className="relative z-10">View About Us</span>
            <motion.div
              className="absolute inset-0 bg-[#E4DBC2]"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ originX: 0 }}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#social')}
            className="group relative px-8 py-3.5 border border-[#E4DBC2]/30 text-[#E4DBC2] rounded-full overflow-hidden text-sm tracking-widest uppercase"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Let's Connect
            </span>
            <motion.div
              className="absolute inset-0 bg-[#E4DBC2]/10"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ originX: 0 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-[#E4DBC2]/40 uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 text-[#E4DBC2]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
