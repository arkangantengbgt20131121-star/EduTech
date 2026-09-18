"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Search, SlidersHorizontal } from "lucide-react";
import { subjects } from "@/lib/subjects";
import { lessons } from "@/lib/lessons";
import type { LessonLevel } from "@/lib/types";
import { useEduTech } from "@/lib/store";
import { SectionHeading } from "@/components/ui";
import { LessonCard } from "@/components/cards";
import { cn } from "@/lib/utils";

const levels: ("All" | LessonLevel)[] = ["All", "Beginner", "Intermediate", "Advanced"];

export default function LessonsPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [hideDone, setHideDone] = useState(false);
  const { isLessonDone, completedLessons } = useEduTech();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return lessons.filter((l) => {
      if (subject !== "All" && l.subjectId !== subject) return false;
      if (level !== "All" && l.level !== level) return false;
      if (hideDone && isLessonDone(l.id)) return false;
      if (!q) return true;
      return (
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, subject, level, hideDone, isLessonDone]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow={`${completedLessons.length}/${lessons.length} completed`}
        title="Browse all lessons"
        description="Every lesson has explanations, examples, a hands-on activity and a quiz. Filter by subject or level to find your next win."
      />

      {/* Search + filters */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-input bg-background px-4 py-2.5">
            <Search size={18} className="shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons, e.g. python, volcano, figma…"
              className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-xl bg-muted p-1">
              {levels.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-[13px] font-bold transition",
                    level === l ? "bg-background shadow" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              onClick={() => setHideDone((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[13px] font-bold transition",
                hideDone ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600" : "border-input text-muted-foreground hover:text-foreground"
              )}
              title="Hide completed"
            >
              <CheckCircle2 size={15} /> <span className="hidden sm:inline">Hide done</span>
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <SlidersHorizontal size={16} className="shrink-0 text-muted-foreground" />
          {[{ id: "All", name: "All" }, ...subjects].map((s) => (
            <button
              key={s.id}
              onClick={() => setSubject(s.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition",
                subject === s.id
                  ? "border-indigo-500 bg-indigo-500 text-white"
                  : "border-input hover:border-indigo-400 hover:text-indigo-500"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm font-bold text-muted-foreground">
        Showing {filtered.length} of {lessons.length} lessons
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border p-14 text-center">
          <p className="text-4xl">🔍</p>
          <h3 className="mt-4 text-xl font-black">No lessons found</h3>
          <p className="mt-2 text-muted-foreground">Try a different keyword or clear your filters.</p>
          <button
            onClick={() => {
              setQuery("");
              setSubject("All");
              setLevel("All");
              setHideDone(false);
            }}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      )}
    </div>
  );
}
