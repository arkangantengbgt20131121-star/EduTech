import type { Badge, Level, ProgressStats } from "./types";

/**
 * Badge rules are declarative: each badge decides for itself whether it is
 * unlocked from a `ProgressStats` object. Adding a badge never requires
 * touching the UI.
 */
export const badges: Badge[] = [
  {
    id: "first-lesson",
    name: "First Lesson",
    description: "You opened the door — the hardest step is behind you.",
    emoji: "🎒",
    requirement: "Complete your first lesson",
    tier: "bronze",
    xpReward: 50,
    check: (stats) => stats.completedLessons.length >= 1,
  },
  {
    id: "streak-starter",
    name: "Streak Starter",
    description: "Three days in a row. Habits beat motivation.",
    emoji: "🔥",
    requirement: "Learn 3 days in a row",
    tier: "bronze",
    xpReward: 60,
    check: (stats) => stats.streak >= 3,
  },
  {
    id: "code-explorer",
    name: "Code Explorer",
    description: "Five coding lessons finished — you think in loops now.",
    emoji: "💻",
    requirement: "Complete 5 coding lessons",
    tier: "silver",
    xpReward: 150,
    check: (stats) => stats.completedLessons.filter((id) => id.includes("python") || id.includes("javascript") || id.includes("html")).length >= 5,
  },
  {
    id: "robot-builder",
    name: "Robot Builder",
    description: "You have built things that sense, decide and move.",
    emoji: "🤖",
    requirement: "Complete 5 robotics projects",
    tier: "silver",
    xpReward: 200,
    check: (stats) => stats.completedProjects.filter((id) => id.includes("microbit") || id.includes("robot") || id.includes("line")).length >= 5,
  },
  {
    id: "design-master",
    name: "Design Master",
    description: "Colour, spacing and hierarchy — all under your control.",
    emoji: "🎨",
    requirement: "Complete 5 design challenges",
    tier: "silver",
    xpReward: 200,
    check: (stats) => stats.completedProjects.filter((id) => id.includes("figma") || id.includes("poster") || id.includes("logo")).length >= 5,
  },
  {
    id: "science-explorer",
    name: "Science Explorer",
    description: "Ten science lessons. You ask better questions now.",
    emoji: "🔬",
    requirement: "Complete 10 science lessons",
    tier: "gold",
    xpReward: 250,
    check: (stats) => stats.completedLessons.filter((id) => id.includes("cells") || id.includes("force") || id.includes("chem") || id.includes("solar") || id.includes("heart")).length >= 10,
  },
  {
    id: "quiz-champion",
    name: "Quiz Champion",
    description: "Five perfect quiz scores. Precision, not luck.",
    emoji: "🏆",
    requirement: "Score 100% on 5 quizzes",
    tier: "gold",
    xpReward: 300,
    check: (stats) =>
      Object.values(stats.quizScores).filter((score) => score.correct === score.total).length >= 5,
  },
  {
    id: "marathon-learner",
    name: "Marathon Learner",
    description: "Ten hours of learning logged — that is real dedication.",
    emoji: "⏱️",
    requirement: "Learn for 600 minutes",
    tier: "gold",
    xpReward: 280,
    check: (stats) => stats.minutesLearned >= 600,
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "You learn in more than one language.",
    emoji: "🗣️",
    requirement: "Complete a lesson in English and in Bahasa Indonesia",
    tier: "silver",
    xpReward: 180,
    check: (stats) =>
      stats.completedLessons.some((id) => id.startsWith("english")) &&
      stats.completedLessons.some((id) => id.startsWith("indonesian")),
  },
  {
    id: "historian",
    name: "Time Traveller",
    description: "History is a story you can actually follow.",
    emoji: "🏛️",
    requirement: "Complete 5 history lessons",
    tier: "silver",
    xpReward: 190,
    check: (stats) => stats.completedLessons.filter((id) => id.includes("indonesian-") || id.includes("majapahit") || id.includes("world-war") || id.includes("egypt")).length >= 5,
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Fifteen lessons, all finished. Relentless.",
    emoji: "💎",
    requirement: "Complete 15 lessons",
    tier: "gold",
    xpReward: 350,
    check: (stats) => stats.completedLessons.length >= 15,
  },
  {
    id: "legend",
    name: "EduTech Legend",
    description: "Level 5, 25 lessons, 30-day streak. You are the story now.",
    emoji: "👑",
    requirement: "Complete 25 lessons with a 30-day streak",
    tier: "legend",
    xpReward: 500,
    check: (stats) => stats.completedLessons.length >= 25 && stats.longestStreak >= 30,
  },
];

export const levels: Level[] = [
  {
    level: 1,
    name: "Beginner",
    minXp: 0,
    emoji: "🌱",
    perks: ["Access to all beginner lessons", "First badge unlocked"],
  },
  {
    level: 2,
    name: "Explorer",
    minXp: 500,
    emoji: "🧭",
    perks: ["Weekly challenges unlocked", "Profile themes"],
  },
  {
    level: 3,
    name: "Creator",
    minXp: 1500,
    emoji: "🎨",
    perks: ["Submit projects to the gallery", "Design challenge feedback"],
  },
  {
    level: 4,
    name: "Builder",
    minXp: 3000,
    emoji: "🔧",
    perks: ["Advanced robotics projects", "Mentor a teammate"],
  },
  {
    level: 5,
    name: "Innovator",
    minXp: 5000,
    emoji: "🚀",
    perks: ["Publish your own lesson path", "Community showcase feature"],
  },
];

export const badgeById = Object.fromEntries(badges.map((badge) => [badge.id, badge]));

export function getBadge(id: string) {
  return badgeById[id];
}

export function levelFromXp(xp: number): Level {
  return [...levels].reverse().find((level) => xp >= level.minXp) ?? levels[0];
}

export function nextLevel(xp: number): Level | null {
  return levels.find((level) => level.minXp > xp) ?? null;
}

export function levelProgress(xp: number) {
  const current = levelFromXp(xp);
  const upcoming = nextLevel(xp);
  if (!upcoming) return { current, next: null, percent: 100, xpToNext: 0 };
  const span = upcoming.minXp - current.minXp;
  const gained = xp - current.minXp;
  return {
    current,
    next: upcoming,
    percent: Math.round((gained / span) * 100),
    xpToNext: upcoming.minXp - xp,
  };
}

export function earnedBadges(stats: ProgressStats): Badge[] {
  return badges.filter((badge) => badge.check(stats));
}

export const badgeTierStyles: Record<Badge["tier"], { ring: string; label: string }> = {
  bronze: { ring: "from-amber-400 to-orange-600", label: "Bronze" },
  silver: { ring: "from-slate-300 to-slate-500", label: "Silver" },
  gold: { ring: "from-amber-300 to-yellow-500", label: "Gold" },
  legend: { ring: "from-fuchsia-400 to-indigo-500", label: "Legend" },
};
