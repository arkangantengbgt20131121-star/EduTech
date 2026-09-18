import type { Badge, Challenge, Project } from "./types";

export const projects: Project[] = [
  {
    id: "p-digital-dice",
    title: "Digital Dice",
    subjectId: "robotics",
    category: "Micro:bit",
    description:
      "Shake the micro:bit to roll a dice with realistic pips, rolling animation and sound.",
    difficulty: "Beginner",
    duration: "45 min",
    xp: 100,
    tools: ["Micro:bit simulator", "MakeCode"],
    steps: [
      { title: "Set up shake detection", detail: "Add an 'on shake' event. This is the trigger for every roll." },
      { title: "Add a rolling animation", detail: "Flash 5–6 random numbers quickly to mimic a tumbling dice." },
      { title: "Draw pips 1–6", detail: "Design pip patterns with plot() — 1 is center, 6 is two columns of three." },
      { title: "Play a tick sound", detail: "Use the speaker to click during the roll animation." },
      { title: "Test 20 rolls", detail: "Tally results — each number should appear roughly equally." },
    ],
    outcomes: ["Working dice program", "Understanding of random numbers", "Event-driven code"],
    featured: true,
  },
  {
    id: "p-guessing-game",
    title: "Number Guessing Game",
    subjectId: "coding",
    category: "Python",
    description:
      "A complete Python game with difficulty levels, hints, scoring and a play-again loop.",
    difficulty: "Beginner",
    duration: "1 hour",
    xp: 120,
    tools: ["Coding Playground", "Python"],
    steps: [
      { title: "Generate the secret", detail: "Use random.randint() with a range based on difficulty." },
      { title: "Build the guess loop", detail: "Loop until correct or attempts run out, with high/low hints." },
      { title: "Add hot/cold hints", detail: "'Burning!' within 3, 'warm' within 10, 'cold' beyond." },
      { title: "Score the player", detail: "Fewer attempts = more points. Track best score in a variable." },
      { title: "Wrap in play-again", detail: "Ask 'Play again? (y/n)' and loop the whole game." },
    ],
    outcomes: ["Complete game file", "Loops + conditions mastery", "Input validation skills"],
    featured: true,
  },
  {
    id: "p-portfolio",
    title: "Personal Portfolio Website",
    subjectId: "coding",
    category: "HTML & CSS",
    description:
      "Design and code a one-page portfolio with hero, projects, about and contact sections.",
    difficulty: "Beginner",
    duration: "2 hours",
    xp: 150,
    tools: ["Coding Playground", "HTML", "CSS"],
    steps: [
      { title: "Sketch the layout", detail: "Hero with your name, 3 project cards, about paragraph, contact links." },
      { title: "Build the HTML", detail: "Semantic tags: header, main, section, footer. Alt text on images." },
      { title: "Style with CSS", detail: "Pick a 60-30-10 palette, style cards with shadows and rounded corners." },
      { title: "Make it responsive", detail: "Cards stack on mobile with flex-wrap or a media query." },
      { title: "Publish & share", detail: "Deploy free on GitHub Pages or Netlify and share the link." },
    ],
    outcomes: ["Live website URL", "Responsive layout skills", "Portfolio piece #1"],
    featured: true,
  },
  {
    id: "p-todo-app",
    title: "Interactive To-Do App",
    subjectId: "coding",
    category: "JavaScript",
    description:
      "A task manager with add, complete, delete and localStorage saving — real app behavior.",
    difficulty: "Intermediate",
    duration: "2 hours",
    xp: 180,
    tools: ["Coding Playground", "JavaScript", "HTML", "CSS"],
    steps: [
      { title: "Design the UI", detail: "Input + button on top, task list below, counter at the bottom." },
      { title: "Render tasks from data", detail: "Keep tasks in an array; re-render the list on every change." },
      { title: "Add interactions", detail: "Click to complete, × button to delete, filter all/active/done." },
      { title: "Save to localStorage", detail: "Persist tasks so they survive page reloads." },
      { title: "Polish", detail: "Empty-state message, task counter, subtle animations." },
    ],
    outcomes: ["Working CRUD app", "DOM manipulation fluency", "localStorage skills"],
  },
  {
    id: "p-app-ui",
    title: "Study App UI in Figma",
    subjectId: "design",
    category: "Figma",
    description:
      "Design 3 screens of a homework-tracker app: home, task detail and stats — with a prototype.",
    difficulty: "Intermediate",
    duration: "3 hours",
    xp: 200,
    tools: ["Figma", "Google Fonts"],
    steps: [
      { title: "Research & sketch", detail: "Interview 2 friends, sketch 3 screens on paper first." },
      { title: "Set up styles", detail: "Define colors, type scale and button components in Figma." },
      { title: "Design 3 screens", detail: "Home list, add-task sheet, weekly stats with a chart." },
      { title: "Prototype flows", detail: "Link screens with tap interactions and smart animate." },
      { title: "Test & iterate", detail: "Watch a friend use it; fix the 3 biggest confusions." },
    ],
    outcomes: ["Clickable prototype", "Component library", "User-tested design"],
    featured: true,
  },
  {
    id: "p-poster",
    title: "Event Poster Design",
    subjectId: "design",
    category: "Illustrator",
    description:
      "Create a print-ready A4 poster for a school event with hierarchy, palette and custom vector art.",
    difficulty: "Intermediate",
    duration: "2 hours",
    xp: 160,
    tools: ["Illustrator / Figma", "Coolors"],
    steps: [
      { title: "Write the content zones", detail: "Headline, hero visual idea, details, call-to-action." },
      { title: "Choose palette + fonts", detail: "60-30-10 palette, one display font + one body font." },
      { title: "Draw vector art", detail: "Trace or build a simple hero illustration with the pen tool." },
      { title: "Compose the layout", detail: "Grid-aligned, one clear focal point, generous whitespace." },
      { title: "3-second test", detail: "Show for 3 seconds — can viewers name event + date?" },
    ],
    outcomes: ["Print-ready poster", "Vector illustration", "Hierarchy skills"],
  },
  {
    id: "p-reaction-game",
    title: "Micro:bit Reaction Game",
    subjectId: "robotics",
    category: "Micro:bit",
    description:
      "A 2-player reaction battle with random delays, cheat detection and best-of-3 scoring.",
    difficulty: "Intermediate",
    duration: "1.5 hours",
    xp: 170,
    tools: ["Micro:bit simulator", "MakeCode"],
    steps: [
      { title: "Design the states", detail: "WAITING → GO → RESULT. Draw the state diagram first." },
      { title: "Random GO signal", detail: "Pause 1–4 s randomly, then show the checkmark + record time." },
      { title: "Catch cheaters", detail: "Presses during WAITING show an X and lose the round." },
      { title: "Add 2-player scoring", detail: "A = player 1, B = player 2, first to 2 round-wins." },
      { title: "Run a tournament", detail: "Play with friends; record the fastest honest reaction." },
    ],
    outcomes: ["Tournament-ready game", "State machine thinking", "Timing code skills"],
  },
  {
    id: "p-volcano",
    title: "Volcano Eruption Model",
    subjectId: "science",
    category: "Science",
    description:
      "Build a working volcano model and explain the chemistry and geology behind real eruptions.",
    difficulty: "Beginner",
    duration: "2 hours",
    xp: 140,
    tools: ["Baking soda", "Vinegar", "Clay / papier-mâché"],
    steps: [
      { title: "Research real volcanoes", detail: "Pick Merapi or Krakatau; learn its type and history." },
      { title: "Build the cone", detail: "Shape papier-mâché around a bottle 'magma chamber'." },
      { title: "Paint the zones", detail: "Crater, vent, magma chamber — label every part." },
      { title: "Erupt safely", detail: "Baking soda + vinegar + red coloring. Safety glasses on!" },
      { title: "Explain the science", detail: "Present: reaction equation + plate tectonics link." },
    ],
    outcomes: ["Physical model", "Chemistry explanation", "Presentation skills"],
  },
  {
    id: "p-timeline",
    title: "Interactive History Timeline",
    subjectId: "history",
    category: "Web + History",
    description:
      "Code a scrollable web timeline of Indonesia's independence journey with images and facts.",
    difficulty: "Advanced",
    duration: "3 hours",
    xp: 220,
    tools: ["HTML", "CSS", "JavaScript"],
    steps: [
      { title: "Research 10 events", detail: "1908–1949, one verified fact + image each." },
      { title: "Structure the data", detail: "Store events in a JS array of objects." },
      { title: "Build the timeline UI", detail: "Vertical line, alternating cards, year badges." },
      { title: "Add interactivity", detail: "Click to expand details; filter by era." },
      { title: "Cite sources", detail: "Footer with links — real historians cite!" },
    ],
    outcomes: ["Interactive website", "Research skills", "History + code fusion"],
  },
];

