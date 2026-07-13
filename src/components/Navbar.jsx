import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import useMagnetic from '../hooks/useMagnetic';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const brandRef = useMagnetic(0.2);
  const contactRef = useMagnetic(0.25);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Works', href: '#works' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Resume', href: '#resume' },
  ];

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl px-6 py-4 glass rounded-full flex items-center justify-between transition-all duration-500">
        {/* Brand Logo with magnetic interaction */}
        <a
          href="#"
          ref={brandRef}
          className="flex items-center gap-1.5 font-display text-sm font-black tracking-widest text-white cursor-pointer select-none"
        >
          A.S.R
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-sans text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-white transition-colors duration-300 relative py-1 group cursor-pointer"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Dynamic Magnetic Action Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            ref={contactRef}
            className="px-5 py-2 text-[9px] font-display font-black uppercase tracking-widest bg-white text-black border border-white rounded-full hover:bg-transparent hover:text-white transition-all duration-300 select-none shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          >
            Connect
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden text-white focus:outline-none cursor-pointer p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Drawer (Framer Motion Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[90%] py-6 px-8 glass rounded-2xl flex flex-col gap-4 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-xs uppercase font-bold tracking-widest text-gray-400 hover:text-white py-2 transition-colors border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 py-3 text-center text-[10px] font-display font-black uppercase tracking-widest bg-white text-black rounded-full select-none"
            >
              Let's Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
