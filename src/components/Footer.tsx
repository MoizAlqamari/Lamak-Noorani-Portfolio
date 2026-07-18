'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { ArrowUp, MessageCircle, Mail, MapPin, Heart } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Social', href: '#social' },
  { name: 'FAQ', href: '#faq' },
];

const socialIcons = [
  { label: 'Instagram', href: 'https://instagram.com/_.lamaknoorani', icon: FaInstagram },
  { label: 'WhatsApp', href: 'https://wa.me/923002623094', icon: FaWhatsapp },
  { label: 'Email', href: 'mailto:lamaknoorani@gmail.com', icon: Mail },
];

export default function Footer() {
  const scrollToTop = () => {
    scrollToSection('#hero');
  };

  return (
    <footer id="footer" className="relative py-20 md:py-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-[#2E2E46]">
      

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <img src="/images/Lamak_Noorani_Logo.png" alt="Lamak Noorani Logo" className="w-65 h-20 mb-4" />
            <p className="text-sm text-[#E4DBC2]/40 leading-relaxed max-w-xs">
              Capturing cinematic stories through the lens, transforming moments into timeless visual narratives.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xs uppercase tracking-[0.3em] text-[#EF7373] mb-6">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-[#E4DBC2]/50 hover:text-[#E4DBC2] transition-colors duration-300 text-left"
                  >
                    {link.name}
                   </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xs uppercase tracking-[0.3em] text-[#EF7373] mb-6">Connect</h3>
            <div className="space-y-4 mb-6">
              <a href="https://instagram.com/_.lamaknoorani" target="_blank" className="flex items-center gap-3 text-sm text-[#E4DBC2]/50 hover:text-[#E4DBC2] transition-colors">
                <FaInstagram className="w-4 h-4 text-[#EF7373]" />
                @_.lamaknoorani
              </a>
              <a href="mailto:lamaknoorani@gmail.com" target="_blank" className="flex items-center gap-3 text-sm text-[#E4DBC2]/50 hover:text-[#E4DBC2] transition-colors">
                <Mail className="w-4 h-4 text-[#EF7373]" />
                lamaknoorani@gmail.com
              </a>
              <a href="https://wa.me/923002623094" target="_blank" className="flex items-center gap-3 text-sm text-[#E4DBC2]/50 hover:text-[#E4DBC2] transition-colors">
                <MessageCircle className="w-4 h-4 text-[#EF7373]" />
                +92 300 2623094
              </a>
              <div className="flex items-center gap-3 text-sm text-[#E4DBC2]/50">
                <MapPin className="w-4 h-4 text-[#EF7373]" />
                Pakistan
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialIcons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-[#E4DBC2]/5 border border-[#E4DBC2]/10 flex items-center justify-center text-[#E4DBC2]/50 hover:text-[#EF7373] hover:border-[#EF7373]/30 transition-all duration-300"
                    aria-label={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-[1px] bg-[#EF7373]/30 mb-8"
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-[#E4DBC2]/30 flex items-center gap-1">
            © {new Date().getFullYear()} Lamak Noorani Films & Studios. Crafted with
            <Heart className="w-3 h-3 text-[#EF7373] fill-[#EF7373]" />
            in Pakistan.
          </p>
          
          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#E4DBC2]/5 border border-[#E4DBC2]/10 text-xs text-[#E4DBC2]/50 hover:text-[#EF7373] hover:border-[#EF7373]/30 transition-all"
          >
            <span>Back to top</span>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp className="w-3 h-3" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
