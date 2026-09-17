"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/components/progress/progress-provider";
import { getSubject } from "@/data/subjects";
import type { CourseProgress, Lesson } from "@/data/types";

/**
 * Shows the three courses the student is part-way through. Progress is stored
 * in the progress provider (localStorage in the demo, a database later).
 */
export function ContinueLearning({
  items,
}: {
  items: { course: CourseProgress; lesson: Lesson | undefined }[];
}) {
  const { lessonProgress } = useProgress();

  if (items.length === 0) {
    return (
      <div className="mt-4 rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center">
        <p className="text-3xl">🎯</p>
        <p className="mt-2 text-sm font-bold">No courses started yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Pick any subject below and your progress will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-3">
      {items.map(({ course, lesson }) => {
        if (!lesson) return null;
        const subject = getSubject(lesson.subjectId);
        const liveProgress = Math.max(course.progress, lessonProgress(lesson.id));
        return (
          <div
            key={course.lessonId}
            className="card-lift flex flex-col rounded-3xl border border-border/70 bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl" aria-hidden>
                {subject?.emoji}
              </span>
              <Badge variant="outline">{course.lastOpened}</Badge>
            </div>
            <h3 className="mt-3 text-[15px] font-bold leading-snug">{lesson.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {subject?.name} · {lesson.minutes} min left
            </p>

            <div className="mt-3 flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Progress</span>
              <span className="tabular-nums">{liveProgress}%</span>
            </div>
            <Progress
              value={liveProgress}
              className="mt-1.5 h-2"
              indicatorClassName="bg-[linear-gradient(90deg,var(--brand-indigo),var(--brand-cyan))]"
            />

            <Button asChild variant="ghost" size="sm" className="mt-4 justify-between">
              <Link href={`/lessons/${lesson.id}`}>
                <span className="flex items-center gap-1.5">
                  <PlayCircle className="size-4 text-primary" /> Continue
                </span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
