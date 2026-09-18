"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Cpu,
  Flame,
  Play,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { subjects } from "@/lib/subjects";
import { getPopularLessons, lessons } from "@/lib/lessons";
import { challenges, projects } from "@/lib/projects";
import { getLessonsBySubject } from "@/lib/lessons";
import { useEduTech } from "@/lib/store";
import { Badge, Button, Progress, SectionHeading } from "@/components/ui";
import { ChallengeCard, LessonCard, ProjectCard, SubjectCard } from "@/components/cards";

const tickerItems = [
  "🤖 Robotics",
  "💻 Python",
  "🎨 Figma Design",
  "➗ Algebra",
  "🔬 Science Lab",
  "🇬🇧 English",
  "📖 Bahasa Indonesia",
  "🌎 Geography",
  "🏛️ History",
  "⚡ Earn XP",
];

export default function Home() {
  const { xp, completedLessons, streak, level, earnedBadges, completedProjects } = useEduTech();
  const popular = getPopularLessons().slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const weekly = challenges.find((c) => c.featured) ?? challenges[0];

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-1.5 text-[13px] font-bold text-indigo-600 dark:text-indigo-300">
              <Sparkles size={14} />
              The interactive way to learn
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Learn.
              <br />
              Create.
              <br />
              <span className="text-gradient">Build the Future.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Explore robotics, coding, design, science, mathematics, history and more through
              interactive lessons, real projects and weekly challenges.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn">
                <Button size="lg" variant="gradient" className="group">
                  Start Learning
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline">
                  <Play size={17} /> Explore Projects
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-8 sm:gap-10">
              {[
                [`${lessons.length}`, "Lessons"],
                [`${projects.length}`, "Projects"],
                [`${subjects.length}`, "Subjects"],
              ].map(([n, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black sm:text-3xl">{n}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-md animate-fade-up lg:max-w-lg">
            <div className="relative rounded-[2rem] border border-border bg-card p-5 shadow-2xl shadow-indigo-500/15">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-muted-foreground">Today&apos;s lesson</p>
                  <h3 className="mt-0.5 font-black">Micro:bit LED Matrix</h3>
                </div>
                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-500">
                  <Cpu size={22} />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-6">
                <div className="mx-auto grid w-fit grid-cols-5 gap-2.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-5 w-5 rounded-full ${
                        [1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 22].includes(i)
                          ? "bg-red-400 shadow-[0_0_12px_3px_rgba(248,113,113,0.7)]"
                          : "bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-5 flex justify-center gap-3">
                  {["A", "B"].map((b) => (
                    <div key={b} className="rounded-full bg-slate-800 px-5 py-1.5 text-xs font-bold text-white">
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-black text-indigo-500">65%</span>
              </div>
              <Progress value={65} className="mt-2" />
              <Link href="/lessons/r-led-matrix">
                <Button className="mt-4 w-full" variant="primary">
                  Continue lesson <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            <div className="absolute -left-4 top-8 flex animate-float items-center gap-2 rounded-2xl border border-border bg-card/95 px-4 py-2.5 shadow-xl backdrop-blur sm:-left-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
                <Zap size={18} className="fill-amber-500" />
              </span>
              <div>
                <p className="text-sm font-black">+50 XP</p>
                <p className="text-xs text-muted-foreground">Quiz aced!</p>
              </div>
            </div>

            <div
              className="absolute -right-3 bottom-16 flex animate-float items-center gap-2 rounded-2xl border border-border bg-card/95 px-4 py-2.5 shadow-xl backdrop-blur sm:-right-6"
              style={{ animationDelay: "1.4s" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/15 text-orange-500">
                <Flame size={18} />
              </span>
              <div>
                <p className="text-sm font-black">7-day streak</p>
                <p className="text-xs text-muted-foreground">Keep it burning!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-border bg-slate-950 py-3.5 dark:bg-white/[0.03]">
        <div className="flex w-max animate-ticker gap-3">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ─── SUBJECTS ─────────────────────────────────────── */}
      <section id="learn" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="9 subjects · 1 platform"
          title="What will you learn today?"
          description="From robotics and coding to history and languages — pick a path or explore them all."
        />
        <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <SubjectCard key={s.id} subject={s} lessonCount={getLessonsBySubject(s.id).length} />
          ))}
        </div>
      </section>

      {/* ─── POPULAR LESSONS ──────────────────────────────── */}
      <section className="border-y border-border bg-slate-50/70 py-20 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                Loved by students
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Popular lessons</h2>
            </div>
            <Link href="/lessons" className="flex items-center gap-1.5 font-bold text-indigo-500 hover:underline">
              Browse all lessons <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {popular.map((l) => (
              <LessonCard key={l.id} lesson={l} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ────────────────────────────── */}
      <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-indigo-500">
              Build something real
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Featured projects</h2>
          </div>
          <Link href="/projects" className="flex items-center gap-1.5 font-bold text-indigo-500 hover:underline">
            See all projects <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* ─── WEEKLY CHALLENGE ─────────────────────────────── */}
      <section id="challenges" className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white sm:p-12">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="relative">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/40">
              <Trophy size={26} />
            </div>
            <p className="font-bold uppercase tracking-[0.18em] text-amber-400">
              Weekly challenge · {weekly.endsIn}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black sm:text-4xl">{weekly.title}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">{weekly.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/challenges">
                <Button size="lg" className="bg-white text-slate-950 hover:bg-amber-100 dark:bg-white dark:text-slate-950">
                  Take the challenge <ArrowRight size={17} />
                </Button>
              </Link>
              <span className="flex items-center gap-1.5 font-bold text-amber-300">
                <Zap size={16} className="fill-amber-400 text-amber-400" /> {weekly.xp} XP reward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STUDENT PROGRESS ─────────────────────────────── */}
      <section id="progress" className="border-y border-border bg-slate-50/70 py-20 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                Your journey
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Make progress every day.
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Earn XP for every lesson, keep your streak burning, unlock badges and climb from
                Explorer to Future Leader — all tracked in your personal dashboard.
              </p>
              <Link href="/dashboard">
                <Button className="mt-7" variant="primary">
                  Open Dashboard <ArrowRight size={17} />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-indigo-500/5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-muted/60 p-5">
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
                    <Zap size={14} className="text-amber-500" /> Total XP
                  </p>
                  <p className="mt-2 text-3xl font-black">{xp.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-muted/60 p-5">
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
                    <BookOpen size={14} className="text-indigo-500" /> Lessons
                  </p>
                  <p className="mt-2 text-3xl font-black">{completedLessons.length}</p>
                </div>
                <div className="rounded-xl bg-muted/60 p-5">
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
                    <Flame size={14} className="text-orange-500" /> Streak
                  </p>
                  <p className="mt-2 text-3xl font-black">{streak} 🔥</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-muted-foreground">Current level</p>
                    <p className="mt-0.5 text-xl font-black">{level.current.name}</p>
                  </div>
                  <span className="font-black text-indigo-500">{level.progress}%</span>
                </div>
                <Progress value={level.progress} className="mt-3 h-3" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {level.next
                    ? `${(level.next.min - xp).toLocaleString()} XP to ${level.next.name}`
                    : "Max level reached — legendary!"}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4 rounded-xl border border-border p-4">
                <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500">
                  {earnedBadges.length > 0 ? <Award size={22} /> : <Trophy size={22} />}
                </div>
                <div>
                  <p className="font-black">
                    {earnedBadges.length > 0
                      ? earnedBadges[earnedBadges.length - 1].name
                      : "No badges yet"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {earnedBadges.length > 0
                      ? earnedBadges[earnedBadges.length - 1].description
                      : "Complete your first lesson to earn one!"}
                  </p>
                </div>
                <span className="ml-auto text-sm font-bold text-muted-foreground">
                  {earnedBadges.length} 🏅
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY + CTA ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["🧑‍💻", "Code playground", "Run Python, JavaScript and HTML right in your browser."],
            ["🤖", "Micro:bit simulator", "Blink LEDs, roll dice and build games — no hardware needed."],
            ["🏆", "XP, badges & streaks", "Every lesson levels you up. Learning feels like a game."],
          ].map(([emoji, title, desc]) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-3xl">{emoji}</p>
              <h3 className="mt-3 font-black">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center shadow-xl shadow-indigo-500/5 sm:p-16">
          <div className="absolute left-1/2 top-0 -z-0 h-56 w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="relative">
            <BookOpen className="mx-auto text-indigo-500" size={42} />
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              Ready to start learning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Pick a subject, finish your first lesson and earn your first badge today. Your future
              self will thank you. {completedProjects.length > 0 && (
                <span className="inline-flex items-center gap-1 font-bold text-emerald-500">
                  <CheckCircle2 size={15} /> {completedProjects.length} project{completedProjects.length > 1 ? "s" : ""} already built!
                </span>
              )}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/learn">
                <Button size="lg" variant="primary">
                  Start Learning <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/playground">
                <Button size="lg" variant="outline">
                  Try the Playground
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Badge>Free for students</Badge>
              <Badge variant="success">No signup needed</Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
