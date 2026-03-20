# <p align="center"> <img src="./assets/README_HERO.png" alt="AI-Adaptive Onboarding Engine Hero" width="100%"> </p>

<h1 align="center">⚡ AI-ADAPTIVE ONBOARDING ENGINE ⚡</h1>

<p align="center">
  <b>Eliminate generic onboarding. Empower talent with personalized, AI-driven learning pathways.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-gold?style=for-the-badge&logo=appveyor" alt="Version">
  <img src="https://img.shields.io/badge/Backend-NodeJS%20%7C%20Express-black?style=for-the-badge&logo=node.js&logoColor=white" alt="Backend">
  <img src="https://img.shields.io/badge/Frontend-React%2019%20%7C%20Tailwind%20v4-black?style=for-the-badge&logo=react&logoColor=blue" alt="Frontend">
  <img src="https://img.shields.io/badge/AI-Gemini%20%7C%20GPT--4o%20%7C%20Groq-gold?style=for-the-badge&logo=google-gemini&logoColor=white" alt="AI Stack">
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/HARSHILL2023/ArtPark_CodeForge_Hackathon?style=flat-square&color=gold" alt="Last Commit">
  <img src="https://img.shields.io/badge/Maintained%3F-Yes-green?style=flat-square" alt="Maintained">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Made%20with-Love%20%26%20Coffee-rose?style=flat-square" alt="Made with Love">
</p>

---

### 🛑 The Problem: The "Generic Onboarding" Trap

Companies today lose billions in productivity because they treat every new hire like a blank slate. 
- **Senior developers** sit through "Introduction to Git."
- **Niche specialists** are forced into irrelevant domain training.
- **Critical skill gaps** are only discovered *after* they impact a project.
Generic onboarding is where talent goes to die. It's time for an engine that understands the **DNA of your talent.**

---

### ✨ The Solution: Engineering Mastery, Personalized.

The **AI-Adaptive Onboarding Engine** is a first-class SaaS platform that bridges the gap between a candidate's current skills and their new role's requirements. Using state-of-the-art **Topological Sorting** and **LLM reasoning**, we generate a laser-focused, dependency-aware roadmap in seconds.

- **Stop guessing.** Our engine maps the shortest path from "New Hire" to "Productive Contributor."
- **Start scaling.** One platform to onboard Engineering, HR, Sales, and Design teams with zero manual effort.
- **Trust the process.** Every AI decision is backed by a **Reasoning Trace** for total transparency.

---

### 🚀 Feature Showcase

| Feature | Icon | Description |
| :--- | :---: | :--- |
| **Deep Resume Parsing** | 🔍 | Extracts nuanced skills, seniority, and years of experience from any PDF using GPT-4o. |
| **JD Semantic Alignment** | 🎯 | Maps job descriptions to extracted profiles to pinpoint exactly what's missing. |
| **Topological Sort Engine** | ⛓️ | Orders learning modules by prerequisites — so you learn basics before advanced topics. |
| **Interview Studio** | 🎙️ | High-fidelity technical simulation studio with real-time feedback and difficulty scaling. |
| **Interactive Skill Map** | 🕸️ | 3D-styled dependency graph visualization built with React Flow and Framer Motion. |
| **Readiness DNA** | 🧬 | A visual "Readiness Score" that improves as you complete modules in your roadmap. |

---

### 🧠 The AI Brain: How the Magic Happens

Our engine doesn't just "guess." It follows a rigorous **6-Phase Pipeline** to ensure the highest quality learning experience.

```mermaid
graph TD
    A[📄 Raw Resume / JD] -->|Phase 1| B[🤖 LLM Entity Extraction]
    B -->|Phase 2| C[⚖️ Semantic Gap Analysis]
    C -->|Phase 3| D[🕸️ Dependency Graph Construction]
    D -->|Phase 4| E[🔢 Topological Sort Algorithm]
    E -->|Phase 5| F[👤 Learner Profile Adaptation]
    F -->|Phase 6| G[🗺️ Enriched Adaptive Roadmap]
    G --> H[🏁 Success: Productive Associate]
```

