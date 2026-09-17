import type { Achievement, CourseProgress, ProgressStats } from "./types";

/**
 * Demo student profile. Replace this module with real authentication +
 * database calls and every page keeps working, because the UI only depends
 * on the exported shapes.
 */
export const currentUser = {
  name: "Alya Ramadhani",
  firstName: "Alya",
  initials: "AR",
  avatarEmoji: "🚀",
  school: "SMP Negeri 12 Bandung",
  grade: "Grade 8",
  bio: "Learning Python, building robots and designing UI. Currently obsessed with Micro:bit sensors.",
  joinedAt: "March 2026",
  country: "🇮🇩 Indonesia",
  interests: ["Robotics", "Coding", "Design"],
};

export const progressStats: ProgressStats = {
  xp: 2870,
  streak: 12,
  longestStreak: 21,
  completedLessons: [
    "microbit-led-basics",
    "microbit-button-input",
    "python-first-program",
    "python-loops",
    "design-colour-and-contrast",
    "figma-frames-and-shapes",
    "geography-maps-coordinates",
    "general-logic-puzzles",
    "english-tenses",
    "indonesian-presentasi",
  ],
  completedProjects: ["digital-dice-microbit", "python-number-guessing", "poster-environment"],
  quizScores: {
    "microbit-led-basics": { correct: 5, total: 5 },
    "microbit-button-input": { correct: 4, total: 4 },
    "python-first-program": { correct: 4, total: 4 },
    "python-loops": { correct: 4, total: 5 },
    "design-colour-and-contrast": { correct: 4, total: 4 },
    "figma-frames-and-shapes": { correct: 3, total: 4 },
    "geography-maps-coordinates": { correct: 4, total: 4 },
    "general-logic-puzzles": { correct: 3, total: 4 },
  },
  badges: [
    "first-lesson",
    "streak-starter",
    "code-explorer",
    "science-explorer",
    "polyglot",
    "historian",
  ],
  minutesLearned: 486,
};

/** What the student is part-way through right now. */
export const courseProgress: CourseProgress[] = [
  { lessonId: "microbit-button-input", progress: 65, lastOpened: "2 hours ago" },
  { lessonId: "python-loops", progress: 40, lastOpened: "Yesterday" },
  { lessonId: "figma-auto-layout", progress: 20, lastOpened: "3 days ago" },
  { lessonId: "microbit-sensors", progress: 10, lastOpened: "Last week" },
];

export const recentAchievements: Achievement[] = [
  {
    id: "ach-streak-12",
    title: "12-day streak",
    description: "You have learned every day for 12 days straight.",
    emoji: "🔥",
    earnedOn: "Today",
    xp: 120,
  },
  {
    id: "ach-quiz-perfect",
    title: "Perfect quiz",
    description: "Scored 5/5 in Micro:bit LED Basics.",
    emoji: "🎯",
    earnedOn: "Yesterday",
    xp: 100,
  },
  {
    id: "ach-badge-code",
    title: "Code Explorer badge",
    description: "Completed 5 coding lessons across Python and JavaScript.",
    emoji: "💻",
    earnedOn: "3 days ago",
    xp: 150,
  },
  {
    id: "ach-project-dice",
    title: "Digital Dice published",
    description: "Your Micro:bit dice project joined the community gallery.",
    emoji: "🎲",
    earnedOn: "5 days ago",
    xp: 210,
  },
  {
    id: "ach-level-3",
    title: "Reached Level 3 — Creator",
    description: "2,870 XP earned. You can now submit design challenges.",
    emoji: "🎨",
    earnedOn: "Last week",
    xp: 200,
  },
];

/** Weekly XP used by the dashboard chart. */
export const weeklyXp = [
  { day: "Mon", xp: 120, minutes: 25 },
  { day: "Tue", xp: 180, minutes: 35 },
  { day: "Wed", xp: 90, minutes: 18 },
  { day: "Thu", xp: 240, minutes: 48 },
  { day: "Fri", xp: 160, minutes: 30 },
  { day: "Sat", xp: 320, minutes: 62 },
  { day: "Sun", xp: 210, minutes: 40 },
];

export const subjectMinutes = [
  { subjectId: "coding", minutes: 168 },
  { subjectId: "robotics", minutes: 132 },
  { subjectId: "design", minutes: 74 },
  { subjectId: "science", minutes: 58 },
  { subjectId: "history", minutes: 32 },
  { subjectId: "math", minutes: 22 },
];

export const studyGoals = [
  { label: "Lessons this week", value: 5, target: 6, unit: "" },
  { label: "Minutes learned", value: 258, target: 300, unit: "min" },
  { label: "XP earned", value: 1320, target: 1500, unit: "XP" },
  { label: "Days in a row", value: 12, target: 14, unit: "days" },
];

export const recommendedLessonIds = [
  "microbit-sensors",
  "javascript-interactivity",
  "figma-auto-layout",
  "fractions-compare",
];

export const studyBuddies = [
  { name: "Nadia R.", emoji: "🦊", xp: 4820, status: "Doing the reaction game challenge" },
  { name: "Kevin T.", emoji: "🐼", xp: 4610, status: "Finished Python loops" },
  { name: "Alya S.", emoji: "🦋", xp: 4380, status: "Designing a login screen" },
  { name: "Bagas W.", emoji: "🐯", xp: 3990, status: "Building a line follower" },
];
