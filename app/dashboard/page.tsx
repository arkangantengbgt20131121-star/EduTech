"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  Code2,
  Compass,
  Crown,
  Flame,
  Footprints,
  GraduationCap,
  Hammer,
  Lock,
  Palette,
  Rocket,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { subjects } from "@/lib/subjects";
import { getLessonsBySubject, getLesson, lessons } from "@/lib/lessons";
import { badges, levels, projects } from "@/lib/projects";
import { useEduTech } from "@/lib/store";
import { Button, Progress, SectionHeading } from "@/components/ui";
import { LessonCard } from "@/components/cards";
import { cn } from "@/lib/utils";

const badgeIcons: Record<string, typeof Trophy> = {
  Footprints,
  BookOpen,
  GraduationCap,
  Bot,
  Code2,
  Palette,
  Flame,
  Zap,
  Trophy,
  Target,
};

const levelIcons: Record<string, typeof Compass> = {
  Compass,
  Hammer,
  Sparkles,
  Rocket,
  Crown,
  Star,
};

export default function DashboardPage() {
  const {
    xp,
    streak,
    displayName,
    completedLessons,
    completedProjects,
    completedChallenges,
    level,
  } = useEduTech();

  const earnedIds = new Set(
    badges
      .filter((b) => {
        switch (b.id) {
          case "b-first-steps":
            return completedLessons.length >= 1;
          case "b-bookworm":
            return completedLessons.length >= 5;
          case "b-scholar":
            return completedLessons.length >= 15;
          case "b-robot-builder":
            return completedProjects.some((p) => p === "p-digital-dice" || p === "p-reaction-game");
          case "b-code-crafter":
            return completedProjects.some((p) => ["p-guessing-game", "p-portfolio", "p-todo-app"].includes(p));
          case "b-design-star":
            return completedProjects.some((p) => p === "p-app-ui" || p === "p-poster");
          case "b-streak-3":
            return streak >= 3;
          case "b-streak-7":
            return streak >= 7;
          case "b-challenger":
            return completedChallenges.length >= 1;
          default:
            return false;
        }
      })
      .map((b) => b.id)
  );

  const continueLessons = lessons.filter((l) => !completedLessons.includes(l.id)).slice(0, 3);
  const recentLessons = [...completedLessons].reverse().slice(0, 5).map(getLesson).filter(Boolean);
  const totalPossibleXp =
    lessons.reduce((s, l) => s + l.xp, 0) + projects.reduce((s, p) => s + p.xp, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-indigo-500">
            Student dashboard
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Welcome back, {displayName.split(" ")[0]}! 👋
          </h1>
          <p className="mt-2 text-muted-foreground">
            {completedLessons.length === 0
              ? "Your adventure starts today — finish one lesson to light up this dashboard."
              : `You've earned ${xp.toLocaleString()} XP so far. Keep the momentum going!`}
          </p>
        </div>
        <Link href="/profile">
          <Button variant="outline">Edit profile</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-[13px] font-bold text-muted-foreground">
            <Zap size={15} className="fill-amber-500 text-amber-500" /> TOTAL XP
          </p>
          <p className="mt-2 text-3xl font-black">{xp.toLocaleString()}</p>
          <p className="mt-1 text-xs text-muted-foreground">of {totalPossibleXp.toLocaleString()} available</p>
        </div>
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-5">
          <p className="flex items-center gap-2 text-[13px] font-bold text-muted-foreground">
            <Award size={15} className="text-indigo-500" /> LEVEL
          </p>
          <p className="mt-2 text-3xl font-black">{level.current.name}</p>
          <Progress value={level.progress} className="mt-2.5" />
          <p className="mt-1.5 text-xs text-muted-foreground">
            {level.next ? `${(level.next.min - xp).toLocaleString()} XP to ${level.next.name}` : "Max level! 🏆"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-[13px] font-bold text-muted-foreground">
            <Flame size={15} className="text-orange-500" /> DAY STREAK
          </p>
          <p className="mt-2 text-3xl font-black">{streak} 🔥</p>
          <div className="mt-2.5 flex gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-2 flex-1 rounded-full",
                  i < Math.min(7, streak) ? "bg-orange-500" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-[13px] font-bold text-muted-foreground">
            <BookOpen size={15} className="text-emerald-500" /> COMPLETED
          </p>
          <p className="mt-2 text-3xl font-black">{completedLessons.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            lessons · {completedProjects.length} projects · {completedChallenges.length} challenges
          </p>
        </div>
      </div>

      {/* Continue learning */}
      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black">📚 Continue learning</h2>
          <Link href="/lessons" className="flex items-center gap-1 text-sm font-bold text-indigo-500 hover:underline">
            All lessons <ArrowRight size={15} />
          </Link>
        </div>
        {continueLessons.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {continueLessons.map((l) => (
              <LessonCard key={l.id} lesson={l} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
            <p className="text-4xl">🎓</p>
            <h3 className="mt-3 text-xl font-black">You finished every lesson!</h3>
            <p className="mt-2 text-muted-foreground">Legendary. Now go build projects and crush challenges.</p>
            <div className="mt-5 flex justify-center gap-3">
              <Link href="/projects"><Button variant="primary">Browse projects</Button></Link>
              <Link href="/challenges"><Button variant="outline">Challenges</Button></Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Per-subject progress */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-black">📊 Progress by subject</h2>
          <div className="mt-5 space-y-4">
            {subjects.map((s) => {
              const Icon = s.icon;
              const list = getLessonsBySubject(s.id);
              const doneCount = list.filter((l) => completedLessons.includes(l.id)).length;
              const pct = list.length ? Math.round((doneCount / list.length) * 100) : 0;
              return (
                <Link key={s.id} href={`/learn/${s.id}`} className="group block">
                  <div className="flex items-center gap-3">
                    <span className={cn("rounded-lg bg-gradient-to-br p-2 text-white", s.gradient)}>
                      <Icon size={16} />
                    </span>
                    <span className="flex-1 text-sm font-bold group-hover:text-indigo-500">{s.name}</span>
                    <span className="text-xs font-bold text-muted-foreground">
                      {doneCount}/{list.length}
                    </span>
                  </div>
                  <Progress value={pct} className="mt-2" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent activity + levels */}
        <div className="space-y-8">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-black">⚡ Recent activity</h2>
            {recentLessons.length === 0 ? (
              <p className="mt-4 rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
                Nothing yet — your completed lessons will appear here.{" "}
                <Link href="/learn" className="font-bold text-indigo-500 hover:underline">
                  Start your first lesson →
                </Link>
              </p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {recentLessons.map((l) => (
                  <li key={l!.id}>
                    <Link
                      href={`/lessons/${l!.id}`}
                      className="flex items-center gap-3 rounded-xl bg-muted/60 p-3 text-sm transition hover:bg-muted"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-500">
                        <BookOpen size={15} />
                      </span>
                      <span className="min-w-0 flex-1 truncate font-bold">{l!.title}</span>
                      <span className="flex shrink-0 items-center gap-1 text-xs font-black text-amber-500">
                        <Zap size={12} className="fill-amber-500" /> {l!.xp}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-black">🚀 Level journey</h2>
            <div className="mt-4 space-y-1">
              {levels.map((lv, i) => {
                const Icon = levelIcons[lv.icon] ?? Compass;
                const reached = xp >= lv.min;
                const isCurrent = level.current.name === lv.name;
                return (
                  <div
                    key={lv.name}
                    className={cn(
                      "flex items-center gap-3 rounded-xl p-2.5",
                      isCurrent && "bg-indigo-500/10 ring-1 ring-indigo-500/30"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl",
                        reached ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white" : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon size={17} />
                    </span>
                    <span className={cn("flex-1 text-sm font-black", !reached && "text-muted-foreground")}>
                      {i + 1}. {lv.name}
                      {isCurrent && <span className="ml-2 text-xs text-indigo-500">← you are here</span>}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">{lv.min.toLocaleString()} XP</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-10">
        <SectionHeading
          eyebrow={`${earnedIds.size}/${badges.length} unlocked`}
          title="Your badges"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {badges.map((b) => {
            const Icon = badgeIcons[b.icon] ?? Trophy;
            const earned = earnedIds.has(b.id);
            return (
              <div
                key={b.id}
                className={cn(
                  "rounded-2xl border p-5 text-center transition",
                  earned ? "border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-transparent" : "border-border bg-card opacity-70"
                )}
              >
                <span
                  className={cn(
                    "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                    earned ? b.color : "from-slate-400 to-slate-500"
                  )}
                >
                  {earned ? <Icon size={26} /> : <Lock size={22} />}
                </span>
                <p className="mt-3 text-sm font-black">{b.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.description}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  {earned ? "✅ Unlocked" : b.requirement}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
