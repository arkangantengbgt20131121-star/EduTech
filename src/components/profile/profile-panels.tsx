"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, FolderKanban, Settings, Trash2, Trophy, Upload } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/misc";
import { DifficultyBadge } from "@/components/shared/primitives";
import { useProgress } from "@/components/progress/progress-provider";
import { useMounted } from "@/lib/hooks";
import { getProject, projects } from "@/data";
import { useTheme } from "next-themes";


/* ------------------------------ Submitted work ----------------------------- */

const submittedProjects = projects.slice(0, 3).map((project, index) => ({
  ...project,
  status: index === 0 ? "In review" : index === 1 ? "Approved" : "Draft",
  submittedAt: index === 0 ? "2 days ago" : index === 1 ? "Last week" : "Not submitted",
  score: index === 1 ? "9.1 / 10" : null,
}));

export function ProfileProjects() {
  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-black tracking-tight">
          <FolderKanban className="size-4.5 text-primary" /> My projects
        </h2>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Upload className="size-3.5" /> Upload new
        </Button>
      </div>

      <ul className="mt-4 space-y-3">
        {submittedProjects.map((project) => {
          const statusStyles: Record<string, string> = {
            "In review": "bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[color-mix(in_oklab,var(--warning)_78%,var(--foreground))]",
            Approved: "bg-[color-mix(in_oklab,var(--success)_16%,transparent)] text-[color-mix(in_oklab,var(--success)_78%,var(--foreground))]",
            Draft: "bg-muted text-muted-foreground",
          };

          return (
            <li
              key={project.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-border/70 p-3.5"
            >
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl text-xl"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                }}
              >
                {project.emoji}
              </span>
              <span className="min-w-[200px] flex-1">
                <Link
                  href={`/projects/${project.id}`}
                  className="text-sm font-bold transition hover:text-primary"
                >
                  {project.title}
                </Link>
                <span className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {project.minutes} min
                  </span>
                  <span>·</span>
                  <span>{project.submittedAt}</span>
                  {project.score ? (
                    <>
                      <span>·</span>
                      <span className="font-bold text-primary">Teacher score {project.score}</span>
                    </>
                  ) : null}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <DifficultyBadge difficulty={project.difficulty} />
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyles[project.status]}`}
                >
                  {project.status}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* --------------------------------- Badges --------------------------------- */

export function ProfileBadges() {
  const { earnedBadges, lockedBadges } = useProgress();

  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5">
      <h2 className="flex items-center gap-2 text-lg font-black tracking-tight">
        <Trophy className="size-4.5 text-primary" /> Badge cabinet
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {earnedBadges.length} earned · {lockedBadges.length} still to unlock
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...earnedBadges, ...lockedBadges].map((badge) => {
          const earned = earnedBadges.some((item) => item.id === badge.id);
          return (
            <div
              key={badge.id}
              className={
                earned
                  ? "rounded-2xl border border-border/70 bg-card p-3.5 transition hover:border-primary/40"
                  : "rounded-2xl border border-dashed border-border/70 p-3.5 opacity-70"
              }
            >
              <div className="flex items-start gap-3">
                <span
                  className={
                    earned
                      ? "grid size-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-lg"
                      : "grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-lg grayscale"
                  }
                >
                  {badge.emoji}
                </span>
                <div>
                  <p className="text-sm font-bold">{badge.name}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                    {earned ? badge.description : badge.requirement}
                  </p>
                </div>
              </div>
              {earned ? (
                <Badge variant="success" className="mt-2.5">
                  Earned · +{badge.xpReward} XP
                </Badge>
              ) : (
                <Badge variant="outline" className="mt-2.5">
                  Locked
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------- Settings -------------------------------- */

export function ProfileSettings() {
  const { resetProgress } = useProgress();
  const { theme, setTheme } = useTheme();
  const [dailyGoal, setDailyGoal] = React.useState(true);
  const [leaderboardVisible, setLeaderboardVisible] = React.useState(true);
  const [soundEffects, setSoundEffects] = React.useState(true);
  const mounted = useMounted();

  return (
    <section id="settings" className="scroll-mt-24 rounded-3xl border border-border/70 bg-card p-5">
      <h2 className="flex items-center gap-2 text-base font-bold">
        <Settings className="size-4 text-primary" /> Preferences
      </h2>

      <ul className="mt-4 space-y-4">
        <li className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-semibold">Dark theme</span>
            <span className="block text-[11px] text-muted-foreground">
              Easier on the eyes for evening study
            </span>
          </span>
          <Switch
            checked={mounted ? theme === "dark" : false}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Toggle dark theme"
          />
        </li>
        <li className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-semibold">Daily reminder</span>
            <span className="block text-[11px] text-muted-foreground">
              A nudge at 17:00 so streaks survive homework
            </span>
          </span>
          <Switch
            checked={dailyGoal}
            onCheckedChange={setDailyGoal}
            aria-label="Toggle daily reminder"
          />
        </li>
        <li className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-semibold">Show me on leaderboards</span>
            <span className="block text-[11px] text-muted-foreground">
              You can hide your name at any time
            </span>
          </span>
          <Switch
            checked={leaderboardVisible}
            onCheckedChange={setLeaderboardVisible}
            aria-label="Toggle leaderboard visibility"
          />
        </li>
        <li className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-semibold">Sound effects</span>
            <span className="block text-[11px] text-muted-foreground">
              Badge and quiz feedback sounds
            </span>
          </span>
          <Switch
            checked={soundEffects}
            onCheckedChange={setSoundEffects}
            aria-label="Toggle sound effects"
          />
        </li>
      </ul>

      <div className="mt-5 border-t border-border/60 pt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Progress data
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
          Your XP, streak and lesson progress are stored in this browser for the demo. In the full
          platform they sync to your account.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3 gap-1.5 text-destructive"
          onClick={() => {
            resetProgress();
            toast("Progress reset", {
              description: "XP, streaks and completions are back to the demo defaults.",
            });
          }}
        >
          <Trash2 className="size-3.5" /> Reset demo progress
        </Button>
      </div>
    </section>
  );
}

export function SuggestedProject() {
  const project = getProject("digital-dice-microbit");
  if (!project) return null;
  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex items-center gap-3 rounded-2xl border border-border/70 p-3 transition hover:border-primary/40"
    >
      <span
        className="grid size-10 place-items-center rounded-xl text-lg"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        {project.emoji}
      </span>
      <span className="text-sm font-bold">{project.title}</span>
    </Link>
  );
}
