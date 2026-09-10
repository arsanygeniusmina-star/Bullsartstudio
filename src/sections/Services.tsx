import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  X, Palette, PenTool, BarChart2, Printer, Globe,
  Camera, Gift, Package, Wrench, ArrowRight, Play, Pause,
  ChevronLeft, ChevronRight, LayoutGrid, Box,
} from 'lucide-react';
import { ease } from '../lib/motion';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  desc: string;
  bullets: string[];
  relatedIds: string[];
  energy: number;
}

const services: Service[] = [
  {
    id: 'branding',
    icon: Palette,
    title: 'Branding',
    tagline: 'Build authority. Command recognition.',
    desc: 'A brand name and logo are at the center of any successful company. They empower your marketing and advertising with a strong identity.',
    bullets: ['Legal protection for your innovations', 'Build lasting business authority', 'Convey your message through your brand logo', 'Create a memorable identity with an innovative logo'],
    relatedIds: ['graphic-design', 'marketing', 'packaging'],
    energy: 100,
  },
  {
    id: 'graphic-design',
    icon: PenTool,
    title: 'Graphic Design',
    tagline: 'A picture is worth a thousand words.',
    desc: 'Modern and innovative graphic designs that attract customers and provide your business with unique visibility across every channel.',
    bullets: ['Logo & stationery design', 'Web & UX design', 'Brochures, labels & packaging', 'Magazines, newsletters & catalogues', 'Advertising & book design'],
    relatedIds: ['branding', 'printing', 'packaging'],
    energy: 95,
  },
  {
    id: 'marketing',
    icon: BarChart2,
    title: 'Marketing',
    tagline: 'Storytelling with strategy.',
    desc: "Marketing is more than promotion — it's storytelling with strategy. We craft campaigns connecting creativity with measurable impact.",
    bullets: ['Content strategy & branding', 'Creative production', 'Community growth & management', 'Paid media & analytics', 'Social media marketing'],
    relatedIds: ['branding', 'web-design', 'media'],
    energy: 88,
  },
  {
    id: 'printing',
    icon: Printer,
    title: 'Printing Service',
    tagline: 'Every surface is a canvas.',
    desc: 'Comprehensive printing services covering every medium and technique, from traditional offset to cutting-edge 3D and laser engraving.',
    bullets: ['Offset, digital, indoor & outdoor printing', 'UV, 3D, silkscreen & transfer printing', 'Thermal, laser engraving & DTF', 'Business cards, catalogs & brochures', 'Banners, rollups, bags & uniforms'],
    relatedIds: ['graphic-design', 'packaging', 'gifts'],
    energy: 97,
  },
  {
    id: 'web-design',
    icon: Globe,
    title: 'Web Design',
    tagline: 'Your brand, live 24/7.',
    desc: 'High-quality digital presence that professionally showcases your brand, building credibility and engaging customers across every device.',
    bullets: ['Websites & web applications', 'Mobile applications', 'E-commerce platforms', 'SEO optimization'],
    relatedIds: ['marketing', 'branding', 'graphic-design'],
    energy: 82,
  },
  {
    id: 'media',
    icon: Camera,
    title: 'Media Coverage',
    tagline: 'Visual storytelling that resonates.',
    desc: 'Photography and videography that bring your products, services, and story to life — building credibility and engaging customers personally.',
    bullets: ['Events & ceremonies', 'Product & promo shoots', 'Landscape & project sites', 'Fashion & food photography', 'Corporate videography'],
    relatedIds: ['marketing', 'branding'],
    energy: 78,
  },
  {
    id: 'gifts',
    icon: Gift,
    title: 'Corporate Gifts',
    tagline: 'Who could forget a gift?',
    desc: 'Giveaways are a powerful way to boost brand recognition and loyalty. Promotional items that keep your brand top of mind beyond standard marketing.',
    bullets: ['Corporate sets & branded pens', 'Custom blocknotes & agendas', 'T-shirts & branded apparel', 'Summer giveaway campaigns', 'Fully customized branded products'],
    relatedIds: ['printing', 'packaging', 'workshop'],
    energy: 75,
  },
  {
    id: 'packaging',
    icon: Package,
    title: 'Packaging',
    tagline: 'First impressions that last.',
    desc: "Packaging is often a customer's first physical interaction with your product, making it a critical component of the customer experience.",
    bullets: ['Paper packaging solutions', 'Carton packaging design', 'Plastic packaging options', 'Communicates quality & protects product', 'Reinforces brand message'],
    relatedIds: ['printing', 'graphic-design', 'branding'],
    energy: 85,
  },
  {
    id: 'workshop',
    icon: Wrench,
    title: 'Production Workshop',
    tagline: 'From concept to reality.',
    desc: 'Our dedicated production workshop specializes in custom projects, unique installations, and high-quality fabrications — transforming creative concepts into physical reality.',
    bullets: ['Exhibition booths & facades', 'Display stands & commercial signs', 'Internal & wall branding', 'Customized giveaways fabrication', 'Quality-controlled production'],
    relatedIds: ['gifts', 'printing', 'branding'],
    energy: 80,
  },
];

