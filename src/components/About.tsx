import React from 'react';
import { Terminal, Cpu, Lightbulb, ShieldCheck, Award, GraduationCap, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-cyan-400" />
            <span>About Rayen Chaaben</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Turning Ideas Into <span className="gradient-mint">Useful Products.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            I enjoy building digital experiences that combine clean engineering, thoughtful design, and practical problem-solving. My focus is creating products that are reliable, performant, and ready to scale.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Academic & Philosophy Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-7 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Academic & Engineering Journey</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                Currently pursuing an engineering degree at <strong className="text-white">ISIMS Sfax</strong> (Higher Institute of Computer Science and Multimedia of Sfax), I cultivate a balanced discipline across front-end web engineering, distributed backends, and practical machine learning.
              </p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Beyond coursework, I work on freelance production systems, autonomous workflow orchestration with <span className="text-cyan-300 font-mono">n8n</span> and Python, and competitive hackathon projects designed to deliver immediate utility.
              </p>
            </div>

            {/* 3 Core Engineering Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card rounded-xl p-5 border border-cyan-500/20">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3">
                  <Terminal className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Code as Craft</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Rigorous type safety, modular structures, and zero superfluous dependencies.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border border-purple-500/20">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-3">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Human First</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Fast interactive response times, intuitive touch ergonomics, and WCAG AA accessibility.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 border border-[#00ffaa]/20">
                <div className="w-9 h-9 rounded-lg bg-[#00ffaa]/10 border border-[#00ffaa]/30 flex items-center justify-center text-[#00ffaa] mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Applied AI</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Integrating agent automations and machine intelligence to solve concrete bottlenecks.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & Community Impact */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-5">
                Key Highlights
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 pb-4 border-b border-white/5">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-400/30 text-purple-300 flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">3rd Place · CS SYP HIZE Hackathon</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Engineered Candidate Registration Automation Agent with automated QR generation and email dispatch in under 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pb-4 border-b border-white/5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">AI Night Challenge Hackathon</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Built the ARSII Mobile MVP with React Native, Node.js, and PostgreSQL in a continuous 24-hour sprint.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#00ffaa]/10 border border-[#00ffaa]/30 text-[#00ffaa] flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">JCI Sakiet Ezzit Member</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Active for 3+ years contributing leadership, team coordination, and civic technology initiatives in Sfax.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stat Bar */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="glass-card p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-bold font-mono text-cyan-400">8+</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Projects</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-bold font-mono text-purple-400">6+</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Certifs</div>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-bold font-mono text-[#00ffaa]">3 Yrs</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Community</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
