import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import FadeInSection from './components/FadeInSection';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import FloatingContact from './components/FloatingContact';
import BackToTop from './components/BackToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './components/NotFoundPage';
import Hero from './sections/Hero';
import WhoWeAre from './sections/WhoWeAre';
import Values from './sections/Values';
import Services from './sections/Services';
import BrandMatters from './sections/BrandMatters';
import Gallery from './sections/Gallery';
import Partners from './sections/Partners';
import CTABand from './sections/CTABand';
import Contact from './sections/Contact';

export default function App() {
  // Custom 404 page detection
  const [is404, setIs404] = useState(() => {
    const p = window.location.pathname;
    return p !== '/' && p !== '' && p !== '/index.html';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setIs404(p !== '/' && p !== '' && p !== '/index.html');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleGoHome = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setIs404(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bulls-bg text-white overflow-x-hidden selection:bg-bulls-red/30 selection:text-white relative">
      {/* Interactive Custom Cursor with Springs */}
      <CustomCursor />

      {/* Subtle Ambient Background Mesh & Glow */}
      <AnimatedBackground />

      {/* Floating Quick Inquiry Contact Dispatch */}
      <FloatingContact />

      {/* Floating Back to Top Control */}
      <BackToTop />

      <AnimatePresence mode="wait">
        {is404 ? (
          <motion.div
            key="404-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <NotFoundPage onGoHome={handleGoHome} />
          </motion.div>
        ) : (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Accessibility: skip to main content */}
            <a href="#main-content" className="skip-nav">
              Skip to main content
            </a>

            <ScrollProgress />
            <Navbar />

            <ErrorBoundary>
              <main id="main-content">
                <Hero />
                <FadeInSection>
                  <WhoWeAre />
                </FadeInSection>
                <FadeInSection>
                  <Values />
                </FadeInSection>
                <FadeInSection>
                  <Services />
                </FadeInSection>
                <FadeInSection>
                  <BrandMatters />
                </FadeInSection>
                <FadeInSection>
                  <Gallery />
                </FadeInSection>
                <FadeInSection>
                  <Partners />
                </FadeInSection>
                <FadeInSection>
                  <CTABand />
                </FadeInSection>
                <FadeInSection>
                  <Contact />
                </FadeInSection>
              </main>
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
