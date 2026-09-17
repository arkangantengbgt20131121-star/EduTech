"use client";

import * as React from "react";
import Link from "next/link";
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  PlayCircle,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge, XpCounter } from "@/components/shared/primitives";
import { useProgress } from "@/components/progress/progress-provider";
import { getSubject } from "@/data/subjects";
import { badgeTierStyles } from "@/data/gamification";
import { getLesson, weeklyXp, subjectMinutes } from "@/data";
import { courseProgress as seedCourses, currentUser, recentAchievements, studyGoals } from "@/data/user";
import { cn, formatNumber, formatDuration } from "@/lib/utils";

/* --------------------------------- Header --------------------------------- */

export function DashboardHeader() {
  const { stats, level, next, xpToNext } = useProgress();

  return (
    <header className="relative overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand-indigo)_14%,var(--card)),color-mix(in_oklab,var(--brand-cyan)_10%,var(--card)))] p-6 sm:p-8">
      <span className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-sm font-bold text-primary">Welcome back, {currentUser.firstName}! 👋</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Ready to continue learning?
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            You are <strong className="text-foreground">{xpToNext} XP</strong> away from{" "}
            {next ? `Level ${next.level} — ${next.name}` : "the top level"}. Keep the streak going:
            one lesson today is all it takes.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="flex items-center gap-2 rounded-full bg-card/80 px-3.5 py-1.5 text-xs font-bold backdrop-blur">
              <Flame className="size-3.5 text-[#f97316]" /> {stats.streak}-day streak
            </span>
            <span className="flex items-center gap-2 rounded-full bg-card/80 px-3.5 py-1.5 text-xs font-bold backdrop-blur">
              {level.emoji} Level {level.level} · {level.name}
            </span>
            <span className="flex items-center gap-2 rounded-full bg-card/80 px-3.5 py-1.5 text-xs font-bold backdrop-blur">
              <Zap className="size-3.5 text-primary" />
              <XpCounter value={stats.xp} suffix=" XP" />
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/85 p-4 text-center backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Next milestone
          </p>
          <p className="mt-1 text-2xl font-black">
            {next ? next.emoji : "👑"} {next?.name ?? "Legend"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {next ? `${formatNumber(next.minXp)} XP needed` : "You reached the top level"}
          </p>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- Stats ---------------------------------- */

export function StatGrid() {
  const { stats, hydrated } = useProgress();
  const quizScores = Object.values(stats.quizScores);
  const averageScore = quizScores.length
    ? Math.round(
        (quizScores.reduce((total, score) => total + score.correct / score.total, 0) /
          quizScores.length) *
          100,
      )
    : 0;

  const items = [
    {
      emoji: "⚡",
      label: "Total XP",
      value: <XpCounter value={stats.xp} />,
      hint: "Earned from lessons and quizzes",
    },
    {
      emoji: "🔥",
      label: "Current streak",
      value: `${stats.streak} days`,
      hint: `Longest: ${stats.longestStreak} days`,
    },
    {
      emoji: "✅",
      label: "Lessons completed",
      value: stats.completedLessons.length,
      hint: `${stats.completedProjects.length} projects finished`,
    },
    {
      emoji: "🎯",
      label: "Average quiz score",
      value: `${averageScore}%`,
      hint: `${quizScores.length} quizzes taken`,
    },
    {
      emoji: "⏱️",
      label: "Time learned",
      value: formatDuration(stats.minutesLearned),
      hint: hydrated ? "Tracked in this browser" : "Loading…",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="card-lift rounded-2xl border border-border/70 bg-card p-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden>
              {item.emoji}
            </span>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {item.label}
            </p>
          </div>
          <p className="mt-2 text-2xl font-black tracking-tight">{item.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
        </div>
      ))}
    </section>
  );
}

/* ----------------------------- Continue learning --------------------------- */

export function ContinueLearningList() {
  const { stats, lessonProgress } = useProgress();

  const items = seedCourses
    .map((course) => ({ course, lesson: getLesson(course.lessonId) }))
    .filter((item) => Boolean(item.lesson))
    .map((item) => ({
      ...item,
      progress: Math.max(item.course.progress, lessonProgress(item.course.lessonId)),
      done: stats.completedLessons.includes(item.course.lessonId),
    }))
    .sort((a, b) => b.progress - a.progress);

  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black tracking-tight">Continue Learning</h2>
        <Badge variant="secondary">{items.filter((item) => !item.done).length} in progress</Badge>
      </div>

      <ul className="mt-4 space-y-4">
        {items.map(({ course, lesson, progress, done }) => {
          if (!lesson) return null;
          const subject = getSubject(lesson.subjectId);
          return (
            <li key={course.lessonId}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="text-sm font-bold transition hover:text-primary"
                >
                  {subject?.emoji} {lesson.title}
                </Link>
                <span className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {lesson.minutes} min
                  </span>
                  <span className="tabular-nums">{progress}%</span>
                </span>
              </div>
              <Progress
                value={progress}
                className="mt-2 h-2"
                indicatorClassName={
                  done
                    ? "bg-[linear-gradient(90deg,var(--success),color-mix(in_oklab,var(--success)_60%,white))]"
                    : undefined
                }
              />
              <div className="mt-1.5 flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground">
                  {done ? "Completed" : course.lastOpened}
                </p>
                <Button asChild size="sm" variant="ghost" className="h-7 gap-1 text-xs">
                  <Link href={`/lessons/${lesson.id}`}>
                    <PlayCircle className="size-3.5" /> {done ? "Review" : "Continue"}
                  </Link>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <Button asChild variant="gradient" className="mt-5 w-full">
        <Link href="/learn">Browse more lessons</Link>
      </Button>
    </section>
  );
}

/* ------------------------------- Weekly chart ------------------------------ */

export function WeeklyChart() {
  const max = Math.max(...weeklyXp.map((day) => day.xp));
  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black tracking-tight">This week’s activity</h2>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5" /> 7 days
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        {weeklyXp.map((day) => (
          <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-[10px] font-bold tabular-nums text-muted-foreground">
              {day.xp}
            </span>
            <div
              className="w-full rounded-t-lg bg-[linear-gradient(180deg,var(--brand-indigo),color-mix(in_oklab,var(--brand-cyan)_70%,transparent))] transition-all duration-500"
              style={{ height: `${Math.max(8, (day.xp / max) * 110)}px` }}
              title={`${day.xp} XP · ${day.minutes} minutes`}
            />
            <span className="text-[10px] font-semibold text-muted-foreground">{day.day}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
        Your strongest day was Saturday with {max} XP. Consistency beats intensity — even 18 minutes
        on Wednesday counted.
      </p>
    </section>
  );
}

/* -------------------------------- Level card ------------------------------- */

export function LevelCard() {
  const { level, next, levelPercent, stats, earnedBadges } = useProgress();

  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-2xl">
          {level.emoji}
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Current level
          </p>
          <p className="text-lg font-black">
            Level {level.level} — {level.name}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-muted-foreground">
            {next ? `Next: ${next.name}` : "Top level reached"}
          </span>
          <span className="tabular-nums">{levelPercent}%</span>
        </div>
        <Progress
          value={levelPercent}
          className="mt-2 h-2.5"
          indicatorClassName="bg-[linear-gradient(90deg,var(--brand-indigo),var(--brand-cyan))]"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {next
            ? `${formatNumber(next.minXp - stats.xp)} XP to go — about ${Math.max(1, Math.ceil((next.minXp - stats.xp) / 120))} lessons.`
            : "You have unlocked every level perk."}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Badges
          </p>
          <p className="text-lg font-black">
            {earnedBadges.length}
            <span className="text-xs font-semibold text-muted-foreground"> earned</span>
          </p>
        </div>
        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Perks active
          </p>
          <p className="text-lg font-black">{level.perks.length}</p>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5">
        {level.perks.map((perk) => (
          <li key={perk} className="flex gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
            {perk}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------- Study goals ------------------------------- */

export function StudyGoals() {
  const { stats } = useProgress();

  // Live values where the goal tracks tracked stats, authored values otherwise.
  const goals = studyGoals.map((goal) => {
    if (goal.label === "Days in a row") return { ...goal, value: stats.streak };
    if (goal.label === "Minutes learned") return { ...goal, value: stats.minutesLearned };
    return goal;
  });

  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5">
      <h2 className="flex items-center gap-2 text-base font-bold">
        <Target className="size-4 text-primary" /> Weekly goals
      </h2>
      <ul className="mt-4 space-y-3.5">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.value / goal.target) * 100));
          return (
            <li key={goal.label}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">{goal.label}</span>
                <span className="tabular-nums">
                  {formatNumber(goal.value)}
                  {goal.unit ? ` ${goal.unit}` : ""} / {formatNumber(goal.target)}
                  {goal.unit ? ` ${goal.unit}` : ""}
                </span>
              </div>
              <Progress value={percent} className="mt-1.5 h-2" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------------------------- Subject breakdown ---------------------------- */

export function SubjectBreakdown() {
  const total = subjectMinutes.reduce((sum, entry) => sum + entry.minutes, 0);
  const palette = ["var(--brand-indigo)", "var(--brand-cyan)", "var(--brand-pink)", "var(--brand-emerald)", "var(--brand-amber)", "var(--brand-violet)"];

  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5">
      <h2 className="text-base font-bold">Time by subject</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        {formatDuration(total)} of focused learning in total
      </p>

      <ul className="mt-4 space-y-3">
        {subjectMinutes.map((entry, index) => {
          const subject = getSubject(entry.subjectId);
          const percent = Math.round((entry.minutes / total) * 100);
          return (
            <li key={entry.subjectId}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>
                  {subject?.emoji} {subject?.name}
                </span>
                <span className="tabular-nums text-muted-foreground">
                  {entry.minutes} min · {percent}%
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{ width: `${percent}%`, background: palette[index % palette.length] }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------- Badge shelf ------------------------------- */

export function BadgeShelf() {
  const { earnedBadges, lockedBadges } = useProgress();

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div>
        <p className="flex items-center gap-2 text-sm font-bold">
          <Trophy className="size-4 text-primary" /> Earned ({earnedBadges.length})
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="animate-pop flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-3.5"
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br text-lg",
                  badgeTierStyles[badge.tier].ring,
                )}
              >
                {badge.emoji}
              </span>
              <div>
                <p className="text-sm font-bold">{badge.name}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {badge.description}
                </p>
                <Badge variant="success" className="mt-1.5">
                  +{badge.xpReward} XP
                </Badge>
              </div>
            </div>
          ))}
          {earnedBadges.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
              Complete your first lesson to earn the ★ First Lesson badge.
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <p className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
          <Award className="size-4" /> Still locked ({lockedBadges.length})
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {lockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-start gap-3 rounded-2xl border border-dashed border-border/70 p-3.5 opacity-75"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-lg grayscale">
                {badge.emoji}
              </span>
              <div>
                <p className="text-sm font-bold">{badge.name}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {badge.requirement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Recent --------------------------------- */

export function RecentAchievements() {
  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5">
      <h2 className="flex items-center gap-2 text-base font-bold">
        <Sparkles className="size-4 text-primary" /> Recent achievements
      </h2>
      <ul className="mt-4 space-y-3">
        {recentAchievements.map((achievement) => (
          <li key={achievement.id} className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-base">
              {achievement.emoji}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold">{achievement.title}</p>
              <p className="text-[11px] text-muted-foreground">{achievement.description}</p>
            </div>
            <span className="ml-auto shrink-0 text-[11px] font-semibold text-muted-foreground">
              +{achievement.xp}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RecommendedCard({
  lessonId,
}: {
  lessonId: string;
}) {
  const lesson = getLesson(lessonId);
  if (!lesson) return null;
  const subject = getSubject(lesson.subjectId);
  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className="flex items-center gap-3 rounded-2xl border border-border/70 p-3 transition hover:border-primary/40"
    >
      <span className="text-xl" aria-hidden>
        {subject?.emoji}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold">{lesson.title}</span>
        <span className="text-[11px] text-muted-foreground">
          {subject?.name} · {lesson.minutes} min
        </span>
      </span>
      <DifficultyBadge difficulty={lesson.difficulty} className="ml-auto shrink-0" />
    </Link>
  );
}
