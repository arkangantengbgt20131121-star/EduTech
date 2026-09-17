# EduTech — Learn. Create. Build the Future.

An interactive learning platform for students aged 10–18 that combines an online school, a coding
lab, a robotics workshop, a design studio, an interactive textbook and gamified progress tracking.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn-style
Radix primitives · Lucide icons**, and genuinely runnable in the browser:

- a **Python subset interpreter** written for this project (no Pyodide, no CDN),
- a **Micro:bit simulator** with a 5×5 LED matrix, buttons, shake and sensors,
- a **sandboxed HTML/CSS/JS preview** inside the CodeMirror playground,
- **Quizzes** with multiple choice, true/false, matching and fill-in-the-blank questions.

> Demo data lives in `src/data` and progress is stored in `localStorage`, so the whole platform runs
> without a backend. Every data accessor is a plain function — swap them for API calls and the UI
> keeps working.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Dev server on `0.0.0.0:3000`                            |
| `npm run build`     | Production build (all pages prerendered)                |
| `npm run start`     | Serve the production build                              |
| `npm run lint`      | ESLint (Next core-web-vitals + TypeScript rules)        |
| `npm run typecheck` | `tsc --noEmit`                                          |
| `npm run test`      | All three checks below                                  |
| `npm run test:data` | Content integrity: units, quizzes, widgets, search      |
| `npm run test:python` | 18-case smoke test for the Python interpreter         |
| `npm run test:microbit` | Drives all 12 simulator programs through the runtime |

## Routes

| Route | What is there |
| ----- | ------------- |
| `/` | Hero, categories, popular lessons, interactive showcase, projects, weekly challenge, gamification |
| `/learn` | Learning library with filters and “continue learning” |
| `/subjects` | All 10 subjects |
| `/subjects/[subject]` | Subject overview, units, lessons and related projects |
| `/lessons/[id]` | Full lesson: objectives, blocks, widgets, quiz, mark-as-complete |
| `/playground` | Coding playground (Python · JavaScript · HTML/CSS) |
| `/microbit` | Micro:bit simulator and 12 example programs |
| `/projects`, `/projects/[id]` | Project gallery and step-by-step build pages |
| `/challenges`, `/challenges/[id]` | Weekly/monthly challenges, hints, submission, leaderboard |
| `/dashboard` | Level, XP, streak, courses, weekly activity, badges |
| `/profile` | Profile, submitted projects, badge cabinet, settings |
| `/search` | Grouped search across lessons, projects, challenges and subjects |
| `/about` | How EduTech works, FAQ, privacy, terms, contact |

## Project structure

```
src/
├── app/                 # App Router pages (layout, routes, not-found)
├── components/
│   ├── layout/          # navbar, footer, search dialog
│   ├── ui/              # Radix + Tailwind primitives (button, card, dialog, …)
│   ├── shared/          # dashboard-agnostic building blocks (badges, headings)
│   ├── home/            # homepage sections and hero
│   ├── lessons/         # lesson renderer, block renderer, rich text
│   ├── quiz/            # quiz engine (4 question types)
│   ├── coding/          # CodeMirror editor + playground
│   ├── microbit/        # simulator UI
│   ├── widgets/         # interactive lesson widgets (fraction lab, timeline, …)
│   ├── progress/        # progress context (XP, streaks, courses, badges)
│   ├── dashboard/ profile/ projects/ challenges/ search/
├── data/                # content model, subjects, lessons, projects, gamification
├── lib/
│   ├── engine/python.ts # Python subset interpreter
│   ├── microbit/        # LED glyphs, programs, runtime
│   └── utils.ts hooks.ts
└── scripts/             # interpreter smoke test
```

## How the interactive parts work

**Python.** `src/lib/engine/python.ts` is a tokenizer → parser → tree-walking evaluator supporting
variables, f-strings, `if`/`elif`/`else`, `while`, `for` over `range`/`enumerate`/`zip`, functions,
lists, dictionaries, `input()` and `print()`. Errors carry a line number and a beginner-friendly
hint, and runaway loops are stopped with a clear message.

**Micro:bit.** Programs are async generators talking to a small runtime API
(`showIcon`, `showString`, `showNumber`, `pause`, `waitForButton`, `sensors`, …). The React
simulator only subscribes to runtime state, so the same programs could be driven by a real board
over WebUSB.

**Quizzes.** Every question has an explanation; the quiz pauses until all questions are answered,
shows a score card, awards XP through the progress provider and reveals a review pass with
per-question feedback.

## Accessibility & performance

- Semantic landmarks, labelled controls, visible focus rings and keyboard shortcuts (⌘/Ctrl+K search,
  `Ctrl+Enter` to run code, arrow keys in the timeline and quiz).
- Colour choices target WCAG AA contrast in both light and dark themes.
- Animations use transform/opacity, reduce-motion is honoured, and heavy widgets (CodeMirror) load
  on demand.
- Self-hosted variable fonts (Inter + JetBrains Mono) — no third-party requests at runtime.

## Extending it

`src/data/types.ts` defines the content model (`Lesson`, `LessonBlock`, `QuizQuestion`, `Project`,
`Challenge`, `Badge`, `Level`, `ProgressStats`). Add a lesson by appending a typed object to the
relevant file in `src/data/lessons/` — the catalogue, search, dashboards and home page pick it up
automatically. Authentication, a database, teacher accounts and an AI tutor all plug in behind
`src/data/index.ts` and `src/components/progress/progress-provider.tsx`.
