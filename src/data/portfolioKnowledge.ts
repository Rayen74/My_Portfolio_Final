/**
 * Grounded Knowledge Base for Rayen Chaaben's Portfolio & AI Assistant
 * Extracted directly from official CV, GitHub repository, and verified project sources.
 */

export interface KnowledgeItem {
  id: string;
  category: 'profile' | 'education' | 'skills' | 'project' | 'certification' | 'volunteering' | 'alternance';
  title: string;
  keywords: string[];
  content: string;
}

export const RAYEN_PROFILE = {
  name: 'Rayen Chaaben',
  title: 'AI Full-Stack Developer',
  targetRole: 'Alternance (Full-Stack Development & AI Integration)',
  location: 'Sfax, Tunisia',
  phone: '+216 24 768 675',
  email: 'rayenchaaben0704@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rayen-chaaben-562581301/',
  github: 'https://github.com/Rayen74',
  portfolio: 'https://rayen-chaaben-portfolio.netlify.app',
  summary: `AI Full-Stack Engineer and Computer Science engineering student passionate about building scalable web applications and intelligent software that solve real-world problems. Combines modern full-stack development with AI integration and automation to deliver performant, user-focused digital experiences.`
};

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: 'bio-summary',
    category: 'profile',
    title: 'Professional Bio & Summary',
    keywords: ['about', 'bio', 'who', 'summary', 'profile', 'rayen', 'chaaben', 'location', 'sfax', 'tunisia', 'contact', 'email', 'phone', 'linkedin', 'github'],
    content: `Rayen Chaaben is an AI Full-Stack Developer and Computer Science engineering student located in Sfax, Tunisia.
Email: rayenchaaben0704@gmail.com | Phone: +216 24 768 675 | LinkedIn: https://www.linkedin.com/in/rayen-chaaben-562581301/ | GitHub: https://github.com/Rayen74.
Rayen combines modern full-stack development (Next.js, React, Node.js, Spring Boot, Angular, React Native) with AI integration and autonomous workflow automation (n8n, Python, Scikit-learn, LLMs). He delivers robust, scalable, and user-centric software solutions.`
  },
  {
    id: 'alternance-availability',
    category: 'alternance',
    title: 'Alternance Position & Availability',
    keywords: ['alternance', 'hire', 'contract', 'availability', 'opportunity', 'internship', 'job', 'work', 'full-time', 'recruitment', 'hire me'],
    content: `Rayen Chaaben is actively seeking an Alternance contract in Full-Stack Development & AI Integration.
He is motivated to contribute to engineering teams building scalable web/mobile platforms, microservices, cloud architectures, or autonomous AI agent pipelines.
He is available immediately for interviews and can be reached via email at rayenchaaben0704@gmail.com or on LinkedIn.`
  },
  {
    id: 'education-isims',
    category: 'education',
    title: 'Education at ISIMS Sfax',
    keywords: ['education', 'university', 'degree', 'isims', 'sfax', 'engineering', 'bachelor', 'studies', 'school'],
    content: `Education:
1. Engineering Degree in Computer Science — ISIMS (Institut Supérieur d'Informatique et de Multimédia de Sfax), Tunisia [Sep 2025 – Present].
2. Bachelor's Degree in Computer Science — ISIMS, Sfax, Tunisia [Sep 2022 – Jun 2025].
Coursework & foundations: Data Structures & Algorithms, Software Architecture, Distributed Systems, Database Management Systems, Machine Learning, Agile Scrum Methodologies.`
  },
  {
    id: 'tech-stack-skills',
    category: 'skills',
    title: 'Technical Skills & Technologies',
    keywords: ['skills', 'technologies', 'stack', 'languages', 'nextjs', 'react', 'angular', 'react native', 'node', 'express', 'spring boot', 'postgresql', 'mongodb', 'prisma', 'docker', 'figma', 'git', 'github', 'n8n', 'python', 'scikit-learn'],
    content: `Verified Technical Stack:
- Frontend: Next.js, React, Angular, React Native, TailwindCSS, TypeScript, HTML5, CSS3.
- Backend & APIs: Node.js, Express.js, Spring Boot (Java), RESTful APIs, Prisma ORM.
- Databases: PostgreSQL, MongoDB, Prisma ORM.
- DevOps & Tooling: Docker, Figma, Git, GitHub, Postman.
- AI & Automation: Python, n8n workflow automation, Natural Language Processing (NLP), Scikit-learn, LLM integration, Web Scraping (BeautifulSoup).
- Methodologies: Agile, Scrum, Kanban.`
  },
  {
    id: 'certifications',
    category: 'certification',
    title: 'Certifications & Credentials',
    keywords: ['certification', 'certifications', 'n8n', 'academy', 'machine learning', 'stanford', 'react native', 'meta', 'credentials'],
    content: `Verified Certifications:
1. n8n Automation — Intermediate Level (n8n Academy) — Advanced workflow architecture, complex sub-workflows, webhooks, error handling, and API integrations.
2. n8n Automation — Introduction Level (n8n Academy) — Foundational automation nodes, data manipulation, triggers, and automated notification pipelines.
3. Machine Learning Specialization (Stanford Online & DeepLearning.AI) — Supervised learning, deep neural networks, unsupervised learning, recommender systems, and reinforcement learning.
4. React Native Mobile Development (Meta & Coursera) — Cross-platform mobile architecture, React Native navigation, native components, and performant state management.`
  },
  {
    id: 'languages-volunteering',
    category: 'volunteering',
    title: 'Languages & JCI Leadership',
    keywords: ['languages', 'arabic', 'french', 'english', 'volunteering', 'leadership', 'jci', 'sakiet ezzit', 'treasurer', 'advisor'],
    content: `Languages:
- Arabic: Native
- French: Professional Working Proficiency (B2)
- English: Professional Working Proficiency (C1)

Volunteering & Civic Leadership:
- Treasurer, JCI Sakiet Ezzit (2024): Managed financial planning, budgets, expense tracking, and fiscal accountability for community initiatives.
- Awards Advisor, JCI Sakiet Ezzit (2023): Coordinated award documentation, nominations, and evaluation criteria for civic recognition programs.`
  },
  {
    id: 'project-yajoura',
    category: 'project',
    title: 'Yajoura — Advanced Project Management Platform',
    keywords: ['yajoura', 'jira', 'kanban', 'sprint', 'internship', 'react', 'nodejs', 'express', 'prisma', 'postgresql', 'management', 'telemetry', 'burndown'],
    content: `Project 01: Yajoura — Advanced Project Management Platform (Final-Year Internship, Feb 2025 – Jun 2025)
- Overview: A high-performance Jira-inspired platform designed for modern engineering teams, built during Rayen's final-year internship within an Agile Scrum team.
- Architecture: Multi-tiered architecture. React SPA frontend with responsive TailwindCSS layout; Node.js/Express.js backend utilizing Prisma ORM to interface with PostgreSQL.
- Key Capabilities:
  * Interactive drag-and-drop Kanban boards with instantaneous state synchronization.
  * Sprint telemetry, burndown calculations, and task velocity indicators.
  * Time-tracking logs per task with customizable KPI analytics dashboards.
  * Role-based access control and sprint backlog grooming.
- Technologies: React, TailwindCSS, Node.js, Express.js, Prisma ORM, PostgreSQL, TanStack Query.
- GitHub: https://github.com/Rayen74`
  },
  {
    id: 'project-oliverar',
    category: 'project',
    title: 'OliveRAR — Intelligent Olive Harvest Management System',
    keywords: ['oliverar', 'olive', 'harvest', 'agritech', 'spring boot', 'angular', 'mongodb', 'n8n', 'orchard', 'gis', 'yield', 'scrum'],
    content: `Project 02: OliveRAR — Intelligent Olive Harvest Management System (Academic Project, Mar 2026 – May 2026)
- Overview: Enterprise Agritech platform providing agricultural cooperatives an all-in-one hub to coordinate orchard scheduling, workforce assignment, and yield telemetry.
- Problem Solved: Replaces manual paper logs and dispersed spreadsheets with centralized digital dashboards, real-time KPI metrics, and automated alerts.
- Architecture:
  * Frontend: Angular with responsive component architecture, interactive charts, and orchard map views.
  * Backend: Layered Spring Boot (Java) REST microservices with Spring Data repositories.
  * Database: MongoDB for flexible orchard parcel schemas, worker logs, and harvest batches.
  * Automation: Integrated n8n workflows triggering automated crew dispatch, weather alerts, and yield reports.
  * Development Process: Agile Scrum sprints with continuous GitHub version control.
- Technologies: Spring Boot, Angular, MongoDB, n8n, Scrum, GitHub.
- GitHub: https://github.com/Rayen74`
  },
  {
    id: 'project-registration-agent',
    category: 'project',
    title: 'Candidate Registration Automation Agent (3rd Place Hackathon Winner)',
    keywords: ['registration agent', 'hackathon', 'award', '3rd place', 'cs syp hize', 'n8n', 'qr', 'email', 'sheets', 'automation'],
    content: `Project 03: Candidate Registration Automation Agent — Hackathon Project (24h) — CS SYP HIZE, 3rd Place Apr 2026
- Overview: Built an end-to-end automation pipeline in 24 hours that processes candidate registrations, deduplicates entries, generates personalized QR codes, and sends confirmation emails with zero manual intervention — placing 3rd among 10 teams at CS SYP HIZE.
- Technologies: n8n, Google Sheets API, Gmail API, QR Generation.
- GitHub: https://github.com/Rayen74`
  },
  {
    id: 'project-arsii',
    category: 'project',
    title: 'ARSII — Team Management Mobile App',
    keywords: ['arsii', 'mobile', 'react native', 'hackathon', 'ai night challenge', 'express', 'postgresql', 'prisma', 'ios', 'android'],
    content: `Project 04: ARSII — Team Management Mobile App (AI Night Challenge 24h Hackathon, Feb 2026)
- Overview: High-performance mobile MVP built in 24 hours during the AI Night Challenge hackathon.
- Problem Solved: Eliminates status-check meetings and scattered chat threads by giving teams a unified, fast mobile hub for task tracking and progress reporting.
- Architecture:
  * Mobile Client: React Native with TailwindCSS (NativeWind), optimized for both iOS and Android with smooth gestures.
  * Backend API: Node.js and Express.js REST API with Prisma ORM querying a PostgreSQL database.
  * Features: Instant task assignments, priority tags, sprint milestone status, and real-time team collaboration feed.
- Technologies: React Native, TailwindCSS, Node.js, Express.js, PostgreSQL, Prisma ORM.
- GitHub: https://github.com/Rayen74`
  },
  {
    id: 'project-jci',
    category: 'project',
    title: 'JCI Sakiet Ezzit Web Platform',
    keywords: ['jci', 'jci sakiet ezzit', 'volunteer', 'website', 'react', 'tailwind', 'netlify', 'community'],
    content: `Project 05: JCI Sakiet Ezzit Web Platform (Production Community Platform, Nov 2025)
- Overview: Designed, developed, and deployed the official production website for JCI Sakiet Ezzit.
- Purpose: Provides a public portal highlighting civic initiatives, youth leadership summits, and enabling online membership registration.
- Live Website: https://jci-sakiet-ezzit-website.netlify.app
- Technologies: React, Tailwind CSS, Responsive Web Design, Netlify (No backend Node.js server; purely static client with Netlify hosting).
- Media note: Clean text and link presentation; no photos or videos displayed.
- GitHub: https://github.com/Rayen74`
  },
  {
    id: 'project-cancer-classification',
    category: 'project',
    title: 'Cancer Classification via K-Means Clustering',
    keywords: ['cancer', 'clustering', 'k-means', 'pca', 'machine learning', 'python', 'scikit-learn', 'pandas', 'matplotlib', 'clinical'],
    content: `Project 06: Cancer Classification via K-Means Clustering (Machine Learning & Data Mining)
- Overview: Python desktop scientific GUI application for ingesting clinical CSV datasets, applying unsupervised clustering algorithms, and visualizing biomarker patterns.
- Capabilities:
  * Data cleaning, standard scaling, and Principal Component Analysis (PCA) dimension reduction.
  * K-Means clustering and Hierarchical Agglomerative clustering.
  * Interactive 2D/3D scatter plots visualizing malignant versus benign clustering boundaries.
- Technologies: Python, Scikit-learn, Pandas, NumPy, Matplotlib.
- GitHub: https://github.com/Rayen74`
  },
  {
    id: 'project-fake-news',
    category: 'project',
    title: 'Fake News Categorisation System',
    keywords: ['fake news', 'nlp', 'tf-idf', 'scikit-learn', 'text classification', 'python', 'disinformation'],
    content: `Project 07: Fake News Categorisation System (Machine Learning Text Classification)
- Overview: Automated machine learning text classification system that distinguishes factual reporting from online disinformation.
- Pipeline: Preprocessing, TF-IDF (Term Frequency-Inverse Document Frequency) vectorization matrices, and comprehensive model benchmarking across multiple supervised classifiers.
- Technologies: Python, TF-IDF, Scikit-learn, Pandas.
- GitHub: https://github.com/Rayen74`
  },
  {
    id: 'project-tech-news-agent',
    category: 'project',
    title: 'Tech News AI',
    keywords: ['tech news', 'agent', 'scraper', 'crawler', 'react agent', 'web search', 'python', 'beautifulsoup', 'digest', 'editorial'],
    content: `Project 08: Tech News AI — Evidence-First AI Editorial Pipeline
- Overview: **Tech News AI** — An evidence-first AI editorial pipeline that automatically discovers and deduplicates technology news, uses a ReAct agent to investigate and verify technical claims through web search, and applies deterministic scoring to produce reliable editorial recommendations.
- Architecture: Automated discovery crawler, ReAct investigative agent executing live web search validation, and deterministic confidence scoring logic.
- Technologies: Python, Web Scraping, ReAct Agent, Web Search, BeautifulSoup, Automation.
- GitHub: https://github.com/Rayen74`
  }
];

