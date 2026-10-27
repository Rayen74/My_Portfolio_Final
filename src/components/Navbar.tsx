import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Download, ArrowUpRight } from 'lucide-react';
import { downloadCV } from '../utils/downloadCv';

interface NavbarProps {
  onOpenChat: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#04060f]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-3 group"
          aria-label="Rayen Chaaben Portfolio Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-[#00ffaa]/20 border border-cyan-400/40 p-1 flex items-center justify-center overflow-hidden group-hover:border-cyan-300 transition-colors">
            <img
              src="/assets/LogoRayen.png"
              alt="Rayen Chaaben Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to text initials if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-mono text-xs font-bold text-cyan-400">RC</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-sm text-white tracking-wide group-hover:text-cyan-300 transition-colors">
              Rayen Chaaben
            </span>
            <span className="font-mono text-[10px] text-cyan-400 tracking-wider uppercase">
              AI Full-Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all relative ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-400/10 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-[#00ffaa] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenChat}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-300 transition-all shadow-[0_0_12px_rgba(0,255,255,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Companion</span>
          </button>

          <a
            href="/api/download-cv"
            onClick={downloadCV}
            download="Rayen_Chaaben_CV.pdf"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-[0_0_16px_rgba(0,255,255,0.3)] transition-all cursor-pointer"
            title="Download Rayen Chaaben CV (PDF)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 bg-white/5 border border-white/10 hover:text-white"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-4 right-4 bg-[#070c1b]/95 border border-white/10 rounded-2xl p-5 backdrop-blur-2xl shadow-2xl flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left py-2 px-3 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-2.5 px-3 text-xs font-mono font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 rounded-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Companion</span>
            </button>
            <a
              href="/api/download-cv"
              onClick={downloadCV}
              download="Rayen_Chaaben_CV.pdf"
              className="w-full py-2.5 px-3 text-xs font-bold text-center text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
