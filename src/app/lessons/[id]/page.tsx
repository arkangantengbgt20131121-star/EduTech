import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LessonView } from "@/components/lessons/lesson-view";
import { EmptyState } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { getLesson, nextLessonInSubject, previousLessonInSubject, publishedLessons } from "@/data";

export function generateStaticParams() {
  return publishedLessons.map((lesson) => ({ id: lesson.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) return { title: "Lesson not found" };
  return {
    title: lesson.title,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();

  if (lesson.comingSoon) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          emoji="🚧"
          title="This lesson is being written"
          description={`"${lesson.title}" is part of the ${lesson.subjectId} roadmap. Our teachers are still recording the examples and quiz — meanwhile, the published lessons in this subject are ready to go.`}
          action="Back to learning"
          actionHref="/learn"
        />
        <div className="mt-6 text-center">
          <Button asChild variant="ghost">
            <Link href={`/subjects/${lesson.subjectId}`}>See the full {lesson.subjectId} roadmap</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <LessonView
      lesson={lesson}
      nextLesson={nextLessonInSubject(lesson)}
      previousLesson={previousLessonInSubject(lesson)}
    />
  );
}
