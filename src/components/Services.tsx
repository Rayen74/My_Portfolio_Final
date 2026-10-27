import React from 'react';
import { Globe, Smartphone, Bot, Database, BarChart3, Layers, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Globe,
    title: 'Web & Full-Stack Engineering',
    description: 'Modern, performant web platforms built with React, Angular, Spring Boot, and Node.js. Focused on sub-second loads, clean component architecture, and high reliability.',
    tags: ['Next.js', 'React', 'Angular', 'Spring Boot', 'Node.js', 'Tailwind CSS'],
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20 hover:border-cyan-400/50',
    bgIcon: 'bg-cyan-500/10 text-cyan-400'
  },
  {
    icon: Smartphone,
    title: 'Mobile MVP & Cross-Platform',
    description: 'Native-feel iOS and Android applications developed with React Native and Expo. Seamless state synchronization, responsive touch ergonomics, and robust offline caching.',
    tags: ['React Native', 'Mobile UI', 'Prisma ORM', 'PostgreSQL'],
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20 hover:border-purple-400/50',
    bgIcon: 'bg-purple-500/10 text-purple-400'
  },
  {
    icon: Bot,
    title: 'AI Agents & n8n Automation',
    description: 'End-to-end intelligent workflow orchestrations connecting CRM, spreadsheets, email services, and LLMs. Automated data deduplication and zero-manual-intervention pipelines.',
    tags: ['n8n', 'Python', 'Google APIs', 'Agent Workflows'],
    color: 'text-[#00ffaa]',
    borderColor: 'border-[#00ffaa]/20 hover:border-[#00ffaa]/50',
    bgIcon: 'bg-[#00ffaa]/10 text-[#00ffaa]'
  },
  {
    icon: BarChart3,
    title: 'Machine Learning & NLP',
    description: 'Custom machine learning models for clustering, text classification, predictive analytics, and TF-IDF feature extraction using Scikit-learn, Pandas, and NumPy.',
    tags: ['Python', 'Scikit-learn', 'NLP', 'K-Means', 'Pandas'],
    color: 'text-pink-400',
    borderColor: 'border-pink-500/20 hover:border-pink-400/50',
    bgIcon: 'bg-pink-500/10 text-pink-400'
  },
  {
    icon: Database,
    title: 'Database & API Architecture',
    description: 'Relational and NoSQL schemas designed for scalability and data integrity. Express, Spring Boot, and Prisma ORM backends paired with MongoDB and PostgreSQL.',
    tags: ['Docker', 'PostgreSQL', 'MongoDB', 'Prisma', 'REST APIs', 'Express'],
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/20 hover:border-yellow-400/50',
    bgIcon: 'bg-yellow-500/10 text-yellow-400'
  },
  {
    icon: Layers,
    title: 'System Design & Real-Time Sync',
    description: 'High-throughput system architecture with Scrum/Agile project workflows, Kanban telemetry, WebSockets, and real-time collaborative state.',
    tags: ['Agile Scrum', 'WebSockets', 'System Design', 'Git'],
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20 hover:border-blue-400/50',
    bgIcon: 'bg-blue-500/10 text-blue-400'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 md:px-12 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-cyan-400" />
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineering <span className="gradient-text">Services.</span>
          </h2>
          <p className="text-base text-gray-400 mt-2">
            Disciplined full-stack development, mobile architecture, intelligent automation, and applied machine learning.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className={`glass-card rounded-2xl p-7 border ${s.borderColor} hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${s.bgIcon} border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/5 font-mono text-[11px] text-gray-500">
                    {s.tags.map((t, i) => (
                      <React.Fragment key={t}>
                        <span className="text-gray-300">{t}</span>
                        {i < s.tags.length - 1 && <span className="text-gray-600">/</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
