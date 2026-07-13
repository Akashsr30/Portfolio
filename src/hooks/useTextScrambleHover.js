import { useState, useRef, useCallback } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

const useTextScrambleHover = (originalText) => {
  const [displayText, setDisplayText] = useState(originalText);
  const ref = useRef(null);
  const intervalRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let frame = 0;
    const totalFrames = 20; // Fast scramble
    const chars = originalText.split('');
    
    intervalRef.current = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      const scrambled = chars.map((char, i) => {
        if (char === ' ') return ' ';
        // Lock left to right
        if (progress > i / chars.length + 0.2) {
          return char;
        }
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
      
      setDisplayText(scrambled);
      
      if (frame >= totalFrames) {
        clearInterval(intervalRef.current);
        setDisplayText(originalText);
      }
    }, 20); // 20ms per frame -> 400ms total
  }, [originalText]);

  const handleMouseLeave = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(originalText);
  }, [originalText]);

  // Bind to ref
  const bind = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };

  return { ref, bind, displayText };
};

export default useTextScrambleHover;
