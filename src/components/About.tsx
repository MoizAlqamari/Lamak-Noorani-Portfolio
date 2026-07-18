'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Camera, Video, Edit3, Palette, Pen, Layout } from 'lucide-react';

const stats = [
  { label: 'Projects', value: 150, suffix: '+' },
  { label: 'Clients', value: 80, suffix: '+' },
  { label: 'Experience', value: 5, suffix: ' yrs' },
  { label: 'Coffee', value: 500, suffix: '+' },
];

const passions = [
  { icon: Camera, label: 'Photography' },
  { icon: Video, label: 'Videography' },
  { icon: Edit3, label: 'Editing' },
  { icon: Palette, label: 'Creative Direction' },
  { icon: Pen, label: 'Visual Storytelling' },
  { icon: Layout, label: 'Branding' },
];

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  if (isInView && !hasAnimated.current) {
    hasAnimated.current = true;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (ref.current) {
        ref.current.textContent = `${Math.floor(eased * target)}${suffix}`;
      }
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  return (
    <span
      ref={ref}
      className="text-3xl md:text-4xl font-black text-[#E4DBC2]"
      style={{ fontFamily: 'Barlow, sans-serif' }}
    >
      0{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-4 md:px-8 lg:px-16 bg-[#2A281B]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-[#EF7373] uppercase mb-4">About</p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#E4DBC2]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            The Story
            <br />
            <span className="text-[#E4DBC2]">Behind the Lens</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Floating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-[#EF7373]/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-[#BECAF1]/10"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border border-[#E4DBC2]/10"
              />

              {/* Portrait */}
              <motion.div
                style={{ y: imageParallax }}
                className="absolute inset-12 rounded-full overflow-hidden bg-gradient-to-br from-[#2E2E46] to-[#691F1F]"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src="/images/lams.jpeg"
                    alt="Lamak Noorani Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#EF7373]/20 via-transparent to-[#BECAF1]/20" />
              </motion.div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#EF7373]/10 to-[#BECAF1]/10 blur-3xl" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-black text-[#E4DBC2] mb-2" style={{ fontFamily: 'Barlow, sans-serif' }}>
              Lamak Noorani
            </h3>
            <p className="text-sm text-[#EF7373] mb-1">Age: 20</p>
            <p className="text-sm text-[#BECAF1] mb-6">
              Creative Media Specialist — Photography, Videography & Editing
            </p>
            <p className="text-xs text-[#E4DBC2]/40 mb-2 uppercase tracking-widest">Lamak Noorani Films & Studios</p>

            <p className="text-sm text-[#E4DBC2]/50 leading-relaxed mb-8">
              Hi, I’m Lamak, a Pakistan-based photographer, cinematographer, and video editor with over 5 years of professional experience dedicated to turning fleeting moments into cinematic art.
              My work spans from the raw, untamed beauty of nature and wildlife to the sharp, deliberate world of fashion and commercial imagery. For me, capturing the image is only half the journey.
              By bringing my own vision from behind the lens straight into the editing suite, I ensure that the final piece carries the exact emotion, rhythm, and depth it was meant to evoke.
              With half a decade of experience navigating the entire creative pipeline, from set lighting to the final color grade. I don't just take photos or shoot videos; I build visual worlds.
              Based in Pakistan and available for projects nationwide and beyond. Let’s collaborate and bring your vision to life.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                  <p className="text-xs text-[#E4DBC2]/40 mt-1 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Passion badges */}
            <div className="flex flex-wrap gap-2">
              {passions.map((passion) => {
                const Icon = passion.icon;
                return (
                  <motion.span
                    key={passion.label}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#E4DBC2]/60 bg-[#E4DBC2]/5 border border-[#E4DBC2]/10"
                  >
                    <Icon className="w-3 h-3" />
                    {passion.label}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}