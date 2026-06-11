import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

const Experience = () => {
  const points = [
    "Developed and deployed dynamic client websites using HTML, CSS, and JavaScript.",
    "Automated email workflows and outreach using n8n, improving operational efficiency.",
    "Applied UI/UX principles to enhance cross-device user experience.",
    "Delivered high-quality projects in a fast-paced startup environment."
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const pointVariants = {
    hidden: { opacity: 0, x: -15, scaleX: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="experience"
      className="w-full py-28 px-6 md:px-12 relative z-10 select-none"
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
            02 / Work Experience
          </span>
          <span className="h-[1px] w-12 bg-gray-800" />
        </motion.div>

        {/* Divider glow */}
        <div className="divider-glow w-full mb-16" />

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_2.5fr] gap-10 md:gap-12 relative">
          {/* Vertical timeline connector (desktop) */}
          <div className="hidden md:block absolute left-[calc(30.5%)] top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

          {/* Left Metadata Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-3 relative"
          >
            {/* Timeline dot */}
            <div className="hidden md:block absolute -right-[22px] top-2 w-2.5 h-2.5 rounded-full bg-white/20 border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.15)]" />

            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={13} />
              <span className="text-[10px] font-display font-bold uppercase tracking-widest">
                Jan 2025 - Feb 2025
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight leading-tight">
              Quapri Quality Prints & Works
            </h3>
            <p className="text-[10px] font-sans text-gray-500 uppercase tracking-widest font-bold">
              Bengaluru, India
            </p>
          </motion.div>

          {/* Right Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 sm:p-10 rounded-[2rem] relative overflow-hidden group hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-500"
          >
            {/* Corner glowing blur element */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-white/[0.04] rounded-full blur-[80px] group-hover:bg-white/[0.08] transition-all duration-700 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-36 h-36 bg-white/[0.02] rounded-full blur-[60px] pointer-events-none" />

            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-gray-500 uppercase">
                  Internship
                </span>
                <h4 className="text-lg sm:text-xl font-display font-bold text-white mt-1">
                  Frontend Developer Intern
                </h4>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-gray-400 group-hover:text-white transition-colors duration-300">
                <Briefcase size={16} />
              </div>
            </div>

            {/* Bullets List */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-15%' }}
              className="flex flex-col gap-4 relative z-10"
            >
              {points.map((point, idx) => (
                <motion.li
                  key={idx}
                  variants={pointVariants}
                  className="flex items-start gap-3.5 text-xs sm:text-sm font-sans font-light leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-500 relative"
                >
                  <span className="text-[10px] font-display font-black tracking-widest text-white/10 mt-0.5 select-none w-5">
                    0{idx + 1}
                  </span>
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle2
                      size={14}
                      className="text-white shrink-0 mt-1 opacity-50"
                    />
                    <span>{point}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Skills used tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
              {["HTML/CSS", "JavaScript", "n8n", "UI/UX", "Responsive Design"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[8px] font-display font-bold tracking-widest bg-white/[0.04] text-gray-500 rounded-full border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
