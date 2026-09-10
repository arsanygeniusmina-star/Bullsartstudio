import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 450; // Ultra-fast and snappy loading

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(onComplete, 80);
      }
    };

    const rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[99999] bg-[#060010] flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
      aria-label="Loading Bulls Art Studio"
      role="status"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(227,30,36,0.18) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Laser Scanning Bar */}
      <motion.div
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-[2px] bg-bulls-red shadow-[0_0_20px_#E31E24] opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        {/* Brand Icon */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-16 h-16 mb-6 flex items-center justify-center relative"
        >
          <img
            src="/logo-icon.png"
            alt="BULLS ART STUDIO Logo Emblem"
            className="w-full h-full object-contain drop-shadow-[0_0_16px_rgba(227,30,36,0.7)]"
            width={64}
            height={64}
          />
        </motion.div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6"
        >
          <h2 className="font-display font-bold text-lg sm:text-xl tracking-[0.25em] text-white uppercase">
            Bulls Art Studio
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-bulls-hint block mt-1">
            Cairo, Egypt // Est. 2016
          </span>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full bg-bulls-surface border border-bulls-border/80 h-1.5 rounded-full overflow-hidden p-0.5 relative mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-bulls-red to-[#ff4444] rounded-full shadow-[0_0_10px_rgba(227,30,36,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Telemetry numbers */}
        <div className="flex items-center justify-between w-full font-mono text-[10px] text-bulls-muted tracking-wider">
          <span className="text-bulls-hint">INITIALIZING TERMINAL</span>
          <span className="text-bulls-red font-bold">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
