import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import NoiseOverlay from './components/NoiseOverlay';
import ScrollProgress from './components/ScrollProgress';
import PortfolioCanvas from './components/PortfolioCanvas';
import FloatingOrbs from './components/FloatingOrbs';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import SelectedWorks from './components/SelectedWorks';
import Skills from './components/Skills';
import Education from './components/Education';
import Resume from './components/Resume';
import Footer from './components/Footer';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!preloaderDone) return;

    // Initialize Lenis smooth scroll after preloader finishes
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.3,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Dynamic scroll interceptor for Lenis smooth navigation
    const handleAnchorScroll = (e) => {
      const targetLink = e.target.closest('a[href^="#"]');
      if (targetLink) {
        e.preventDefault();
        const targetId = targetLink.getAttribute('href');
        if (targetId === '#') {
          lenis.scrollTo(0);
        } else {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            lenis.scrollTo(targetEl, { offset: -30 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorScroll);

    // Observer to track which section is currently focused
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Triggers when 30% of the section is visible
    );

    // Observe all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorScroll);
      observer.disconnect();
    };
  }, [preloaderDone]);

  return (
    <>
      {/* Cinematic Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Film Grain Noise Texture */}
      <NoiseOverlay />

      {preloaderDone && (
        <div className="relative min-h-screen bg-[#030303] text-gray-100 selection:bg-white selection:text-black antialiased font-sans overflow-x-hidden">
          {/* Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Ambient Floating Gradient Orbs */}
          <FloatingOrbs />

          {/* Interactive Flow-Field Background */}
          <BackgroundCanvas />

          {/* 3D Character Canvas (fixed, follows scroll) */}
          <PortfolioCanvas activeSection={activeSection} />

          {/* Custom Blending Cursor */}
          <CustomCursor />

          {/* Floating Glassmorphic Header */}
          <Navbar />

          {/* Portfolio Sections */}
          <main className="relative z-10 w-full flex flex-col items-center">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <SelectedWorks />
            <Education />
            <Resume />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
