"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  Clock,
  Flame,
  ListChecks,
  Rocket,
  Target,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LessonBlocks } from "@/components/lessons/lesson-blocks";
import { Quiz } from "@/components/quiz/quiz";
import { DifficultyBadge, XpChip } from "@/components/shared/primitives";
import { useProgress } from "@/components/progress/progress-provider";
import { getSubjectIcon } from "@/lib/icons";
import { cn, formatNumber } from "@/lib/utils";
import type { Lesson, Lesson as LessonType } from "@/data/types";
import { publishedLessonsBySubject } from "@/data";

export function LessonView({
  lesson,
  nextLesson,
  previousLesson,
}: {
  lesson: Lesson;
  nextLesson?: LessonType;
  previousLesson?: LessonType;
}) {
  const {
    isLessonComplete,
    markLessonComplete,
    bookmarks,
    toggleBookmark,
    setCourseProgress,
    stats,
    level,
  } = useProgress();
  const [quizResult, setQuizResult] = React.useState<{ correct: number; total: number } | null>(null);
  const completed = isLessonComplete(lesson.id);
  const bookmarked = bookmarks.includes(lesson.id);
  const subject = lesson.subjectId;

  // Reading progress: track how far down the lesson the student has scrolled.
  const [readProgress, setReadProgress] = React.useState(0);

  React.useEffect(() => {
    setCourseProgress(lesson.id, 10);
  }, [lesson.id, setCourseProgress]);

  React.useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const value = total > 0 ? Math.round((window.scrollY / total) * 100) : 0;
        setReadProgress(Math.max(0, Math.min(100, value)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const complete = () => {
    if (completed) {
      toast.info("Already completed", { description: "You can revisit this lesson any time." });
      return;
    }
    markLessonComplete(lesson.id, lesson.xp, lesson.minutes);
    toast.success(`Lesson complete! +${lesson.xp} XP`, {
      description: "Your streak and badges have been updated.",
    });
  };

  const siblings = publishedLessonsBySubject(subject);
  const index = siblings.findIndex((item) => item.id === lesson.id);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6">
      {/* Sticky reading progress */}
      <div className="fixed left-0 right-0 top-16 z-30 h-1 bg-transparent">
        <div
          className="h-full bg-[linear-gradient(90deg,var(--brand-indigo),var(--brand-cyan))] transition-[width] duration-150"
          style={{ width: `${readProgress}%` }}
          aria-hidden
        />
      </div>

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/learn" className="transition hover:text-foreground">
          Learn
        </Link>
        <span>/</span>
        <Link href={`/subjects/${lesson.subjectId}`} className="transition hover:text-foreground">
          {lesson.subjectId.charAt(0).toUpperCase() + lesson.subjectId.slice(1)}
        </Link>
        <span>/</span>
        <span className="truncate text-foreground">{lesson.title}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article>
          {/* Header */}
          <header className="rounded-3xl border border-border/70 bg-card p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={lesson.difficulty} />
              <Badge variant="outline">
                <Clock className="size-3.5" /> {lesson.minutes} minutes
              </Badge>
              <XpChip xp={lesson.xp} />
              {completed ? (
                <Badge variant="success">
                  <CheckCircle2 className="size-3.5" /> Completed
                </Badge>
              ) : null}
            </div>

            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              {lesson.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {lesson.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>✍️ {lesson.author}</span>
              <span>•</span>
              <span>Updated {lesson.updatedAt}</span>
              <button
                onClick={() => {
                  toggleBookmark(lesson.id);
                  toast.success(bookmarked ? "Removed from bookmarks" : "Saved to bookmarks");
                }}
                className="ml-auto flex items-center gap-1.5 rounded-lg border border-border/70 px-2.5 py-1.5 font-semibold transition hover:border-primary/40 hover:text-foreground"
              >
                {bookmarked ? (
                  <>
                    <BookmarkCheck className="size-3.5 text-primary" /> Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="size-3.5" /> Save for later
                  </>
                )}
              </button>
            </div>

            {/* Objectives */}
            <div className="mt-6 rounded-2xl bg-muted/45 p-4">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Target className="size-4 text-primary" /> Learning objectives
              </p>
              <ul className="mt-2.5 space-y-2">
                {lesson.objectives.map((objective) => (
                  <li key={objective} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary/15 text-[9px] font-black text-primary">
                      ✓
                    </span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            {lesson.materials?.length ? (
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  What you need
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {lesson.materials.map((material) => (
                    <li key={material}>
                      <Badge variant="secondary">{material}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </header>

          {/* Body */}
          <div className="mt-8">
            <LessonBlocks blocks={lesson.blocks} />
          </div>

          {/* Quiz */}
          {lesson.quiz.length > 0 ? (
            <div className="mt-10 scroll-mt-24" id="quiz-anchor">
              <Quiz
                lessonId={lesson.id}
                questions={lesson.quiz}
                onComplete={(correct, total) => {
                  setQuizResult({ correct, total });
                  setCourseProgress(lesson.id, 100);
                }}
              />
            </div>
          ) : null}

          {/* Complete + next */}
          <section className="mt-8 rounded-3xl border border-border/70 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--card)_92%,var(--brand-indigo)_8%),var(--card))] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-black tracking-tight">
                  {completed ? "Lesson complete 🎉" : "Finished this lesson?"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {completed
                    ? "Nice work. Move on to the next lesson whenever you are ready."
                    : `Mark it complete to bank ${lesson.xp} XP and keep your streak alive.`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={complete}
                  variant={completed ? "secondary" : "gradient"}
                  size="lg"
                  className="gap-2"
                  disabled={completed}
                >
                  <Check className="size-4" />
                  {completed ? "Completed" : "Mark as Complete"}
                </Button>
                {nextLesson ? (
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link href={`/lessons/${nextLesson.id}`}>
                      Next Lesson <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Flame className="size-3.5 text-[#f97316]" /> {stats.streak}-day streak
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="size-3.5 text-primary" /> Level {level.level} · {level.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Rocket className="size-3.5 text-primary" /> {formatNumber(stats.xp)} XP total
              </span>
              {quizResult ? (
                <span className="flex items-center gap-1.5">
                  <ListChecks className="size-3.5" /> Quiz: {quizResult.correct}/{quizResult.total}
                </span>
              ) : null}
            </div>
          </section>

          {/* Prev / next */}
          <nav className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {previousLesson ? (
              <Button asChild variant="ghost" className="justify-start gap-2">
                <Link href={`/lessons/${previousLesson.id}`}>
                  <ArrowLeft className="size-4" />
                  <span className="truncate">{previousLesson.title}</span>
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <Button asChild variant="ghost" className="justify-end gap-2">
                <Link href={`/lessons/${nextLesson.id}`}>
                  <span className="truncate">{nextLesson.title}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
          </nav>
        </article>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border/70 bg-card p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Your progress
            </p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-semibold">Reading</span>
              <span className="tabular-nums text-muted-foreground">{readProgress}%</span>
            </div>
            <Progress value={readProgress} className="mt-1.5 h-2" />

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold">Course</span>
              <span className="tabular-nums text-muted-foreground">
                {index + 1}/{siblings.length}
              </span>
            </div>
            <Progress value={Math.round(((index + 1) / Math.max(1, siblings.length)) * 100)} className="mt-1.5 h-2" />

            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-xl bg-muted/50 p-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  XP
                </p>
                <p className="text-sm font-black">{lesson.xp}</p>
              </div>
              <div className="rounded-xl bg-muted/50 p-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Minutes
                </p>
                <p className="text-sm font-black">{lesson.minutes}</p>
              </div>
            </div>

            <Button
              onClick={complete}
              disabled={completed}
              variant={completed ? "secondary" : "gradient"}
              className="mt-4 w-full gap-2"
            >
              <Check className="size-4" />
              {completed ? "Completed" : "Mark as Complete"}
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full gap-2">
              <Link href="#quiz-anchor">
                <ListChecks className="size-4" /> Jump to quiz
              </Link>
            </Button>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              In this subject
            </p>
            <ul className="mt-3 space-y-1.5">
              {siblings.map((item, itemIndex) => {
                const isCurrent = item.id === lesson.id;
                const done = isLessonComplete(item.id);
                return (
                  <li key={item.id}>
                    <Link
                      href={`/lessons/${item.id}`}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition",
                        isCurrent ? "bg-primary/10 font-bold text-primary" : "hover:bg-muted",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                          done
                            ? "bg-success text-success-foreground"
                            : isCurrent
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {done ? "✓" : itemIndex + 1}
                      </span>
                      <span className="line-clamp-2">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-3xl border border-border/70 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--brand-indigo)_12%,var(--card)),var(--card))] p-4">
            <p className="text-sm font-bold">Want to go further?</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Turn this topic into a project you can share with the community gallery.
            </p>
            <Button asChild size="sm" variant="outline" className="mt-3 w-full">
              <Link href="/projects">Browse projects</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function lessonAccent(subjectId: string) {
  const Icon = getSubjectIcon(subjectId);
  return Icon;
}
