import type { Lesson } from "./types";
import { techLessons } from "./lessons-tech";
import { creativeLessons } from "./lessons-creative";
import { stemLessons } from "./lessons-stem";
import { humanitiesLessons } from "./lessons-humanities";

export const lessons: Lesson[] = [
  ...techLessons,
  ...creativeLessons,
  ...stemLessons,
  ...humanitiesLessons,
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsBySubject(subjectId: string): Lesson[] {
  return lessons.filter((l) => l.subjectId === subjectId);
}

export function getPopularLessons(): Lesson[] {
  return lessons.filter((l) => l.popular);
}

export function searchLessons(query: string): Lesson[] {
  const q = query.toLowerCase().trim();
  if (!q) return lessons;
  return lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getNextLesson(lesson: Lesson): Lesson | undefined {
  const siblings = getLessonsBySubject(lesson.subjectId);
  const idx = siblings.findIndex((l) => l.id === lesson.id);
  return siblings[idx + 1];
}
