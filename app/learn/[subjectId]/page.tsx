"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Play, Wrench, Zap } from "lucide-react";
import { getSubject } from "@/lib/subjects";
import { getLessonsBySubject } from "@/lib/lessons";
import { getProjectsBySubject } from "@/lib/projects";
import { useEduTech } from "@/lib/store";
import { Badge, Button, LevelDots, Progress } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
import { cn } from "@/lib/utils";

export default function SubjectPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;
  const subject = getSubject(subjectId);
  const { isLessonDone, completedLessons } = useEduTech();

  if (!subject) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-black">Subject not found 😢</h1>
        <p className="mt-3 text-muted-foreground">This subject doesn&apos;t exist (yet!).</p>
        <Link href="/learn">
          <Button className="mt-6" variant="primary">
            <ArrowLeft size={16} /> Back to subjects
          </Button>
        </Link>
      </div>
    );
  }

  const Icon = subject.icon;
  const subjectLessons = getLessonsBySubject(subject.id);
  const subjectProjects = getProjectsBySubject(subject.id);
  const done = subjectLessons.filter((l) => completedLessons.includes(l.id)).length;
  const pct = subjectLessons.length ? Math.round((done / subjectLessons.length) * 100) : 0;
  const totalXp = subjectLessons.reduce((s, l) => s + l.xp, 0);
  const totalMin = subjectLessons.reduce((s, l) => s + l.durationMin, 0);
  const nextLesson = subjectLessons.find((l) => !isLessonDone(l.id)) ?? subjectLessons[0];

  return (
    <div>
      {/* Header */}
      <div className={cn("relative overflow-hidden bg-gradient-to-br", subject.gradient)}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/80 hover:text-white">
            <ArrowLeft size={16} /> All subjects
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-white backdrop-blur">
              <Icon size={40} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{subject.name}</h1>
              <p className="mt-1.5 font-semibold text-white/85">{subject.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl leading-relaxed text-white/90">{subject.longDescription}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-white">
            <span className="rounded-full bg-black/25 px-4 py-1.5">{subjectLessons.length} lessons</span>
            <span className="rounded-full bg-black/25 px-4 py-1.5">⏱️ {totalMin} min</span>
            <span className="rounded-full bg-black/25 px-4 py-1.5">⚡ {totalXp} XP total</span>
            <span className="rounded-full bg-black/25 px-4 py-1.5">
              {done}/{subjectLessons.length} completed
            </span>
          </div>
          <div className="mt-5 max-w-xl">
            <Progress value={pct} className="h-2.5 bg-black/25" barClassName="bg-white" />
          </div>
          {nextLesson && (
            <Link href={`/lessons/${nextLesson.id}`}>
              <Button size="lg" className="mt-6 bg-white text-slate-950 hover:bg-white/90">
                <Play size={18} /> {done === 0 ? "Start first lesson" : "Continue learning"}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Lessons path */}
          <div>
            <h2 className="text-2xl font-black tracking-tight">Learning path</h2>
            <p className="mt-1.5 text-muted-foreground">
              Follow the path in order — each lesson builds on the last.
            </p>
            <div className="mt-6 space-y-3">
              {subjectLessons.map((l, i) => {
                const finished = isLessonDone(l.id);
                return (
                  <Link
                    key={l.id}
                    href={`/lessons/${l.id}`}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl border-2 p-4 transition-all hover:-translate-y-0.5 sm:p-5",
                      finished
                        ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                        : "border-border bg-card hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-black",
                        finished ? "bg-emerald-500 text-white" : cn("bg-gradient-to-br text-white", subject.gradient)
                      )}
                    >
                      {finished ? <CheckCircle2 size={20} /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-black transition group-hover:text-indigo-500 sm:text-base">
                        {l.title}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {l.durationMin} min
                        </span>
                        <span className="flex items-center gap-1 text-amber-500">
                          <Zap size={13} className="fill-amber-500" /> {l.xp} XP
                        </span>
                        <LevelDots level={l.level} />
                      </span>
                    </span>
                    <ArrowRight size={19} className="shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-indigo-500" />
                  </Link>
                );
              })}
            </div>

            {/* Projects */}
            {subjectProjects.length > 0 && (
              <div className="mt-12">
                <h2 className="flex items-center gap-2 text-2xl font-black tracking-tight">
                  <Wrench size={22} className="text-indigo-500" /> {subject.name} projects
                </h2>
                <p className="mt-1.5 text-muted-foreground">Apply your skills by building something real.</p>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {subjectProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-black">Topics covered</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {subject.topics.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <h3 className="mt-6 font-black">Skills you&apos;ll gain</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {subject.skills.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn("rounded-2xl bg-gradient-to-br p-6 text-white", subject.gradient)}>
              <h3 className="font-black">Keep your streak alive 🔥</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                One lesson a day keeps the forgetting away. You&apos;re {done} of{" "}
                {subjectLessons.length} through {subject.name}!
              </p>
              {nextLesson && (
                <Link href={`/lessons/${nextLesson.id}`}>
                  <Button className="mt-4 w-full bg-white text-slate-950 hover:bg-white/90">
                    Continue <ArrowRight size={16} />
                  </Button>
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
