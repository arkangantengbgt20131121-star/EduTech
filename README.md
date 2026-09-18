# EduTech — Learn. Create. Build the Future. 🚀

An interactive learning platform for students, covering **technology** (Robotics, Coding, Design)
and **school subjects** (History, Mathematics, Science, English, Bahasa Indonesia, Geography).

Built with **Next.js 14 · React · TypeScript · Tailwind CSS · shadcn/ui-style components · Lucide icons**.

## ✨ Features

- **9 subjects, 33 lessons** with real content — explanations, examples, key terms, hands-on activities & quizzes
- **Lesson flow**: Learn → Try it → Quiz → Mark as Complete (+XP)
- **🧑‍💻 Coding playground** — run JavaScript natively, Python via a beginner-friendly runtime, and HTML with live preview
- **🤖 Micro:bit simulator** — clickable 5×5 LEDs, buttons A/B, shake, thermometer, scrolling text, dice & MakeCode snippets
- **9 guided projects** with step tracking and XP rewards
- **6 challenges** including a featured weekly challenge
- **Gamification**: XP, 6 levels (Explorer → Future Leader), 10 badges, daily streaks, toast celebrations + confetti
- **📊 Student dashboard** — XP, level, streak, per-subject progress, recent activity, badges
- **👤 Profile** — editable name/grade, theme settings, lifetime stats
- **🔍 Global search** (Ctrl/⌘+K) across lessons, projects & subjects
- **🌙 Dark / light mode** with system detection
- **📱 Fully responsive** — desktop, tablet & mobile
- Progress persists in `localStorage` — no account needed

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start learning!

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Run the production server |

## 🗂️ Project structure

```
app/
  page.tsx              → Homepage (hero, subjects, lessons, projects, challenge, progress, CTA)
  learn/                → Subject explorer + subject detail pages
  lessons/              → Lesson browser + full lesson experience
  projects/             → Project gallery + build guides
  challenges/           → Weekly, streak & community challenges
  playground/           → Coding playground (JS / Python / HTML)
  simulator/            → Interactive micro:bit simulator
  dashboard/            → Student progress dashboard
  profile/              → Profile & settings
components/
  ui.tsx                → shadcn/ui-style Button, Card, Badge, Progress…
  navbar.tsx / footer.tsx / cards.tsx / quiz.tsx
  code-playground.tsx / microbit-simulator.tsx / search-dialog.tsx
lib/
  subjects.ts / lessons-*.ts / lessons.ts   → Curriculum data
  projects.ts               → Projects, challenges, badges, levels
  store.tsx                 → Gamification state (XP, streaks, badges, toasts)
```

## 📝 License

Made with 💜 for curious students everywhere.
