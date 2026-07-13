import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import useMagnetic from '../hooks/useMagnetic';

const Footer = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const titleRef = useMagnetic(0.12);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const socials = [
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/akash-sai-reddy-418306332",
      icon: (
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      label: "GitHub",
      url: "https://github.com/Akashsr30",
      icon: (
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    }
  ];

  return (
    <footer
      id="contact"
      className="w-full pt-32 pb-16 px-6 md:px-12 relative z-10 select-none border-t border-white/5 bg-gradient-to-b from-transparent to-[#050505]"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-24">
        {/* Divider glow */}
        <div className="divider-glow w-full" />

        {/* Massive Call To Action */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="view"
            data-cursor-text="SAY HI"
            className="cursor-pointer"
            onClick={() => {
              window.location.href = "mailto:akashsaireddy627@gmail.com";
            }}
          >
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter text-white uppercase leading-none bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent transition-all duration-500 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              LET'S WORK
              <br />
              TOGETHER.
            </h2>
          </motion.div>
        </div>

        {/* Contacts details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-16">
          {/* Left Column: Direct Contacts */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-display font-black tracking-[0.35em] text-gray-500 uppercase">
              Direct Contact Details
            </span>

            {/* Email Contact Card */}
            <div className="flex items-center justify-between glass-card p-5 rounded-2xl group hover:border-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-gray-400">
                  <Mail size={15} />
                </div>
                <div>
                  <span className="text-[9px] font-display font-bold tracking-wider text-gray-500 uppercase">
                    Email
                  </span>
                  <p className="text-xs sm:text-sm font-sans font-light text-white mt-0.5">
                    akashsaireddy627@gmail.com
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard("akashsaireddy627@gmail.com", "email")}
                className="p-2.5 bg-white/5 hover:bg-white text-gray-400 hover:text-black rounded-lg transition-colors border border-white/5 cursor-pointer"
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>

            {/* Phone Contact Card */}
            <div className="flex items-center justify-between glass-card p-5 rounded-2xl group hover:border-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-gray-400">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="text-[9px] font-display font-bold tracking-wider text-gray-500 uppercase">
                    Phone
                  </span>
                  <p className="text-xs sm:text-sm font-sans font-light text-white mt-0.5">
                    +91 7483673620
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard("+91 7483673620", "phone")}
                className="p-2.5 bg-white/5 hover:bg-white text-gray-400 hover:text-black rounded-lg transition-colors border border-white/5 cursor-pointer"
                aria-label="Copy Phone"
              >
                {copiedPhone ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>

            {/* Geographic Hub Info */}
            <div className="flex items-center gap-3 px-2 text-gray-500">
              <MapPin size={13} />
              <span className="text-[10px] font-display font-bold tracking-wider uppercase">
                Bengaluru, Karnataka, India
              </span>
            </div>
          </div>

          {/* Right Column: Social Links & Copyright */}
          <div className="flex flex-col justify-between gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-display font-black tracking-[0.35em] text-gray-500 uppercase">
                Interactive Channels
              </span>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between glass-card p-5 rounded-2xl group hover:border-white/10 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
                  >
                    <span className="text-xs font-display font-bold uppercase tracking-wider text-white group-hover:text-black transition-colors duration-300">
                      {social.label}
                    </span>
                    <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-black group-hover:bg-black/5 transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Credits Metadata */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 text-[9px] font-display font-bold tracking-widest text-gray-500 uppercase gap-4">
              <span>© 2026 AKASH SAI REDDY</span>
              <span>All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
