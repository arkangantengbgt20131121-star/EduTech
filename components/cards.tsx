"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Trophy, Users, Zap } from "lucide-react";
import type { Challenge, Lesson, Project, Subject } from "@/lib/types";
import { getSubject } from "@/lib/subjects";
import { useEduTech } from "@/lib/store";
import { Badge, Card, LevelDots, Progress } from "./ui";
import { cn } from "@/lib/utils";

// ─── Subject card ────────────────────────────────────────────────
export function SubjectCard({
  subject,
  lessonCount,
}: {
  subject: Subject;
  lessonCount: number;
}) {
  const { completedLessons } = useEduTech();
  const Icon = subject.icon;
  return (
    <Link
      href={`/learn/${subject.id}`}
      className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className={cn("flex items-center justify-center rounded-2xl bg-gradient-to-br p-3.5 text-white shadow-lg", subject.gradient)} style={{ width: 52, height: 52 }}>
        <Icon size={24} />
      </div>
      <h3 className="mt-5 text-lg font-black tracking-tight transition group-hover:text-indigo-500">
        {subject.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {subject.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-[13px] font-semibold">
        <span className="text-muted-foreground">
          {lessonCount} lessons · {completedLessons.filter((id) => id.startsWith(subject.id[0])).length > 0 ? "In progress" : "Start now"}
        </span>
        <span className="flex items-center gap-1 text-indigo-500">
          Explore <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

// ─── Lesson card ─────────────────────────────────────────────────
export function LessonCard({ lesson, showSubject = true }: { lesson: Lesson; showSubject?: boolean }) {
  const subject = getSubject(lesson.subjectId);
  const { isLessonDone } = useEduTech();
  const done = isLessonDone(lesson.id);
  const Icon = subject?.icon;
  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className="flex items-center justify-between">
        {showSubject && subject ? (
          <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider", subject.softBg, subject.iconColor)}>
            {subject.name}
          </span>
        ) : (
          <LevelDots level={lesson.level} />
        )}
        {done ? (
          <span className="flex items-center gap-1 text-[13px] font-bold text-emerald-500">
            <CheckCircle2 size={15} /> Done
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[13px] font-bold text-amber-500">
            <Zap size={14} className="fill-amber-500" /> {lesson.xp} XP
          </span>
        )}
      </div>

      <h3 className="mt-4 text-[17px] font-black leading-snug tracking-tight transition group-hover:text-indigo-500">
        {lesson.title}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {lesson.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-[13px] font-semibold text-muted-foreground">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {lesson.durationMin} min
          </span>
          {(!showSubject || true) && <LevelDots level={lesson.level} />}
        </span>
        {Icon && subject && (
          <span className={cn("rounded-lg p-2", subject.softBg, subject.iconColor)}>
            <Icon size={17} />
          </span>
        )}
      </div>
    </Link>
  );
}

// ─── Project card ────────────────────────────────────────────────
export function ProjectCard({ project }: { project: Project }) {
  const subject = getSubject(project.subjectId);
  const { isProjectDone } = useEduTech();
  const done = isProjectDone(project.id);
  const Icon = subject?.icon;
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className={cn("relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br", subject?.gradient ?? "from-indigo-500 to-violet-600")}>
        <div className="absolute inset-0 bg-grid opacity-40" />
        {Icon && <Icon size={52} className="relative text-white drop-shadow-lg transition group-hover:scale-110" />}
        {done && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-black text-emerald-600">
            <CheckCircle2 size={13} /> BUILT
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Badge>{project.category}</Badge>
        <span className="text-xs font-semibold text-muted-foreground">{project.difficulty}</span>
      </div>
      <h3 className="mt-2.5 text-lg font-black tracking-tight transition group-hover:text-indigo-500">
        {project.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-[13px] font-bold">
        <span className="flex items-center gap-1 text-amber-500">
          <Zap size={14} className="fill-amber-500" /> {project.xp} XP · {project.duration}
        </span>
        <span className="flex items-center gap-1 text-indigo-500">
          Start <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

// ─── Challenge card ──────────────────────────────────────────────
export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { isChallengeDone } = useEduTech();
  const done = isChallengeDone(challenge.id);
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
            challenge.kind === "weekly" && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            challenge.kind === "streak" && "bg-orange-500/10 text-orange-600 dark:text-orange-400",
            challenge.kind === "community" && "bg-sky-500/10 text-sky-600 dark:text-sky-400"
          )}
        >
          {challenge.kind} · {challenge.endsIn}
        </span>
        <Trophy size={18} className="text-amber-500" />
      </div>
      <h3 className="mt-4 text-lg font-black tracking-tight">{challenge.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {challenge.description}
      </p>
      <div className="mt-4">
        <Progress value={done ? 100 : Math.min(90, (challenge.participants % 90) + 8)} barClassName="from-amber-500 to-orange-500" />
        <div className="mt-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users size={13} /> {challenge.participants.toLocaleString()} joined
          </span>
          <span className="flex items-center gap-1 font-black text-amber-500">
            <Zap size={13} className="fill-amber-500" /> {challenge.xp} XP
          </span>
        </div>
      </div>
    </div>
  );
}
