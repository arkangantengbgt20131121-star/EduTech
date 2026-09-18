"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, Flame, Sparkles, Trophy, X } from "lucide-react";
import { badges, getLevel } from "./projects";
import type { Badge } from "./types";
import { lessons } from "./lessons";
import { cn } from "./utils";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  kind: "xp" | "badge" | "level" | "info";
}

interface EduTechState {
  xp: number;
  completedLessons: string[];
  completedProjects: string[];
  completedChallenges: string[];
  quizAces: string[];
  streak: number;
  displayName: string;
  grade: string;
  setProfile: (name: string, grade: string) => void;
  completeLesson: (id: string, xpValue: number) => void;
  completeProject: (id: string, xpValue: number) => void;
  completeChallenge: (id: string, xpValue: number) => void;
  recordQuizAce: (lessonId: string) => void;
  isLessonDone: (id: string) => boolean;
  isProjectDone: (id: string) => boolean;
  isChallengeDone: (id: string) => boolean;
  earnedBadges: Badge[];
  level: ReturnType<typeof getLevel>;
  toasts: Toast[];
  dismissToast: (id: number) => void;
  resetProgress: () => void;
}

const EduTechContext = createContext<EduTechState | null>(null);

const STORAGE_KEY = "edutech-progress-v1";

interface Persisted {
  xp: number;
  completedLessons: string[];
  completedProjects: string[];
  completedChallenges: string[];
  quizAces: string[];
  streak: number;
  lastActive: string;
  displayName: string;
  grade: string;
}

const defaults: Persisted = {
  xp: 0,
  completedLessons: [],
  completedProjects: [],
  completedChallenges: [],
  quizAces: [],
  streak: 0,
  lastActive: "",
  displayName: "Alex Student",
  grade: "Grade 8",
};

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function fireConfetti(big = false) {
  if (typeof window === "undefined") return;
  import("canvas-confetti").then((mod) => {
    const confetti = mod.default;
    if (big) {
      confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 60, origin: { x: 0 } }), 150);
      setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 60, origin: { x: 1 } }), 300);
    } else {
      confetti({ particleCount: 60, spread: 65, origin: { y: 0.7 }, scalar: 0.9 });
    }
  });
}

function computeEarnedBadges(s: Persisted): Badge[] {
  const has = (id: string) => {
    switch (id) {
      case "b-first-steps":
        return s.completedLessons.length >= 1;
      case "b-bookworm":
        return s.completedLessons.length >= 5;
      case "b-scholar":
        return s.completedLessons.length >= 15;
      case "b-robot-builder":
        return s.completedProjects.some((p) => p === "p-digital-dice" || p === "p-reaction-game");
      case "b-code-crafter":
        return s.completedProjects.some((p) => ["p-guessing-game", "p-portfolio", "p-todo-app"].includes(p));
      case "b-design-star":
        return s.completedProjects.some((p) => p === "p-app-ui" || p === "p-poster");
      case "b-streak-3":
        return s.streak >= 3;
      case "b-streak-7":
        return s.streak >= 7;
      case "b-challenger":
        return s.completedChallenges.length >= 1;
      case "b-quiz-ace":
        return s.quizAces.length >= 1;
      default:
        return false;
    }
  };
  return badges.filter((b) => has(b.id));
}

let toastId = 0;

