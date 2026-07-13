import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, ShieldCheck } from 'lucide-react';

const Education = () => {
  return (
    <section
      id="education"
      className="w-full py-28 px-6 md:px-12 relative z-10 select-none"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-[10px] font-display font-black tracking-[0.3em] text-gray-500 uppercase">
            05 / Education & Achievements
          </span>
          <span className="h-[1px] w-12 bg-gray-800" />
        </motion.div>

        {/* Education & Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Education */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 sm:p-10 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all duration-500 flex flex-col gap-6 hover:scale-[1.01]"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-gray-500 uppercase">
                  Education
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-1">
                  St. Joseph's University
                </h3>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-gray-400 group-hover:text-white transition-colors duration-300">
                <GraduationCap size={16} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs sm:text-sm font-sans text-gray-400 font-light leading-relaxed">
                B.Sc. Mathematics & Computer Science
              </p>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <Calendar size={12} />
                <span className="text-[9px] font-display font-bold tracking-wider uppercase">
                  Aug 2023 - Present
                </span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 mt-auto">
              <span className="text-[9px] font-display font-black tracking-widest text-gray-500 uppercase">
                Focus Areas
              </span>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {["Pure Mathematics", "Computer Science", "Algorithms", "Software Engineering"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[8px] font-display font-bold tracking-widest bg-white/5 text-gray-400 rounded-full border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 sm:p-10 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all duration-500 flex flex-col gap-6 hover:scale-[1.01]"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="text-[9px] font-display font-black tracking-widest text-gray-500 uppercase">
                  Achievements
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-1">
                  Honors & Badges
                </h3>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-gray-400 group-hover:text-white transition-colors duration-300">
                <Award size={16} />
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-2 relative z-10 overflow-hidden">
              {/* Item 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-3.5"
              >
                <div className="p-2 bg-white/5 border border-white/5 rounded-xl text-white shrink-0 mt-0.5 opacity-80">
                  <Award size={13} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-display font-bold text-white uppercase tracking-wider">
                    1st Place - Slalom Skiing
                  </h4>
                  <p className="text-[10px] sm:text-xs font-sans text-gray-400 font-light mt-1 leading-relaxed">
                    Jawahar Institute of Mountaineering & Winter Sports (JIM & WS).
                  </p>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex items-start gap-3.5 mt-2"
              >
                <div className="p-2 bg-white/5 border border-white/5 rounded-xl text-white shrink-0 mt-0.5 opacity-80">
                  <ShieldCheck size={13} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-display font-bold text-white uppercase tracking-wider">
                    NCC Cadet (B Certificate)
                  </h4>
                  <p className="text-[10px] sm:text-xs font-sans text-gray-400 font-light mt-1 leading-relaxed">
                    National Cadet Corps training developing high discipline, leadership, and public safety values.
                  </p>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: 0.60 }}
                className="flex items-start gap-3.5 mt-2"
              >
                <div className="p-2 bg-white/5 border border-white/5 rounded-xl text-white shrink-0 mt-0.5 opacity-80">
                  <Award size={13} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-display font-bold text-white uppercase tracking-wider">
                    Cultural Competitions
                  </h4>
                  <p className="text-[10px] sm:text-xs font-sans text-gray-400 font-light mt-1 leading-relaxed">
                    Active participant and winner in multiple cultural competitions.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Card 3: Interests & Languages (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 lg:mt-10 glass-card p-8 sm:p-10 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all duration-500 hover:scale-[1.005]"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative z-10">
            
            {/* Interests Column */}
            <div>
              <span className="text-[9px] font-display font-black tracking-widest text-gray-500 uppercase">
                Personal Life
              </span>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-1 mb-6">
                Interests & Hobbies
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {['Football', 'Formula 1', 'Gaming', 'Music', 'Movies'].map(interest => (
                  <span key={interest} className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-gray-300 shadow-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages Column */}
            <div>
              <span className="text-[9px] font-display font-black tracking-widest text-gray-500 uppercase">
                Communication
              </span>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white mt-1 mb-6">
                Languages Known
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-sm font-bold text-white tracking-wide">English</span>
                  <span className="text-[10px] font-display uppercase tracking-widest text-emerald-400">Upper Intermediate</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-sm font-bold text-white tracking-wide">Hindi</span>
                  <span className="text-[10px] font-display uppercase tracking-widest text-emerald-400">Upper Intermediate</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-sm font-bold text-white tracking-wide">Tamil, Kannada, Telugu</span>
                  <span className="text-[10px] font-display uppercase tracking-widest text-cyan-400">Proficient</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
