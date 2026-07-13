import React from 'react';
import { motion } from 'framer-motion';

const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Orb 1: Purple-ish */}
      <motion.div
        animate={{
          x: [0, 80],
          y: [0, 60],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #4a0080 0%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      {/* Orb 2: Blue-ish */}
      <motion.div
        animate={{
          x: [0, -60],
          y: [0, 80],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #001a4a 0%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      {/* Orb 3: Warm tint */}
      <motion.div
        animate={{
          x: [0, 70],
          y: [0, -50],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute bottom-[10%] -left-[5%] w-[450px] h-[450px] rounded-full blur-[150px] opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #2a1a00 0%, transparent 70%)',
          willChange: 'transform'
        }}
      />
    </div>
  );
};

export default FloatingOrbs;
