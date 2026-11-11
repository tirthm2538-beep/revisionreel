# 🎬 RevisionReel

> **Swipeable micro-learning app for Class 11-12 Board & JEE Foundation concepts.**  
> Master high-yield, frequently confused Physics, Chemistry, and Mathematics concepts through 60-second bite-sized story cards with interactive quizzes.

Built and documented in public via a 10-episode video build series featuring **Tirth** (faceless AI avatar narrator).

---

## ⚡ Overview

RevisionReel transforms daunting Board & JEE syllabus concepts into engaging, digestible story cards. Each card follows a battle-tested micro-learning framework:
1. **Relatable Hook**: Real-world question or paradoxical scenario that sparks curiosity.
2. **Plain English Explanation**: Zero unnecessary academic fluff, focusing on the core mechanism.
3. **Grounded Analogy**: Everyday mental models that make abstract equations stick.
4. **Quick 3-Option Quiz**: Instant check for true conceptual understanding with immediate feedback & takeaway.

---

## 🏗 Architecture & Tech Stack

RevisionReel reuses the proven full-stack architecture of **FinFluence**:

- **Frontend**: [Next.js](https://nextjs.org/) (App Router, TypeScript) + [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)
  - Smooth swipeable card feed (Touch, Scroll snap, and Keyboard navigation)
  - Responsive layout (Mobile story reels & Desktop side-by-side study dashboard)
  - Dark / Light / Editorial theme modes
  - Dynamic subject filtering (Physics, Chemistry, Mathematics)
  - Interactive quiz engine with immediate explanation & streak counting
  - Guest mode with localStorage + Supabase cloud synchronization
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12)
  - RESTful API endpoints for concept cards, subjects, and progress
  - AI card generation endpoint template
  - Pydantic v2 data validation
- **Auth & Database**: [Supabase](https://supabase.com/) (Auth, PostgreSQL, Row Level Security)
- **Deployment**: Vercel (Frontend) + Render (Backend)

---

## 📂 Project Structure

```text
revisionreel/
├── frontend/                # Next.js App Router frontend
│   ├── src/
│   │   ├── app/             # Next.js layout, page, globals.css
│   │   ├── components/
│   │   │   ├── card/        # Hook, Explanation, Analogy, Quiz, StoryCard, ShareModal
│   │   │   ├── feed/        # StoryFeed, DesktopStoryDashboard, FeedHeader, FeedNavigation
│   │   │   ├── ui/          # Badge, ProgressBar, ThemeToggle
│   │   │   └── auth/        # AuthScreen (Supabase & Guest login)
│   │   ├── context/         # ThemeContext (dark/light)
│   │   ├── data/            # 18 starting concept cards (Physics, Chemistry, Math)
│   │   ├── lib/             # Supabase client & user progress tracking
│   │   ├── services/        # Backend API service
│   │   └── types/           # StoryCardData, Quiz, Subject types
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── backend/                 # FastAPI Python backend
│   ├── data/                # Seed card data
│   ├── models/              # Pydantic models (StoryCard, Quiz, etc.)
│   ├── services/            # AI card generator service
│   ├── main.py              # FastAPI application & routes
│   ├── requirements.txt
│   ├── render.yaml          # Render deployment manifest
│   ├── Procfile
│   └── .env.example
├── PROJECT_STATE.md         # Continuous living project documentation
└── README.md
```

---

## 🚀 Getting Started

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Backend API interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🎯 High-Yield Subjects Covered (Phase 1)
- ⚛️ **Physics**: Newton's 3rd Law vs Net Force, Centripetal vs Centrifugal pseudo-forces, Work-Energy theorem & friction, Lenz's Law & flux opposition, Simple Harmonic Motion restoring dynamics, Doppler Effect & cosmological redshift.
- 🧪 **Chemistry**: Electronegativity vs Electron Affinity, Le Chatelier's Principle & inert gas shifts, SN1 vs SN2 reaction pathways, Catalyst activation energy barriers, Colligative vapor pressure depression (Raoult's Law), Buffer solution equilibrium.
- 📐 **Mathematics**: Instantaneous rate of change & limits ($0/0$), Definite integral as net signed area, Dot product vs Cross product geometrical duality, Bayes' Theorem & conditional probability, Continuity vs Removable singularities, Permutations vs Combinations.

---

## 📜 License
MIT License. Built by Tirth Mehta (@tirthm2538-beep).
