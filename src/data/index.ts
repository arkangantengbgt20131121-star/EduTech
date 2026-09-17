/**
 * EduTech data access layer.
 *
 * Pages and components import from here, never from the individual files, so
 * the local demo data can be swapped for an API, database or CMS later without
 * touching any UI code.
 */
import { codingLessons } from "./lessons/coding";
import { designLessons } from "./lessons/design";
import { historyLessons } from "./lessons/history";
import { languageLessons } from "./lessons/languages";
import { mathLessons } from "./lessons/math";
import { roboticsLessons } from "./lessons/robotics";
import { scienceLessons } from "./lessons/science";
import { worldLessons } from "./lessons/world";
import { subjects, subjectById, getSubject, getUnit } from "./subjects";
import { projects } from "./projects";
import { challenges } from "./challenges";
import type { Lesson, Subject, SubjectId } from "./types";

export * from "./types";
export { subjects, subjectById, getSubject, getUnit };
export { projects, projectCategories, projectById, getProject } from "./projects";
export {
  challenges,
  challengeById,
  getChallenge,
  activeChallenge,
  leaderboard,
  challengeStats,
} from "./challenges";
export {
  badges,
  badgeById,
  getBadge,
  levels,
  levelFromXp,
  nextLevel,
  levelProgress,
  earnedBadges,
  badgeTierStyles,
} from "./gamification";
export {
  currentUser,
  progressStats,
  courseProgress,
  recentAchievements,
  weeklyXp,
  subjectMinutes,
  studyGoals,
  recommendedLessonIds,
  studyBuddies,
} from "./user";

/** Every lesson in the catalog, authored and roadmap alike. */
export const allLessons: Lesson[] = [
  ...roboticsLessons,
  ...codingLessons,
  ...designLessons,
  ...historyLessons,
  ...mathLessons,
  ...scienceLessons,
  ...languageLessons,
  ...worldLessons,
];

export const publishedLessons = allLessons.filter((lesson) => !lesson.comingSoon);

export const lessonById = Object.fromEntries(
  allLessons.map((lesson) => [lesson.id, lesson]),
) as Record<string, Lesson>;

export function getLesson(id: string): Lesson | undefined {
  return lessonById[id];
}

export function lessonsBySubject(subjectId: SubjectId): Lesson[] {
  return allLessons.filter((lesson) => lesson.subjectId === subjectId);
}

export function publishedLessonsBySubject(subjectId: SubjectId): Lesson[] {
  return publishedLessons.filter((lesson) => lesson.subjectId === subjectId);
}

export function lessonsByUnit(subjectId: SubjectId, unitId: string): Lesson[] {
  return allLessons.filter(
    (lesson) => lesson.subjectId === subjectId && lesson.unitId === unitId,
  );
}

/** The lesson that logically follows this one inside its subject. */
export function nextLessonInSubject(lesson: Lesson): Lesson | undefined {
  const subjectLessons = publishedLessonsBySubject(lesson.subjectId);
  const index = subjectLessons.findIndex((item) => item.id === lesson.id);
  if (index === -1) return undefined;
  return subjectLessons[index + 1];
}

export function previousLessonInSubject(lesson: Lesson): Lesson | undefined {
  const subjectLessons = publishedLessonsBySubject(lesson.subjectId);
  const index = subjectLessons.findIndex((item) => item.id === lesson.id);
  if (index <= 0) return undefined;
  return subjectLessons[index - 1];
}

export const popularLessons = publishedLessons.slice(0, 6);

export function recommendedLessons(ids: string[]): Lesson[] {
  return ids.map((id) => lessonById[id]).filter(Boolean);
}

export function lessonCountForSubject(subjectId: SubjectId) {
  return lessonsBySubject(subjectId).length;
}

export function publishedCountForSubject(subjectId: SubjectId) {
  return publishedLessonsBySubject(subjectId).length;
}

export const subjectStats = subjects.map((subject) => ({
  ...subject,
  total: lessonCountForSubject(subject.id),
  published: publishedCountForSubject(subject.id),
}));

