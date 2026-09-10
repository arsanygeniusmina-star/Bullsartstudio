import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Eye, Handshake } from 'lucide-react';
import { ease } from '../lib/motion';

const values = [
  {
    icon: Flame,
    title: 'Precision & Execution',
    body: 'Nine years of enterprise production discipline. Engineered outputs with zero tolerance for compromised standards or loose tolerances.',
    detail: 'Definitive manufacturing standards across physical installations and digital brand systems.',
  },
  {
    icon: Eye,
    title: 'Institutional Transparency',
    body: 'Unambiguous contractual clarity, accurate industrial lead times, and predictable project milestones from prototype to final signoff.',
    detail: 'Complete material specification traceability and accountable delivery timelines.',
  },
  {
    icon: Handshake,
    title: 'Commercial Value Creation',
    body: 'Aligning creative assets directly with market valuation, corporate positioning, and executive brand authority across regional markets.',
    detail: 'Every asset engineered to compound long-term corporate enterprise equity.',
  },
];

export default function Values() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="values"
      ref={ref}
      className="relative bg-bulls-black overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bulls-red/40 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-bulls-red" aria-hidden="true" />
              <span className="section-title">Operating Principles</span>
            </div>
            <h2 className="display-heading text-4xl lg:text-6xl xl:text-7xl leading-[0.95] mb-8">
              Execution Over
              <br />
              <span className="text-gradient-red">Superficial Claims</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-body text-bulls-muted text-lg lg:text-xl leading-relaxed lg:pt-16"
          >
            Definitive production standards, institutional transparency, and measurable commercial equity for enterprise partners and corporate leadership.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-bulls-border">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease }}
                className="group relative bg-bulls-black p-10 lg:p-12 min-h-[420px] flex flex-col"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: 'radial-gradient(ellipse 150% 100% at 50% 0%, rgba(227,30,36,0.08) 0%, transparent 60%)' }}
                  aria-hidden="true"
                />

                <div className="relative flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 flex items-center justify-center border-2 border-bulls-border group-hover:border-bulls-red transition-colors duration-500">
                      <Icon size={26} className="text-bulls-red" />
                    </div>
                    <span className="font-display text-6xl lg:text-7xl font-bold text-bulls-surface group-hover:text-bulls-elevated transition-colors duration-500">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="w-12 h-px bg-bulls-border mb-8 group-hover:bg-bulls-red transition-colors duration-500" aria-hidden="true" />

                  <h3 className="font-display font-bold text-white text-2xl lg:text-3xl uppercase tracking-tight leading-tight mb-6">
                    {v.title}
                  </h3>
                  <p className="font-body text-bulls-muted leading-relaxed mb-6">
                    {v.body}
                  </p>

                  <div className="mt-auto pt-6 border-t border-bulls-border group-hover:border-bulls-red/40 transition-colors duration-500">
                    <p className="font-display text-sm text-bulls-hint italic">
                      "{v.detail}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
