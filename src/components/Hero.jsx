import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import useMagnetic from '../hooks/useMagnetic';

/* ── Text Scramble Hook ─────────────────────────────────────── */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?';

function useTextScramble(finalText, { delay = 400, duration = 1800 } = {}) {
  const [display, setDisplay] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const chars = finalText.split('');
    const totalFrames = 30; // iterations
    const interval = duration / totalFrames;
    let frame = 0;

    const timer = setTimeout(() => {
      const id = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const built = chars
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            // Characters lock in progressively from left to right
            const lockAt = i / chars.length;
            if (progress > lockAt + 0.35) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('');
        setDisplay(built);

        if (frame >= totalFrames) {
          clearInterval(id);
          setDisplay(finalText);
        }
      }, interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [finalText, delay, duration]);

  return display;
}

/* ── Counter Hook ───────────────────────────────────────────── */
function useCountUp(end, duration = 1600, inView = false) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const id = setInterval(() => {
      current++;
      const progress = current / steps;
      // easeOutExpo curve
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * end));
      if (current >= steps) {
        clearInterval(id);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(id);
  }, [end, duration, inView]);

  return count;
}

/* ── Hero Component ─────────────────────────────────────────── */
const Hero = () => {
  const viewWorkRef = useMagnetic(0.2);
  const connectRef = useMagnetic(0.2);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-5%' });

  const scrambledName = useTextScramble('AKASH SAI REDDY', {
    delay: 600,
    duration: 2000,
  });

  const projectCount = useCountUp(4, 1600, statsInView);
  const yearsCount = useCountUp(1, 1200, statsInView);
  const techCount = useCountUp(10, 1800, statsInView);

  const tagline = 'Frontend & Full Stack Developer';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const stats = [
    { value: projectCount, suffix: '+', label: 'Projects' },
    { value: yearsCount, suffix: '+', label: 'Years Exp.' },
    { value: techCount, suffix: '+', label: 'Technologies' },
  ];

  const { scrollYProgress } = useScroll({
    target: statsRef, // A reference in the middle of hero
    offset: ['start center', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="hero" className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-6 z-10 select-none">
      {/* ── Available for Work Badge ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2.5 glass rounded-full px-4 py-2.5 z-20"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
        </span>
        <span className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-gray-300">
          Available for Work
        </span>
      </motion.div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 items-center h-full mt-16">
        {/* Empty left column for 3D Character */}
        <div className="hidden lg:block w-full h-full pointer-events-none"></div>

        {/* Right column for Hero Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-5 md:gap-7"
        >
          {/* ── Decorative Line Top ────────────────────────────── */}
          <motion.div
            variants={lineVariants}
            className="h-[1px] w-32 md:w-48 bg-gradient-to-r from-transparent via-gray-600 to-transparent lg:from-gray-600 origin-left"
          />

          {/* ── Staggered Tagline ──────────────────────────────── */}
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm font-display font-black tracking-[0.3em] text-gray-400 uppercase flex flex-wrap justify-center lg:justify-start gap-[0.08em]"
          >
          {tagline.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + i * 0.025,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={char === ' ' ? 'w-[0.35em]' : ''}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.p>

        {/* ── Scramble Name Title ────────────────────────────── */}
        <div className="overflow-hidden py-3 clip-text">
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-[5.5rem] font-display font-black tracking-tight text-white uppercase leading-none bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {scrambledName || '\u00A0'}
          </motion.h1>
        </div>

        {/* ── Decorative Line Below Name ─────────────────────── */}
        <motion.div
          variants={lineVariants}
          className="h-[1px] w-20 md:w-32 bg-gradient-to-r from-transparent via-gray-700 to-transparent lg:from-gray-700 origin-left"
        />

        {/* ── Description ────────────────────────────────────── */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-xs sm:text-sm md:text-base text-gray-400 font-sans font-light leading-relaxed px-4 lg:px-0"
        >
          Final-year B.Sc. Mathematics &amp; Computer Science student building
          scalable applications and animation-rich experiences.
        </motion.p>

        {/* ── Animated Stats Row ─────────────────────────────── */}
        <motion.div
          ref={statsRef}
          variants={itemVariants}
          className="flex items-center gap-6 sm:gap-10 md:gap-14 mt-2"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tabular-nums">
                {stat.value}
                <span className="text-gray-500">{stat.suffix}</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-display font-bold tracking-[0.2em] uppercase text-gray-500">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── CTA Buttons ────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-4"
        >
          <a
            href="#works"
            ref={viewWorkRef}
            data-cursor="view"
            data-cursor-text="WORK"
            className="w-48 sm:w-auto px-8 py-4 text-[10px] font-display font-black uppercase tracking-widest bg-white text-black border border-white rounded-full hover:bg-transparent hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer text-center"
          >
            View Work
          </a>
          <a
            href="#contact"
            ref={connectRef}
            className="w-48 sm:w-auto px-8 py-4 text-[10px] font-display font-black uppercase tracking-widest bg-transparent text-white border border-white/20 rounded-full hover:border-white transition-colors duration-300 cursor-pointer text-center"
          >
            Let's Connect
          </a>
        </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: [0, 12, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 0.6 },
          y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 cursor-pointer text-gray-400 hover:text-white transition-colors duration-300"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] font-display font-bold tracking-[0.25em] uppercase select-none">
          Scroll
        </span>
        <ArrowDown size={12} className="opacity-80" />
      </motion.div>
    </section>
  );
};

export default Hero;