#### 🔍 Phase Detail:
1.  **Phase 1: Resume & JD Parsing**: We transform unstructured text into high-fidelity JSON profiles using GPT-4o.
2.  **Phase 2: Semantic Gap Analysis**: We compare "Required Mastery" vs "Current Mastery" using semantic normalization (e.g. mapping "ReactJS" to "React").
3.  **Phase 3: Dependency Graph**: We build a directed acyclic graph (DAG) of the internal course catalog.
4.  **Phase 4: Topological Sort**: **The Genius Part.** Using Kahn's Algorithm, we sort the required courses such that all prerequisites are completed before advanced material.
5.  **Phase 5: Adaptation**: The engine skips "Easy" modules for Senior hires and automatically ups the difficulty for high-aptitude candidates.
6.  **Phase 6: Reasoning Trace**: The AI generates a `why_included` field for every step, proving why it's there and how it saves time.

---

### 🛠️ Tech Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React%2019-20232A?logo=react) | Modern, responsive component architecture. |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind%20v4-38B2AC?logo=tailwind-css) | Ultra-fast CSS utility-first design. |
| **Backend** | ![Node](https://img.shields.io/badge/Node.js-339933?logo=node.js) | Scalable Express.js API orchestration. |
| **Database** | ![Mongo](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb) | Flexible schema for sessions and course storage. |
| **AI LLM** | ![Groq](https://img.shields.io/badge/Groq%20Llama%203-gold?logo=meta) | High-speed inference for parsing and enrichment. |
| **Flows** | ![ReactFlow](https://img.shields.io/badge/React--Flow-BC0C4B?logo=react) | Interactive node-based roadmap visualization. |
| **Motion** | ![Framer](https://img.shields.io/badge/Framer--Motion-0055FF?logo=framer) | Cinematic transitions and micro-animations. |

---

### 🛰️ API Reference (Top Endpoints)

| Method | Endpoint | Description |
| :--- | :---: | :--- |
| `POST` | `/api/upload` | Upload Resume (File) + JD (Text/File). Returns `sessionId`. |
| `POST` | `/api/analysis/run` | Triggers the full 6-phase AI pipeline for a session. |
| `GET` | `/api/analysis/:id` | Recovers completed roadmap, metrics, and reasoning trace. |
| `POST` | `/api/interview/ask` | Generates a dynamic technical question based on current skill. |

---

### 🎯 Explainable AI: The Reasoning Trace

"Black Box" AI is for amateurs. Our engine provides a full **Reasoning Trace** for every single recommendation.

> **Example Trace Output:**
> *"Course 'Advanced Node.js' included because JD requires Proficiency 5/5, but Resume shows 3/5. Placed in Week 3 because 'Javascript Fundamentals' must be completed first to satisfy the dependency chain (JS → Node Basics → Advanced Node)."*

This level of transparency ensures that HR teams and Managers can trust the path being forged for their talent.

---

### 🌍 Cross-Domain Scalability

While our demo catalog is optimized for **Software Engineering**, the core engine is **Domain-Agnostic**.
- **HR & Ops**: Load your internal policy courses into the database.
- **Sales & Marketing**: Connect to your CRM training modules.
- **Legal & Compliance**: Map certification prerequisites effortlessly.
The engine adapts its topological sort to *any* set of skills and training materials.

---

### 🐋 Docker: One-Command Setup

Experience the speed of a production-ready setup using Docker Compose.

```bash
# Clone the repository
git clone https://github.com/HARSHILL2023/ArtPark_CodeForge_Hackathon.git
cd ArtPark_CodeForge_Hackathon

# Launch the entire engine (Frontend, Backend, MongoDB)
docker-compose up --build
```

---

### 🚀 Manual Local Setup

#### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env # Add your GROQ/OPENAI/GEMINI keys
npm run dev
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

### 📊 System Architecture

```mermaid
graph LR
    User([User]) -->|Upload PDF| FE(React Frontend)
    FE -->|API Call| BE(Express Backend)
    BE -->|Query| DB[(MongoDB)]
    BE -->|Prompt| AI{Multi-LLM Engine}
    AI -->|Groq / GPT-4o| BE
    BE -->|Response| FE
    FE -->|Render| Flow[React Flow Roadmap]
```

---

### 📈 Results & Evaluation Roadmap

| Evaluative Criterion | Our Implementation | Result |
| :--- | :--- | :---: |
| **AI Innovation** | Multi-Provider Fallback (Gemini + Groq) | **High** |
| **Logic Dept** | Topological Sorting of Dependencies | **Elite** |
| **UI/UX Premium** | Glassmorphism + React Flow + animations | **Premium** |
| **Scalability** | Domain-Agnostic metadata engine | **Global** |

---

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>Built for the ArtPark CodeForge Hackathon. Redefining how the world learns.</b>
</p>
