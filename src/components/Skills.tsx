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
    name: 'React Native Mobile Development',
    issuer: 'Coursera & Meta',
    date: '2024',
    image: '/assets/ReactNativeCertif.png',
  },
  {
    name: 'Natural Language Processing (NLP)',
    issuer: 'DeepLearning.AI / Coursera',
    date: '2024',
    image: '/assets/NLPCertification.png',
  },
  {
    name: 'Machine Learning Specialization',
    issuer: 'Stanford Online / DeepLearning.AI',
    date: '2024',
    image: '/assets/MachineLearning.png',
  },
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
    name: 'Python for Finance & Data Analysis',
    issuer: 'Coursera',
    date: '2023',
    image: '/assets/FinanceBeginnerPython.png',
  },
  {
    name: 'Data Manipulation with Pandas',
    issuer: 'Coursera',
    date: '2023',
    image: '/assets/DataManipulation.png',
  },
];

const TECH_ICONS = [
  { name: 'React', icon: '/assets/react.png' },
  { name: 'Next.js', icon: '/assets/nextjs.svg' },
  { name: 'n8n', icon: '/assets/n8n.svg' },
  { name: 'Git', icon: '/assets/git.svg' },
  { name: 'GitHub', icon: '/assets/github.svg' },
  { name: 'Docker', icon: '/assets/docker.svg' },
  { name: 'Node.js', icon: '/assets/nodejs.png' },
  { name: 'Spring Boot', icon: '/assets/spring-boot.png' },
  { name: 'Angular', icon: '/assets/angular.png' },
  { name: 'Python', icon: '/assets/python.png' },
  { name: 'Figma', icon: '/assets/figma.svg' },
  { name: 'Express.js', icon: '/assets/expressjs.png' },
  { name: 'MongoDB', icon: '/assets/mongodb.png' },
  { name: 'PostgreSQL', icon: '/assets/pg.png' },
  { name: 'Prisma ORM', icon: '/assets/prisma.png' },
  { name: 'Tailwind CSS', icon: '/assets/cssTailwind.png' },
  { name: 'Java', icon: '/assets/java.png' },
  { name: 'HTML5', icon: '/assets/HTML5.png' },
  { name: 'CSS3', icon: '/assets/CSS3.png' },
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
  const [showAllCerts, setShowAllCerts] = useState(false);

  const visibleCerts = showAllCerts ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 3);

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCerts.map((cert, idx) => (
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

          {CERTIFICATIONS.length > 3 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-white/5 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10 hover:border-yellow-400 transition-all"
              >
                <span>{showAllCerts ? 'Show Less' : `Show All ${CERTIFICATIONS.length} Certifications`}</span>
                {showAllCerts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}
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

        {/* 3. TECHNOLOGIES LOGO GRID */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Layers className="w-5 h-5 text-[#00ffaa]" />
            <h3 className="text-xl font-bold text-white">Technologies I Work With</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
            {TECH_ICONS.map((tech, idx) => (
              <div
                key={idx}
                className="glass-card p-4 rounded-xl border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_16px_rgba(0,255,255,0.15)] transition-all flex flex-col items-center justify-center gap-2.5 group cursor-default"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="max-w-full max-h-full object-contain filter brightness-90 group-hover:scale-110 group-hover:brightness-110 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-[11px] font-mono font-medium text-gray-400 group-hover:text-cyan-300 transition-colors text-center">
                  {tech.name}
                </span>
              </div>
            ))}
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
