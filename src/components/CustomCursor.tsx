import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad) and not reduced-motion
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number | null = null;
    let isMoving = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        setVisible(true);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const render = () => {
      // Smooth ring lerp without physics calculation overhead
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Precision Core Dot — Zero Blend Repaint Overhead */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            hovered ? 'w-3.5 h-3.5 bg-bulls-red shadow-[0_0_12px_#E31E24]' : 'w-2 h-2 bg-white'
          }`}
        />
      </div>

      {/* Reticle Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            hovered
              ? 'w-9 h-9 border-bulls-red bg-bulls-red/10 scale-110'
              : 'w-7 h-7 border-bulls-red/40 scale-100'
          }`}
        />
      </div>
    </>
  );
}
