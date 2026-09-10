import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToSection } from '../lib/nav';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => scrollToSection('#hero')}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2 }}
          aria-label="Scroll back to top"
          title="Back to Top"
          className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-bulls-surface/90 hover:bg-bulls-red border border-bulls-border hover:border-bulls-red text-bulls-muted hover:text-white flex items-center justify-center shadow-2xl backdrop-blur-md rounded-sm transition-colors duration-200 group"
        >
          <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
