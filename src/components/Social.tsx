'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const InstagramIcon = () => (
  <img src="/images/insta.svg" alt="Instagram" className="w-full h-full object-cover rounded-lg" />
);

const EmailIcon = () => (
  <img src="/images/gmail.svg" alt="Email" className="w-full h-full object-cover rounded-lg" />
);

const WhatsAppIcon = () => (
  <img src="/images/whatsapp.svg" alt="WhatsApp" className="w-full h-full object-cover rounded-lg" />
);

const socialLinks = [
  {
    name: 'Instagram',
    icon: InstagramIcon,
    handle: '@_.lamaknoorani',
    url: 'https://www.instagram.com/_.lamaknoorani',
    color: '#EF7373',
    glowColor: 'rgba(239, 115, 115, 0.5)',
    gradient: 'from-[#EF7373] via-[#BECAF1] to-[#E4DBC2]',
  },
  {
    name: 'Email',
    icon: EmailIcon,
    handle: 'lamaknoorani@gmail.com',
    url: 'mailto:lamaknoorani@gmail.com',
    color: '#BECAF1',
    glowColor: 'rgba(190, 202, 241, 0.5)',
    gradient: 'from-[#BECAF1] via-[#E4DBC2] to-[#EF7373]',
  },
  {
    name: 'WhatsApp',
    icon: WhatsAppIcon,
    handle: '+92 300 2623094',
    url: 'https://wa.me/923002623094',
    color: '#008000',
    glowColor: '#5bb450',
    gradient: 'from-[#008000] via-[#FFFFFF] to-[#5bb450]',
  },
];

export default function Social() {
  return (
    <section id="social" className="relative py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-[#2E2E46]">
      
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] text-[#EF7373] uppercase mb-4">Connect</p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#E4DBC2]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Find Me
            <br />
            <span className="text-[#E4DBC2]">Online</span>
          </h2>
        </motion.div>

        {/* Social Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl p-8 md:p-10 bg-[#2A281B]/50 backdrop-blur-sm border border-[#E4DBC2]/10 hover:border-[#E4DBC2]/30 transition-all duration-500 flex flex-col items-center text-center"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${social.glowColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: social.color }}
                      initial={{ opacity: 0, x: '50%', y: '50%' }}
                      whileInView={{
                        opacity: [0, 0.6, 0],
                        x: `${50 + (i - 1) * 30}%`,
                        y: `${20 + i * 10}%`,
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                      }}
                    />
                  ))}
                </div>

                <div className="relative flex flex-col items-center">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center border backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${social.color}30, transparent)`,
                      borderColor: `${social.color}40`,
                    }}
                  >
                    <div style={{ color: social.color }}>
                      <Icon />
                    </div>
                  </motion.div>

                  {/* Platform name */}
                  <h3
                    className="text-2xl font-bold text-[#E4DBC2] mb-1"
                    style={{ fontFamily: 'Barlow, sans-serif' }}
                  >
                    {social.name}
                  </h3>

                  {/* Handle */}
                  <p className="text-sm text-[#E4DBC2]/50 mb-6 font-mono tracking-wide">{social.handle}</p>

                  {/* Connect button */}
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold">
                    <motion.span
                      className="inline-block"
                      style={{ color: social.color }}
                      initial={{ opacity: 0.4 }}
                      whileHover={{ opacity: 1 }}
                    >
                      Connect
                    </motion.span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" style={{ color: social.color }} />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom shine line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${social.color}, transparent)`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                />
              </motion.a>
            );
          })}
        </div>

        {/* Bold CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <motion.h3
            className="text-3xl md:text-5xl lg:text-6xl font-black text-[#E4DBC2] mb-6"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Let's Create Something
            <br />
            <span className="text-[#E4DBC2]">
              Amazing Together
            </span>
          </motion.h3>
          <motion.a target="_blank"
            href="https://www.instagram.com/_.lamaknoorani"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#EF7373] text-[#2A281B] font-bold rounded-full text-sm tracking-widest uppercase"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}