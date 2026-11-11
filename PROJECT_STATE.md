# PROJECT_STATE.md — RevisionReel

## Goal
A swipeable micro-learning app teaching Class 11-12 board exam concepts 
(Physics, Chemistry, Math — JEE-foundation level) through short story cards 
with quizzes, reusing FinFluence's proven architecture. Built and documented 
in public via a 10-episode short-video series (faceless AI avatar narrator 
named "Tirth"), posted to Instagram and YouTube, with the code public on 
GitHub.

## Reference project
Built on the same architecture as FinFluence (github.com/tirthm2538-beep/finfluence):
Next.js + Tailwind swipeable story-card UI, FastAPI backend, Supabase for 
auth/streaks/progress, deployed on Vercel + Render.

## Tech stack
- Frontend: Next.js 16 (React 19) + Tailwind CSS v4 — swipeable story-card UI 
  (modular Hook, Plain-English, Grounded Analogy, and 3-Option Quiz components, 
  supporting both mobile swipe-snap feed and dual-pane desktop study dashboard)
- Backend: Python 3.12 + FastAPI + Pydantic v2
- Database & Auth: Supabase (PostgreSQL with RLS + Auth, plus local guest fallback)
- Deploy: Vercel (frontend) + Render (backend)

## Tool workflow
- Claude/ChatGPT: planning, content design, debugging, reviewing output
- Antigravity (Gemini): main heavy coding/build work + video generation for 
  the documentation series
- Git: version controlled from day one, pushed to GitHub as the project builds

## Decisions made so far
- Project name: RevisionReel
- Subject scope (Phase 1): Class 11-12 Physics, Chemistry, Math — high-yield, 
  frequently-confused concepts (not full syllabus coverage yet)
- Format: swipeable story cards, one concept per card, quick 3-option quiz after each
- Tone guide (locked):
  1. Relatable real-world curiosity hook question
  2. Plain-English explanation without academic jargon
  3. One grounded, concrete everyday analogy
  4. Quick 3-option quiz (A, B, C) with constructive explanations and punchy takeaway
- Documentation: 10-episode short video series, faceless AI avatar "Tirth" 
  narrating the build process, no real face/voice used
- GitHub Repository: https://github.com/tirthm2538-beep/revisionreel

## What was built (Initial Release)
1. **Repository & Workspace Setup**:
   - Initialized Git repository with clean `.gitignore` (ignoring node_modules, .next, venv, pycache, .env.local).
   - Created public GitHub repo `tirthm2538-beep/revisionreel` via GitHub API and configured origin remote.

2. **18 Starting High-Yield Concept Cards**:
   - **Physics (6 cards)**:
     - Newton's 3rd Law & Action-Reaction Pairs (Mechanics)
     - Centripetal vs Centrifugal Force (Circular Motion)
     - Work Done by Friction: Positive or Negative? (Work & Energy)
     - Lenz's Law & Conservation of Energy (Electromagnetism)
     - Simple Harmonic Motion: Max Speed vs Max Pull (Oscillations)
     - The Doppler Effect & Cosmological Redshift (Waves & Modern Physics)
   - **Chemistry (6 cards)**:
     - Electronegativity vs Electron Affinity (Periodic Trends)
     - Le Chatelier's Principle & Inert Gas Addition (Chemical Equilibrium)
     - SN1 vs SN2 Nucleophilic Substitution (Organic Chemistry)
     - Catalysts & Activation Energy: What They Don't Change (Chemical Kinetics)
     - Raoult's Law & Colligative Properties (Solutions)
     - Buffer Solutions & The Common Ion Effect (Ionic Equilibrium)
   - **Mathematics (6 cards)**:
     - Derivatives: The Illusion of 0/0 (Calculus)
     - Definite Integrals: Net Signed Area (Calculus)
     - Dot Product vs Cross Product (Vectors & 3D)
     - Bayes' Theorem & The Base Rate Fallacy (Probability)
     - Continuity vs Differentiability: The Sharp Corner (Calculus)
     - Permutations vs Combinations: Does Order Matter? (Combinatorics)