export const challenges: Challenge[] = [
  {
    id: "ch-weekly-step",
    title: "Micro:bit Step Counter",
    description:
      "Build a shake-powered step counter that tracks your movement, shows totals and celebrates milestones. Best demo video wins bonus XP!",
    kind: "weekly",
    xp: 250,
    difficulty: "Intermediate",
    endsIn: "3 days left",
    requirements: [
      "Count shakes as steps using the accelerometer",
      "Display total steps on demand (button A)",
      "Celebrate every 100 steps with animation + melody",
      "Submit a 30-second demo video",
    ],
    participants: 342,
    featured: true,
  },
  {
    id: "ch-streak-7",
    title: "7-Day Learning Streak",
    description:
      "Complete at least one lesson every day for 7 days in a row. Consistency beats intensity!",
    kind: "streak",
    xp: 300,
    difficulty: "All levels",
    endsIn: "Ongoing",
    requirements: [
      "Finish 1+ lesson daily for 7 consecutive days",
      "Score 2/3 or better on each lesson quiz",
      "Keep your streak flame alive — no rest days!",
    ],
    participants: 1204,
  },
  {
    id: "ch-python-10",
    title: "Python 10-Liner",
    description:
      "Write the coolest program you can in exactly 10 lines of Python. ASCII art? Mini game? Surprise us.",
    kind: "community",
    xp: 150,
    difficulty: "Beginner",
    endsIn: "5 days left",
    requirements: [
      "Exactly 10 lines (blank lines don't count)",
      "Must run without errors in the Playground",
      "Original code — no copying!",
    ],
    participants: 518,
  },
  {
    id: "ch-app-icon",
    title: "Design a School App Icon",
    description:
      "Design an app icon for 'EduTech' at 3 sizes. Clean at 180px, recognizable at 48px.",
    kind: "community",
    xp: 150,
    difficulty: "Beginner",
    endsIn: "6 days left",
    requirements: [
      "Original vector icon (Figma/Illustrator)",
      "Show 180px, 120px and 48px versions",
      "One-paragraph design rationale",
    ],
    participants: 267,
  },
  {
    id: "ch-math-sprint",
    title: "Math Olympiad Sprint",
    description:
      "Solve 10 algebra and geometry problems against the clock. Top 10 make the leaderboard!",
    kind: "weekly",
    xp: 200,
    difficulty: "Advanced",
    endsIn: "2 days left",
    requirements: [
      "10 problems, 30 minutes, show your work",
      "Minimum 7/10 to earn the badge",
      "Calculator-free round!",
    ],
    participants: 189,
  },
  {
    id: "ch-story-100",
    title: "100-Word Story (English)",
    description:
      "Write a complete story with a twist in exactly 100 words. Every word must earn its place.",
    kind: "community",
    xp: 120,
    difficulty: "All levels",
    endsIn: "4 days left",
    requirements: [
      "Exactly 100 words (title excluded)",
      "Must include a twist ending",
      "Correct grammar and tenses",
    ],
    participants: 423,
  },
];

