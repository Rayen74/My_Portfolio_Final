import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MediaMarquee from './components/MediaMarquee';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import AIAssistant3D from './components/AIAssistant3D';
import AIAssistantChat from './components/AIAssistantChat';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'projects', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative isolate min-h-screen bg-[#04060f] text-[#e2e8f0] selection:bg-cyan-500/30 selection:text-white">
      {/* 1. Global GPU Particle Canvas (Deepest Background Layer) */}
      <ParticleBackground
        particleCount={180}
        particleSpread={11}
        speed={0.12}
        particleColors={['#00FFFF', '#FF00FF', '#00FFAA', '#A855F7']}
        moveParticlesOnHover
        particleHoverFactor={0.7}
        particleBaseSize={110}
      />

      {/* 2. Cinematic 3D AI Assistant (Three.js WebGL Layer) */}
      <AIAssistant3D
        activeSection={activeSection}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* 3. Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* 4. Page Sections */}
      <main className="relative z-10">
        <Hero onOpenChat={() => setIsChatOpen(true)} />

        {/* 5. Two-Row Horizontal Scrolling Media Marquee */}
        <MediaMarquee />

        {/* 6. About Me */}
        <About />

        {/* 7. Engineering Services & Capabilities */}
        <Services />

        {/* 8. Featured Projects (Sticky Stacking Cards & Multi-Column Media Layout) */}
        <Projects />

        {/* 9. Skills & Certifications */}
        <Skills />

        {/* 10. Contact Section */}
        <Contact />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Conversational AI Assistant Modal */}
      <AIAssistantChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
