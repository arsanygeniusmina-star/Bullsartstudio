import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ease } from '../lib/motion';
import {
  X,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from 'lucide-react';
import DriftWall from '../components/DriftWall';

/* ─── Data ─────────────────────────────────────────────────── */
export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  client: string;
  category: 'Signage & Facades' | 'Textiles & Uniforms' | 'Corporate Gifting' | '3D & Interior';
  scope: string;
  specs: string[];
  serviceName: string;
}

const items: GalleryItem[] = [
  {
    id: 1,
    src: '/gallery/gallery-1.jpg',
    alt: 'Mahmoud Amer Coffee – Storefront Signage & Window Graphics',
    client: 'Mahmoud Amer Coffee',
    category: 'Signage & Facades',
    scope: 'Complete exterior retail storefront branding, perforated micro-dot one-way window graphics, and dimensional entrance logo.',
    specs: ['UV Flatbed Print', 'Micro-perforated Vinyl', 'Cast Acrylic 3D Letters'],
    serviceName: 'Printing Service',
  },
  {
    id: 2,
    src: '/gallery/gallery-2.jpg',
    alt: 'Mahmoud Amer Coffee – Interior Door Campaign Print',
    client: 'Mahmoud Amer Coffee',
    category: 'Signage & Facades',
    scope: 'Interior environmental door wrap with high-resolution brand storytelling graphics and scratch-resistant matte overlaminate.',
    specs: ['High-tack Polymeric Vinyl', 'Matte Anti-glare Overlaminate', 'Eco-Solvent 1440 DPI Print'],
    serviceName: 'Printing Service',
  },
  {
    id: 3,
    src: '/gallery/gallery-3.jpg',
    alt: 'Liteway Lighting Solutions – Branded Polo Shirt Back',
    client: 'Liteway Lighting Solutions',
    category: 'Textiles & Uniforms',
    scope: 'Heavyweight corporate crew uniforms with multi-color high-density back embroidery engineered for industrial wear resistance.',
    specs: ['100% Combed Pique Cotton', 'German Madeira Polyneon Thread', 'Pre-shrunk Double Seams'],
    serviceName: 'Production Workshop',
  },
  {
    id: 4,
    src: '/gallery/gallery-4.jpg',
    alt: 'Liteway Lighting Solutions – Branded Polo Shirt Front',
    client: 'Liteway Lighting Solutions',
    category: 'Textiles & Uniforms',
    scope: 'Corporate polo chest branding featuring high-precision micro-embroidery of the Liteway insignia.',
    specs: ['Dense Micro-Stitch Embroidery', 'Reinforced Collar Ribbing', 'Color-matched Branded Buttons'],
    serviceName: 'Production Workshop',
  },
  {
    id: 5,
    src: '/gallery/gallery-5.jpg',
    alt: 'Techno Metal – Laser-Engraved Corporate Keychains',
    client: 'Techno Metal',
    category: 'Corporate Gifting',
    scope: 'Machined anodized matte aluminum corporate keytags with precision fiber laser etching for industrial clientele.',
    specs: ['Solid Anodized Aluminum', 'High-Frequency Fiber Laser Etching', 'Hardened Steel Key Ring'],
    serviceName: 'Corporate Gifts',
  },
  {
    id: 6,
    src: '/gallery/gallery-6.png',
    alt: 'Renaldi – Illuminated Storefront Entrance Signage',
    client: 'Renaldi',
    category: 'Signage & Facades',
    scope: 'Luxury exterior entrance sign featuring 3D fabricated channel letters with diffused 3000K warm LED illumination.',
    specs: ['Electro-galvanized Steel Casing', 'Opal Acrylic Face', 'IP67 Waterproof LED Modules'],
    serviceName: 'Production Workshop',
  },
  {
    id: 7,
    src: '/gallery/gallery-7.png',
    alt: 'Valenza Jewellery Boutique – Gold 3D Wall Letters on Marble',
    client: 'Valenza Jewellery Boutique',
    category: '3D & Interior',
    scope: 'Flagship jewellery boutique interior wall with mirror-finished titanium-gold 3D letters pinned to Italian Calacatta marble.',
    specs: ['Titanium Gold Stainless Steel', 'Concealed Stud Mounting Hardware', 'Beveled Precision Edge Finishing'],
    serviceName: 'Branding',
  },
  {
    id: 8,
    src: '/gallery/gallery-8.png',
    alt: 'Valenza Jewellery Boutique – Illuminated Exterior Fascia Sign',
    client: 'Valenza Jewellery Boutique',
    category: 'Signage & Facades',
    scope: 'Exterior boutique fascia featuring precision back-illuminated letters casting a sophisticated warm halo onto dark stone facade.',
    specs: ['Brushed Champagne Brass', 'Concealed Spacer Studs', 'High-CRI Warm White LEDs'],
    serviceName: 'Production Workshop',
  },
  {
    id: 9,
    src: '/gallery/gallery-9.png',
    alt: 'Renaldi – Laser-Engraved Wood Keychain Corporate Gift',
    client: 'Renaldi',
    category: 'Corporate Gifting',
    scope: 'Artisanal walnut hardwood corporate key fobs engraved with ultra-fine CO2 laser detail and hand-rubbed oil finish.',
    specs: ['Sustainable American Walnut', 'Deep CO2 Laser Relief', 'Burnished Brass Hardware'],
    serviceName: 'Corporate Gifts',
  },
  {
    id: 10,
    src: '/gallery/gallery-10.png',
    alt: 'LeMans Group Düsseldorf – Walnut Wood Reception Sign',
    client: 'LeMans Group Düsseldorf',
    category: '3D & Interior',
    scope: 'Corporate headquarters reception centerpiece: CNC-routed natural walnut backplate with custom metallic relief lettering.',
    specs: ['FSC-Certified Solid Walnut', 'CNC Precision Milling', 'Satin Polyurethane Seal'],
    serviceName: 'Branding',
  },
  {
    id: 11,
    src: '/gallery/gallery-11.png',
    alt: 'LeMans Group Düsseldorf – Neon Logo & Interior Branding',
    client: 'LeMans Group Düsseldorf',
    category: '3D & Interior',
    scope: 'Modern tech-office interior branding featuring custom-bent red neon tube lighting mounted on acoustic dark slatted wall.',
    specs: ['High-Output Flexible Silicon Neon', 'Acoustic Felt Slats', 'Dimmable Solid-State Driver'],
    serviceName: 'Production Workshop',
  },
  {
    id: 12,
    src: '/gallery/gallery-12.png',
    alt: 'LeMans Group Düsseldorf – Gold 3D Letters Reception Wall',
    client: 'LeMans Group Düsseldorf',
    category: '3D & Interior',
    scope: 'Executive board reception wall with mirror-polished gold stainless steel typography precision-laser cut to 0.1mm tolerance.',
    specs: ['Mirror Gold PVD Stainless Steel', 'Precision Laser Cutting', 'Concealed Fixings'],
    serviceName: 'Branding',
  },
  {
    id: 13,
    src: '/gallery/gallery-13.png',
    alt: 'Renaldi – Interior Wall Logo Backlit Lettering',
    client: 'Renaldi',
    category: '3D & Interior',
    scope: 'Retail showroom logo installation with halo backlighting creating a dramatic floating architectural focal point.',
    specs: ['Fabricated Channel Letters', 'Warm 2700K LED Corona', 'Textured Architectural Plaster Wall'],
    serviceName: 'Production Workshop',
  },
  {
    id: 14,
    src: '/gallery/gallery-14.png',
    alt: 'Berries – Storefront 3D Channel Letters & Facade',
    client: 'Berries',
    category: 'Signage & Facades',
    scope: 'Vibrant retail storefront facade featuring internally illuminated 3D channel letters with day/night color-shift vinyl.',
    specs: ['Cast Acrylic Faces', 'Automotive Acrylic Enamel', 'High-Flux SMD LEDs'],
    serviceName: 'Production Workshop',
  },
  {
    id: 15,
    src: '/gallery/gallery-15.png',
    alt: 'LeMans Group Düsseldorf – Blue Neon Entrance Signage',
    client: 'LeMans Group Düsseldorf',
    category: 'Signage & Facades',
    scope: 'High-impact entrance statement with electric blue structural neon scripting integrated into exterior glass entryway.',
    specs: ['Ultra-Bright Silicon Neon Tube', 'Clear Acrylic Substrate', 'Weatherproof Power Supply'],
    serviceName: 'Production Workshop',
  },
  {
    id: 16,
    src: '/gallery/gallery-16.png',
    alt: 'Berries – Illuminated Night Storefront Signage',
    client: 'Berries',
    category: 'Signage & Facades',
    scope: 'High-contrast nocturnal storefront view demonstrating balanced light distribution and crisp edge definition.',
    specs: ['Uniform Light Diffusion Panels', 'Even-Glow LED Modules', 'Weather-Sealed Construction'],
    serviceName: 'Production Workshop',
  },
  {
    id: 17,
    src: '/gallery/gallery-17.png',
    alt: 'RMEG Joint Venture – Branded Laser-Engraved Pen',
    client: 'RMEG Joint Venture',
    category: 'Corporate Gifting',
    scope: 'Executive heavyweight twist-action metal rollerball pen featuring customized 360-degree laser rotary engraving.',
    specs: ['Brass Barrel with Matte PVD', 'Fiber Rotary Laser Etch', 'Swiss Refill Cartridge'],
    serviceName: 'Corporate Gifts',
  },
  {
    id: 18,
    src: '/gallery/gallery-18.png',
    alt: 'RMEG Joint Venture – Branded Pen Set in Hand',
    client: 'RMEG Joint Venture',
    category: 'Corporate Gifting',
    scope: 'Detailed tactile inspection of the ergonomic grip, weighted brass balance, and crisp tone-on-tone engraved insignia.',
    specs: ['Weighted Brass Core', 'Anodized Gunmetal Finish', 'Scratch-Proof PVD Coating'],
    serviceName: 'Corporate Gifts',
  },
  {
    id: 19,
    src: '/gallery/gallery-19.png',
    alt: 'RMEG Joint Venture – Corporate Gift Box with New Year Card',
    client: 'RMEG Joint Venture',
    category: 'Corporate Gifting',
    scope: 'Bespoke rigid presentation gift box with gold hot-stamping, embossed greeting card, and velvet presentation lining.',
    specs: ['1200gsm Heavy Rigid Board', 'Matte Soft-Touch Paper', 'Curved Gold Foil Stamping'],
    serviceName: 'Packaging',
  },
  {
    id: 20,
    src: '/gallery/gallery-20.png',
    alt: 'RMEG Joint Venture – Corporate Gift Set Flat Lay (4 boxes)',
    client: 'RMEG Joint Venture',
    category: 'Corporate Gifting',
    scope: 'VIP executive gift suite containing luxury thermos, custom pen, notebook, and corporate stationery set.',
    specs: ['Custom Die-Cut EVA Foam Insets', 'Magnetic Closure Rigid Boxes', 'Debossed Leatherette Notebook'],
    serviceName: 'Corporate Gifts',
  },
  {
    id: 21,
    src: '/gallery/gallery-21.png',
    alt: 'RMEG Joint Venture – Corporate Gift Sets Production Run',
    client: 'RMEG Joint Venture',
    category: 'Corporate Gifting',
    scope: 'Mass production quality control run of 500+ customized executive packages delivered ahead of fiscal corporate summit.',
    specs: ['Batch Consistency Verification', 'Precision Offset Printing', 'Individual Luxury Sleeve Wrap'],
    serviceName: 'Packaging',
  },
  {
    id: 22,
    src: '/gallery/gallery-22.png',
    alt: 'RMEG Joint Venture – Premium Corporate Gift Box Open View',
    client: 'RMEG Joint Venture',
    category: 'Corporate Gifting',
    scope: 'Unboxing view revealing laser-fitted high-density foam compartment holding branded vacuum flask and accessories.',
    specs: ['Double-Wall 304 Stainless Flask', 'Custom-Fitted Velvet Foam', 'Gold Ribbon Pull Tab'],
    serviceName: 'Corporate Gifts',
  },
];

