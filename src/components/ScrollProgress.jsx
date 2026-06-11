import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  // Smooth spring for the progress so it doesn't feel jittery
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale from 0 to 1 for the bar width
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Opacity: hidden at top, visible once scrolling begins
  const opacity = useTransform(smoothProgress, [0, 0.01, 0.02], [0, 0.5, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px]"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Main progress bar */}
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.95) 100%)',
        }}
      />

      {/* Glow tip — positioned at the leading edge */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          left: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
          width: '80px',
          height: '6px',
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)',
          filter: 'blur(4px)',
          transform: 'translateX(-40px) translateY(-50%)',
        }}
      />
    </motion.div>
  );
};

export default ScrollProgress;
