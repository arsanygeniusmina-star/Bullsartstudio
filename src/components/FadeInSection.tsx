import { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  id?: string;
}

export default function FadeInSection({
  children,
  className = '',
  delay = 0,
  threshold = 0.08,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  id,
}: FadeInSectionProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  return (
    <div
      id={id}
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 will-change-[opacity,transform]'
      } ${className}`}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
