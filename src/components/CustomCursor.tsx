import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);

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
    let isVisible = false;
    let rafId: number | null = null;
    let isLooping = false;

    const render = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;

      // Smooth ring lerp
      ringX += dx * 0.28;
      ringY += dy * 0.28;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // If ring is close enough to target, stop loop to save CPU/GPU cycles
      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        ringX = mouseX;
        ringY = mouseY;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
        isLooping = false;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isLooping) {
        isLooping = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      startLoop();
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target && target.closest('a, button, [role="button"], input, textarea, select, label, .cursor-pointer')
      );

      if (innerDotRef.current && innerRingRef.current) {
        if (isInteractive) {
          innerDotRef.current.className =
            'rounded-full transition-all duration-150 w-3.5 h-3.5 bg-bulls-red shadow-[0_0_12px_#E31E24]';
          innerRingRef.current.className =
            'rounded-full border transition-all duration-200 w-9 h-9 border-bulls-red bg-bulls-red/10 scale-110';
        } else {
          innerDotRef.current.className =
            'rounded-full transition-all duration-150 w-2 h-2 bg-white';
          innerRingRef.current.className =
            'rounded-full border transition-all duration-200 w-7 h-7 border-bulls-red/40 scale-100';
        }
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

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={innerDotRef}
          className="rounded-full transition-all duration-150 w-2 h-2 bg-white"
        />
      </div>

      {/* Reticle Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] opacity-0 transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={innerRingRef}
          className="rounded-full border transition-all duration-200 w-7 h-7 border-bulls-red/40 scale-100"
        />
      </div>
    </>
  );
}
