import React, { useState, useMemo } from 'react';
import { Search, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import ProjectCard, { ProjectData } from './ProjectCard';

const cancerGallery = Array.from({ length: 10 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `/assets/projects/CancerClassification/ProjetAFD_Final_(1)-${num}.png`;
});

const fakeNewsGallery = Array.from({ length: 21 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `/assets/projects/FakeNewsCategory/fake_news_categorisation (2)-${num}.png`;
});

export const REAL_PROJECTS: ProjectData[] = [
  {
    id: 'yajoura',
    number: '01',
    category: 'FULL-STACK PLATFORM · SPRINT MANAGEMENT',
    title: 'Yajoura — Advanced Project Management Platform',
    description: 'A robust Jira-inspired collaborative tool for enterprise task management, featuring real-time interactive Kanban boards, sprint telemetry, time tracking, and customizable KPI analytics dashboards.',
    technologies: ['React', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'TanStack Query'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/Yajoura_AI.png',
      alt: 'Yajoura Kanban Dashboard and Sprint Interface',
      caption: 'Interactive Kanban & Sprint Board'
    },
    slot2: {
      type: 'video',
      src: '/assets/Yaj.webm',
      poster: '/assets/Yajoura_AI.png',
      alt: 'Yajoura Platform Live Video Demo',
      caption: 'Live Platform Video Walkthrough'
    }
  },
  {
    id: 'oliverar',
    number: '02',
    category: 'ENTERPRISE AGRITECH & AUTOMATION',
    title: 'OliveRAR — Intelligent Olive Harvest Management System',
    description: 'An enterprise full-stack platform engineered with Agile Scrum methodologies, uniting an Angular UI with a layered Spring Boot and MongoDB architecture to coordinate orchard scheduling, workforce assignment, yield telemetry, and automated operational notifications via n8n.',
    technologies: ['Spring Boot', 'Angular', 'MongoDB', 'n8n', 'Scrum', 'GitHub'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/OliveRAR.png',
      alt: 'OliveRAR Orchard Logistics & Management Interface',
      caption: 'Orchard Logistics & Yield Telemetry'
    },
    slot2: {
      type: 'image',
      src: '/assets/OliveRAR_Harvest.jpg',
      alt: 'OliveRAR Harvest Operations & Automated Crew Scheduling',
      caption: 'Harvest Operations & Crew Scheduling'
    }
  },
  {
    id: 'registration-agent',
    number: '03',
    category: 'AI WORKFLOW AUTOMATION',
    award: '🏆 3rd Place · CS SYP HIZE Hackathon',
    title: 'Candidate Registration Automation Agent',
    description: 'An end-to-end autonomous event logistics agent constructed in under 24 hours. Processes candidate submissions, eliminates duplicate entries, dynamically generates cryptographic QR credentials, and dispatches customized confirmation receipts with zero human intervention.',
    technologies: ['n8n', 'JavaScript', 'Google Sheets API', 'Gmail API', 'QR Generation'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/RegistrationAgent.png',
      alt: 'Candidate Registration n8n Automated Workflow Pipeline',
      caption: 'n8n Autonomous Workflow Pipeline'
    },
    slot2: {
      type: 'image',
      src: '/assets/Registration_QR.jpg',
      alt: 'Cryptographic QR Credential Generation & Attendee Dispatch',
      caption: 'Autonomous QR Credentials & Dispatch'
    }
  },
  {
    id: 'arsii',
    number: '04',
    category: 'MOBILE APPLICATION & CLOUD REST API',
    award: 'AI Night Challenge 24h Hackathon',
    title: 'ARSII — Team Management Mobile App',
    description: 'A high-performance mobile MVP built in 24 hours during the AI Night Challenge hackathon. Backed by an Express.js and PostgreSQL REST API with Prisma ORM, enabling rapid sprint planning, task assignments, and instant team collaboration on iOS and Android.',
    technologies: ['React Native', 'TailwindCSS', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/ARSII.png',
      alt: 'ARSII Mobile Application Runtime & Navigation',
      caption: 'Mobile App Interface & Team Hub'
    },
    slot2: {
      type: 'image',
      src: '/assets/ARSII_Mobile_Task.jpg',
      alt: 'ARSII Mobile Sprint Board & Task Collaboration UI',
      caption: 'Sprint Task Board & Team Collaboration'
    }
  },
  {
    id: 'jci-sakiet-ezzit',
    number: '05',
    category: 'DYNAMIC COMMUNITY WEB PLATFORM',
    title: 'JCI Sakiet Ezzit Web Platform',
    description: 'A modern, highly responsive web presence built for JCI Sakiet Ezzit. Highlights civic initiatives, leadership programs, and community summits with fluid micro-interactions and seamless mobile ergonomics.',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Responsive Design'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/JCI.png',
      alt: 'JCI Sakiet Ezzit Civic Initiatives & Web Platform',
      caption: 'Civic Initiatives & Member Registration'
    },
    slot2: {
      type: 'video',
      src: '/assets/JCI.webm',
      poster: '/assets/JCI_AI.png',
      alt: 'JCI Sakiet Ezzit Production Website Video Demo',
      caption: 'Live Production Website Video Demo'
    }
  },
  {
    id: 'cancer-classification',
    number: '06',
    category: 'MACHINE LEARNING & UNSUPERVISED CLUSTERING',
    title: 'Cancer Classification via K-Means Clustering',
    description: 'A Python desktop scientific GUI application for ingesting clinical CSV datasets, performing Principal Component Analysis (PCA) dimension reduction, and executing K-Means and Hierarchical Clustering with real-time interactive scatter plots.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/Cancer.png',
      alt: 'Clinical Dataset GUI & Clustering Scatter Plot',
      caption: 'Clinical Dataset GUI & Clustering Plots'
    },
    slot2: {
      type: 'image',
      src: '/assets/projects/CancerClassification/ProjetAFD_Final_(1)-01.png',
      alt: 'PCA Dimension Reduction & Variance Correlation Matrix',
      caption: 'PCA Variance & Correlation Matrix'
    },
    galleryImages: cancerGallery
  },
  {
    id: 'fake-news',
    number: '07',
    category: 'NATURAL LANGUAGE PROCESSING & CLASSIFICATION',
    title: 'Fake News Categorisation System',
    description: 'An automated machine learning text classification system distinguishing factual news from disinformation using NLP preprocessing, TF-IDF vectorization matrices, and extensive benchmark comparisons across multiple supervised classifiers.',
    technologies: ['Python', 'TF-IDF', 'Scikit-learn', 'NLP', 'Pandas'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/FakeNews.png',
      alt: 'Fake News NLP Preprocessing & Verification Interface',
      caption: 'NLP Verification Dashboard'
    },
    slot2: {
      type: 'image',
      src: '/assets/projects/FakeNewsCategory/fake_news_categorisation (2)-01.png',
      alt: 'TF-IDF Vector Pipeline & Classifier Comparison Matrix',
      caption: 'TF-IDF Pipeline & Model Comparison'
    },
    galleryImages: fakeNewsGallery
  },
  {
    id: 'tech-news-agent',
    number: '08',
    category: 'AUTOMATED WEB SCRAPING & NLP',
    title: 'Tech News Extraction Agent',
    description: 'A scheduled autonomous crawler developed during a summer software internship. Aggregates breaking technology dispatches across global publications, executes topical keyword filtering, and produces clean daily executive summaries.',
    technologies: ['Python', 'Web Scraping', 'NLP', 'BeautifulSoup', 'Automation'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/TechNewsAgent.png',
      alt: 'Automated Tech News Web Scraper Pipeline',
      caption: 'Automated Scraping & Topic Pipeline'
    },
    slot2: {
      type: 'image',
      src: '/assets/TechNews_Digest.jpg',
      alt: 'Daily Executive Digest & Topical Tagging View',
      caption: 'Daily Executive Digest & Tagging View'
    }
  },
  {
    id: 'ticket-price',
    number: '09',
    category: 'PREDICTIVE MODELING & REGRESSION',
    title: 'Ticket Price Predictive Analytics',
    description: 'A multivariate regression modeling project analyzing demand fluctuations, seasonal trends, and booking intervals to forecast ticket price trajectories with minimal residual error.',
    technologies: ['Python', 'Machine Learning', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/Rayen74',
    slot1: {
      type: 'image',
      src: '/assets/TicketPrice.jpg',
      alt: 'Demand Forecasting & Ticket Price Regression Curve',
      caption: 'Demand Trends & Regression Curves'
    },
    slot2: {
      type: 'image',
      src: '/assets/TicketPrice_Metrics.jpg',
      alt: 'Multivariate Price Model & Residual Error Distribution',
      caption: 'Multivariate Regression & Residual Distribution'
    }
  }
];

