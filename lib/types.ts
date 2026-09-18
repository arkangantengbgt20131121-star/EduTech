import type { LucideIcon } from "lucide-react";

export interface Subject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  gradient: string;
  softBg: string;
  iconColor: string;
  topics: string[];
  skills: string[];
}

export interface LessonSection {
  heading: string;
  body: string[];
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface LessonActivity {
  title: string;
  description: string;
  steps: string[];
  starterCode?: string;
  language?: string;
  hints: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export type LessonLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  level: LessonLevel;
  durationMin: number;
  xp: number;
  tags: string[];
  objectives: string[];
  sections: LessonSection[];
  keyTerms: KeyTerm[];
  examples: CodeExample[];
  activity: LessonActivity;
  quiz: QuizQuestion[];
  popular?: boolean;
}

export interface ProjectStep {
  title: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  subjectId: string;
  category: string;
  description: string;
  difficulty: LessonLevel;
  duration: string;
  xp: number;
  tools: string[];
  steps: ProjectStep[];
  outcomes: string[];
  featured?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  kind: "weekly" | "streak" | "community";
  xp: number;
  difficulty: string;
  endsIn: string;
  requirements: string[];
  participants: number;
  featured?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
}
