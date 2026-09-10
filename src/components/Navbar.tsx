import { useState, useEffect, useCallback } from 'react';
import { Menu, X, MessageSquare, Phone, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../lib/motion';
import Logo from './Logo';
import MagneticButton from './MagneticButton';

const navLinks = [
  { label: 'Who We Are', href: '#who-we-are' },
  { label: 'Values', href: '#values' },
  { label: 'Services', href: '#services' },
  { label: 'Selected Work', href: '#gallery' },
  { label: 'Why Branding', href: '#brand-matters' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenAudit?: (tab?: 'seo' | 'eta' | 'perf') => void;
  onNavigate404?: () => void;
}

export default function Navbar({ onOpenAudit, onNavigate404 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#who-we-are');

  // Track scroll position for navbar styling and active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const scrollPos = window.scrollY + 140;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.querySelector(navLinks[i].href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          if (scrollPos >= top) {
            setActiveSection(navLinks[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleNav = useCallback((href: string) => {
    setMenuOpen(false);
    if (href === '#' || href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('#who-we-are');
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 74;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navHeight);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(href);
    }
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bulls-black/95 backdrop-blur-xl border-b border-bulls-border/90 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
            : 'bg-gradient-to-b from-bulls-black/90 to-transparent backdrop-blur-[2px]'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <button
              onClick={() => handleNav('#hero')}
              aria-label="BULLS ART STUDIO — return to top"
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulls-red rounded-sm"
            >
              <Logo size="sm" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-9" role="navigation" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className={`relative font-display text-[11px] uppercase tracking-widest2 py-1 transition-colors duration-200 group focus-visible:outline-none focus-visible:text-white ${
                      isActive ? 'text-white font-bold' : 'text-bulls-muted hover:text-white'
                    }`}
                    aria-label={`Navigate to ${link.label}`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="activeNavTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-bulls-red shadow-[0_0_8px_#E31E24]"
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className="absolute bottom-0 left-0 h-[1.5px] bg-bulls-red/70 transition-all duration-300 w-0 group-hover:w-full"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Quick Actions & WhatsApp */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* WhatsApp Quick Dispatch */}
              <a
                href="https://wa.me/201000119905?text=Hello%20Bulls%20Art%20Studio%20Cairo%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-bulls-surface/90 hover:bg-bulls-surface border border-bulls-border hover:border-green-500/60 text-bulls-muted hover:text-white font-mono text-[11px] tracking-wider transition-all duration-200 rounded-sm group"
                aria-label="Direct WhatsApp message: 01000119905"
                title="Direct WhatsApp: 01000119905"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <MessageSquare size={13} className="text-green-400 group-hover:scale-110 transition-transform" />
                <span className="font-display font-medium text-[11px] uppercase tracking-wider text-white">
                  01000119905
                </span>
              </a>

              {/* System Audit Trigger */}
              {onOpenAudit && (
                <button
                  type="button"
                  onClick={() => onOpenAudit('seo')}
                  className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 bg-bulls-surface/80 hover:bg-bulls-surface border border-bulls-border hover:border-bulls-red text-bulls-muted hover:text-white font-mono text-[10px] tracking-wider uppercase transition-all duration-200 rounded-sm"
                  aria-label="Open System Audit (SEO, ETA, Performance)"
                  title="View live SEO, Production ETA & Performance audit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-bulls-red" />
                  <span>Audit Terminal</span>
                </button>
              )}

              {onNavigate404 && (
                <button
                  type="button"
                  onClick={onNavigate404}
                  className="hidden 2xl:inline-flex items-center gap-1 px-2.5 py-1.5 border border-bulls-border text-bulls-hint hover:text-white text-[10px] font-mono uppercase transition-colors rounded-sm"
                  title="Test custom 404 page"
                >
                  404
                </button>
              )}

              {/* Primary CTA */}
              <div className="hidden lg:block">
                <MagneticButton onClick={() => handleNav('#contact')}>
                  <button
                    className="btn-primary py-2.5 px-5 text-[11px] tracking-widest2"
                    aria-label="Get in touch with BULLS ART STUDIO"
                  >
                    Get in Touch
                  </button>
                </MagneticButton>
              </div>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-bulls-surface border border-bulls-border hover:border-bulls-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulls-red rounded-sm transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-40 bg-bulls-black flex flex-col pt-20 pb-8 px-6 sm:px-8 overflow-y-auto"
          >
            {/* Red Accent Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-gradient" aria-hidden="true" />

            {/* Mobile Nav Links */}
            <nav aria-label="Mobile navigation links" className="flex-1 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, ease }}
                  >
                    <button
                      onClick={() => handleNav(link.href)}
                      className={`w-full text-left font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight py-3.5 border-b border-bulls-border/70 flex items-center justify-between group transition-colors ${
                        isActive ? 'text-bulls-red border-bulls-red' : 'text-white hover:text-bulls-red'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && <span className="w-2 h-2 rounded-full bg-bulls-red" />}
                        <span>{link.label}</span>
                      </span>
                      <span className="font-mono text-xs text-bulls-hint group-hover:text-bulls-red transition-colors">
                        0{i + 1}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </nav>

            {/* Quick Actions in Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, ease }}
              className="mt-6 pt-6 border-t border-bulls-border/80 flex flex-col gap-3"
            >
              {/* WhatsApp Direct Chat */}
              <a
                href="https://wa.me/201000119905?text=Hello%20Bulls%20Art%20Studio%20Cairo%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-bulls-surface border border-green-500/40 hover:border-green-500 text-white rounded-sm transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-green-500/20 text-green-400 flex items-center justify-center">
                    <MessageSquare size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block font-display text-xs uppercase tracking-wider text-white">
                      WhatsApp Quick Chat
                    </span>
                    <span className="block font-mono text-[11px] text-bulls-hint">01000119905</span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-bulls-hint group-hover:text-white" />
              </a>

              {/* Direct Phone Call */}
              <a
                href="tel:+201000119905"
                className="flex items-center justify-between p-3.5 bg-bulls-surface border border-bulls-border hover:border-bulls-red text-white rounded-sm transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-bulls-red/20 text-bulls-red flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <div className="text-left">
                    <span className="block font-display text-xs uppercase tracking-wider text-white">
                      Direct Studio Telephony
                    </span>
                    <span className="block font-mono text-[11px] text-bulls-hint">01000119905</span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-bulls-hint group-hover:text-white" />
              </a>

              {/* Audit Trigger */}
              {onOpenAudit && (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenAudit('seo');
                  }}
                  className="flex items-center justify-between p-3 bg-bulls-surface/60 border border-bulls-border text-bulls-muted hover:text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-bulls-red" />
                    <span>System Audit (SEO · ETA · Perf)</span>
                  </span>
                  <span className="text-bulls-red font-bold font-mono">PASS 100%</span>
                </button>
              )}

              {/* Primary Contact Button */}
              <button
                onClick={() => handleNav('#contact')}
                className="btn-primary w-full justify-center py-3.5 text-xs uppercase tracking-widest2"
              >
                Get in Touch
              </button>

              <div className="flex items-center justify-between pt-2 text-bulls-hint font-mono text-[10px]">
                <span>26 Gesr Elsuez St., Cairo</span>
                <span>info@bulls-art.com</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
