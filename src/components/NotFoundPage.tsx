import { motion } from 'framer-motion';
import { ArrowLeft, Home, Compass, Phone, Sparkles, Mail } from 'lucide-react';
import Logo from './Logo';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export default function NotFoundPage({ onGoHome }: NotFoundPageProps) {
  return (
    <main
      id="main-content"
      role="main"
      aria-label="404 Page Not Found"
      className="min-h-screen bg-bulls-black text-white flex flex-col justify-between relative overflow-hidden selection:bg-bulls-red/30 selection:text-white"
    >
      {/* Background cybernetic grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(227,30,36,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 py-8 flex items-center justify-between border-b border-bulls-border/60">
        <button
          onClick={onGoHome}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulls-red"
          aria-label="Return to Bulls Art Studio home"
        >
          <Logo size="sm" />
        </button>

        <div className="flex items-center gap-2 font-mono text-[11px] text-bulls-hint uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-bulls-red animate-ping" aria-hidden="true" />
          <span>STATUS // 404 DISCONNECTED</span>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="relative z-10 max-w-4xl mx-auto w-full px-6 lg:px-8 py-16 text-center flex-1 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-bulls-red/40 bg-bulls-red/10 text-bulls-red font-mono text-xs uppercase tracking-widest2 mb-8"
        >
          <Compass size={14} className="animate-spin" style={{ animationDuration: '6s' }} aria-hidden="true" />
          <span>DIAGNOSTIC FAULT // VECTOR OUT OF BOUNDS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display-heading text-6xl sm:text-8xl lg:text-9xl tracking-tighter mb-4 text-white"
        >
          4<span className="text-gradient-red">0</span>4
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase tracking-widest text-lg sm:text-xl text-bulls-muted max-w-xl mx-auto mb-6"
        >
          The coordinate you navigated to does not exist in our Cairo studio directory.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-bulls-hint text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed"
        >
          The brand asset, campaign file, or direct URL may have been re-indexed, archived, or temporarily relocated during studio updates.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onGoHome}
            className="btn-primary group"
            aria-label="Return to homepage"
          >
            <Home size={15} aria-hidden="true" />
            <span>Return to Studio Home</span>
            <ArrowLeft size={15} className="rotate-180 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>

          <button
            onClick={() => {
              onGoHome();
              setTimeout(() => {
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="btn-ghost"
            aria-label="View 9 service lines"
          >
            <Sparkles size={15} className="text-bulls-red" aria-hidden="true" />
            <span>Explore 9 Services</span>
          </button>
        </motion.div>

        {/* Quick Directory Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left"
        >
          <div
            onClick={() => {
              onGoHome();
              setTimeout(() => {
                document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="p-4 bg-bulls-surface border border-bulls-border hover:border-bulls-red transition-colors cursor-pointer group"
          >
            <span className="font-mono text-[10px] text-bulls-red tracking-widest block mb-1">01 // ARCHIVE</span>
            <h3 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-bulls-red transition-colors">Portfolio Gallery</h3>
            <p className="font-body text-xs text-bulls-hint mt-1">Inspect 22 completed projects across Cairo.</p>
          </div>

          <div
            onClick={() => {
              onGoHome();
              setTimeout(() => {
                document.querySelector('#brand-matters')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="p-4 bg-bulls-surface border border-bulls-border hover:border-bulls-red transition-colors cursor-pointer group"
          >
            <span className="font-mono text-[10px] text-bulls-red tracking-widest block mb-1">02 // CLIENTS</span>
            <h3 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-bulls-red transition-colors">40+ Partners</h3>
            <p className="font-body text-xs text-bulls-hint mt-1">Savills, Orascom, Arkan & top enterprise brands.</p>
          </div>

          <div
            onClick={() => {
              onGoHome();
              setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="p-4 bg-bulls-surface border border-bulls-border hover:border-bulls-red transition-colors cursor-pointer group"
          >
            <span className="font-mono text-[10px] text-bulls-red tracking-widest block mb-1">03 // DISPATCH</span>
            <h3 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-bulls-red transition-colors">Direct Terminal</h3>
            <p className="font-body text-xs text-bulls-hint mt-1">Transmit project specs to info@bulls-art.com.</p>
          </div>
        </motion.div>
      </section>

      {/* Bottom Emergency Help Bar */}
      <footer className="relative z-10 border-t border-bulls-border/60 bg-bulls-surface/30 px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-bulls-hint">
          <span>BULLS ART STUDIO — 26 GESR EL SUEZ ST., CAIRO, EGYPT</span>
          <div className="flex items-center gap-6">
            <a href="tel:+201000119905" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} className="text-bulls-red" aria-hidden="true" />
              <span>01000119905</span>
            </a>
            <a href="mailto:info@bulls-art.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} className="text-bulls-red" aria-hidden="true" />
              <span>info@bulls-art.com</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
