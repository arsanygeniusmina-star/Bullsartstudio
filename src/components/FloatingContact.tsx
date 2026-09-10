import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Send, X, ArrowUpRight } from 'lucide-react';

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  const handleScrollToContact = () => {
    setExpanded(false);
    const target = document.querySelector('#contact');
    if (target) {
      const navHeight = 74;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside
      aria-label="Quick Contact & Direct Dispatch"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-bulls-black/95 backdrop-blur-xl border border-bulls-border p-4 shadow-2xl w-64 flex flex-col gap-2.5 rounded-sm"
          >
            <div className="flex items-center justify-between pb-2 border-b border-bulls-border/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <span className="font-mono text-[10px] text-white uppercase tracking-wider">Cairo Studio Live</span>
              </div>
              <span className="font-mono text-[9px] text-bulls-hint">EST. 2016</span>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/201000119905?text=Hello%20Bulls%20Art%20Studio%20Cairo%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 bg-bulls-surface hover:bg-bulls-surface/80 border border-bulls-border hover:border-bulls-red transition-all duration-300 group"
              aria-label="Direct WhatsApp chat with Bulls Art Studio"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-green-500/20 text-green-400 flex items-center justify-center">
                  <MessageSquare size={14} aria-hidden="true" />
                </div>
                <div className="text-left">
                  <span className="block font-display text-xs text-white uppercase tracking-wider">WhatsApp Dispatch</span>
                  <span className="block font-mono text-[10px] text-bulls-hint">01000119905</span>
                </div>
              </div>
              <ArrowUpRight size={13} className="text-bulls-hint group-hover:text-white transition-colors" aria-hidden="true" />
            </a>

            {/* Direct Phone */}
            <a
              href="tel:+201000119905"
              className="flex items-center justify-between p-2.5 bg-bulls-surface hover:bg-bulls-surface/80 border border-bulls-border hover:border-bulls-red transition-all duration-300 group"
              aria-label="Direct Phone call to Bulls Art Studio"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-bulls-red/20 text-bulls-red flex items-center justify-center">
                  <Phone size={14} aria-hidden="true" />
                </div>
                <div className="text-left">
                  <span className="block font-display text-xs text-white uppercase tracking-wider">Direct Studio Line</span>
                  <span className="block font-mono text-[10px] text-bulls-hint">+2 01000 11 99 05</span>
                </div>
              </div>
              <ArrowUpRight size={13} className="text-bulls-hint group-hover:text-white transition-colors" aria-hidden="true" />
            </a>

            {/* Terminal Intake Form */}
            <button
              onClick={handleScrollToContact}
              className="flex items-center justify-between p-2.5 bg-bulls-surface hover:bg-bulls-surface/80 border border-bulls-border hover:border-bulls-red transition-all duration-300 group text-left w-full"
              aria-label="Scroll to project intake terminal"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-white/10 text-white flex items-center justify-center">
                  <Send size={14} aria-hidden="true" />
                </div>
                <div className="text-left">
                  <span className="block font-display text-xs text-white uppercase tracking-wider">Project Intake Form</span>
                  <span className="block font-mono text-[10px] text-bulls-hint">info@bulls-art.com</span>
                </div>
              </div>
              <ArrowUpRight size={13} className="text-bulls-hint group-hover:text-white transition-colors" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Floating Button */}
      <motion.button
        onClick={() => setExpanded((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2.5 px-4 py-3 border shadow-2xl transition-all duration-300 ${
          expanded
            ? 'bg-bulls-black border-bulls-red text-white'
            : 'bg-bulls-red hover:bg-[#ff282e] border-bulls-red text-white shadow-[0_0_24px_rgba(227,30,36,0.4)]'
        }`}
        aria-label={expanded ? 'Close Quick Contact Menu' : 'Open Quick Contact Menu'}
        aria-expanded={expanded}
      >
        <div className="relative">
          {expanded ? (
            <X size={16} aria-hidden="true" />
          ) : (
            <>
              <MessageSquare size={16} aria-hidden="true" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" aria-hidden="true" />
            </>
          )}
        </div>
        <span className="font-display font-semibold text-xs uppercase tracking-widest hidden sm:inline">
          {expanded ? 'Close' : 'Quick Dispatch'}
        </span>
      </motion.button>
    </aside>
  );
}