3. **Next.js Frontend (`/frontend`)**:
   - Component architecture: `HookSection`, `ExplanationSection`, `AnalogySection`, `QuizSection`, `StoryCard`, `ShareModal`.
   - Navigation: `FeedHeader` (subject filters, streak, XP, auth), `FeedNavigation` (floating up/down arrows), `StoryProgressBar`.
   - Layouts: Mobile snap story feed (`StoryFeed`) + side-by-side desktop study dashboard (`DesktopStoryDashboard`) with instant switcher.
   - Design: Tailwind CSS v4 styling with dynamic subject accents (Sky Blue for Physics, Emerald Teal for Chemistry, Indigo Violet for Math).
   - Authentication & Progress: `AuthScreen` with Supabase sign-in/up and instant Guest Mode (localStorage fallback + +10 XP quiz reward + streak calculation).
   - Theme: Dark / Light toggle supported via `ThemeContext`.
   - Verified: Clean Next.js 16 production build (`npx next build` passing with zero errors/warnings).

4. **FastAPI Backend (`/backend`)**:
   - `main.py` serving REST endpoints:
     - `GET /health` (service status, card count)
     - `GET /cards` (supports `?subject=` and `?track=` filtering)
     - `GET /cards/{card_id}` (individual card lookup)
     - `GET /subjects` and `GET /tracks` (subject metadata)
     - `POST /cards/generate` (AI card generation endpoint)
   - Pydantic v2 schemas in `models/card.py`.
   - Seed data in `data/cards.py`.
   - Deployment configs: `Procfile`, `render.yaml`, `requirements.txt`.
   - Dedicated Python 3.12 virtual environment tested and verified.

5. **Documentation Video Series — Episode 1**:
   - Episode 1 title: *"I'm Building an AI App for Students — Here's the Plan"*
   - Locked script (~96 seconds, casual energetic collegiate tone).
   - Generated faceless AI avatar character portrait for narrator "Tirth" (`series/episode-01/avatar_tirth.png`).
   - Synthesized natural voiceover audio (`series/episode-01/episode_1_voiceover.mp3`) with timed subtitles (`episode_1_captions.vtt`).
   - Rendered 1080x1920 vertical video reel (`series/episode-01/episode_1_reel.mp4`).
   - Detailed production breakdown & storyboard created in `series/episode-01/EPISODE_1_PLAN.md`.

## Status
- Initial project scaffolding complete & verified locally.
- 18 high-yield concept cards loaded across Physics, Chemistry, and Math.
- Episode 1 media assets and video reel produced under `series/episode-01/`.
- Code and assets pushed to GitHub (`https://github.com/tirthm2538-beep/revisionreel`).
- In Progress: Full-stack deployment phase (Supabase project creation, Render backend deployment, Vercel frontend deployment).

## Deployment Guide & Next Steps
1. **Supabase Database & Auth Setup**:
   - Create new project `revisionreel` on Supabase.
   - Run `frontend/supabase/schema.sql` in SQL Editor to create `profiles`, `completed_cards`, and `saved_cards` tables with RLS and user trigger.
   - Copy Project URL and public `anon` API key into `frontend/.env.local`.
2. **Backend Deployment (Render)**:
   - Create Web Service from `tirthm2538-beep/revisionreel`.
   - Set Root Directory to `backend`.
   - Build Command: `pip install -r requirements.txt`.
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
   - Environment Variables: `PYTHON_VERSION = 3.12.5`.
3. **Frontend Deployment (Vercel)**:
   - Import `tirthm2538-beep/revisionreel` on Vercel.
   - Set Root Directory to `frontend`.
   - Configure Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_API_URL` (Live Render URL)
4. **Series Episode 2**:
   - Script and produce Episode 2: *"Why Revision the Old Way is Broken & How Micro-Cards Fix It"*.
