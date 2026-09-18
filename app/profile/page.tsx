"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Bell, Camera, Check, Flame, Monitor, Moon, Pencil, Shield, Sun, Trash2, Zap } from "lucide-react";
import { lessons } from "@/lib/lessons";
import { projects } from "@/lib/projects";
import { useEduTech } from "@/lib/store";
import { Button, Progress } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const {
    displayName,
    grade,
    setProfile,
    xp,
    streak,
    completedLessons,
    completedProjects,
    completedChallenges,
    level,
    earnedBadges,
    resetProgress,
  } = useEduTech();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(displayName);
  const [gradeInput, setGradeInput] = useState(grade);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const save = () => {
    setProfile(name.trim() || "Student", gradeInput.trim() || "Grade 8");
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 sm:h-40">
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>
        <div className="px-6 pb-6 sm:px-8">
          <div className="-mt-10 flex flex-wrap items-end gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-950 text-2xl font-black text-white ring-4 ring-card dark:bg-white dark:text-slate-950">
                {initials}
              </div>
              <span className="absolute -bottom-1 -right-1 rounded-full bg-card p-1.5 text-muted-foreground ring-1 ring-border">
                <Camera size={14} />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              {editing ? (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Display name"
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-lg font-black outline-none focus:border-indigo-500 sm:max-w-56"
                  />
                  <input
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value)}
                    placeholder="Grade"
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-lg font-bold outline-none focus:border-indigo-500 sm:max-w-40"
                  />
                </div>
              ) : (
                <>
                  <h1 className="truncate text-2xl font-black tracking-tight sm:text-3xl">{displayName}</h1>
                  <p className="text-sm font-bold text-muted-foreground">
                    {grade} · {level.current.name} · 🔥 {streak}-day streak
                  </p>
                </>
              )}
            </div>
            {editing ? (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { setEditing(false); setName(displayName); setGradeInput(grade); }}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" onClick={save}>
                  <Check size={15} /> Save
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                <Pencil size={15} /> Edit profile {saved && <span className="text-emerald-500">· Saved!</span>}
              </Button>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Zap, label: "Total XP", value: xp.toLocaleString(), color: "text-amber-500" },
              { icon: Flame, label: "Streak", value: `${streak} days`, color: "text-orange-500" },
              { icon: Check, label: "Lessons", value: `${completedLessons.length}/${lessons.length}`, color: "text-emerald-500" },
              { icon: Shield, label: "Badges", value: `${earnedBadges.length}`, color: "text-indigo-500" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl bg-muted/60 p-4 text-center">
                  <Icon size={18} className={cn("mx-auto", s.color)} />
                  <p className="mt-1.5 text-xl font-black">{s.value}</p>
                  <p className="text-xs font-bold text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-sm">
              <span className="font-bold">{level.current.name}</span>
              <span className="font-bold text-indigo-500">
                {level.next ? `Next: ${level.next.name} (${level.progress}%)` : "Max level!"}
              </span>
            </div>
            <Progress value={level.progress} className="mt-2" />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-black">🎨 Appearance</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose your theme for late-night study sessions.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
              { id: "system", label: "System", icon: Monitor },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 text-[13px] font-bold transition",
                    theme === t.id ? "border-indigo-500 bg-indigo-500/10 text-indigo-500" : "border-border hover:border-indigo-300"
                  )}
                >
                  <Icon size={18} /> {t.label}
                </button>
              );
            })}
          </div>

          <h2 className="mt-6 flex items-center gap-2 font-black">
            <Bell size={16} /> Reminders
          </h2>
          <label className="mt-3 flex cursor-pointer items-center justify-between rounded-xl bg-muted/60 p-3.5 text-sm font-bold">
            Daily streak reminder
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-indigo-600" />
          </label>
          <label className="mt-2 flex cursor-pointer items-center justify-between rounded-xl bg-muted/60 p-3.5 text-sm font-bold">
            Weekly challenge alerts
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-indigo-600" />
          </label>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-black">📈 Lifetime stats</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["Lessons completed", `${completedLessons.length} / ${lessons.length}`],
                ["Projects built", `${completedProjects.length} / ${projects.length}`],
                ["Challenges conquered", `${completedChallenges.length}`],
                ["Current streak", `${streak} day${streak === 1 ? "" : "s"}`],
                ["Total XP earned", `${xp.toLocaleString()} XP`],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between border-b border-border pb-2.5 last:border-0 last:pb-0">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-black">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.04] p-6">
            <h2 className="flex items-center gap-2 font-black text-red-500">
              <Trash2 size={17} /> Danger zone
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Reset all XP, streaks, badges and completions. This cannot be undone!
            </p>
            {!confirmReset ? (
              <Button variant="outline" className="mt-4 border-red-500/40 text-red-500 hover:bg-red-500/10" onClick={() => setConfirmReset(true)}>
                Reset all progress…
              </Button>
            ) : (
              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={() => setConfirmReset(false)}>
                  Keep my progress
                </Button>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    resetProgress();
                    setConfirmReset(false);
                  }}
                >
                  Yes, reset everything
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