/* Immediate preloader: load all gallery assets so they appear instantly */
if (typeof window !== 'undefined') {
  items.forEach((item) => {
    const img = new Image();
    img.src = item.src;
  });
}

/* ─── Interactive Zoom & Pop-up Lightbox ────────────────────────── */
function Lightbox({
  startId,
  onClose,
}: {
  startId: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(() =>
    items.findIndex((i) => i.id === startId)
  );
  const activeItem = items[current] || items[0];

  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const prev = useCallback(() => {
    setIsZoomed(false);
    setCurrent((c) => (c - 1 + items.length) % items.length);
  }, []);

  const next = useCallback(() => {
    setIsZoomed(false);
    setCurrent((c) => (c + 1) % items.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'z' || e.key === 'Z') setIsZoomed((z) => !z);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Touch swipe detection for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isZoomed) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dy) < 60) {
      if (dx < 0) next();
      else prev();
    }
  };

  const handleCommissionClick = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col bg-bulls-black/95 backdrop-blur-2xl select-none overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`Project inspection: ${activeItem.client}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Top Header Bar ──────────────────────────────────── */}
      <header className="relative z-30 flex-shrink-0 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-bulls-border bg-bulls-bg/90">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-bulls-red shadow-[0_0_8px_rgba(227,30,36,0.8)]" />
          <div className="flex items-baseline gap-2">
            <h3 className="font-display font-bold text-white text-sm sm:text-base tracking-wide uppercase">
              {activeItem.client}
            </h3>
            <span className="font-body text-xs text-bulls-muted hidden sm:inline">
              — {activeItem.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-xs text-bulls-hint tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10">
            {String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={() => setIsZoomed((z) => !z)}
            className={`px-2.5 py-1 rounded text-xs font-display uppercase tracking-wider flex items-center gap-1.5 border transition-all duration-200 ${
              isZoomed
                ? 'bg-bulls-red text-white border-bulls-red'
                : 'bg-white/5 border-white/10 text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle zoom"
            aria-label="Toggle zoom"
          >
            {isZoomed ? <ZoomOut size={13} /> : <ZoomIn size={13} />}
            <span className="hidden sm:inline">{isZoomed ? 'Actual Size' : 'Zoom'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 flex items-center gap-1.5 rounded bg-bulls-surface border border-bulls-border text-bulls-muted hover:text-white hover:border-bulls-red hover:bg-bulls-red/10 text-xs font-display uppercase tracking-wider transition-colors"
            title="Close (Esc)"
            aria-label="Close dialog"
          >
            <X size={15} />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* ── Center Stage: Perfectly Centered Image With 100% Visibility ──────────────────────── */}
      <main
        className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center p-3 sm:p-6 cursor-zoom-out"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Navigation Control */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-bulls-surface/90 border border-bulls-border text-bulls-muted hover:text-white hover:border-bulls-red hover:bg-bulls-red/20 transition-all shadow-xl active:scale-95 cursor-pointer"
          aria-label="Previous image"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Right Navigation Control */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-bulls-surface/90 border border-bulls-border text-bulls-muted hover:text-white hover:border-bulls-red hover:bg-bulls-red/20 transition-all shadow-xl active:scale-95 cursor-pointer"
          aria-label="Next image"
        >
          <ArrowRight size={18} />
        </button>

        {/* The Image Itself - Dead Centered, Fully Sized to Available Space */}
        <div
          className="relative max-w-full max-h-full flex items-center justify-center cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.25 : 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center cursor-pointer"
              onClick={() => setIsZoomed((z) => !z)}
              title={isZoomed ? "Click to reset" : "Click to zoom"}
            >
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                loading="eager"
                decoding="sync"
                className="max-h-[calc(100vh-170px)] max-w-[88vw] w-auto h-auto object-contain border border-bulls-border rounded-sm shadow-2xl select-none"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ── Bottom Executive Detail Bar (Never Covers The Image) ──────────────────────── */}
      <footer className="relative z-30 flex-shrink-0 px-4 sm:px-8 py-3 border-t border-bulls-border bg-bulls-bg/95 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex-1 min-w-0 max-w-3xl flex items-center gap-3">
          <p className="font-body text-xs text-bulls-muted line-clamp-1">
            {activeItem.scope}
          </p>
          <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
            {activeItem.specs.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="font-mono text-[10px] text-bulls-hint px-2 py-0.5 rounded-sm bg-bulls-surface border border-bulls-border"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCommissionClick}
          className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-sm bg-bulls-red text-white font-display font-semibold text-xs uppercase tracking-wider hover:bg-bulls-red-dark transition-all active:scale-95 cursor-pointer"
        >
          <span>Commission Similar Project</span>
          <ArrowRight size={13} />
        </button>
      </footer>
    </motion.div>
  );
}

