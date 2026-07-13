import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Download } from 'lucide-react';
import useMagnetic from '../hooks/useMagnetic';

const Resume = () => {
  const magneticRef = useMagnetic(0.25);
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="w-full py-32 px-6 md:px-12 relative z-10 select-none"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-[10px] font-display font-black tracking-[0.3em] text-gray-500 uppercase">
            06 / Resume
          </span>
          <span className="h-[1px] w-12 bg-gray-800" />
        </motion.div>

        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Animated border gradient */}
          <div className="absolute -inset-[1px] rounded-[2rem] overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.08) 10%, transparent 20%, transparent 50%, rgba(255,255,255,0.06) 60%, transparent 70%)',
                animation: 'spin 8s linear infinite',
              }}
            />
          </div>

          <div className="glass rounded-[2rem] border border-white/[0.06] relative overflow-hidden">
            {/* Decorative corner element — top left */}
            <div className="absolute top-6 left-6 pointer-events-none">
              <div className="w-12 h-[1px] bg-white/10" />
              <div className="w-[1px] h-12 bg-white/10" />
            </div>

            {/* Decorative corner element — bottom right */}
            <div className="absolute bottom-6 right-6 pointer-events-none">
              <div className="w-12 h-[1px] bg-white/10 ml-auto" />
              <div className="w-[1px] h-12 bg-white/10 ml-auto" />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center text-center py-20 sm:py-28 px-8 sm:px-16 relative z-10">
              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/[0.015] rounded-full blur-[80px] pointer-events-none" />

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-5"
              >
                MY RESUME
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base font-sans font-light text-gray-400 leading-relaxed max-w-md mb-12"
              >
                Download my detailed resume to learn more about my experience, skills, and projects.
              </motion.p>

              {/* Magnetic Download Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href="./resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  ref={magneticRef}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/15 rounded-full font-display font-semibold text-sm tracking-wide text-white transition-all duration-500 cursor-pointer"
                >
                  <Download
                    size={18}
                    className="text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:-translate-y-0.5 transform"
                  />
                  Download Resume
                </a>
              </motion.div>

              {/* Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="text-[11px] font-sans text-gray-600 mt-6 tracking-wide"
              >
                PDF • Updated 2026
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spin keyframe for gradient border */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Resume;
