import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState({
    type: 'default',
    text: '',
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth, lagging spring animation for the outer ring
  const springConfig = { damping: 25, stiffness: 220, mass: 0.65 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide default cursor in desktop viewports
    if (window.innerWidth >= 768) {
      document.body.style.cursor = 'none';
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Global listener for interactive custom cursor data attributes
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorState({ type, text });
      } else {
        // Match standard links or buttons
        if (
          e.target.tagName === 'A' ||
          e.target.closest('a') ||
          e.target.tagName === 'BUTTON' ||
          e.target.closest('button')
        ) {
          setCursorState({ type: 'hover', text: '' });
        } else {
          setCursorState({ type: 'default', text: '' });
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const isHovered = cursorState.type === 'hover';
  const isView = cursorState.type === 'view';
  const isLink = cursorState.type === 'link';

  let cursorSize = 20;
  if (isHovered) cursorSize = 48;
  if (isView) cursorSize = 80;
  if (isLink) cursorSize = 64;

  return (
    <>
      {/* Precision center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Lagging outer tracking circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white pointer-events-none z-50 flex items-center justify-center text-[10px] font-display font-semibold tracking-widest mix-blend-difference hidden md:flex"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorSize,
          height: cursorSize,
        }}
        animate={{
          scale: 1,
          backgroundColor: isView || isLink ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          borderColor: isView || isLink ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.35 }}
      >
        {(isView || isLink) && (
          <span className="text-black font-extrabold uppercase select-none">
            {cursorState.text || (isView ? 'VIEW' : 'LINK')}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
