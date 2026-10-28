import React from 'react';
import { MapPin, Briefcase, Award, Download, Github, Linkedin, ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 px-6 md:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Text & Pitch */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Available for freelance & full-time</span>
          </div>

          {/* Heading */}
          <div className="relative mb-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cyan-400 leading-[1.1] tracking-tight neon-glow animate-glitch">
              Hello, I'm <br />
              <span className="text-white">Rayen Chaaben</span>
            </h1>
          </div>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl font-bold font-mono gradient-text mb-5">
            AI Full-Stack Engineer & Creative Developer
          </h2>

          {/* Bio */}
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mb-7 font-sans">
            Engineering student at <span className="text-cyan-300 font-semibold">ISIMS Sfax</span>, passionate freelancer building innovative web &amp; mobile apps. I turn bold concepts into reliable, intelligent digital realities.
          </p>

          {/* Info Line */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-8 text-xs sm:text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2 text-pink-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-gray-300">Sfax, Tunisia</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span className="text-gray-300">Open to Global Opportunities</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Award className="w-4 h-4 flex-shrink-0" />
              <span className="text-gray-300">JCI Sakiet Ezzit (3 yrs active)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-[#00ffaa] rounded-xl hover:shadow-[0_0_24px_rgba(0,255,255,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              Explore Projects
            </button>

            <a
              href="/assets/aistudio/CHAABEN_RayenAlternance__1__dc58041d.pdf"
              download="Rayen_Chaaben_CV.pdf"
              className="px-5 py-3 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              title="Download Rayen Chaaben CV (PDF)"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download CV</span>
            </a>

            <div className="flex items-center gap-2 ml-1">
              <a
                href="https://github.com/Rayen74"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/rayen-chaaben-562581301/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Companion Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>3D AI Companion is tracking your journey · Scroll to explore</span>
          </div>
        </div>

        {/* Right: Real Profile Image with Holographic Aesthetics */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="relative group">
            {/* Holographic Glowing Rings */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-[#00ffaa] opacity-75 blur-md animate-pulse" />
            
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-1 bg-[#04060f] border-2 border-white/20 overflow-hidden shadow-2xl">
              <img
                src="/assets/Profile.jpg"
                alt="Rayen Chaaben"
                className="w-full h-full object-cover rounded-full filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/LogoRayen.png';
                }}
              />
            </div>

            {/* Orbiting Tech Ring */}
            <div className="absolute -inset-5 rounded-full border border-dashed border-cyan-400/30 animate-spin pointer-events-none" style={{ animationDuration: '18s' }} />

            {/* Floating Quick Stat Pills */}
            <div className="absolute -bottom-2 -left-4 glass-card px-3.5 py-1.5 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
              <span className="font-bold text-white">8+</span>
              <span>Shipped Systems</span>
            </div>

            <div className="absolute -top-2 -right-4 glass-card px-3.5 py-1.5 rounded-xl border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center gap-1.5 shadow-lg">
              <span className="font-bold text-white">3rd</span>
              <span>CS SYP Hackathon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cyan-400/70 hover:text-cyan-300 transition-colors"
        aria-label="Scroll to About Section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
