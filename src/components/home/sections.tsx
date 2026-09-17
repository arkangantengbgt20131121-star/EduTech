import Link from "next/link";
import {
  ArrowRight,
  Award,
  Clock,
  Flame,
  Layers,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge, SectionHeading, XpChip } from "@/components/shared/primitives";
import { getSubjectIcon } from "@/lib/icons";
import { formatNumber } from "@/lib/utils";
import { activeChallenge, badges, levels, popularLessons, projects, subjects } from "@/data";
import { lessonsBySubject, publishedCountForSubject } from "@/data";

/* ------------------------------ Categories -------------------------------- */

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" id="subjects">
      <SectionHeading
        eyebrow="Learning categories"
        title="Ten subjects, one place to build everything"
        description="Every category has its own learning path, projects and quizzes. Start anywhere — the platform keeps track of where you are."
        action={
          <Button asChild variant="outline">
            <Link href="/subjects">
              View all subjects <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const Icon = getSubjectIcon(subject.icon);
          return (
            <Link
              key={subject.id}
              href={`/subjects/${subject.id}`}
              className="card-lift group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-5"
            >
              <span
                className="absolute -right-10 -top-10 size-28 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-25"
                style={{ background: subject.color }}
                aria-hidden
              />
              <div className="flex items-start justify-between">
                <span
                  className="grid size-11 place-items-center rounded-2xl text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
                  }}
                >
                  <Icon className="size-5" />
                </span>
                <Badge variant="outline">{publishedCountForSubject(subject.id)} lessons</Badge>
              </div>

              <h3 className="mt-4 text-lg font-black tracking-tight">
                <span aria-hidden className="mr-1.5">
                  {subject.emoji}
                </span>
                {subject.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {subject.tagline} — {subject.topics.slice(0, 4).join(" · ")}
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="size-3.5" /> {formatNumber(subject.learnerCount)}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="size-3.5" /> {subject.units.length} units
                </span>
                <span className="ml-auto flex items-center gap-1 font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------- Popular lessons ------------------------------ */

export function PopularLessons() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Popular right now"
          title="Lessons students are finishing this week"
          description="Short, practical and project-based — most take between 15 and 30 minutes."
          action={
            <Button asChild variant="outline">
              <Link href="/learn">
                All lessons <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {popularLessons.map((lesson) => {
            const subject = subjects.find((item) => item.id === lesson.subjectId);
            if (!subject) return null;
            const Icon = getSubjectIcon(subject.icon);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="card-lift group flex flex-col rounded-3xl border border-border/70 bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid size-10 place-items-center rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, ${subject.gradient[0]}, ${subject.gradient[1]})`,
                    }}
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {subject.name} · {subject.units.find((unit) => unit.id === lesson.unitId)?.title}
                    </p>
                    <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Clock className="size-3" /> {lesson.minutes} min
                    </p>
                  </div>
                </div>

                <h3 className="mt-3.5 text-base font-bold leading-snug group-hover:text-primary">
                  {lesson.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {lesson.summary}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <DifficultyBadge difficulty={lesson.difficulty} />
                  <XpChip xp={lesson.xp} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Featured projects ---------------------------- */

export function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Projects"
        title="Build something you can show people"
        description="Each project lists the skills you will learn, what you need and how long it takes."
        action={
          <Button asChild variant="outline">
            <Link href="/projects">
              All projects <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="card-lift group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card"
          >
            <div
              className="relative flex h-32 items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
              }}
            >
              <span className="absolute inset-0 bg-grid opacity-20" aria-hidden />
              <span className="text-4xl drop-shadow-md" aria-hidden>
                {project.emoji}
              </span>
              <Badge className="absolute left-3 top-3 border-0 bg-white/85 text-slate-900">
                {project.category}
              </Badge>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-[15px] font-bold leading-snug group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                {project.blurb}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <DifficultyBadge difficulty={project.difficulty} />
                <span className="font-semibold text-muted-foreground">{project.minutes} min</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Weekly challenge ----------------------------- */

export function WeeklyChallengeSection() {
  const challenge = activeChallenge;
  const subject = subjects.find((item) => item.id === challenge.subjectId);
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div
            className="relative overflow-hidden rounded-3xl border border-border/70 p-6 text-white sm:p-8"
            style={{
              background: `linear-gradient(135deg, ${challenge.gradient[0]}, ${challenge.gradient[1]})`,
            }}
          >
            <span className="absolute inset-0 bg-grid opacity-15" aria-hidden />
            <span className="absolute -right-16 -top-16 size-56 rounded-full bg-white/15 blur-3xl" aria-hidden />

            <div className="relative">
              <Badge className="border-0 bg-white/20 text-white backdrop-blur">
                <Flame className="size-3.5" /> {challenge.type} challenge
              </Badge>
              <h2 className="mt-4 max-w-md text-2xl font-black tracking-tight sm:text-3xl">
                {challenge.title}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85">
                {challenge.blurb}
              </p>

              <dl className="mt-6 grid max-w-md grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                  <dt className="font-semibold text-white/70">Difficulty</dt>
                  <dd className="mt-0.5 text-sm font-bold">
                    {"⭐".repeat(challenge.difficulty)}
                  </dd>
                </div>
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                  <dt className="font-semibold text-white/70">Reward</dt>
                  <dd className="mt-0.5 text-sm font-bold">{challenge.xp} XP</dd>
                </div>
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
                  <dt className="font-semibold text-white/70">Entries</dt>
                  <dd className="mt-0.5 text-sm font-bold">
                    {formatNumber(challenge.participants)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
                  <Link href={`/challenges/${challenge.id}`}>
                    <Target className="size-4" /> Join the challenge
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  <Link href="/challenges">See all challenges</Link>
                </Button>
              </div>
              <p className="relative mt-4 text-[11px] text-white/75">
                Deadline: {challenge.deadline}
                {subject ? ` · ${subject.emoji} ${subject.name}` : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-border/70 bg-card p-5">
              <h3 className="flex items-center gap-2 text-base font-bold">
                <Award className="size-4 text-primary" /> Requirements
              </h3>
              <ul className="mt-3 space-y-2">
                {challenge.requirements.slice(0, 4).map((requirement) => (
                  <li key={requirement} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-5">
              <h3 className="flex items-center gap-2 text-base font-bold">
                <Sparkles className="size-4 text-primary" /> Hints from the mentors
              </h3>
              <ul className="mt-3 space-y-2">
                {challenge.hints.slice(0, 3).map((hint) => (
                  <li
                    key={hint}
                    className="rounded-xl bg-muted/50 p-2.5 text-xs leading-relaxed text-muted-foreground"
                  >
                    💡 {hint}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- How it works ------------------------------- */

const steps = [
  {
    emoji: "🧭",
    title: "Pick a subject",
    body: "Ten categories, each with clear units. Start with a subject you already love — or one you have never tried.",
  },
  {
    emoji: "🧩",
    title: "Learn by doing",
    body: "Short lessons with real code, simulators and visual explanations. No walls of text, no passive videos.",
  },
  {
    emoji: "🛠️",
    title: "Build a project",
    body: "Apply what you learned in a guided build: a dice, a robot, an app screen or a full website.",
  },
  {
    emoji: "🏆",
    title: "Earn and level up",
    body: "XP, badges and streaks track your progress so you can see yourself improving week by week.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        align="center"
        eyebrow="How EduTech works"
        title="Four steps from curious to capable"
        description="Learning designed around making things — with enough structure that nobody gets lost."
      />

      <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="card-lift relative rounded-3xl border border-border/70 bg-card p-5"
          >
            <span className="absolute right-4 top-4 text-3xl font-black text-muted/60">
              {index + 1}
            </span>
            <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-xl">
              {step.emoji}
            </span>
            <h3 className="mt-4 text-base font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------- Gamification showcase ------------------------- */

export function GamificationShowcase() {
  const preview = [progressRow("Micro:bit — Button input", "robotics", 65), progressRow("Python — Loops", "coding", 40), progressRow("Figma — Auto layout", "design", 20)];

  return (
    <section className="bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--primary)_5%,transparent))] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Progress & rewards"
          title="Everyone starts at Level 1. Where you finish is up to you."
          description="Earn XP for every lesson and quiz, unlock badges for the things you build, and keep your streak alive."
          action={
            <Button asChild variant="outline">
              <Link href="/dashboard">
                Open dashboard <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-border/70 bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Continue learning
                </p>
                <p className="mt-1 text-lg font-black">Pick up where you left off</p>
              </div>
              <Flame className="size-5 text-[#f97316]" />
            </div>

            <ul className="mt-4 space-y-3">
              {preview.map((row) => (
                <li key={row.title}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">
                      {row.emoji} {row.title}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{row.progress}%</span>
                  </div>
                  <Progress
                    value={row.progress}
                    className="mt-1.5 h-2"
                    indicatorClassName="bg-[linear-gradient(90deg,var(--brand-indigo),var(--brand-cyan))]"
                  />
                </li>
              ))}
            </ul>

            <Button asChild variant="gradient" className="mt-5 w-full">
              <Link href="/dashboard">Continue Learning</Link>
            </Button>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Example badges
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {badges.slice(0, 6).map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/30 p-3"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-base">
                    {badge.emoji}
                  </span>
                  <div>
                    <p className="text-xs font-bold">{badge.name}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      {badge.requirement}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {levels.map((level) => (
                <div
                  key={level.level}
                  className="rounded-xl bg-muted/50 p-2 text-center"
                  title={`${level.name} — ${level.minXp} XP`}
                >
                  <p className="text-base" aria-hidden>
                    {level.emoji}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold">L{level.level}</p>
                  <p className="truncate text-[9px] text-muted-foreground">{level.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function progressRow(title: string, subjectId: string, progress: number) {
  const subject = subjects.find((item) => item.id === subjectId);
  return { title, progress, emoji: subject?.emoji ?? "📘" };
}

/* --------------------------------- Footer CTA ----------------------------- */

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(120deg,color-mix(in_oklab,var(--brand-indigo)_14%,var(--card)),color-mix(in_oklab,var(--brand-cyan)_12%,var(--card)))] p-8 text-center sm:p-14">
        <span className="absolute inset-0 bg-dots opacity-40" aria-hidden />
        <div className="relative">
          <span className="grid mx-auto size-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-2xl text-white shadow-xl">
            🚀
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            Ready to build something?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Join {formatNumber(148000)} students learning robotics, code, design and science on
            EduTech. No setup, no installs — just open a lesson and start making.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="xl" variant="gradient">
              <Link href="/learn">
                Start Learning free <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/playground">Try the playground</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Always free for students · Works on tablets and phones
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Subject rail ----------------------------- */

export function SubjectLessonRail({ subjectId }: { subjectId: string }) {
  const lessons = lessonsBySubject(subjectId as never).slice(0, 4);
  return (
    <ul className="grid gap-2">
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          <Link
            href={`/lessons/${lesson.id}`}
            className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-sm transition hover:border-primary/40"
          >
            <span className="font-semibold">{lesson.title}</span>
            <span className="text-xs text-muted-foreground">{lesson.minutes} min</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