/**
 * Intelligent Retrieval Function:
 * Ranks knowledge items based on query relevance and conversation context
 */
export function retrieveKnowledge(query: string, historyText: string = ''): string {
  const combinedText = `${query} ${historyText}`.toLowerCase();
  const words = combinedText.split(/\s+/).filter(w => w.length > 2);

  const scored = KNOWLEDGE_ITEMS.map(item => {
    let score = 0;
    // Direct title match
    if (combinedText.includes(item.title.toLowerCase())) score += 10;
    
    // Keyword matches
    for (const kw of item.keywords) {
      if (combinedText.includes(kw)) {
        score += kw.length > 4 ? 3 : 2;
      }
    }

    // Specific project matches
    if (item.id === 'project-yajoura' && /yajoura|jira|kanban|sprint/i.test(combinedText)) score += 8;
    if (item.id === 'project-oliverar' && /oliverar|olive|harvest|agritech|spring boot|angular/i.test(combinedText)) score += 8;
    if (item.id === 'project-arsii' && /arsii|mobile|react native|ai night/i.test(combinedText)) score += 8;
    if (item.id === 'project-registration-agent' && /registration|qr|award|hackathon|hize|3rd place/i.test(combinedText)) score += 8;
    if (item.id === 'project-jci' && /jci|sakiet|volunteer/i.test(combinedText)) score += 8;
    if (item.id === 'project-cancer-classification' && /cancer|cluster|k-means|pca/i.test(combinedText)) score += 8;
    if (item.id === 'project-fake-news' && /fake news|disinformation|tf-idf/i.test(combinedText)) score += 8;
    if (item.id === 'project-tech-news-agent' && /tech news|react agent|scraper|crawler/i.test(combinedText)) score += 8;
    if (item.id === 'alternance-availability' && /alternance|hire|contact|availab|contract|intern/i.test(combinedText)) score += 6;
    if (item.id === 'tech-stack-skills' && /tech|stack|skills|docker|figma|git|n8n|next/i.test(combinedText)) score += 6;

    return { item, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top 4 relevant items plus base profile
  const selected = scored.filter(s => s.score > 0).slice(0, 4).map(s => s.item);

  // If no high scores, fallback to bio + skills + alternance
  if (selected.length === 0) {
    return [
      KNOWLEDGE_ITEMS.find(k => k.id === 'bio-summary')?.content,
      KNOWLEDGE_ITEMS.find(k => k.id === 'tech-stack-skills')?.content,
      KNOWLEDGE_ITEMS.find(k => k.id === 'alternance-availability')?.content
    ].filter(Boolean).join('\n\n---\n\n');
  }

  return selected.map(s => s.content).join('\n\n---\n\n');
}
