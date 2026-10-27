import React, { useRef } from 'react';

interface MarqueeItem {
  title: string;
  category: string;
  image: string;
  isVideo?: boolean;
  videoSrc?: string;
}

const ROW_ONE: MarqueeItem[] = [
  {
    title: 'OliveRAR Agri-System',
    category: 'Full-Stack Platform',
    image: '/assets/OliveRAR.png'
  },
  {
    title: 'Yajoura Jira Clone',
    category: 'React & Node.js Tool',
    image: '/assets/Yajoura_AI.png',
    isVideo: true,
    videoSrc: '/assets/Yaj.webm'
  },
  {
    title: 'ARSII Mobile MVP',
    category: 'React Native & Prisma',
    image: '/assets/ARSII.png'
  },
  {
    title: 'Cancer Clustering GUI',
    category: 'Python & Scikit-Learn',
    image: '/assets/Cancer.png'
  },
  {
    title: 'JCI Sakiet Ezzit',
    category: 'Community Web Platform',
    image: '/assets/JCI_AI.png',
    isVideo: true,
    videoSrc: '/assets/JCI.webm'
  },
  {
    title: 'Candidate QR Agent',
    category: 'n8n Automation Winner',
    image: '/assets/RegistrationAgent.png'
  }
];

const ROW_TWO: MarqueeItem[] = [
  {
    title: 'Fake News NLP Classifier',
    category: 'TF-IDF & NLP',
    image: '/assets/FakeNews.png'
  },
  {
    title: 'Tech News Scraper Agent',
    category: 'Python Automation',
    image: '/assets/TechNewsAgent.png'
  },
  {
    title: 'Ticket Price Analytics',
    category: 'Machine Learning',
    image: '/assets/TicketPrice.jpg'
  },
  {
    title: 'Cancer PCA Clustering',
    category: 'Dataset Visualizer',
    image: '/assets/projects/CancerClassification/ProjetAFD_Final_(1)-01.png'
  },
  {
    title: 'Fake News Benchmark',
    category: 'Classifier Comparison',
    image: '/assets/projects/FakeNewsCategory/fake_news_categorisation (2)-01.png'
  },
  {
    title: 'Candidate QR Dispatch',
    category: 'Autonomous Credentials',
    image: '/assets/Registration_QR.jpg'
  }
];

export const MediaMarquee: React.FC = () => {
  return (
    <div className="relative py-12 overflow-hidden bg-[#03050c]/80 border-y border-white/5 select-none">
      {/* Side Vignettes for cinematic edge fade */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#04060f] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#04060f] to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-6">
        {/* Row 1: Moves Left */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-6 animate-[marqueeLeft_35s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...ROW_ONE, ...ROW_ONE].map((item, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex-shrink-0 w-72 sm:w-80 glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all group/card cursor-pointer"
              >
                <div className="relative h-44 bg-[#070c1b] overflow-hidden">
                  {item.isVideo && item.videoSrc ? (
                    <video
                      src={item.videoSrc}
                      poster={item.image}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover block group-hover/card:scale-105 transition-transform duration-500"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/LogoRayen.png';
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070c1b] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block font-semibold">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-6 animate-[marqueeRight_38s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...ROW_TWO, ...ROW_TWO].map((item, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex-shrink-0 w-72 sm:w-80 glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all group/card cursor-pointer"
              >
                <div className="relative h-44 bg-[#070c1b] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/LogoRayen.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070c1b] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block font-semibold">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaMarquee;
