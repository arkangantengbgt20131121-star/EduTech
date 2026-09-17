import Link from "next/link";
import { ArrowLeft, Compass, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { publishedLessons, subjects } from "@/data";

const suggestions = [
  { emoji: "📚", label: "Learning library", href: "/learn", hint: "Every lesson, filterable" },
  { emoji: "🧭", label: "Subjects", href: "/subjects", hint: "All 10 subjects and their units" },
  { emoji: "🚀", label: "Projects", href: "/projects", hint: "Guided builds with skills" },
  { emoji: "🏆", label: "Challenges", href: "/challenges", hint: "This week's brief and rewards" },
];

export default function NotFound() {
  const featured = publishedLessons.slice(0, 3);
  const subjectStrip = subjects.slice(0, 8);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="text-6xl" aria-hidden>
        🧭
      </span>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-primary">
        404 — page not found
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
        This path leads off the map
      </h1>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
        The page you were looking for has moved, been renamed, or never existed. Nothing is lost —
        your XP and streak are safe. Let’s get you back to learning.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <Button asChild variant="gradient" className="gap-2">
          <Link href="/learn">
            <Compass className="size-4" /> Browse lessons
          </Link>
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/search">
            <Search className="size-4" /> Search EduTech
          </Link>
        </Button>
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/">
            <ArrowLeft className="size-4" /> Back home
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid w-full gap-3 sm:grid-cols-2">
        {suggestions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card-lift flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 text-left"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-lg">
              {item.emoji}
            </span>
            <span>
              <span className="block text-sm font-bold">{item.label}</span>
              <span className="block text-[11px] text-muted-foreground">{item.hint}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 w-full rounded-3xl border border-border/70 bg-card p-5 text-left">
        <p className="text-sm font-bold">Popular right now</p>
        <ul className="mt-3 space-y-2">
          {featured.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${lesson.id}`}
                className="flex items-center justify-between gap-3 rounded-xl px-2 py-1.5 text-sm transition hover:bg-muted"
              >
                <span className="font-semibold">{lesson.title}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {lesson.minutes} min · {lesson.xp} XP
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {subjectStrip.map((subject) => (
            <Link
              key={subject.id}
              href={`/subjects/${subject.id}`}
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              {subject.emoji} {subject.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
