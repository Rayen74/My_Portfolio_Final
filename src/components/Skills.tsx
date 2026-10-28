import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp, Layers, CheckCircle2, Cpu } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  image: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    name: 'n8n Automation — Intermediate Level',
    issuer: 'n8n Academy',
    date: '2024',
    image: '/assets/N8N-Intermediate.png',
  },
  {
    name: 'n8n Automation — Introduction Level',
    issuer: 'n8n Academy',
    date: '2024',
    image: '/assets/N8N-Intro.png',
  },
  {
    name: 'Machine Learning Specialization',
    issuer: 'Stanford Online / DeepLearning.AI',
    date: '2024',
    image: '/assets/MachineLearning.png',
  },
  {
    name: 'React Native Mobile Development',
    issuer: 'Coursera & Meta',
    date: '2024',
    image: '/assets/ReactNativeCertif.png',
  },
];

interface TechSliderItem {
  name: string;
  category: string;
  icon: string;
  badge?: string;
}

const TECH_ROW_ONE: TechSliderItem[] = [
  { name: 'Next.js', category: 'Full-Stack Framework', icon: '/assets/nextjs.svg', badge: 'SSR / App Router' },
  { name: 'React', category: 'Frontend UI', icon: '/assets/react.png' },
  { name: 'n8n', category: 'Workflow Automation', icon: '/assets/n8n.svg', badge: 'Certified' },
  { name: 'Git', category: 'Version Control', icon: '/assets/git.svg', badge: 'Core VCS' },
  { name: 'GitHub', category: 'CI/CD & Repos', icon: '/assets/github.svg', badge: 'Actions' },
  { name: 'Spring Boot', category: 'Java Enterprise', icon: '/assets/spring-boot.png', badge: 'REST APIs' },
  { name: 'Angular', category: 'SPA Framework', icon: '/assets/angular.png' },
  { name: 'Tailwind CSS', category: 'Utility Design System', icon: '/assets/cssTailwind.png' },
  { name: 'Docker', category: 'Containerization', icon: '/assets/docker.svg', badge: 'DevOps' },
  { name: 'Figma', category: 'UI/UX Prototyping', icon: '/assets/figma.svg', badge: 'Design' },
];

const TECH_ROW_TWO: TechSliderItem[] = [
  { name: 'Node.js', category: 'Backend Runtime', icon: '/assets/nodejs.png', badge: 'Server' },
  { name: 'Express.js', category: 'REST API Engine', icon: '/assets/expressjs.png' },
  { name: 'PostgreSQL', category: 'Relational Database', icon: '/assets/pg.png', badge: 'SQL' },
  { name: 'MongoDB', category: 'NoSQL Document Store', icon: '/assets/mongodb.png', badge: 'NoSQL' },
  { name: 'Prisma ORM', category: 'Type-Safe ORM', icon: '/assets/prisma.png' },
  { name: 'Python', category: 'Data & Machine Learning', icon: '/assets/python.png', badge: 'Scikit-learn' },
  { name: 'React Native', category: 'Cross-Platform Mobile', icon: '/assets/react.png', badge: 'iOS / Android' },
  { name: 'Java', category: 'Enterprise OOP', icon: '/assets/java.png' },
  { name: 'HTML5', category: 'Semantic Web', icon: '/assets/HTML5.png' },
  { name: 'CSS3', category: 'Modern Styling', icon: '/assets/CSS3.png' },
];

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    color: 'text-cyan-400',
    border: 'border-cyan-500/25',
    dot: 'bg-cyan-400',
    skills: ['Next.js / React', 'React Native (Mobile)', 'Angular', 'Tailwind CSS', 'TypeScript / ES6+', 'HTML5 / Modern CSS'],
  },
  {
    title: 'Backend & APIs',
    color: 'text-purple-400',
    border: 'border-purple-500/25',
    dot: 'bg-purple-400',
    skills: ['Spring Boot (Java)', 'Node.js & Express.js', 'RESTful API Architecture', 'JWT Authentication', 'WebSockets', 'Prisma ORM'],
  },
  {
    title: 'DevOps, Tools & VCS',
    color: 'text-[#00ffaa]',
    border: 'border-[#00ffaa]/25',
    dot: 'bg-[#00ffaa]',
    skills: ['Git Version Control', 'GitHub Actions & Repos', 'Docker Containerization', 'Figma UI/UX Design', 'Postman API Testing', 'PostgreSQL & MongoDB'],
  },
  {
    title: 'AI, Automation & Workflows',
    color: 'text-pink-400',
    border: 'border-pink-500/25',
    dot: 'bg-pink-400',
    skills: ['n8n Workflow Automation', 'Python (Scikit-learn, Pandas)', 'NLP & TF-IDF', 'LLM Agent Tools', 'Web Scraping (BeautifulSoup)', 'Data Preprocessing'],
  },
];