export function EduTechProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(defaults);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const prevBadgesRef = useRef<string[]>([]);
  const prevLevelRef = useRef<string>("Explorer");

  // Load from localStorage + update streak
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      let next: Persisted = { ...defaults };
      if (raw) {
        next = { ...defaults, ...(JSON.parse(raw) as Partial<Persisted>) };
      }
      const today = todayStr();
      if (next.lastActive !== today) {
        next.streak = next.lastActive === yesterdayStr() ? next.streak + 1 : 1;
        next.lastActive = today;
      }
      if (next.streak < 1) next.streak = 1;
      setState(next);
      prevBadgesRef.current = computeEarnedBadges(next).map((b) => b.id);
      prevLevelRef.current = getLevel(next.xp).current.name;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setState({ ...defaults, streak: 1, lastActive: todayStr() });
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++toastId;
    setToasts((prev) => [...prev.slice(-3), { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  // Watch for new badges + level ups
  const earnedBadges = useMemo(() => computeEarnedBadges(state), [state]);
  const level = useMemo(() => getLevel(state.xp), [state.xp]);

  useEffect(() => {
    if (!hydrated) return;
    const prev = prevBadgesRef.current;
    const fresh = earnedBadges.filter((b) => !prev.includes(b.id));
    if (fresh.length > 0) {
      fresh.forEach((b) =>
        pushToast({ title: `Badge earned: ${b.name}!`, description: b.description, kind: "badge" })
      );
      fireConfetti(true);
    }
    prevBadgesRef.current = earnedBadges.map((b) => b.id);

    if (level.current.name !== prevLevelRef.current) {
      prevLevelRef.current = level.current.name;
      pushToast({
        title: `Level up! You are now ${level.current.name}`,
        description: "Keep learning to reach the next rank.",
        kind: "level",
      });
      fireConfetti(true);
    }
  }, [earnedBadges, level, hydrated, pushToast]);

  const addXp = useCallback(
    (amount: number, label: string) => {
      setState((s) => ({ ...s, xp: s.xp + amount }));
      pushToast({ title: `+${amount} XP`, description: label, kind: "xp" });
      fireConfetti(false);
    },
    [pushToast]
  );

  const completeLesson = useCallback(
    (id: string, xpValue: number) => {
      let already = false;
      setState((s) => {
        already = s.completedLessons.includes(id);
        if (already) return s;
        return { ...s, completedLessons: [...s.completedLessons, id], xp: s.xp + xpValue };
      });
      if (!already) {
        const lesson = lessons.find((l) => l.id === id);
        pushToast({ title: `+${xpValue} XP — Lesson complete!`, description: lesson?.title, kind: "xp" });
        fireConfetti(false);
      }
    },
    [pushToast]
  );

  const completeProject = useCallback(
    (id: string, xpValue: number) => {
      let already = false;
      setState((s) => {
        already = s.completedProjects.includes(id);
        if (already) return s;
        return { ...s, completedProjects: [...s.completedProjects, id], xp: s.xp + xpValue };
      });
      if (!already) {
        pushToast({ title: `+${xpValue} XP — Project complete!`, description: "Amazing build!", kind: "xp" });
        fireConfetti(true);
      }
    },
    [pushToast]
  );

  const completeChallenge = useCallback(
    (id: string, xpValue: number) => {
      let already = false;
      setState((s) => {
        already = s.completedChallenges.includes(id);
        if (already) return s;
        return { ...s, completedChallenges: [...s.completedChallenges, id], xp: s.xp + xpValue };
      });
      if (!already) {
        pushToast({ title: `+${xpValue} XP — Challenge conquered!`, kind: "xp" });
        fireConfetti(true);
      }
    },
    [pushToast]
  );

  const recordQuizAce = useCallback((lessonId: string) => {
    setState((s) =>
      s.quizAces.includes(lessonId) ? s : { ...s, quizAces: [...s.quizAces, lessonId] }
    );
  }, []);

  const setProfile = useCallback((displayName: string, grade: string) => {
    setState((s) => ({ ...s, displayName, grade }));
  }, []);

  const resetProgress = useCallback(() => {
    setState((s) => ({ ...defaults, displayName: s.displayName, grade: s.grade, streak: 1, lastActive: todayStr() }));
    prevBadgesRef.current = [];
    prevLevelRef.current = "Explorer";
  }, []);

  const value: EduTechState = {
    xp: state.xp,
    completedLessons: state.completedLessons,
    completedProjects: state.completedProjects,
    completedChallenges: state.completedChallenges,
    quizAces: state.quizAces,
    streak: state.streak,
    displayName: state.displayName,
    grade: state.grade,
    setProfile,
    completeLesson,
    completeProject,
    completeChallenge,
    recordQuizAce,
    isLessonDone: (id) => state.completedLessons.includes(id),
    isProjectDone: (id) => state.completedProjects.includes(id),
    isChallengeDone: (id) => state.completedChallenges.includes(id),
    earnedBadges,
    level,
    toasts,
    dismissToast,
    resetProgress,
  };

  return <EduTechContext.Provider value={value}>{children}</EduTechContext.Provider>;
}

export function useEduTech(): EduTechState {
  const ctx = useContext(EduTechContext);
  if (!ctx) throw new Error("useEduTech must be used within EduTechProvider");
  return ctx;
}

const toastStyles: Record<Toast["kind"], { icon: typeof Trophy; ring: string; bg: string }> = {
  xp: { icon: Sparkles, ring: "ring-indigo-500/30", bg: "bg-indigo-500" },
  badge: { icon: Trophy, ring: "ring-amber-500/40", bg: "bg-amber-500" },
  level: { icon: Flame, ring: "ring-fuchsia-500/40", bg: "bg-fuchsia-500" },
  info: { icon: CheckCircle2, ring: "ring-sky-500/30", bg: "bg-sky-500" },
};

export function ToastHost() {
  const { toasts, dismissToast } = useEduTech();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[calc(100vw-2.5rem)] max-w-sm flex-col gap-3">
      {toasts.map((t) => {
        const s = toastStyles[t.kind];
        const Icon = s.icon;
        return (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-2xl ring-2 backdrop-blur-xl animate-fade-up",
              s.ring
            )}
          >
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white", s.bg)}>
              <Icon size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight">{t.title}</p>
              {t.description && (
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