export const badges: Badge[] = [
  { id: "b-first-steps", name: "First Steps", description: "Complete your first lesson", icon: "Footprints", color: "from-emerald-500 to-teal-600", requirement: "Complete 1 lesson" },
  { id: "b-bookworm", name: "Bookworm", description: "Complete 5 lessons", icon: "BookOpen", color: "from-sky-500 to-indigo-600", requirement: "Complete 5 lessons" },
  { id: "b-scholar", name: "Scholar", description: "Complete 15 lessons", icon: "GraduationCap", color: "from-violet-500 to-purple-600", requirement: "Complete 15 lessons" },
  { id: "b-robot-builder", name: "Robot Builder", description: "Finish a robotics project", icon: "Bot", color: "from-cyan-500 to-blue-600", requirement: "Complete 1 robotics project" },
  { id: "b-code-crafter", name: "Code Crafter", description: "Finish a coding project", icon: "Code2", color: "from-violet-500 to-fuchsia-600", requirement: "Complete 1 coding project" },
  { id: "b-design-star", name: "Design Star", description: "Finish a design project", icon: "Palette", color: "from-pink-500 to-rose-600", requirement: "Complete 1 design project" },
  { id: "b-streak-3", name: "Warming Up", description: "Reach a 3-day streak", icon: "Flame", color: "from-amber-500 to-orange-600", requirement: "3-day streak" },
  { id: "b-streak-7", name: "Unstoppable", description: "Reach a 7-day streak", icon: "Zap", color: "from-yellow-500 to-red-600", requirement: "7-day streak" },
  { id: "b-challenger", name: "Challenger", description: "Complete your first challenge", icon: "Trophy", color: "from-amber-400 to-yellow-600", requirement: "Complete 1 challenge" },
  { id: "b-quiz-ace", name: "Quiz Ace", description: "Score 100% on any quiz", icon: "Target", color: "from-lime-500 to-green-600", requirement: "Perfect quiz score" },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getChallenge(id: string): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}

export function getProjectsBySubject(subjectId: string): Project[] {
  return projects.filter((p) => p.subjectId === subjectId);
}

export const levels = [
  { name: "Explorer", min: 0, icon: "Compass" },
  { name: "Builder", min: 300, icon: "Hammer" },
  { name: "Creator", min: 800, icon: "Sparkles" },
  { name: "Innovator", min: 1500, icon: "Rocket" },
  { name: "Visionary", min: 2500, icon: "Crown" },
  { name: "Future Leader", min: 4000, icon: "Star" },
];

export function getLevel(xp: number) {
  let current = levels[0];
  let next = levels[1];
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].min) {
      current = levels[i];
      next = levels[i + 1];
    }
  }
  const currentIndex = levels.indexOf(current);
  const progress = next
    ? Math.min(100, Math.round(((xp - current.min) / (next.min - current.min)) * 100))
    : 100;
  return { current, next, progress, currentIndex };
}
