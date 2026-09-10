import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ease } from '../lib/motion';
import { scrollToSection } from '../lib/nav';
import MagneticButton from '../components/MagneticButton';

const points = [
  { label: 'Intellectual Equity', desc: 'Secure enduring commercial value with trademarked, distinctive corporate identity.' },
  { label: 'Market Authority', desc: 'Command industry leadership and stakeholder trust through disciplined visual standards.' },
  { label: 'Strategic Alignment', desc: 'Communicate corporate purpose and strategic differentiation with absolute clarity.' },
  { label: 'Defensible Positioning', desc: 'Stand out distinctly in competitive tender environments and client pitches.' },
  { label: 'Cross-Touchpoint Integrity', desc: 'Ensure flawless cohesion from executive collateral to architectural installations.' },
  { label: 'Scalable Architecture', desc: 'Deploy visual assets seamlessly across global media, physical events, and retail.' },
];

export default function BrandMatters() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="brand-matters"
      ref={ref}
      className="relative bg-bulls-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
              <span className="font-display text-xs uppercase tracking-widest text-bulls-red font-semibold">Strategic Value</span>
              <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-6"
            >
              Brand Architecture as <span className="text-bulls-red">Corporate Capital</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="font-body text-bulls-muted text-base lg:text-lg leading-relaxed mb-8"
            >
              For established corporations and high-growth ventures, brand identity is more than aesthetics. It directly impacts market valuation, customer loyalty, and executive pricing power.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="flex items-center gap-4"
            >
              <MagneticButton onClick={() => scrollToSection('#contact')}>
                <button
                  className="btn-primary group"
                  aria-label="Consult On Brand Strategy"
                >
                  Consult On Brand Strategy
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {points.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease }}
                className="bg-bulls-surface p-6 border border-bulls-border hover:border-bulls-red/50 transition-colors rounded-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 bg-bulls-red rounded-full" />
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide">{p.label}</h3>
                  </div>
                  <p className="font-body text-bulls-muted text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
