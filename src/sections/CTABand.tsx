import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ease } from '../lib/motion';
import { scrollToSection } from '../lib/nav';
import MagneticButton from '../components/MagneticButton';
import TextReveal from '../components/TextReveal';

export default function CTABand() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #E31E24 0%, #B01520 35%, #8B0000 70%, #0A0A0A 100%)' }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="absolute top-16 right-[15%] w-8 h-8 border-2 border-white/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-16 left-[10%] w-5 h-5 bg-white/10 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 left-[5%] w-4 h-4 bg-bulls-red/30 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-[8%] w-3 h-3 border border-white/15 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-48">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="font-display text-xs uppercase tracking-widest2 text-white/50 mb-8"
          >
            Ready to build something great?
          </motion.p>

          <h2
            className="font-display font-bold text-white leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            <TextReveal text="Let's Build Something" delay={0.1} />
            <br />
            <span className="text-white/80">
              <TextReveal text="Unforgettable." delay={0.3} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="font-body text-white/60 text-xl lg:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            From branding to production, from web to workshops — we're your full-service creative partner in Cairo and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton onClick={() => scrollToSection('#contact')}>
              <button
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-bulls-black font-display font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-all duration-300 active:scale-[0.98]"
              >
                Start a Project
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </MagneticButton>
            <MagneticButton>
              <a
                href="mailto:info@bulls-art.com"
                className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-display font-bold text-sm uppercase tracking-widest hover:border-white hover:bg-white/5 transition-all duration-300"
              >
                info@bulls-art.com
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
