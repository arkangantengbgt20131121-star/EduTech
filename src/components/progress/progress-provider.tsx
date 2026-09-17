"use client";

import * as React from "react";

import {
  badges as badgeCatalog,
  levelFromXp,
  levelProgress,
  nextLevel,
} from "@/data/gamification";
import { courseProgress as seedCourses, progressStats as seedStats } from "@/data/user";
import type { Badge, CourseProgress, ProgressStats } from "@/data/types";

const STORAGE_KEY = "edutech.progress.v1";

interface ProgressContextValue {
  stats: ProgressStats;
  hydrated: boolean;
  courses: CourseProgress[];
  level: ReturnType<typeof levelFromXp>;
  next: ReturnType<typeof nextLevel>;
  levelPercent: number;
  xpToNext: number;
  earnedBadges: Badge[];
  lockedBadges: Badge[];
  isLessonComplete: (lessonId: string) => boolean;
  lessonProgress: (lessonId: string) => number;
  markLessonComplete: (lessonId: string, xp: number, minutes: number) => void;
  recordQuiz: (lessonId: string, correct: number, total: number, xp: number) => void;
  setCourseProgress: (lessonId: string, progress: number) => void;
  toggleBookmark: (lessonId: string) => void;
  bookmarks: string[];
  addXp: (amount: number, minutes?: number) => void;
  resetProgress: () => void;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = React.useState<ProgressStats>(seedStats);
  const [courses, setCourses] = React.useState<CourseProgress[]>(seedCourses);
  const [bookmarks, setBookmarks] = React.useState<string[]>(["microbit-sensors", "figma-auto-layout"]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // Reading localStorage can only happen after mount, so this one-time
    // hydration intentionally sets state inside the effect.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          stats?: ProgressStats;
          courses?: CourseProgress[];
          bookmarks?: string[];
        };
        if (parsed.stats) setStats({ ...seedStats, ...parsed.stats });
        if (parsed.courses?.length) setCourses(parsed.courses);
        if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
      }
    } catch {
      // Corrupted storage should never break the app — fall back to demo data.
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ stats, courses, bookmarks }));
    } catch {
      // Storage can be unavailable in private mode; the app still works.
    }
  }, [stats, courses, bookmarks, hydrated]);

  const value = React.useMemo<ProgressContextValue>(() => {
    const level = levelFromXp(stats.xp);
    const upcoming = nextLevel(stats.xp);
    const progress = levelProgress(stats.xp);
    const earned = badgeCatalog.filter((badge) => badge.check(stats));
    const earnedIds = new Set(earned.map((badge) => badge.id));

    return {
      stats,
      courses,
      hydrated,
      level,
      next: upcoming,
      levelPercent: progress.percent,
      xpToNext: progress.xpToNext,
      earnedBadges: earned,
      lockedBadges: badgeCatalog.filter((badge) => !earnedIds.has(badge.id)),
      bookmarks,
      isLessonComplete: (lessonId) => stats.completedLessons.includes(lessonId),
      lessonProgress: (lessonId) =>
        courses.find((course) => course.lessonId === lessonId)?.progress ?? 0,
      markLessonComplete: (lessonId, xp, minutes) => {
        setStats((current) => {
          if (current.completedLessons.includes(lessonId)) return current;
          return {
            ...current,
            xp: current.xp + xp,
            completedLessons: [...current.completedLessons, lessonId],
            minutesLearned: current.minutesLearned + minutes,
            streak: current.streak + 0,
          };
        });
        setCourses((current) => {
          const exists = current.some((course) => course.lessonId === lessonId);
          if (exists) {
            return current.map((course) =>
              course.lessonId === lessonId
                ? { ...course, progress: 100, lastOpened: "Just now" }
                : course,
            );
          }
          return [{ lessonId, progress: 100, lastOpened: "Just now" }, ...current];
        });
      },
      recordQuiz: (lessonId, correct, total, xp) => {
        setStats((current) => {
          const previous = current.quizScores[lessonId];
          const best = previous && previous.correct >= correct ? previous : { correct, total };
          return {
            ...current,
            xp: current.xp + xp,
            quizScores: { ...current.quizScores, [lessonId]: best },
          };
        });
      },
      setCourseProgress: (lessonId, progress) => {
        setCourses((current) => {
          const exists = current.some((course) => course.lessonId === lessonId);
          if (!exists) {
            return [{ lessonId, progress, lastOpened: "Just now" }, ...current];
          }
          return current.map((course) =>
            course.lessonId === lessonId
              ? { ...course, progress: Math.max(course.progress, progress), lastOpened: "Just now" }
              : course,
          );
        });
      },
      toggleBookmark: (lessonId) =>
        setBookmarks((current) =>
          current.includes(lessonId)
            ? current.filter((id) => id !== lessonId)
            : [...current, lessonId],
        ),
      addXp: (amount, minutes = 0) =>
        setStats((current) => ({
          ...current,
          xp: current.xp + amount,
          minutesLearned: current.minutesLearned + minutes,
        })),
      resetProgress: () => {
        setStats(seedStats);
        setCourses(seedCourses);
        setBookmarks([]);
      },
    };
  }, [stats, courses, bookmarks, hydrated]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = React.useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside <ProgressProvider>");
  }
  return context;
}

/** Small helper used by animations that count up to a value. */
export function useAnimatedNumber(value: number, duration = 700) {
  const [display, setDisplay] = React.useState(value);
  const previous = React.useRef(value);

  React.useEffect(() => {
    const from = previous.current;
    const to = value;
    if (from === to) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else previous.current = to;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}
