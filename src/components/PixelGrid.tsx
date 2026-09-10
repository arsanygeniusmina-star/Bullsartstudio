import { useEffect, useRef } from 'react';

interface PixelGridProps {
  className?: string;
  density?: number;
  color?: string;
  animated?: boolean;
}

export default function PixelGrid({
  className = '',
  density = 40,
  color = 'rgba(227,30,36,0.08)',
  animated = true,
}: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let t = 0;
    const cols = Math.ceil(canvas.width / density);
    const rows = Math.ceil(canvas.height / density);

    // Pre-generate stable random values per cell
    const cellRand: number[][] = Array.from({ length: rows + 2 }, () =>
      Array.from({ length: cols + 2 }, () => Math.random())
    );

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentCols = Math.ceil(canvas.width / density);
      const currentRows = Math.ceil(canvas.height / density);

      for (let r = 0; r < currentRows; r++) {
        for (let c = 0; c < currentCols; c++) {
          const rand = cellRand[r % (rows + 2)]?.[c % (cols + 2)] ?? Math.random();
          const wave = animated ? Math.sin(t * 0.5 + rand * 10) * 0.5 + 0.5 : rand;
          const alpha = rand > 0.85 ? wave * 0.6 : 0;

          if (alpha > 0.02) {
            ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
            const size = Math.floor(density * 0.12);
            ctx.fillRect(c * density + (density - size) / 2, r * density + (density - size) / 2, size, size);
          }
        }
      }

      t += 0.02;
      if (animated) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [density, color, animated]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
