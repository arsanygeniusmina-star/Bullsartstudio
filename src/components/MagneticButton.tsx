import { useRef, useState, ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const centerRef = useRef<{ x: number; y: number } | null>(null);

  const springConfig = { stiffness: 260, damping: 20 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseEnter = () => {
    setHovered(true);
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!centerRef.current) return;
    const distanceX = (e.clientX - centerRef.current.x) * strength;
    const distanceY = (e.clientY - centerRef.current.y) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    centerRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block cursor-pointer ${className}`}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e as unknown as React.MouseEvent<HTMLDivElement>); } } : undefined}
    >
      <motion.div
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
