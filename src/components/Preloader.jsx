import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const progress = useMotionValue(0);
  const scaleX = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCounter(Math.round(v)),
      onComplete: () => {
        setTimeout(() => setIsExiting(true), 300);
        // Fire onComplete after exit animation duration
        setTimeout(() => onComplete?.(), 1200);
      },
    });

    return () => controls.stop();
  }, []);

  const nameText = 'AKASH SAI REDDY';

  return (
    <motion.div
      animate={isExiting ? { y: '-100%' } : { y: '0%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#030303', pointerEvents: isExiting ? 'none' : 'auto' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Name reveal */}
      <div className="relative mb-12 flex overflow-hidden" style={{ perspective: '600px' }}>
        {nameText.split('').map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 0.2 + i * 0.05,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block font-display text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[0.3em] text-white/90"
            style={{
              transformOrigin: 'center bottom',
              marginRight: letter === ' ' ? '0.6em' : '0.02em',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative w-[280px] sm:w-[320px]">
        <div className="relative h-[1px] w-full overflow-hidden bg-white/[0.08]">
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left"
            style={{
              scaleX,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.9) 100%)',
            }}
          />
        </div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-5 flex justify-end"
        >
          <span className="font-display text-xs font-light tracking-[0.25em] text-white/40 tabular-nums">
            {counter}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
