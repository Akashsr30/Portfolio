import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GraduationCap, MapPin, Code, User } from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%' });
  const [imgError, setImgError] = useState(false);
  const [isPicEnlarged, setIsPicEnlarged] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax transforms for the cards
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -10]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -30]);

  const paragraph =
    "Final-year B.Sc. Mathematics & Computer Science student with strong expertise in frontend development, UI/UX design, and interactive web applications. Experienced in building animation-rich websites, workflow automation, and scalable applications using modern tools. Passionate about creating visually engaging and user-centric digital experiences.";

  const words = paragraph.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0.15, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.15,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const statCards = [
    {
      icon: GraduationCap,
      label: 'Education',
      value: 'B.Sc. Mathematics & CS',
      y: y1
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bengaluru, India',
      y: y2
    },
    {
      icon: Code,
      label: 'Specialization',
      value: 'Frontend & Full Stack',
      y: y3
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 relative z-10 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full relative">
        {/* Section marker label */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[10px] font-display font-black tracking-[0.3em] text-gray-500 uppercase">
            01 / Professional Summary
          </span>
          <span className="h-[1px] w-12 bg-gray-800" />
        </motion.div>

        {/* Split layout: Text + Stats on Left, Empty Right for 3D Character */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          
          {/* ── Left Column ───────────────────── */}
          <div className="flex flex-col gap-10 md:gap-12">
            {/* Profile Picture Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex items-center gap-5 md:gap-6"
            >
              <div 
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-white/10 p-1.5 glass-card shadow-2xl group cursor-zoom-in hover:border-white/20 transition-all duration-500 flex-shrink-0"
                onClick={() => setIsPicEnlarged(true)}
              >
                <img 
                  src="./profile.jpg" 
                  alt="Akash Sai Reddy" 
                  onError={() => setImgError(true)}
                  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  style={{ display: imgError ? 'none' : 'block' }}
                />
                {imgError && (
                  <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center">
                    <User className="text-gray-400" size={40} strokeWidth={1.5} />
                  </div>
                )}
                {/* Subtle glowing ring behind */}
                <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-white/10 transition-colors -z-10" />
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2">
                 <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">Akash Sai Reddy</h3>
                 <span className="text-xs md:text-sm font-display text-gray-400 uppercase tracking-[0.2em]">Frontend & Full Stack Developer</span>
              </div>
            </motion.div>

            <motion.p
              ref={containerRef}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-sans font-light tracking-wide text-gray-300 leading-relaxed md:leading-[1.8] min-w-0"
            >
              {words.map((word, idx) => (
                 <motion.span
                   key={idx}
                   variants={wordVariants}
                   className="inline-block mr-[0.25em]"
                 >
                   {word}
                 </motion.span>
              ))}
            </motion.p>

            {/* ── Stat Cards Below Text ─────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full relative">
              {statCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-10%' }}
                  style={{ y: card.y }}
                  className="glass-card rounded-2xl p-4 md:p-5 flex flex-col items-start gap-3 group hover:border-white/15 transition-colors duration-500"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors duration-500 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
                    <card.icon
                      size={18}
                      className="text-gray-400 group-hover:text-white transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] md:text-[10px] font-display font-bold tracking-[0.25em] uppercase text-gray-500 group-hover:text-gray-400 transition-colors">
                      {card.label}
                    </span>
                    <span className="text-sm md:text-base font-display font-semibold text-gray-200 tracking-tight group-hover:text-white transition-colors">
                      {card.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right Column (Empty for 3D Character) ─────────────── */}
          <div className="hidden lg:block w-full h-full min-h-[500px]"></div>

        </div>
      </div>

      {/* ── Profile Picture Lightbox ────────────────────── */}
      <AnimatePresence>
        {isPicEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 cursor-zoom-out"
            onClick={() => setIsPicEnlarged(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[85vw] max-w-[400px] aspect-square rounded-[3rem] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {imgError ? (
                <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center">
                  <User className="text-gray-400" size={120} strokeWidth={1} />
                </div>
              ) : (
                <img 
                  src="./profile.jpg" 
                  alt="Akash Sai Reddy" 
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white/70 hover:text-white rounded-full p-3 hover:bg-black/60 transition-all duration-300 border border-white/10"
                onClick={() => setIsPicEnlarged(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
