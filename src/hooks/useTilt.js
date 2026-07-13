import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const useTilt = (maxTilt = 8, scale = 1.02) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance from center (-1 to 1)
      const xVal = (mouseX - centerX) / (rect.width / 2);
      const yVal = (mouseY - centerY) / (rect.height / 2);

      // Calculate rotation
      const rotateX = -(yVal * maxTilt);
      const rotateY = xVal * maxTilt;

      gsap.to(el, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: scale,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 800,
        transformOrigin: 'center center',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale]);

  return ref;
};

export default useTilt;