// ── Modal (unchanged from original) ───────────────────────────────────────────
function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-bulls-black/95 backdrop-blur-md" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 32 }}
        transition={{ duration: 0.4, ease }}
        className="relative w-full max-w-2xl bg-bulls-surface border border-bulls-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={service.title}
      >
        <div className="h-1 bg-red-gradient" />

        <div className="p-10 lg:p-12">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 flex items-center justify-center border-2 border-bulls-red bg-bulls-red/10">
                <Icon size={28} className="text-bulls-red" />
              </div>
              <div>
                <p className="font-display text-xs uppercase tracking-widest text-bulls-hint mb-1">Service</p>
                <h3 className="font-display font-bold text-white text-2xl uppercase tracking-tight">{service.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-bulls-hint hover:text-white hover:bg-bulls-elevated transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          <p className="font-display text-bulls-red text-lg italic mb-6">"{service.tagline}"</p>
          <p className="font-body text-bulls-muted text-lg leading-relaxed mb-8">{service.desc}</p>

          <div className="grid sm:grid-cols-2 gap-3">
            {service.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-bulls-elevated/50">
                <span className="w-1.5 h-1.5 bg-bulls-red mt-2 flex-shrink-0" />
                <span className="font-body text-sm text-bulls-muted">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-bulls-border flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { onClose(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-primary flex-1 justify-center"
            >
              Start This Project
              <ArrowRight size={16} />
            </button>
            <button onClick={onClose} className="btn-ghost flex-1 justify-center">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Dramatic 3D Square Orbit Timeline ──────────────────────────────────────────
function Square3DOrbit({
  services,
  onSelect,
}: {
  services: Service[];
  onSelect: (s: Service) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const nodeElsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const laserLineRef = useRef<SVGLineElement>(null);

  const [selectedId, setSelectedId] = useState<string>(services[0].id);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileMode, setMobileMode] = useState<'orbit' | 'grid'>('orbit');

  // Screen-responsive dimensions state for real-time visual adaptation
  const [dims, setDims] = useState(() => {
    if (typeof window === 'undefined') return { halfW: 260, halfH: 130, isMobile: false, isTablet: false };
    const w = window.innerWidth;
    if (w < 640) return { halfW: 100, halfH: 70, isMobile: true, isTablet: false };
    if (w < 1024) return { halfW: 180, halfH: 105, isMobile: false, isTablet: true };
    return { halfW: 260, halfH: 130, isMobile: false, isTablet: false };
  });

  // Animation values stored in refs for zero-overhead 60fps rendering
  const progressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const isAutoRef = useRef<boolean>(true);
  const isLockedRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const activeNodePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 130 });
  const hoveredIdRef = useRef<string | null>(null);
  const selectedIdRef = useRef<string>(selectedId);
  const lastTriggerTimeRef = useRef<number>(0);

  // 3D Mouse Parallax Tilt
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const tiltRef = useRef<{ x: number; y: number }>({ x: 16, y: 0 });

  useEffect(() => {
    isAutoRef.current = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  const selectedService = services.find((s) => s.id === selectedId) || services[0];
  const selectedIndex = services.findIndex((s) => s.id === selectedService.id);
  const relatedIds = selectedService.relatedIds;

  // Handle pointer tracking for cinematic 3D perspective tilt (desktop with mouse only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dims.isMobile) return; // Never block or calculate during mobile touch
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerRef.current = { x: nx, y: ny };
  };

  const handleMouseLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
    setHoveredId(null);
    hoveredIdRef.current = null;
  };

  // Node Click: Lock onto the node and inspect specifications!
  const lockOntoNode = (svc: Service, index: number, openModal = false) => {
    setSelectedId(svc.id);
    setIsLocked(true);
    setIsAutoRotating(false);
    isAutoRef.current = false;
    isLockedRef.current = true;

    // Center the chosen node front-and-center
    const N = services.length;
    let targetP = (2 / 3) - (index / N);
    while (targetP < 0) targetP += 1;
    targetP = targetP % 1;

    // Find shortest rotational direction
    const currentP = ((progressRef.current % 1) + 1) % 1;
    let diff = targetP - currentP;
    if (diff > 0.5) diff -= 1;
    if (diff < -0.5) diff += 1;

    targetProgressRef.current = progressRef.current + diff;

    if (openModal) {
      onSelect(svc);
    }
  };

  // Previous & Next step navigation
  const stepNode = (direction: 'prev' | 'next') => {
    const nextIdx = direction === 'next'
      ? (selectedIndex + 1) % services.length
      : (selectedIndex - 1 + services.length) % services.length;
    lockOntoNode(services[nextIdx], nextIdx, false);
  };

  const nodePointerDownRef = useRef<Record<string, { x: number; y: number; time: number }>>({});

  // Click trigger handler with robust tap detection
  const handleNodeClick = (svc: Service, index: number, e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const now = Date.now();
    if (now - lastTriggerTimeRef.current < 250) {
      return;
    }
    lastTriggerTimeRef.current = now;
    if (selectedId === svc.id) {
      onSelect(svc);
    } else {
      lockOntoNode(svc, index, false);
    }
  };

  const handleNodePointerDown = (svcId: string, e: React.PointerEvent) => {
    nodePointerDownRef.current[svcId] = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
  };

  const handleNodePointerUp = (svc: Service, index: number, e: React.PointerEvent) => {
    const down = nodePointerDownRef.current[svc.id];
    if (!down) return;
    delete nodePointerDownRef.current[svc.id];
    const dist = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    const elapsed = Date.now() - down.time;
    // Allow up to 40px drift to accommodate active orbital motion and finger release
    if (dist < 40 && elapsed < 1000) {
      handleNodeClick(svc, index, e);
    }
  };

  // Resume Auto Orbiting along square path
  const resumeOrbit = () => {
    setIsLocked(false);
    setIsAutoRotating(true);
    isAutoRef.current = true;
    isLockedRef.current = false;
  };

  // Responsive Dims and RAF Loop
  useEffect(() => {
    let isVisible = false;
    const total = services.length;

    const computeSquareDims = () => {
      const w = window.innerWidth;
      if (w < 440) return { halfW: 96, halfH: 65, isMobile: true, isTablet: false };
      if (w < 640) return { halfW: 110, halfH: 72, isMobile: true, isTablet: false };
      if (w < 1024) return { halfW: 180, halfH: 105, isMobile: false, isTablet: true };
      return { halfW: 260, halfH: 130, isMobile: false, isTablet: false };
    };

    const currentDims = computeSquareDims();
    setDims(currentDims);

    let halfW = currentDims.halfW;
    let halfH = currentDims.halfH;
    let perimeter = 4 * (halfW + halfH);
    let topLen = 2 * halfW;
    let rightLen = 2 * halfH;
    let bottomLen = 2 * halfW;

    const handleResize = () => {
      const newDims = computeSquareDims();
      setDims(newDims);
      halfW = newDims.halfW;
      halfH = newDims.halfH;
      perimeter = 4 * (halfW + halfH);
      topLen = 2 * halfW;
      rightLen = 2 * halfH;
      bottomLen = 2 * halfW;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const animate = () => {
      if (isVisible) {
        // Parallax tilt (subtle on mobile, interactive on desktop)
        const targetTiltX = currentDims.isMobile ? 14 : (16 - pointerRef.current.y * 12);
        const targetTiltY = currentDims.isMobile ? 0 : (pointerRef.current.x * 14);
        tiltRef.current.x += (targetTiltX - tiltRef.current.x) * 0.08;
        tiltRef.current.y += (targetTiltY - tiltRef.current.y) * 0.08;

        if (planeRef.current) {
          const perspectiveVal = currentDims.isMobile ? '850px' : '1100px';
          planeRef.current.style.transform = `perspective(${perspectiveVal}) rotateX(${tiltRef.current.x}deg) rotateY(${tiltRef.current.y}deg)`;
        }

        // Progress computation
        if (isAutoRef.current && !hoveredIdRef.current) {
          const speed = currentDims.isMobile ? 0.00055 : 0.00065;
          progressRef.current = (progressRef.current + speed) % 1000;
        } else if (isLockedRef.current) {
          const diff = targetProgressRef.current - progressRef.current;
          if (Math.abs(diff) > 0.0001) {
            progressRef.current += diff * 0.09;
          }
        }

        // Calculate exact (x, y, z) on the 4 EDGES OF THE 3D SQUARE
        for (let i = 0; i < total; i++) {
          const el = nodeElsRef.current[i];
          if (!el) continue;

          const nodeOffset = ((i / total) + progressRef.current) % 1;
          const pos = ((nodeOffset % 1) + 1) % 1;
          const d = pos * perimeter;

          let x = 0;
          let y = 0;
          let z = 0;

          if (d < topLen) {
            // EDGE 0: Top Edge (Back)
            const f = d / topLen;
            x = -halfW + f * topLen;
            y = -halfH;
            z = -1;
          } else if (d < topLen + rightLen) {
            // EDGE 1: Right Edge
            const f = (d - topLen) / rightLen;
            x = halfW;
            y = -halfH + f * rightLen;
            z = -1 + 2 * f;
          } else if (d < topLen + rightLen + bottomLen) {
            // EDGE 2: Bottom Edge (Front)
            const f = (d - topLen - rightLen) / bottomLen;
            x = halfW - f * bottomLen;
            y = halfH;
            z = 1;
          } else {
            // EDGE 3: Left Edge
            const f = (d - topLen - rightLen - bottomLen) / (perimeter - topLen - rightLen - bottomLen);
            x = -halfW;
            y = halfH - f * (2 * halfH);
            z = 1 - 2 * f;
          }

          // Depth scaling
          const depthNorm = (z + 1) / 2;
          const scale = currentDims.isMobile ? (0.82 + 0.28 * depthNorm) : (0.76 + 0.38 * depthNorm);
          const opacity = currentDims.isMobile ? (0.45 + 0.55 * depthNorm) : (0.35 + 0.65 * depthNorm);
          const zIndex = Math.round(30 + 70 * depthNorm);

          el.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) scale(${scale})`;
          el.style.opacity = `${opacity}`;
          el.style.zIndex = `${zIndex}`;

          if (services[i]?.id === selectedIdRef.current) {
            activeNodePosRef.current = { x, y };
          }
        }

        // Update Laser Beam to target node
        if (laserLineRef.current) {
          laserLineRef.current.setAttribute('x2', `${activeNodePosRef.current.x}`);
          laserLineRef.current.setAttribute('y2', `${activeNodePosRef.current.y}`);
        }
      } else {
        // Stop the loop completely when off-screen
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(animate);
          }
        } else if (!isVisible && wasVisible) {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        }
      },
      { rootMargin: '60px' }
    );
    observer.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [services]);

  return (
    <div className="w-full" style={{ touchAction: 'pan-y' }}>
      {/* 3D Cinematic Square Orbit Viewport */}
      <div
        ref={containerRef}
        className={`relative w-full border border-bulls-border bg-gradient-to-b from-bulls-black via-bulls-surface/70 to-bulls-black overflow-hidden flex items-center justify-center select-none ${
          dims.isMobile ? 'h-[390px]' : dims.isTablet ? 'h-[460px]' : 'h-[540px]'
        }`}
        style={{ touchAction: 'pan-y' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cinematic Scanline & Grid Ambient Overlays */}
        <div className="absolute inset-0 scanline-overlay opacity-25 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(227,30,36,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(227,30,36,0.15) 1px, transparent 1px)',
            backgroundSize: dims.isMobile ? '24px 24px' : '36px 36px',
          }}
        />

        {/* Cinematic Radial Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(227,30,36,0.12) 0%, transparent 75%)',
          }}
        />

        {/* HUD Header Bar */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-30">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 bg-bulls-red rounded-full shadow-[0_0_8px_rgba(227,30,36,0.8)]" />
            <span className="font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider text-white">
              Enterprise Capability Matrix
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            {/* Mobile View Toggle (Orbit vs Grid) */}
            {dims.isMobile && (
              <button
                onClick={() => setMobileMode(mobileMode === 'orbit' ? 'grid' : 'orbit')}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-bulls-surface border border-bulls-border text-white font-mono text-[9px] uppercase tracking-wider hover:border-bulls-red transition-colors"
                aria-label="Toggle Mobile View"
              >
                {mobileMode === 'orbit' ? (
                  <>
                    <LayoutGrid size={11} className="text-bulls-red" />
                    <span>Grid View</span>
                  </>
                ) : (
                  <>
                    <Box size={11} className="text-bulls-red" />
                    <span>3D Orbit</span>
                  </>
                )}
              </button>
            )}

            {/* Status Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 bg-bulls-black/90 border border-bulls-border font-mono text-[10px]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLocked ? 'bg-bulls-red' : 'bg-green-500'
                }`}
              />
              <span className={isLocked ? 'text-white font-medium' : 'text-bulls-muted'}>
                {isLocked ? 'Focused' : 'Orbiting'}
              </span>
            </div>

            {/* Resume / Pause */}
            {isLocked ? (
              <button
                onClick={resumeOrbit}
                className="flex items-center gap-1.5 px-3 py-1 bg-bulls-red hover:bg-bulls-red-dark text-white font-display text-[10px] uppercase tracking-wider font-bold transition-all rounded-sm shadow-md shadow-bulls-red/20"
                aria-label="Resume Orbit"
              >
                <Play size={10} fill="currentColor" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className="flex items-center gap-1 px-2.5 py-1 bg-bulls-black border border-bulls-border hover:border-bulls-red text-bulls-muted hover:text-white font-display text-[10px] uppercase tracking-wider transition-colors rounded-sm"
                aria-label="Toggle Orbit"
              >
                <Pause size={10} className="text-bulls-red" />
                <span>Pause</span>
              </button>
            )}
          </div>
        </div>

        {/* ── MODE 1: TACTICAL 3X3 GRID (MOBILE OPTIONAL) ── */}
        {dims.isMobile && mobileMode === 'grid' ? (
          <div className="relative z-20 w-full px-4 pt-14 pb-6 grid grid-cols-3 gap-2 overflow-y-auto max-h-[340px]">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const isSelected = selectedId === svc.id;
              const num = String(i + 1).padStart(2, '0');
              return (
                <button
                  key={svc.id}
                  onClick={() => lockOntoNode(svc, i, false)}
                  className={`p-2.5 border transition-all duration-200 flex flex-col items-center justify-center text-center gap-1.5 aspect-square rounded-sm ${
                    isSelected
                      ? 'border-bulls-red bg-bulls-surface text-white shadow-[0_0_15px_rgba(227,30,36,0.4)]'
                      : 'border-bulls-border bg-bulls-black/80 text-bulls-muted hover:text-white hover:border-bulls-red/50'
                  }`}
                  style={{ touchAction: 'pan-y' }}
                >
                  <span className="font-mono text-[8px] text-bulls-hint">{num}</span>
                  <Icon size={18} className={isSelected ? 'text-bulls-red' : 'text-bulls-muted'} />
                  <span className="font-display text-[9px] uppercase tracking-tight line-clamp-1 font-semibold">
                    {svc.title}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          /* ── MODE 2: RESPONSIVE 3D SQUARE ORBIT ── */
          <div
            ref={planeRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              touchAction: 'pan-y',
            }}
          >
            {/* Dynamic Physical Border matching current screen size */}
            <div
              className="absolute border border-bulls-border pointer-events-none"
              style={{
                width: `${dims.halfW * 2}px`,
                height: `${dims.halfH * 2}px`,
              }}
              aria-hidden="true"
            >
              {/* Corner Crosshairs */}
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-bulls-red" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-bulls-red" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-bulls-red" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-bulls-red" />
            </div>

            {/* Center 3D Square Core Hub */}
            <div
              onClick={isLocked ? resumeOrbit : () => setIsAutoRotating(!isAutoRotating)}
              className="absolute z-25 flex flex-col items-center justify-center cursor-pointer group select-none"
              title="Click to toggle orbit"
              style={{ touchAction: 'pan-y' }}
            >
              <div
                className={`relative bg-bulls-surface border border-bulls-border flex flex-col items-center justify-center group-hover:border-bulls-red transition-all rounded-sm shadow-xl ${
                  dims.isMobile ? 'w-11 h-11' : 'w-14 h-14'
                }`}
              >
                <span className="w-1.5 h-1.5 bg-bulls-red rounded-full mb-0.5 shadow-[0_0_6px_rgba(227,30,36,0.8)]" />
                <span className="font-display font-bold text-[8px] text-white tracking-widest uppercase">
                  BULLS
                </span>
                <span className="font-mono text-[7px] text-bulls-muted">
                  {String(selectedIndex + 1).padStart(2, '0')}/09
                </span>
              </div>
            </div>

            {/* 9 Square Orbit Nodes */}
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const isSelected = selectedId === svc.id;
              const isRelated = relatedIds.includes(svc.id);
              const isHovered = hoveredId === svc.id;
              const num = String(i + 1).padStart(2, '0');

              return (
                <button
                  type="button"
                  key={svc.id}
                  ref={(el) => {
                    nodeElsRef.current[i] = el;
                  }}
                  onClick={(e) => handleNodeClick(svc, i, e)}
                  onPointerDown={(e) => handleNodePointerDown(svc.id, e)}
                  onPointerUp={(e) => handleNodePointerUp(svc, i, e)}
                  onMouseEnter={() => {
                    if (!dims.isMobile) {
                      setHoveredId(svc.id);
                      hoveredIdRef.current = svc.id;
                    }
                  }}
                  onMouseLeave={() => {
                    if (!dims.isMobile) {
                      setHoveredId(null);
                      hoveredIdRef.current = null;
                    }
                  }}
                  className="absolute cursor-pointer flex flex-col items-center group select-none bg-transparent p-0 border-0 outline-none focus:outline-none transition-transform duration-75"
                  style={{
                    willChange: 'transform, opacity',
                    touchAction: 'manipulation',
                  }}
                  aria-label={`Select service ${svc.title}`}
                >
                  {/* Square Node Block */}
                  <div
                    className={`relative bg-bulls-surface border transition-all duration-200 flex items-center justify-center rounded-sm ${
                      dims.isMobile
                        ? 'w-11 h-11'
                        : dims.isTablet
                        ? 'w-13 h-13'
                        : 'w-15 h-15'
                    } ${
                      isSelected
                        ? 'border-bulls-red bg-bulls-black shadow-[0_0_20px_rgba(227,30,36,0.6)] scale-110'
                        : isRelated
                        ? 'border-bulls-red/50 bg-bulls-surface'
                        : isHovered
                        ? 'border-white bg-bulls-elevated'
                        : 'border-bulls-border group-hover:border-white/50'
                    }`}
                  >
                    {/* Node Icon */}
                    <Icon
                      size={dims.isMobile ? 18 : 22}
                      className={`transition-colors duration-200 ${
                        isSelected
                          ? 'text-bulls-red'
                          : isRelated
                          ? 'text-white'
                          : 'text-bulls-muted group-hover:text-white'
                      }`}
                    />

                    {/* Index Tag */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1 py-0.2 bg-bulls-black border border-bulls-border font-mono text-[7px] text-bulls-hint whitespace-nowrap rounded-sm">
                      {num}
                    </div>
                  </div>

                  {/* Adaptive Label Below Node */}
                  <div
                    className={`mt-1.5 px-2 py-0.5 border font-display uppercase tracking-wider transition-all duration-200 rounded-sm ${
                      dims.isMobile
                        ? 'text-[8px] max-w-[72px] truncate'
                        : dims.isTablet
                        ? 'text-[9px] max-w-[100px] truncate'
                        : 'text-[9px] whitespace-nowrap'
                    } ${
                      isSelected
                        ? 'bg-bulls-red text-white border-bulls-red font-bold shadow-[0_0_10px_rgba(227,30,36,0.3)]'
                        : isRelated
                        ? 'bg-bulls-surface text-bulls-red border-bulls-red/40'
                        : 'bg-bulls-black/95 text-bulls-muted border-bulls-border group-hover:text-white'
                    }`}
                  >
                    {svc.title}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Bottom Orbit Telemetry Bar & Step Controls */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between font-mono text-[9px] text-bulls-hint pointer-events-none z-30">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">AXIS: 3D RECTILINEAR</span>
            <span>NODES: {String(selectedIndex + 1).padStart(2, '0')}/09</span>
          </div>

          {/* Quick Prev / Next Buttons */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => stepNode('prev')}
              className="flex items-center gap-1 px-2.5 py-1 bg-bulls-black border border-bulls-border hover:border-bulls-red text-white font-mono text-[9px] uppercase tracking-wider transition-colors active:scale-95"
              aria-label="Previous Service"
            >
              <ChevronLeft size={12} className="text-bulls-red" />
              <span>Prev</span>
            </button>
            <button
              onClick={() => stepNode('next')}
              className="flex items-center gap-1 px-2.5 py-1 bg-bulls-black border border-bulls-border hover:border-bulls-red text-white font-mono text-[9px] uppercase tracking-wider transition-colors active:scale-95"
              aria-label="Next Service"
            >
              <span>Next</span>
              <ChevronRight size={12} className="text-bulls-red" />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Service Technical Specification Panel */}
      <div className="mt-4 p-6 sm:p-8 bg-bulls-surface border border-bulls-border relative overflow-hidden rounded-sm" style={{ touchAction: 'pan-y' }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-2.5 py-0.5 bg-bulls-surface border border-bulls-border text-bulls-muted font-mono text-xs font-semibold">
                {String(selectedIndex + 1).padStart(2, '0')} of 09
              </span>
              <span className="font-display text-xs uppercase tracking-widest text-bulls-red font-semibold">
                {selectedService.tagline}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {selectedService.title}
            </h3>

            <p className="font-body text-bulls-muted text-sm sm:text-base leading-relaxed mt-2.5">
              {selectedService.desc}
            </p>

            {/* Bullet tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedService.bullets.map((b, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-bulls-black border border-bulls-border font-display text-[10px] uppercase tracking-wider text-bulls-muted rounded-sm"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0 pt-2 lg:pt-0">
            <button
              onClick={() => onSelect(selectedService)}
              className="btn-primary group flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold rounded-sm"
            >
              <span>View Full Specifications</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#contact"
              className="btn-ghost flex items-center justify-center gap-2 py-2.5 px-6 text-xs text-bulls-muted hover:text-white rounded-sm"
            >
              <span>Inquire About This Service</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Square Service Matrix Bar */}
      <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 sm:gap-2" style={{ touchAction: 'pan-y' }}>
        {services.map((s, idx) => {
          const isSelected = selectedId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => lockOntoNode(s, idx, false)}
              className={`p-2.5 border text-left transition-all duration-150 flex flex-col justify-between rounded-sm min-h-[52px] ${
                isSelected
                  ? 'border-bulls-red bg-bulls-surface text-white shadow-sm'
                  : 'border-bulls-border bg-bulls-black/60 text-bulls-hint hover:text-bulls-muted hover:border-bulls-border-light'
              }`}
              style={{ touchAction: 'pan-y' }}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[9px] text-bulls-hint">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 bg-bulls-red rounded-full" />}
              </div>
              <span className="font-display text-[10px] uppercase tracking-wider truncate font-semibold mt-1">
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-bulls-bg overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36 relative z-10">
        <div className="mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
            <span className="font-display text-xs uppercase tracking-widest text-bulls-red font-semibold">Production & Services</span>
            <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight"
            >
              Industrial Craft & <span className="text-bulls-red">Brand Execution</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="font-body text-bulls-muted text-base lg:text-lg leading-relaxed"
            >
              From strategic corporate branding to architectural fabrication, our studio delivers turnkey solutions for leading enterprises.
            </motion.p>
          </div>
        </div>

        {/* ── 3D Square Services Orbit ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <Square3DOrbit services={services} onSelect={setActive} />
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <ServiceModal service={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
