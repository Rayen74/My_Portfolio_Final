import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, ExternalLink, FileText } from 'lucide-react';
import type { AssistantState } from './AIAssistant3D';

interface AIAssistantChatProps {
  isOpen: boolean;
  onClose: () => void;
  assistantState?: AssistantState;
  onStateChange?: (state: AssistantState) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionUrl?: string;
  actionText?: string;
  isError?: boolean;
}

const SUGGESTIONS = [
  "Tell me about Rayen's background & education",
  "What is the OliveRAR project?",
  "Tell me about his n8n hackathon win & certifications",
  "What technologies does Rayen specialize in?",
  "How can I contact Rayen for an Alternance?"
];

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({
  isOpen,
  onClose,
  assistantState = 'idle',
  onStateChange
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Greetings! I'm AETHER-01, Rayen Chaaben's autonomous portfolio companion. I am trained on Rayen's verified CV and real portfolio projects. Ask me about his software engineering studies at ISIMS Sfax, full-stack & mobile architectures, n8n automations, or his availability for an Alternance position!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionUrl: '/assets/aistudio/CHAABEN_RayenAlternance__1__dc58041d.pdf',
      actionText: 'View Official CV (PDF)'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const completionTimerRef = useRef<number | null>(null);

  // Prevent background scroll while assistant modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      onStateChange?.('opened');
    } else {
      document.body.style.overflow = '';
      onStateChange?.('idle');
    }
    return () => {
      document.body.style.overflow = '';
      if (completionTimerRef.current) window.clearTimeout(completionTimerRef.current);
    };
  }, [isOpen, onStateChange]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    // Notify 3D companion: question submitted -> thinking
    onStateChange?.('submitted');
    setTimeout(() => {
      onStateChange?.('thinking');
    }, 250);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6)
        })
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // non-json response
      }

      if (!response.ok) {
        if (data && data.reply) {
          const aiReply: Message = {
            id: String(Date.now() + 1),
            sender: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actionUrl: data.actionUrl,
            actionText: data.actionText,
            isError: true
          };
          setMessages((prev) => [...prev, aiReply]);
          onStateChange?.('completed');
          if (completionTimerRef.current) window.clearTimeout(completionTimerRef.current);
          completionTimerRef.current = window.setTimeout(() => {
            onStateChange?.('opened');
          }, 3000);
          return;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const aiReply: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: data.reply || "Rayen Chaaben is an AI Full-Stack Developer seeking an Alternance. Please explore his projects or get in touch!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionUrl: data.actionUrl,
        actionText: data.actionText
      };

      setMessages((prev) => [...prev, aiReply]);

      // State reaction: completed (happy smile & nod)
      onStateChange?.('completed');
      if (completionTimerRef.current) window.clearTimeout(completionTimerRef.current);
      completionTimerRef.current = window.setTimeout(() => {
        onStateChange?.('opened');
      }, 3000);
    } catch (err) {
      console.error('Chat request error:', err);
      const fallbackReply: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: "Rayen Chaaben is an AI Full-Stack Developer and CS engineering student at ISIMS Sfax with verified expertise in Next.js, React, Node.js, Spring Boot, Docker, n8n automation, and machine learning. He is currently seeking an Alternance contract.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionUrl: '#contact',
        actionText: 'Contact Rayen Chaaben',
        isError: true
      };
      setMessages((prev) => [...prev, fallbackReply]);
      onStateChange?.('completed');
      if (completionTimerRef.current) window.clearTimeout(completionTimerRef.current);
      completionTimerRef.current = window.setTimeout(() => {
        onStateChange?.('opened');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg bg-[#070c1b] border border-cyan-500/35 rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.95)] flex flex-col h-[min(88dvh,620px)] max-h-[88dvh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Rayen Chaaben AI Companion"
      >
        {/* Header */}
        <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-white/10 bg-gradient-to-r from-[#0a1228] to-[#070c1b] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-bold text-xs sm:text-sm text-white">AETHER-01 Assistant</h3>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa]" />
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  CV & Projects
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-mono text-cyan-400/80">Rayen Chaaben Portfolio Companion</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="/assets/aistudio/CHAABEN_RayenAlternance__1__dc58041d.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
              title="Open Official Resume PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto overscroll-contain space-y-3.5 sm:space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 sm:gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-br-none'
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line text-xs sm:text-sm">{m.text}</div>

                {m.actionUrl && (
                  <a
                    href={m.actionUrl}
                    onClick={() => {
                      if (m.actionUrl?.startsWith('#')) onClose();
                    }}
                    target={m.actionUrl.startsWith('http') || m.actionUrl.endsWith('.pdf') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                  >
                    <span>{m.actionText || 'Explore'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <div className={`text-[9px] sm:text-[10px] font-mono mt-1 ${m.sender === 'user' ? 'text-cyan-100/70' : 'text-gray-500'}`}>
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 flex-shrink-0 mt-0.5">
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 items-center text-xs font-mono text-cyan-400/90 px-2 py-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>AETHER-01 is analyzing Rayen's CV & projects...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-3 py-2 border-t border-white/5 bg-[#04060f]/60 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              disabled={isLoading}
              className="whitespace-nowrap px-2.5 py-1 text-[10px] sm:text-[11px] font-mono rounded-md bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-2.5 sm:p-3 border-t border-white/10 bg-[#070c1b] flex items-center gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about Rayen's CV, projects, tech stack, or alternance..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 text-base sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all font-sans disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 sm:p-2.5 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistantChat;
