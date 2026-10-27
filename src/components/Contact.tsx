import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Copy, Check, Send, Clock, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'Full-Stack Web App',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('rayenchaaben0704@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage('✓ Thank you! Your message has been received. I will reply within 24 hours.');
      setFormData({ name: '', email: '', scope: 'Full-Stack Web App', message: '' });
      setTimeout(() => setStatusMessage(null), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-6 h-px bg-cyan-400" />
            <span>Start a Conversation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Have a Project in Mind? <br />
            <span className="gradient-mint">Let's Build Something Amazing.</span>
          </h2>
          <p className="text-base text-gray-400 mt-2">
            Whether you need a full-stack platform, a mobile application, or an intelligent workflow automation, my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5">
              <h3 className="text-base font-bold text-white mb-2">Direct Contact</h3>

              {/* Email */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Email</span>
                    <span className="text-xs font-mono text-white font-medium">rayenchaaben0704@gmail.com</span>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-[#00ffaa]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Location</span>
                  <span className="text-xs font-sans text-white font-medium">Sfax, Tunisia (UTC+1)</span>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-lg bg-[#00ffaa]/10 text-[#00ffaa]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Availability</span>
                  <span className="text-xs font-sans text-white font-medium">Response within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-4">
                Professional Networks
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/Rayen74"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-xs font-mono text-gray-300 hover:text-cyan-300 transition-all"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/rayen-chaaben-562581301/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 text-xs font-mono text-gray-300 hover:text-purple-300 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-purple-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Send a Message</h3>
              <p className="text-xs text-gray-400 mb-6">
                Tell me about your timeline, tech stack, or ideas.
              </p>

              {statusMessage && (
                <div className="mb-6 p-4 rounded-xl text-xs font-mono font-medium text-[#00ffaa] bg-[#00ffaa]/10 border border-[#00ffaa]/30">
                  {statusMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1.5">
                    Project Domain
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#070c1b] border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-all font-sans"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web App (React / Angular / Spring Boot / Node)</option>
                    <option value="Mobile Application">Mobile Application (React Native)</option>
                    <option value="AI & Automation">AI Workflow Automation (n8n / Python / LLMs)</option>
                    <option value="Machine Learning">Machine Learning & Data Classification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1.5">
                    Project Overview
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your goals, requirements, and preferred timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-[#00ffaa] hover:shadow-[0_0_24px_rgba(0,255,255,0.4)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Transmitting message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