const ADDITIONAL_SKILLS = [
  'n8n Certified Workflows',
  'Git Version Control',
  'GitHub Collaboration',
  'Next.js Full-Stack',
  'Docker Containers',
  'Figma Wireframing & Prototyping',
  'Agile Scrum Methodology',
  'Postman API Testing',
  'Three.js / WebGL Basics',
  'TanStack Query',
  'Responsive UI/UX Engineering',
];

export const Skills: React.FC = () => {

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-cyan-400" />
            <span>Expertise & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="gradient-text">Certifications.</span>
          </h2>
          <p className="text-base text-gray-400 mt-2">
            Verified credentials, full-stack technologies, and automation frameworks I build with daily.
          </p>
        </div>

        {/* 1. CERTIFICATIONS SHOWCASE */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Verified Certifications</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-400/50 hover:shadow-[0_12px_30px_rgba(234,179,8,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-44 bg-[#070c1b] p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain filter brightness-95"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 p-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 border-t border-white/5">
                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{cert.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">{cert.issuer}</p>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium text-yellow-300 bg-yellow-500/10 border border-yellow-500/30">
                    {cert.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CORE SKILL DOMAINS */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Domain Competencies</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className={`glass-card p-6 rounded-2xl border ${cat.border} hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.dot} animate-pulse`} />
                  <h4 className={`text-sm font-bold ${cat.color}`}>{cat.title}</h4>
                </div>
                <ul className="space-y-2.5">
                  {cat.skills.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <span className={`w-1 h-1 rounded-full ${cat.dot}`} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. TECHNOLOGIES USED — CONTINUOUS HORIZONTAL SLIDER */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#00ffaa]" />
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Technologies Used
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Continuous Slider • Hover to Pause
              </span>
            </div>
          </div>

          <div className="relative py-6 overflow-hidden rounded-3xl bg-[#03050c]/80 border border-white/5 select-none -mx-4 sm:mx-0">
            {/* Side Vignettes for cinematic edge fade */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#03050c] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#03050c] to-transparent z-10 pointer-events-none" />

            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Row 1: Moves Left */}
              <div className="flex overflow-hidden group">
                <div className="flex gap-4 sm:gap-6 animate-marquee-left motion-reduce:animate-none group-hover:[animation-play-state:paused] w-max">
                  {[...TECH_ROW_ONE, ...TECH_ROW_ONE].map((tech, idx) => (
                    <div
                      key={`r1-${tech.name}-${idx}`}
                      className="flex-shrink-0 w-64 sm:w-72 glass-card rounded-2xl p-3.5 sm:p-4 border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300 group/card cursor-default select-none flex items-center gap-3.5 bg-gradient-to-br from-[#0a1020]/90 to-[#070c1b]/90 backdrop-blur-md"
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 sm:p-2.5 flex-shrink-0 group-hover/card:scale-110 group-hover/card:border-cyan-400/40 transition-transform duration-300">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-full h-full object-contain filter brightness-95 group-hover/card:brightness-110"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold truncate">
                            {tech.category}
                          </span>
                          {tech.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[#00ffaa] bg-[#00ffaa]/10 border border-[#00ffaa]/30 flex-shrink-0">
                              {tech.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight truncate group-hover/card:text-cyan-300 transition-colors">
                          {tech.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Moves Right */}
              <div className="flex overflow-hidden group">
                <div className="flex gap-4 sm:gap-6 animate-marquee-right motion-reduce:animate-none group-hover:[animation-play-state:paused] w-max">
                  {[...TECH_ROW_TWO, ...TECH_ROW_TWO].map((tech, idx) => (
                    <div
                      key={`r2-${tech.name}-${idx}`}
                      className="flex-shrink-0 w-64 sm:w-72 glass-card rounded-2xl p-3.5 sm:p-4 border border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 group/card cursor-default select-none flex items-center gap-3.5 bg-gradient-to-br from-[#0a1020]/90 to-[#070c1b]/90 backdrop-blur-md"
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 sm:p-2.5 flex-shrink-0 group-hover/card:scale-110 group-hover/card:border-purple-400/40 transition-transform duration-300">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-full h-full object-contain filter brightness-95 group-hover/card:brightness-110"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold truncate">
                            {tech.category}
                          </span>
                          {tech.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/30 flex-shrink-0">
                              {tech.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight truncate group-hover/card:text-purple-300 transition-colors">
                          {tech.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. ADDITIONAL EXPERTISE */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 text-center">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4">
            Methodologies & Tools
          </h4>
          <div className="flex flex-wrap justify-center gap-2.5">
            {ADDITIONAL_SKILLS.map((skill, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
