'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuAnimating, setIsMobileMenuAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);
  const MOBILE_MENU_ANIM_DURATION = 350;

  /**
   * Measure the navbar's rendered height and update --navbar-height.
   *
   * Uses offsetHeight (unaffected by CSS transforms) + computed `top`
   * (captures the top-4 gap), so the measurement is correct regardless of
   * whether the navbar is visible, hidden, or animating.
   *
   * The CSS variable is consumed by section[id] scroll-margin-top as a
   * fallback for hash-based navigation.
   */
  const measureNavbar = useCallback(() => {
    if (navRef.current) {
      const style = getComputedStyle(navRef.current);
      const topValue = parseFloat(style.top) || 0;
      const navbarHeight = topValue + navRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${navbarHeight}px`,
      );
    }
  }, []);

  // Re-measure on resize / orientation change / layout shifts
  useEffect(() => {
    measureNavbar();

    const handleResize = () => requestAnimationFrame(measureNavbar);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => setTimeout(measureNavbar, 150));

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', () => setTimeout(measureNavbar, 150));
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [measureNavbar]);

  // Scroll-driven: show/hide navbar + detect the active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      setIsScrolled(currentScrollY > 50);

      // Determine which section is currently visible below the navbar
      const sections = navLinks.map(l => l.href.replace('#', ''));
      const navbarHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '0',
      );
      const threshold = navbarHeight + 1;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ───────────────────────────────────────────────
   *  Universal nav click handler
   *
   *  Every navigation link on the site — desktop, mobile, logo — routes
   *  through this function.  It calls the single centralized
   *  scrollToSection() from utils, so there is exactly one source of truth
   *  for scrolling behaviour.
   * ─────────────────────────────────────────────── */
  const handleNavClick = (href: string, fromMobile = false) => {
    if (fromMobile) {
      // 1. Close the mobile menu
      setIsMobileMenuOpen(false);
      setIsMobileMenuAnimating(true);

      // 2. Wait for the close animation to finish, then scroll
      setTimeout(() => {
        setIsMobileMenuAnimating(false);
        // 3. Re-measure navbar height after the menu has fully closed
        measureNavbar();
        // 4. Perform the smooth scroll with the universal function
        scrollToSection(href);
      }, MOBILE_MENU_ANIM_DURATION);
    } else {
      scrollToSection(href);
    }
  };

  const handleMobileToggle = () => {
    if (isMobileMenuAnimating) return;

    if (isMobileMenuOpen) {
      setIsMobileMenuAnimating(true);
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        setIsMobileMenuAnimating(false);
      }, MOBILE_MENU_ANIM_DURATION);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#2A281B]/80 backdrop-blur-xl border border-[#E4DBC2]/10 shadow-2xl shadow-[#691F1F]/10'
            : 'bg-[#2A281B]/40 backdrop-blur-md border border-[#E4DBC2]/5'
        } rounded-full px-3 md:px-6 py-2 md:py-3`}
      >
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="group flex items-center gap-2"
          >
            <div className="w-30 h-8 rounded-lg flex items-center justify-center">
              <img src="/images/Lamak_Noorani_Logo.png" alt="Lamak Noorani" className="w-30 h-full" />
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-1.5 text-xs tracking-widest uppercase rounded-full transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-[#EF7373]'
                    : 'text-[#E4DBC2]/60 hover:text-[#E4DBC2]'
                }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[#EF7373]/10 rounded-full border border-[#EF7373]/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>


          {/* Mobile menu button */}
          <button
            onClick={handleMobileToggle}
            className="lg:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#E4DBC2]" />
              ) : (
                <Menu className="w-5 h-5 text-[#E4DBC2]" />
              )}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-4 right-4 z-40 bg-[#2A281B]/95 backdrop-blur-2xl border border-[#E4DBC2]/10 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href, true)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm tracking-wide transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-[#EF7373] bg-[#EF7373]/10'
                      : 'text-[#E4DBC2]/60 hover:text-[#E4DBC2] hover:bg-[#E4DBC2]/5'
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