export const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Gallery Modal State
  const [galleryModal, setGalleryModal] = useState<{
    title: string;
    images: string[];
    index: number;
  } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredProjects = useMemo(() => {
    return REAL_PROJECTS.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const cat = selectedCategory;

      const matchesCat =
        cat === 'all' ||
        (cat === 'fullstack' && (p.category.includes('FULL-STACK') || p.category.includes('WEB'))) ||
        (cat === 'mobile' && p.category.includes('MOBILE')) ||
        (cat === 'automation' && p.category.includes('AUTOMATION')) ||
        (cat === 'ml' && (p.category.includes('MACHINE LEARNING') || p.category.includes('NATURAL LANGUAGE')));

      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleOpenGallery = (title: string, images: string[], startIndex: number = 0) => {
    setGalleryModal({
      title,
      images,
      index: startIndex
    });
    setZoomLevel(1);
  };

  const nextImage = () => {
    if (!galleryModal) return;
    setGalleryModal({
      ...galleryModal,
      index: (galleryModal.index + 1) % galleryModal.images.length
    });
    setZoomLevel(1);
  };

  const prevImage = () => {
    if (!galleryModal) return;
    setGalleryModal({
      ...galleryModal,
      index: (galleryModal.index - 1 + galleryModal.images.length) % galleryModal.images.length
    });
    setZoomLevel(1);
  };

  return (
    <section id="projects" className="py-28 px-6 md:px-12 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (Source B Specification: Large Uppercase Headings with Gradient Text) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-cyan-400" />
              <span>SELECTED WORKS · 2023 - 2026</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-[1.05]">
              FEATURED <span className="gradient-text">PROJECTS.</span>
            </h2>
            <p className="text-base text-gray-400 mt-4 leading-relaxed">
              Real-world systems, autonomous AI agents, mobile applications, and predictive analytics platforms engineered with modern standards.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, tech..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all font-sans"
            />
          </div>
        </div>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-14 no-scrollbar">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'fullstack', label: 'Full-Stack & Web' },
            { id: 'mobile', label: 'Mobile MVP' },
            { id: 'automation', label: 'AI & Automation' },
            { id: 'ml', label: 'Machine Learning & NLP' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(0,255,255,0.25)]'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* STICKY STACKING PROJECT CARDS CONTAINER */}
        <div className="relative">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              total={filteredProjects.length}
              onOpenGallery={handleOpenGallery}
            />
          ))}

          {filteredProjects.length === 0 && (
            <div className="py-24 text-center glass-card rounded-3xl border border-white/10">
              <p className="text-gray-400 text-sm font-mono">
                No projects found matching "<span className="text-cyan-400">{searchQuery}</span>"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN HIGH-RESOLUTION IMAGE & SLIDE GALLERY MODAL */}
      {galleryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          onClick={() => setGalleryModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl bg-[#070c1b] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-white/10 bg-[#0a1228] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {galleryModal.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  Item {galleryModal.index + 1} of {galleryModal.images.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-gray-400 px-1">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGalleryModal(null)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/40 ml-2"
                  title="Close Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Viewer */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-4 overflow-hidden min-h-[350px] sm:min-h-[500px]">
              <img
                src={galleryModal.images[galleryModal.index]}
                alt={`Media ${galleryModal.index + 1}`}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-[65vh] max-w-full object-contain transition-transform duration-200 select-none"
              />

              {galleryModal.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/15 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/15 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {galleryModal.images.length > 1 && (
              <div className="p-3 border-t border-white/10 bg-[#070c1b] flex items-center justify-center gap-2 overflow-x-auto max-w-full">
                {galleryModal.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setGalleryModal({ ...galleryModal, index: idx });
                      setZoomLevel(1);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === galleryModal.index ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={`Jump to item ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
