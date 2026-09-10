import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { ease } from '../lib/motion';

const partners: { name: string; logo?: string }[] = [
  { name: 'Arkan', logo: '/partners/arkan.jpg' },
  { name: 'Savills', logo: '/partners/savills.png' },
  { name: 'Aura Consumer Finance', logo: '/partners/aura-consumer-finance.png' },
  { name: 'Waseela', logo: '/partners/waseela.png' },
  { name: 'Orascom Services', logo: '/partners/orascom-services.png' },
  { name: 'Rowad Modern Engineering', logo: '/partners/rowad-modern-engineering.png' },
  { name: 'RMED', logo: '/partners/rmed.png' },
  { name: 'RMEG', logo: '/partners/rmeg.png' },
  { name: 'Troy', logo: '/partners/troy.png' },
  { name: 'Tetra', logo: '/partners/tetra.png' },
  { name: 'Nagy Awad Group', logo: '/partners/nagy-awad-group.png' },
  { name: 'Buildora', logo: '/partners/buildora.png' },
  { name: 'Solid Architects', logo: '/partners/solid-architects.png' },
  { name: 'Renaldi', logo: '/partners/renaldi.png' },
  { name: 'Driller', logo: '/partners/driller.png' },
  { name: 'Trilux', logo: '/partners/trilux.png' },
  { name: 'Nassera Group', logo: '/partners/nassera-group.png' },
  { name: 'Liteway', logo: '/partners/liteway.png' },
  { name: 'Orchid Group', logo: '/partners/orchid-group.png' },
  { name: 'Dawn Industries', logo: '/partners/dawn-industries.png' },
  { name: 'Oxin', logo: '/partners/oxin.png' },
  { name: 'Italco', logo: '/partners/italco.png' },
  { name: 'Teba United', logo: '/partners/teba-united.png' },
  { name: 'Goodies Egypt', logo: '/partners/goodies-egypt.png' },
  { name: 'Friends', logo: '/partners/friends.png' },
  { name: 'SeaTrade', logo: '/partners/seatrade.png' },
  { name: 'Agricultural Investment & Development', logo: '/partners/agricultural-investment-development.png' },
  { name: 'First Cairo', logo: '/partners/first-cairo.png' },
  { name: 'Core', logo: '/partners/core.png' },
  { name: 'Studygram', logo: '/partners/studygram.png' },
  { name: 'Aqua Solutions', logo: '/partners/aqua-solutions.png' },
];

function PartnerCard({ name, logo }: { name: string; logo?: string }) {
  return (
    <div className="group flex-shrink-0 w-48 h-24 mx-2 bg-bulls-black border border-bulls-border flex items-center justify-center hover:border-bulls-red transition-all duration-500 cursor-default overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: 'radial-gradient(ellipse 150% 100% at 50% 100%, rgba(227,30,36,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {logo ? (
        <div className="relative z-10 bg-white rounded-md w-[85%] h-[70%] flex items-center justify-center px-4 py-2">
          <img
            src={logo}
            alt={name}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>
      ) : (
        <span className="font-display font-bold text-sm text-bulls-muted group-hover:text-white transition-colors duration-500 uppercase tracking-wide text-center px-4 leading-tight relative z-10">
          {name}
        </span>
      )}
    </div>
  );
}

function ShowreelPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      setHasStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer group/player"
      style={{ aspectRatio: '16/9' }}
      onClick={togglePlay}
      role="button"
      aria-label={playing ? 'Pause showreel' : 'Play showreel'}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePlay(); } }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/partners-showreel.mp4"
        className="w-full h-full object-cover"
        muted
        playsInline
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Red corner accent lines */}
      <span className="absolute top-0 left-0 w-8 h-px bg-bulls-red" aria-hidden="true" />
      <span className="absolute top-0 left-0 w-px h-8 bg-bulls-red" aria-hidden="true" />
      <span className="absolute top-0 right-0 w-8 h-px bg-bulls-red" aria-hidden="true" />
      <span className="absolute top-0 right-0 w-px h-8 bg-bulls-red" aria-hidden="true" />
      <span className="absolute bottom-0 left-0 w-8 h-px bg-bulls-red" aria-hidden="true" />
      <span className="absolute bottom-0 left-0 w-px h-8 bg-bulls-red" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 w-8 h-px bg-bulls-red" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 w-px h-8 bg-bulls-red" aria-hidden="true" />

      {/* Dark overlay — lighter when playing so video is vivid */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: playing
            ? 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)'
            : 'rgba(0,0,0,0.55)',
        }}
        aria-hidden="true"
      />

      {/* Red vignette glow at edges — always present, subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 60px rgba(227,30,36,0.12)',
        }}
        aria-hidden="true"
      />

      {/* Center play/pause button */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-opacity duration-300
          ${playing ? 'opacity-0 group-hover/player:opacity-100' : 'opacity-100'}
        `}
        aria-hidden="true"
      >
        <div
          className="relative flex items-center justify-center w-20 h-20 rounded-full border border-bulls-red/60 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover/player:scale-110 group-hover/player:bg-black/60"
          style={{ boxShadow: '0 0 32px rgba(227,30,36,0.4), inset 0 0 20px rgba(227,30,36,0.08)' }}
        >
          {/* Pulsing ring — only when not yet started */}
          {!hasStarted && (
            <span
              className="absolute inset-0 rounded-full border border-bulls-red/30 animate-ping"
              aria-hidden="true"
            />
          )}
          {playing
            ? <Pause size={28} className="text-white fill-white ml-0" />
            : <Play size={28} className="text-white fill-white ml-1" />
          }
        </div>
      </div>

      {/* Bottom bar: label + mute toggle */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4
          transition-all duration-500
          ${playing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover/player:opacity-100 group-hover/player:translate-y-0'}
        `}
        aria-hidden="true"
      >
        <span className="font-display text-xs text-white/70 uppercase tracking-widest2">
          Partner Showreel
        </span>
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 text-white/60 hover:text-bulls-red transition-colors duration-300 text-xs font-display uppercase tracking-widest"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>

      {/* Scanline texture overlay — barely visible, adds cinematic texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
          backgroundSize: '100% 3px',
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function Partners() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="partners"
      ref={ref}
      className="relative bg-bulls-black overflow-hidden"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bulls-red/30 to-transparent" aria-hidden="true" />

      {/* ── HEADER + SHOWREEL ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left: headline copy */}
          <div className="lg:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-bulls-red" aria-hidden="true" />
              <span className="section-title">Partners</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="display-heading text-4xl lg:text-6xl xl:text-7xl leading-[0.95] mb-8"
            >
              40+ Prestigious
              <br />
              <span className="text-gradient-red">Partners</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="font-body text-bulls-muted text-xl lg:text-2xl leading-relaxed mb-10"
            >
              Trusted by leading companies across real estate, engineering, finance, food&nbsp;&amp;&nbsp;beverage, and more.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.26, ease }}
              className="flex flex-wrap gap-4"
            >
              {[
                { value: '40+', label: 'Active Partners' },
                { value: '9', label: 'Sectors' },
                { value: '9+', label: 'Years Trusted' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 border border-bulls-border px-5 py-3 bg-bulls-surface/50"
                >
                  <span className="font-display font-bold text-xl text-bulls-red">{s.value}</span>
                  <span className="font-body text-bulls-hint text-xs uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: video showreel */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative"
          >
            {/* Decorative red dot grid behind video */}
            <div
              className="absolute -top-4 -right-4 grid grid-cols-5 gap-[6px] opacity-20 pointer-events-none"
              aria-hidden="true"
            >
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`w-[5px] h-[5px] ${i % 3 === 0 ? 'bg-bulls-red' : 'bg-white/30'}`} />
              ))}
            </div>

            {/* Label above */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-bulls-red animate-pulse flex-shrink-0" aria-hidden="true" />
              <span className="font-display text-bulls-hint text-xs uppercase tracking-widest2">
                Partners Showreel
              </span>
            </div>

            {/* The player */}
            <div className="border border-bulls-border relative" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(227,30,36,0.12)' }}>
              <ShowreelPlayer />
            </div>

            {/* Caption below */}
            <p className="mt-4 font-body text-bulls-hint text-xs leading-relaxed">
              A snapshot of the brands we've partnered with — spanning real estate, engineering, FMCG, and beyond.
            </p>
          </motion.div>

        </div>
      </div>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative bg-bulls-surface/30 border-y border-bulls-border py-8"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-bulls-black to-transparent" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-bulls-black to-transparent" aria-hidden="true" />

        {/* Row 1 — forward */}
        <div className="flex overflow-hidden mb-1">
          <div
            className="flex animate-marquee will-change-transform"
            style={{ animationPlayState: inView ? 'running' : 'paused' }}
          >
            {partners.map((p, i) => (
              <PartnerCard key={`a-${i}`} name={p.name} logo={p.logo} />
            ))}
          </div>
          <div
            className="flex animate-marquee2 will-change-transform"
            style={{ animationPlayState: inView ? 'running' : 'paused' }}
            aria-hidden="true"
          >
            {partners.map((p, i) => (
              <PartnerCard key={`b-${i}`} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>

        {/* Row 2 — reverse */}
        <div className="flex overflow-hidden mt-1">
          <div
            className="flex will-change-transform"
            style={{
              animation: 'marquee 40s linear infinite reverse',
              animationPlayState: inView ? 'running' : 'paused',
            }}
          >
            {[...partners].reverse().map((p, i) => (
              <PartnerCard key={`c-${i}`} name={p.name} logo={p.logo} />
            ))}
          </div>
          <div
            className="flex will-change-transform"
            style={{
              animation: 'marquee2 40s linear infinite reverse',
              animationPlayState: inView ? 'running' : 'paused',
            }}
            aria-hidden="true"
          >
            {[...partners].reverse().map((p, i) => (
              <PartnerCard key={`d-${i}`} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
