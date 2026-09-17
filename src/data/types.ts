/**
 * EduTech content model.
 *
 * Everything the UI renders comes from these typed structures, so the platform
 * is ready to swap the local demo data for a database / CMS / API later
 * (see `src/data/index.ts` for the access layer used by pages).
 */

export type SubjectId =
  | "robotics"
  | "coding"
  | "design"
  | "history"
  | "math"
  | "science"
  | "english"
  | "indonesian"
  | "geography"
  | "general";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type CodeLanguage = "python" | "javascript" | "html" | "makecode";

export interface Subject {
  id: SubjectId;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  /** Lucide icon name, resolved in `src/lib/icons.ts`. */
  icon: string;
  /** Tailwind-friendly hex used for accents, gradients and charts. */
  color: string;
  gradient: [string, string];
  topics: string[];
  /** Units make up the course structure of a subject. */
  units: { id: string; title: string; description: string }[];
  learnerCount: number;
  rating: number;
  featured?: boolean;
}

/* ----------------------------- Lesson blocks ----------------------------- */

export interface DiagramNode {
  emoji: string;
  title: string;
  detail: string;
}

export type LessonBlock =
  | { type: "text"; title?: string; body: string[] }
  | {
      type: "callout";
      variant: "tip" | "info" | "warning" | "didYouKnow";
      title: string;
      body: string;
    }
  | {
      type: "code";
      language: CodeLanguage;
      title?: string;
      code: string;
      output?: string;
    }
  | { type: "list"; title?: string; ordered?: boolean; items: string[] }
  | {
      type: "steps";
      title?: string;
      steps: { title: string; body: string; code?: string; hint?: string }[];
    }
  | { type: "table"; title?: string; headers: string[]; rows: string[][] }
  | {
      type: "compare";
      title?: string;
      columns: { title: string; items: string[]; tone: "good" | "bad" | "neutral" }[];
    }
  | { type: "keyTerms"; terms: { term: string; definition: string }[] }
  | {
      type: "diagram";
      title?: string;
      caption?: string;
      nodes: DiagramNode[];
      loop?: boolean;
    }
  | {
      type: "figure";
      title?: string;
      caption?: string;
      /** A visual built from emoji + a soft gradient, no external assets needed. */
      visual: "microbit" | "figma" | "formula" | "molecule" | "artifact" | "chart";
      items?: string[];
    }
  | {
      type: "widget";
      widget:
        | "playground"
        | "microbit"
        | "fractionLab"
        | "timeline"
        | "designCanvas"
        | "solarSystem";
      title?: string;
      caption?: string;
      /** Widget configuration, interpreted per widget type. */
      config?: Record<string, unknown>;
    }
  | { type: "quote"; quote: string; author: string; role?: string };

/* -------------------------------- Quizzes -------------------------------- */

interface QuizBase {
  id: string;
  prompt: string;
  explanation: string;
  points: number;
}

export interface MultipleChoiceQuestion extends QuizBase {
  type: "multipleChoice";
  options: string[];
  answer: number;
}

export interface TrueFalseQuestion extends QuizBase {
  type: "trueFalse";
  answer: boolean;
}

export interface FillBlankQuestion extends QuizBase {
  type: "fillBlank";
  answer: string[];
  placeholder?: string;
  hint?: string;
}

export interface MatchingQuestion extends QuizBase {
  type: "matching";
  pairs: { left: string; right: string }[];
}

export type QuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | MatchingQuestion;

/* -------------------------------- Lessons -------------------------------- */

export interface Lesson {
  id: string;
  title: string;
  subjectId: SubjectId;
  unitId: string;
  summary: string;
  difficulty: Difficulty;
  minutes: number;
  xp: number;
  tags: string[];
  /** Skills/paths this lesson feeds into — used for badges. */
  track: "coding" | "robotics" | "design" | "science" | "humanities" | "math";
  objectives: string[];
  materials?: string[];
  blocks: LessonBlock[];
  quiz: QuizQuestion[];
  /** Catalog entries that exist in the roadmap but are not authored yet. */
  comingSoon?: boolean;
  updatedAt: string;
  author: string;
}

/* -------------------------------- Projects ------------------------------- */

export interface Project {
  id: string;
  title: string;
  blurb: string;
  category: "Robotics" | "Coding" | "Design" | "Science" | "Math";
  subjectId: SubjectId;
  difficulty: Difficulty;
  minutes: number;
  skills: string[];
  xp: number;
  emoji: string;
  gradient: [string, string];
  steps: { title: string; detail: string }[];
  materials: string[];
  requirements?: string[];
  learners: number;
  featured?: boolean;
}

/* ------------------------------- Challenges ------------------------------ */

export interface Challenge {
  id: string;
  title: string;
  blurb: string;
  type: "Weekly" | "Monthly" | "Community";
  difficulty: 1 | 2 | 3 | 4 | 5;
  xp: number;
  badgeId?: string;
  deadline: string;
  requirements: string[];
  hints: string[];
  subjectId: SubjectId;
  emoji: string;
  participants: number;
  gradient: [string, string];
  status: "active" | "upcoming" | "closed";
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarEmoji: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

/* ------------------------------ Gamification ----------------------------- */

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  /** Rule shown to students so they know how to unlock it. */
  requirement: string;
  tier: "bronze" | "silver" | "gold" | "legend";
  xpReward: number;
  check: (stats: ProgressStats) => boolean;
}

export interface Level {
  level: number;
  name: string;
  minXp: number;
  emoji: string;
  perks: string[];
}

export interface ProgressStats {
  xp: number;
  streak: number;
  longestStreak: number;
  completedLessons: string[];
  completedProjects: string[];
  quizScores: Record<string, { correct: number; total: number }>;
  badges: string[];
  minutesLearned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  earnedOn: string;
  xp: number;
}

/* -------------------------------- Courses -------------------------------- */

export interface CourseProgress {
  lessonId: string;
  progress: number;
  lastOpened: string;
}
