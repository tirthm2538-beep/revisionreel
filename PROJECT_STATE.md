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
- Visual Design & Theming (locked & verified):
  - **Physics**: Sky Blue (`#0284c7`, `sky-500`, `blue-600`) — sky badge, sky concept pill, sky explanation & analogy cards, sky active indicator in sidebar, sky progress dots.
  - **Chemistry**: Emerald Teal (`#059669`, `emerald-500`, `teal-600`) — emerald badge, emerald concept pill, teal explanation, emerald analogy, emerald active indicator, emerald progress dots.
  - **Mathematics**: Indigo Violet (`#6366f1`, `indigo-500`, `purple-600`) — indigo badge, indigo concept pill, purple explanation, indigo analogy, indigo active indicator, indigo progress dots.
  - FinFluence's green styling was scrubbed from general card components so non-chemistry cards never show leftover green.
- Documentation: 10-episode short video series, faceless AI avatar "Tirth" 
  narrating the build process, no real face/voice used
- GitHub Repository: https://github.com/tirthm2538-beep/revisionreel

## What was built
1. **Repository & Workspace Setup**:
   - Initialized Git repository with clean `.gitignore` (ignoring node_modules, .next, venv, pycache, .env.local).
   - Created public GitHub repo `tirthm2538-beep/revisionreel` via GitHub API and configured origin remote.

2. **18 Starting High-Yield Concept Cards**:
   - **Physics (6 cards)**: Newton's 3rd Law, Centripetal vs Centrifugal Force, Work Done by Friction, Lenz's Law, SHM Velocity vs Acceleration, Doppler Effect & Redshift.
   - **Chemistry (6 cards)**: Electronegativity vs Electron Affinity, Le Chatelier & Inert Gas, SN1 vs SN2, Catalysts & Activation Energy, Raoult's Law & Colligatives, Buffers & Common Ion Effect.
   - **Mathematics (6 cards)**: Derivatives (0/0 limit), Definite Integrals (Net Area), Dot vs Cross Product, Bayes' Theorem, Continuity vs Differentiability, Permutations vs Combinations.

3. **Next.js Frontend (`/frontend`)**:
   - Component architecture: `HookSection`, `ExplanationSection`, `AnalogySection`, `QuizSection`, `StoryCard`, `ShareModal`.
   - Navigation: `FeedHeader` (subject filters, streak, XP, auth), `FeedNavigation` (floating controls), `StoryProgressBar` (subject-themed indicator).
   - Layouts: Mobile snap story feed (`StoryFeed`) + side-by-side desktop study dashboard (`DesktopStoryDashboard`) with instant view switcher.
   - Authentication & Progress: `AuthScreen` with Supabase sign-in/up and instant Guest Mode (localStorage fallback + +10 XP quiz reward + streak tracking).
   - Theme: Dark / Light toggle supported via `ThemeContext`.
   - Real Supabase credentials connected in `.env.local` (`NEXT_PUBLIC_SUPABASE_URL=https://chlnjwnbvfitnvclqpgs.supabase.co`).
   - Production Build: Verified clean compilation with Turbopack (`next build` passing in ~2.0s with 0 errors/warnings).

4. **FastAPI Backend (`/backend`)**:
   - `main.py` serving REST endpoints:
     - `GET /health` (service status, card count, zero-downtime health check)
     - `GET /cards` (supports `?subject=` and `?track=` filtering)
     - `GET /cards/{card_id}` (individual card lookup)
     - `GET /subjects` and `GET /tracks` (subject metadata)
     - `POST /cards/generate` (AI card generation endpoint)
   - CORS middleware pre-configured for `https://*.vercel.app` and `http://localhost:3000`.
   - Deployment ready: `Procfile`, `render.yaml`, `requirements.txt`.

5. **Visual Verification & Proof**:
   - Full headless browser screenshots generated for Physics, Chemistry, and Mathematics in both Desktop (1280x820) and Mobile (420x860) views.
   - Visual parity and strict subject-based color separation verified.

6. **Documentation Video Series — Episode 1**:
   - Episode 1 title: *"I'm Building an AI App for Students — Here's the Plan"*
   - Locked script (~96 seconds, casual energetic collegiate tone).
   - Generated faceless AI avatar character portrait for narrator "Tirth" (`series/episode-01/avatar_tirth.png`).
   - Synthesized natural voiceover audio (`series/episode-01/episode_1_voiceover.mp3`) with timed subtitles (`episode_1_captions.vtt`).
   - Rendered 1080x1920 vertical video reel (`series/episode-01/episode_1_reel.mp4`).
   - Detailed production breakdown & storyboard created in `series/episode-01/EPISODE_1_PLAN.md`.

## Status
- Initial project scaffolding complete & verified locally.
- Real Supabase credentials active in `frontend/.env.local`.
- Production build confirmed clean (`next build`).
- Subject color theming refined, verified, and screenshotted.
- Latest code pushed to GitHub (`https://github.com/tirthm2538-beep/revisionreel`).
- In Progress: Backend deployment to Render (waiting for live backend URL).
- Next Step: Frontend deployment to Vercel with live backend URL and Supabase credentials.

## Deployment Guide & Next Steps
1. **Supabase Database & Auth Setup**:
   - Project: `https://chlnjwnbvfitnvclqpgs.supabase.co`
   - Public Anon Key: Configured in `frontend/.env.local`.
   - SQL schema from `frontend/supabase/schema.sql` applied to Supabase SQL editor.
2. **Backend Deployment (Render)**:
   - Create Web Service from `tirthm2538-beep/revisionreel`.
   - Set Root Directory to `backend`.
   - Build Command: `pip install -r requirements.txt`.
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
   - Plan: Free.
   - Environment Variables: `PYTHON_VERSION = 3.12.5`.
3. **Frontend Deployment (Vercel)**:
   - Import `tirthm2538-beep/revisionreel` on Vercel.
   - Set Root Directory to `frontend`.
   - Configure Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL = https://chlnjwnbvfitnvclqpgs.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_VzFaoesWOTjyC16l4frMpw_MgR0_4G_`
     - `NEXT_PUBLIC_API_URL = <Live Render URL>`
4. **Series Episode 2**:
   - Script and produce Episode 2: *"Why Revision the Old Way is Broken & How Micro-Cards Fix It"*.