export const catalogStats = {
  subjects: subjects.length,
  lessons: allLessons.length,
  published: publishedLessons.length,
  projects: projects.length,
  challenges: challenges.length,
  quizzes: publishedLessons.filter((lesson) => lesson.quiz.length > 0).length,
  totalMinutes: publishedLessons.reduce((total, lesson) => total + lesson.minutes, 0),
  totalXp: publishedLessons.reduce((total, lesson) => total + lesson.xp, 0),
};

/** Group a subject's lessons into its course units. */
export function subjectCurriculum(subject: Subject) {
  return subject.units.map((unit) => ({
    unit,
    lessons: lessonsByUnit(subject.id, unit.id),
  }));
}

/* --------------------------------- Search -------------------------------- */

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  group: "Lessons" | "Projects" | "Challenges" | "Subjects";
  meta: string;
  emoji: string;
}

function score(haystack: string, needle: string) {
  const text = haystack.toLowerCase();
  const query = needle.toLowerCase().trim();
  if (!query) return 0;
  if (text === query) return 100;
  if (text.startsWith(query)) return 80;
  if (text.includes(query)) return 55;
  const words = query.split(/\s+/).filter(Boolean);
  const hits = words.filter((word) => text.includes(word)).length;
  return hits === words.length && words.length > 1 ? 40 : hits * 12;
}

/** Client-side search across the whole catalog, ranked by relevance. */
export function searchCatalog(query: string, limit = 18): SearchResult[] {
  if (!query.trim()) return [];

  const lessonResults = allLessons.map((lesson) => ({
    result: {
      id: lesson.id,
      title: lesson.title,
      description: lesson.summary,
      href: `/lessons/${lesson.id}`,
      group: "Lessons" as const,
      meta: `${lesson.difficulty} · ${lesson.minutes} min · ${lesson.xp} XP`,
      emoji: subjectById[lesson.subjectId]?.emoji ?? "📘",
    },
    score:
      score(lesson.title, query) * 1.4 +
      score(lesson.tags.join(" "), query) +
      score(lesson.summary, query) * 0.7,
  }));

  const projectResults = projects.map((project) => ({
    result: {
      id: project.id,
      title: project.title,
      description: project.blurb,
      href: `/projects/${project.id}`,
      group: "Projects" as const,
      meta: `${project.category} · ${project.difficulty} · ${project.minutes} min`,
      emoji: project.emoji,
    },
    score: score(project.title, query) * 1.3 + score(project.skills.join(" "), query) + score(project.blurb, query) * 0.6,
  }));

  const challengeResults = challenges.map((challenge) => ({
    result: {
      id: challenge.id,
      title: challenge.title,
      description: challenge.blurb,
      href: `/challenges/${challenge.id}`,
      group: "Challenges" as const,
      meta: `${challenge.type} · ${challenge.xp} XP`,
      emoji: challenge.emoji,
    },
    score: score(challenge.title, query) * 1.3 + score(challenge.blurb, query) * 0.6,
  }));

  const subjectResults = subjects.map((subject) => ({
    result: {
      id: subject.id,
      title: subject.name,
      description: subject.description,
      href: `/subjects/${subject.id}`,
      group: "Subjects" as const,
      meta: `${subject.topics.length} topics · ${publishedCountForSubject(subject.id)} lessons`,
      emoji: subject.emoji,
    },
    score: score(subject.name, query) * 1.5 + score(subject.topics.join(" "), query) + score(subject.tagline, query) * 0.5,
  }));

  return [...lessonResults, ...projectResults, ...challengeResults, ...subjectResults]
    .filter((entry) => entry.score > 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.result);
}

export function groupSearchResults(results: SearchResult[]) {
  const groups: Record<SearchResult["group"], SearchResult[]> = {
    Lessons: [],
    Projects: [],
    Challenges: [],
    Subjects: [],
  };
  for (const result of results) groups[result.group].push(result);
  return groups;
}
