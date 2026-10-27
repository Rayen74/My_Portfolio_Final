# Rayen Chaaben – AI-Powered Portfolio

A modern, interactive personal portfolio for **Rayen Chaaben**, an AI Full-Stack Developer based in Sfax, Tunisia, currently seeking an *alternance* (work-study) position in Full-Stack Development & AI Integration.

Besides showcasing projects, skills and certifications, the site includes **AETHER-01**, an AI portfolio companion that answers visitors' questions about Rayen's CV, background and projects.

---

## Features

- **Single-page portfolio** with About, Projects, Skills & Certifications and Contact sections
- **AI chat companion (AETHER-01)** powered by a retrieval-augmented prompt:
  - Retrieves relevant facts from a curated knowledge base (`src/data/portfolioKnowledge`)
  - Calls an LLM (Ollama Cloud, `gemma4:31b-cloud`) with the retrieved context and the last few messages of the conversation
  - Suggests contextual action links (e.g. "Explore Projects Section", "Contact Rayen Directly")
  - Includes a guard that refuses questions about the bot's internals, system prompt or API keys
- **CV download & preview** through dedicated routes (`/api/download-cv`, `/CV.pdf`)
- **3D / animated visuals** using Three.js, OGL and Motion
- **Responsive design** styled with Tailwind CSS 4

## Tech Stack

| Layer      | Technologies                                         |
|------------|------------------------------------------------------|
| Frontend   | React 19, TypeScript, Vite, Tailwind CSS 4           |
| Animation  | Motion, Three.js, OGL, Lucide React (icons)          |
| Backend    | Node.js, Express 4, tsx                              |
| AI         | Ollama Cloud (OpenAI-compatible API), `@google/genai` |
| Tooling    | TypeScript, esbuild, dotenv                          |

## Project Structure

```
My_Portfolio_Final/
├── public/            # Static assets (CV PDF, images)
├── src/               # React app (components, data, styles)
│   └── data/          # Portfolio knowledge base used by the chatbot
├── server.ts          # Express server: API routes + Vite middleware / static serving
├── index.html         # App entry point
├── vite.config.ts     # Vite configuration
├── tsconfig.json
├── .env.example       # Environment variable template
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v20 or later** (v22 recommended)
- npm (bundled with Node.js) — or [Bun](https://bun.sh/), since a `bun.lock` is included
- An [Ollama Cloud](https://ollama.com) API key (for the chat companion)

### 1. Clone the repository

```bash
git clone https://github.com/Rayen74/My_Portfolio_Final.git
cd My_Portfolio_Final
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Configure environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

| Variable         | Required | Description                                          |
|------------------|----------|------------------------------------------------------|
| `OLLAMA_API_KEY` | Yes      | API key for Ollama Cloud (used by the `/api/chat` route) |
| `GEMINI_API_KEY` | No       | Gemini API key (reserved for Gemini calls)           |
| `APP_URL`        | No       | Public URL where the app is hosted                   |
| `PORT`           | No       | Server port (defaults to `3000`)                     |

> **Never commit your `.env` file or API keys.** `.env` is already listed in `.gitignore`.

### 4. Run in development

```bash
npm run dev
```

Open **http://localhost:3000**. The Express server runs Vite in middleware mode, so the frontend and API share a single port with hot reloading.

### 5. Build and run for production

```bash
npm run build                    # builds the frontend into dist/
NODE_ENV=production npm start    # serves dist/ and the API
```

On Windows (PowerShell):

```powershell
npm run build
$env:NODE_ENV="production"; npm start
```

## Available Scripts

| Script            | Description                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Start the dev server (Express + Vite) with `tsx` |
| `npm run build`   | Build the frontend for production                |
| `npm start`       | Start the server (set `NODE_ENV=production`)     |
| `npm run preview` | Preview the Vite production build                |
| `npm run lint`    | Type-check the project with `tsc --noEmit`       |
| `npm run clean`   | Remove build output                              |

## API Endpoints

| Method | Route                                  | Description                                   |
|--------|----------------------------------------|-----------------------------------------------|
| POST   | `/api/chat`                            | Chat with AETHER-01. Body: `{ message, history }` |
| GET    | `/api/download-cv`                     | Download the CV as a PDF                      |
| GET    | `/CV.pdf`, `/Rayen_Chaaben_CV.pdf`     | View the CV inline in the browser             |

## Customizing

To adapt this portfolio for yourself:

1. Replace the CV PDF in `public/assets/` and update the path in `server.ts`.
2. Edit the knowledge base in `src/data/` with your own profile, projects and skills.
3. Update the sections and content in `src/`.
4. Adjust the system prompt in `server.ts` to match your identity and goals.

## Contact

**Rayen Chaaben** – AI Full-Stack Developer
- GitHub: [@Rayen74](https://github.com/Rayen74)
- Email: rayenchaaben0704@gmail.com

## License

This project is for personal portfolio use. Add a license of your choice (e.g. MIT) if you want others to reuse the code.
