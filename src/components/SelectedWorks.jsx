import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import useTilt from '../hooks/useTilt';
import useTextScrambleHover from '../hooks/useTextScrambleHover';

const projects = [
  {
    title: 'Visages Website',
    category: 'Creative Development',
    description:
      'Developed a visually rich and interactive website with advanced animations and modern UI/UX. Ensured full responsiveness and optimized performance across devices. Focused on enhancing user engagement through intuitive and aesthetic design.',
    tags: ['React', 'Framer Motion', 'GSAP', 'UI/UX'],
    gradient: 'from-[#0a0a1a] to-[#0a1a2a]',
    link: 'https://akashsr30.github.io/Visages-website/',
  },
  {
    title: 'INK App',
    category: 'Full-Stack Production',
    description:
      'Designed and developed a scalable application using modern frontend and backend integration. Worked with structured workflows and backend services (Supabase). Focused on clean UI, usability, and real-world application logic.',
    tags: ['Supabase', 'React Native', 'n8n', 'Tailwind CSS'],
    gradient: 'from-[#0a1a0a] to-[#0a0a1a]',
    link: '',
  },
  {
    title: 'Doodle Quest',
    category: 'HTML5 Game Development',
    description:
      'Built a 2D platformer using JavaScript and HTML5 Canvas. Implemented a unique draw-your-own-character mechanic. Designed multiple levels, enemy AI, and boss battle systems.',
    tags: ['HTML5 Canvas', 'JavaScript', 'Game Loop', 'AI Engine'],
    gradient: 'from-[#1a0a1a] to-[#0a0a1a]',
    link: 'https://akashsr30.github.io/Doodle-Quest/',
  },
  {
    title: 'Client Websites',
    category: 'Freelance Agency Works',
    description:
      'Developed 4+ animation-rich websites for real-time clients (interior design, photography, print services). Focused heavily on aesthetics, scroll performance, and fluid layout standards.',
    tags: ['Animation', 'Responsive', 'Aesthetics', 'Performance'],
    gradient: 'from-[#0a0a0a] to-[#1a0f0a]',
    link: '',
  },
];

const ProjectCard = ({ project, idx, scrollYProgress }) => {
  const number = String(idx + 1).padStart(2, '0');
  const tiltRef = useTilt(10, 1.03); // Max tilt 10deg, scale 1.03
  const scramble = useTextScrambleHover(project.title);

  // Parallax: Even items scroll normally, odd items scroll faster/slower
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    idx % 2 === 0 ? [50, -50] : [120, -120]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.8,
        delay: (idx % 2) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ y: yParallax }}
      className="relative z-10"
    >
      <div
        ref={tiltRef}
        {...scramble.bind}
        onClick={() => project.link && window.open(project.link, '_blank')}
        data-cursor="view"
        data-cursor-text="OPEN"
        className="group relative rounded-[2rem] border border-white/[0.06] overflow-hidden cursor-pointer h-full min-h-[360px] animated-border"
        style={{ willChange: 'transform' }}
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80 transition-opacity duration-500 group-hover:opacity-100`} />

        {/* Glass overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        {/* Large faint number */}
        <div className="absolute -right-4 -top-6 select-none pointer-events-none">
          <span className="text-[9rem] font-display font-black leading-none text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-700">
            {number}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-10 pointer-events-none">
          {/* Top: Category + Link */}
          <div className="flex items-start justify-between">
            <span className="px-3 py-1.5 bg-white/[0.06] border border-white/[0.06] rounded-full backdrop-blur-md">
              <span className="text-[9px] font-display font-bold tracking-[0.15em] text-gray-400 uppercase">
                {project.category}
              </span>
            </span>
            <div className="p-2 bg-white/[0.04] border border-white/[0.06] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <ExternalLink size={13} className="text-white/90" />
            </div>
          </div>

          {/* Middle: Title + Description */}
          <div className="flex flex-col gap-3 mt-auto mb-6">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight uppercase font-variant-numeric-tabular">
              {scramble.displayText}
            </h3>
            <p className="text-[13px] font-sans font-light leading-relaxed text-gray-400/90 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
              {project.description}
            </p>
          </div>

          {/* Bottom: Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[8px] font-display font-bold tracking-[0.12em] uppercase bg-white/[0.05] text-gray-400 rounded-full border border-white/[0.06] group-hover:border-white/20 transition-colors duration-300 group-hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ambient Hover glow */}
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.03)]" />
      </div>
    </motion.div>
  );
};

const SelectedWorks = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="works"
      ref={sectionRef}
      className="w-full py-28 px-6 md:px-12 relative z-10 select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-[10px] font-display font-black tracking-[0.3em] text-gray-500 uppercase">
            03 / Selected Works
          </span>
          <span className="h-[1px] w-12 bg-gray-800" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 perspective-[1200px]">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
