import { useScroll, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #E31E24, #8B0000)',
      }}
      aria-hidden="true"
    />
  );
}