/* ─── Gallery Section Component ───────────────────────────────── */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [lightboxId, setLightboxId] = useState<number | null>(null);

  // Responsive dimensions for DriftWall
  const [wallConfig, setWallConfig] = useState({
    columns: 5,
    tileWidth: 320,
    tileHeight: 210,
    gap: 16,
  });

  // Eagerly pre-cache all gallery image objects in browser memory for instant retrieval
  useEffect(() => {
    items.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setWallConfig({ columns: 3, tileWidth: 180, tileHeight: 120, gap: 10 });
      } else if (w < 1024) {
        setWallConfig({ columns: 4, tileWidth: 240, tileHeight: 160, gap: 14 });
      } else {
        setWallConfig({ columns: 5, tileWidth: 320, tileHeight: 210, gap: 16 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Build click-aware DriftWall items
  const driftItems = useMemo(
    () =>
      [...items, ...items].map((item) => ({
        image: item.src,
        title: item.client,
        href: undefined as string | undefined,
        onClick: () => setLightboxId(item.id),
      })),
    []
  );

  return (
    <section id="gallery" ref={ref} className="relative bg-bulls-bg overflow-hidden">
      {/* ── Section Header ────────────────────────────────────────── */}
      <div className="relative z-10 pt-24 pb-8 flex flex-col items-center">
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bulls-red/40 to-transparent"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
          <span className="font-display text-xs uppercase tracking-widest text-bulls-red font-semibold">Portfolio & Production</span>
          <span className="w-6 h-px bg-bulls-red" aria-hidden="true" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight text-center px-4"
        >
          Proven Commercial <span className="text-bulls-red">Craftsmanship</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-4 font-body text-bulls-muted text-sm sm:text-base text-center max-w-lg px-6"
        >
          Physical studio fabrications — architectural signage, channel letters, executive gifting, and corporate apparel.
        </motion.p>

        {/* ── Helper Note ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center gap-2 text-bulls-hint font-mono text-[11px] px-4"
        >
          <Sparkles size={12} className="text-bulls-red" />
          <span>Click any project to zoom in and open specifications</span>
        </motion.div>
      </div>

      {/* ── View 1: 3D Drift Wall ───────────────────────────────── */}
      {/* ── 3D Drift Wall ───────────────────────────────── */}
      <motion.div
        key="drift-wall-view"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease }}
        className="relative w-full overflow-hidden"
        style={{ height: '560px' }}
      >
        <DriftWall
          items={driftItems}
          columns={wallConfig.columns}
          tileWidth={wallConfig.tileWidth}
          tileHeight={wallConfig.tileHeight}
          gap={wallConfig.gap}
          radius={8}
          tilt={10}
          turn={-7}
          perspective={1400}
          depth={80}
          speed={26}
          direction="up"
          variance={0.42}
          parallax={0.5}
          pauseOnHover={true}
          lift={64}
          fade={0.5}
          dim={0.7}
          overlayColor="#0A0A0A"
          overlayOpacity={0.2}
        />

        {/* Top & Bottom Vignette Fades */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Interactive Zoom & Pop-up Specification Modal ───────── */}
      <AnimatePresence>
        {lightboxId !== null && (
          <Lightbox startId={lightboxId} onClose={() => setLightboxId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
