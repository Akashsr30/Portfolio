import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Skills = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -60]);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative w-full min-h-screen py-28 flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: "WHAT I DO" title (3D character appears here via the fixed canvas) */}
        <motion.div 
          style={{ y: y1 }}
          className="relative h-[400px] lg:h-[600px] flex flex-col justify-center items-start w-full"
        >
          {/* Huge Background Text */}
          <h2 className="text-7xl lg:text-[9rem] font-bold leading-none tracking-tighter opacity-[0.04] absolute top-0 -left-4 pointer-events-none z-0">
            WHAT<br />I DO
          </h2>
          <div className="z-10 relative">
            <p className="text-xs font-mono text-gray-500 tracking-[0.3em] uppercase mb-4">
              02 / What I Do
            </p>
            <h2 className="text-6xl lg:text-8xl font-bold leading-none tracking-tight">
              WHAT<br /><span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">I DO</span>
            </h2>
            <p className="text-gray-400 text-lg mt-6 max-w-sm leading-relaxed">
              I build digital experiences that combine clean code with stunning visuals.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Skills Details */}
        <motion.div 
          style={{ y: y2 }}
          className="flex flex-col gap-12 z-20"
        >
          {/* Programming Block */}
          <div className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/20 transition-all duration-500">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-white/10 transition-colors group-hover:border-purple-400/50 rounded-tl-md" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-white/10 transition-colors group-hover:border-pink-400/50 rounded-br-md" />
            
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              PROGRAMMING
            </h3>
            <p className="text-purple-400/80 font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
              Languages
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C', 'React', 'Next.js'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-gray-400 transition-all hover:bg-white/10 hover:border-white/20 hover:text-gray-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Tech Block */}
          <div className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/20 transition-all duration-500">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-white/10 transition-colors group-hover:border-purple-400/50 rounded-tl-md" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-white/10 transition-colors group-hover:border-pink-400/50 rounded-br-md" />
            
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              TOOLS & TECH
            </h3>
            <p className="text-pink-400/80 font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
              Frameworks & Utilities
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Git', 'n8n', 'Supabase', 'Rork', 'Firebase', 'Figma', 'Flutter', 'Antigravity'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-gray-400 transition-all hover:bg-white/10 hover:border-white/20 hover:text-gray-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Core Areas Block */}
          <div className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/20 transition-all duration-500">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-white/10 transition-colors group-hover:border-purple-400/50 rounded-tl-md" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-white/10 transition-colors group-hover:border-pink-400/50 rounded-br-md" />
            
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              CORE AREAS
            </h3>
            <p className="text-cyan-400/80 font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
              Specializations
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Frontend Development', 'UI/UX Design', 'Responsive Design', 'Workflow Automation'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-gray-400 transition-all hover:bg-white/10 hover:border-white/20 hover:text-gray-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills Block */}
          <div className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/20 transition-all duration-500">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-white/10 transition-colors group-hover:border-purple-400/50 rounded-tl-md" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-white/10 transition-colors group-hover:border-pink-400/50 rounded-br-md" />
            
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              SOFT SKILLS
            </h3>
            <p className="text-emerald-400/80 font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
              Professional Traits
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Problem Solving', 'Fast Learning', 'Adaptability', 'Teamwork'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-gray-400 transition-all hover:bg-white/10 hover:border-white/20 hover:text-gray-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
