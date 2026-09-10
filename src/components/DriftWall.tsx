import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

interface DriftWallItem {
  image: string;
  title?: string;
  href?: string;
  onClick?: () => void;
}

interface DriftWallProps {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  showCaptions?: boolean;
  className?: string;
  style?: Record<string, string | number>;
}

const DEFAULT_ITEMS: DriftWallItem[] = [
  { image: '/gallery/gallery-1.jpg', title: 'Retail Storefront & 3D Signage' },
  { image: '/gallery/gallery-2.jpg', title: 'Interior Brand Campaign & Door Wraps' },
  { image: '/gallery/gallery-3.jpg', title: 'Heavyweight Uniform Crew Embroidery' },
  { image: '/gallery/gallery-4.jpg', title: 'Precision Corporate Apparel Insignia' },
  { image: '/gallery/gallery-5.jpg', title: 'Anodized Aluminum Laser Engraving' },
  { image: '/gallery/gallery-6.png', title: 'Illuminated Storefront Facade' },
  { image: '/gallery/gallery-7.png', title: 'Boutique Titanium Gold 3D Letters' },
  { image: '/gallery/gallery-8.png', title: 'Custom Acrylic Architectural Identity' },
  { image: '/gallery/gallery-9.png', title: 'Promotional Packaging Bags' },
  { image: '/gallery/gallery-10.png', title: 'Luxury Rigid Presentation Box' },
  { image: '/gallery/gallery-11.png', title: 'Corporate Gift Sets & Giveaways' },
  { image: '/gallery/gallery-12.png', title: 'Exhibition Pavilion Booth Structure' },
  { image: '/gallery/gallery-13.png', title: 'Commercial Vehicle Fleet Decals' },
  { image: '/gallery/gallery-14.png', title: 'Spot-UV Product Catalogues' },
  { image: '/gallery/gallery-15.png', title: 'Foil-Stamped Business Cards' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

const DriftWall = ({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = true,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#060010',
  overlayOpacity = 0.42,
  showCaptions = true,
  className = '',
  style,
}: DriftWallProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);
  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const columnItems = useMemo(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useEffect(() => {
    let isVisible = false;

    const animate = (ts: number) => {
      if (!isVisible) return;
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
        }
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
          lastTsRef.current = null;
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(animate);
        } else if (!isVisible && wasVisible) {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
          lastTsRef.current = null;
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id: string, index: number) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const containerRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const handlePointerEnterWall = useCallback(() => {
    wallHoveredRef.current = true;
    if (containerRef.current) {
      const r = containerRef.current.getBoundingClientRect();
      containerRectRef.current = { left: r.left, top: r.top, width: r.width || 1, height: r.height || 1 };
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (parallax <= 0 || reduced) return;
      const rect = containerRectRef.current;
      if (!rect) return;
      pointerRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    containerRectRef.current = null;
    release();
  }, [release]);

  const cssVars = useMemo(
    () => ({
      '--dw-tile-w': `${tileWidth}px`,
      '--dw-tile-h': `${tileHeight}px`,
      '--dw-gap': `${gap}px`,
      '--dw-radius': `${radius}px`,
      '--dw-perspective': `${perspective}px`,
      '--dw-lift': `${lift}px`,
      '--dw-dim': dim,
      '--dw-gray': grayscale ? 1 : 0,
      '--dw-overlay': overlayColor,
      '--dw-overlay-opacity': overlayOpacity,
      '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
      ...style,
    }),
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, overlayOpacity, fade, style]
  );

  const tilePointerDownRef = useRef<Record<string, { x: number; y: number; time: number }>>({});
  const lastClickTimeRef = useRef<number>(0);

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    const isClickable = !!(item.href || item.onClick);

    const triggerClick = () => {
      const now = Date.now();
      if (now - lastClickTimeRef.current < 250) return;
      lastClickTimeRef.current = now;
      if (isClickable && item.onClick) {
        item.onClick();
      }
    };

    const handleTilePointerDown = (e: React.PointerEvent) => {
      // Pause wall drifting while pressing a tile
      wallHoveredRef.current = true;
      tilePointerDownRef.current[id] = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      };
    };

    const handleTilePointerUp = (e: React.PointerEvent) => {
      const down = tilePointerDownRef.current[id];
      if (!down) return;
      delete tilePointerDownRef.current[id];
      const dist = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      const elapsed = Date.now() - down.time;
      // If it's a tap or click (moved < 32px to allow trackpad/touch micro-drift, released within 900ms)
      if (dist < 32 && elapsed < 900) {
        triggerClick();
      }
    };

    const handleTileClick = (e: React.MouseEvent) => {
      e.preventDefault();
      triggerClick();
    };

    const inner = (
      <span className="drift-wall__inner">
        <img src={item.image} alt={item.title ?? ''} loading="eager" decoding="async" draggable={false} />
        <span className="drift-wall__overlay" aria-hidden="true" />
        <span className="drift-wall__sheen" aria-hidden="true" />
        {(showCaptions && (item.title || isClickable)) && (
          <span className="drift-wall__caption">
            {item.title && <span className="drift-wall__caption-text">{item.title}</span>}
            {isClickable && (
              <span className="drift-wall__zoom-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </span>
            )}
          </span>
        )}
      </span>
    );

    const commonProps = {
      className: `drift-wall__tile${activeId === id ? ' is-active' : ''}${isClickable ? ' drift-wall__tile--clickable' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onPointerDown: handleTilePointerDown,
      onPointerUp: handleTilePointerUp,
      onPointerEnter: () => activate(id, colIndex),
      onFocus: () => activate(id, colIndex),
      onBlur: release,
    };

    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" onClick={handleTileClick} {...commonProps}>
          {inner}
        </a>
      );
    }
    return (
      <button
        type="button"
        key={id}
        tabIndex={isClickable ? 0 : -1}
        aria-label={item.title ?? 'Inspect gallery image'}
        onClick={handleTileClick}
        onKeyDown={item.onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.onClick?.(); } } : undefined}
        style={{ touchAction: 'manipulation' }}
        {...commonProps}
      >
        {inner}
      </button>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars as React.CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnterWall}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of tiles"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div className="drift-wall__track" ref={(el) => (trackRefs.current[c] = el)}>
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;
