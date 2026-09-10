import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from '../lib/motion';

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlightWord?: string;
  highlightClass?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  highlightWord,
  highlightClass = 'text-gradient-red',
  as: Component = 'span',
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '40px' });

  const words = text.split(' ');

  return (
    <Component ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, i) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-top">
            <motion.span
              className={`inline-block ${isHighlight ? highlightClass : ''} ${wordClassName}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.65,
                delay: delay + i * 0.05,
                ease,
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}
