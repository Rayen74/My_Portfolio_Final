import React from 'react';
import { Github, Linkedin, Instagram, Facebook, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { label: 'GitHub', icon: Github, url: 'https://github.com/Rayen74', color: 'hover:text-cyan-400' },
    { label: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/rayen-chaaben-562581301/', color: 'hover:text-purple-400' },
    { label: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/rayen.chaabene', color: 'hover:text-blue-400' },
    { label: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/rayene.chaaben?igsh=MTY1dXI3OGVhcWlhag==', color: 'hover:text-pink-400' },
  ];

  return (
    <footer className="relative bg-[#02040a] border-t border-white/5 py-8 px-6 md:px-12 z-10 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Stack */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-xs font-mono tracking-wider uppercase text-gray-400">
            © {new Date().getFullYear()}{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#00ffaa]">
              Rayen Chaaben
            </span>
            . All rights reserved.
          </p>
          <p className="text-[11px] font-mono text-gray-600">
            Engineered with React · Vite · Tailwind CSS · Three.js &amp; OGL Particles
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 transition-all ${s.color} hover:bg-white/10 hover:border-white/20`}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-gray-400 hover:text-white transition-colors group"
        >
          <span>Back to Top</span>
          <span className="p-1 rounded-md bg-white/5 border border-white/10 group-hover:border-white/30 transition-colors">
            <ArrowUp className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
