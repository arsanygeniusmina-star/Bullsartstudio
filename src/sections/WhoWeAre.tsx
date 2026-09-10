import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from '../lib/motion';
import TextReveal from '../components/TextReveal';

function StatBlock({ value, suffix, label, sublabel, started, delay }: {
  value: number; suffix: string; label: string; sublabel: string; started: boolean; delay: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let rafId: number;
    const duration = 1600;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeVal = 1 - Math.pow(1 - progress, 3);
      if (spanRef.current) {
        spanRef.current.textContent = `${Math.round(easeVal * value)}`;
      }
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [value, started]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
      className="relative group"
    >
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 120%, rgba(227,30,36,0.12) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative p-6 lg:p-8">
          <div className="flex items-baseline gap-1 mb-2">
            <span
              ref={spanRef}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', lineHeight: 0.85 }}
            >
              0
            </span>
            <span
              className="font-display font-bold text-bulls-red"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 0.85 }}
            >
              {suffix}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-4 h-px bg-bulls-red" aria-hidden="true" />
            <span className="font-display text-white text-xs uppercase tracking-widest2">{label}</span>
          </div>
          <span className="block font-body text-bulls-hint text-xs mt-2 uppercase tracking-wider">{sublabel}</span>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-bulls-border group-hover:bg-bulls-red transition-colors duration-500"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

const stats = [
  { value: 9, suffix: '+', label: 'Years Experience', sublabel: 'Operating Since 2016' },
  { value: 40, suffix: '+', label: 'Valued Partners', sublabel: 'Across Diverse Industries' },
  { value: 9, suffix: '', label: 'Specialized Fields', sublabel: 'Complete Agency Services' },
  { value: 100, suffix: '%', label: 'Quality & Service', sublabel: 'Uncompromising Standard' },
];

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="relative bg-bulls-bg overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg-subtle pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="px-6 lg:px-8 pt-24 lg:pt-36 pb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-bulls-red" aria-hidden="true" />
            <span className="section-title">Who We Are</span>
          </div>
          <h2 className="display-heading text-4xl lg:text-6xl xl:text-7xl leading-[0.95] max-w-3xl">
            <TextReveal text="A Clear Goal" delay={0.1} />
            <br />
            <TextReveal text="Since Day One" highlightWord="One" delay={0.25} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-bulls-border">
          {stats.map((stat, i) => (
            <StatBlock
              key={stat.label}
              {...stat}
              started={inView}
              delay={0.15 + i * 0.08}
            />
          ))}
        </div>

        <div className="px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5, ease }}
                className="font-body text-bulls-muted text-lg lg:text-xl leading-relaxed mb-6"
              >
                Founded in 2016, we established a clear and definitive goal:{' '}
                <span className="text-white font-medium">to never compromise on quality or service.</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6, ease }}
                className="font-body text-bulls-muted text-lg lg:text-xl leading-relaxed"
              >
                From the very beginning, we possessed a deep understanding of the market, which informed our vision for success. Over the past nine years, we have collaborated with prestigious companies across various sectors, helping them thrive.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="bg-bulls-surface border border-bulls-border p-8 lg:p-10 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: 'radial-gradient(circle at 100% 0%, rgba(227,30,36,0.08) 0%, transparent 50%)' }}
                aria-hidden="true"
              />
              <blockquote className="relative">
                <p className="font-display text-white text-xl lg:text-2xl leading-relaxed mb-6">
                  "As our clients grew, so did our expertise and ambitions — demonstrating that our unique blend of experience and passion is the key to sustainable success."
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-px bg-bulls-red" aria-hidden="true" />
                  <div>
                    <cite className="font-display text-white text-sm uppercase tracking-widest not-italic">BULLS ART STUDIO</cite>
                    <p className="font-body text-bulls-hint text-xs mt-0.5">Creative Agency Since 2016</p>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
