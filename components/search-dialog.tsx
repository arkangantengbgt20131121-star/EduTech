"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, Code2, FolderKanban, GraduationCap, Search, X, Zap } from "lucide-react";
import { lessons } from "@/lib/lessons";
import { projects } from "@/lib/projects";
import { subjects } from "@/lib/subjects";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) setQuery("");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return null;
    const matchedLessons = lessons
      .filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 5);
    const matchedProjects = projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 3);
    const matchedSubjects = subjects
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.topics.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 3);
    return { matchedLessons, matchedProjects, matchedSubjects };
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[10vh]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-fade-up">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search size={19} className="shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, projects, subjects…"
            className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-muted-foreground"
          />
          <button onClick={() => onOpenChange(false)} className="rounded-lg p-1 hover:bg-accent" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-3">
          {!results ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              <p className="font-semibold">Type at least 2 characters to search</p>
              <p className="mt-1">Try “python”, “micro:bit”, “fractions” or “figma”…</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Python", "Micro:bit", "Figma", "Algebra", "Volcano"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-border px-3 py-1 text-xs font-bold hover:border-indigo-500 hover:text-indigo-500"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.matchedLessons.length + results.matchedProjects.length + results.matchedSubjects.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for “{query}”. Try another keyword!
            </p>
          ) : (
            <div className="space-y-1">
              {results.matchedSubjects.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.id}
                    href={`/learn/${s.id}`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-accent"
                  >
                    <span className={`rounded-lg bg-gradient-to-br p-2 text-white ${s.gradient}`}>
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        <GraduationCap size={14} className="text-muted-foreground" /> {s.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{s.tagline}</span>
                    </span>
                  </Link>
                );
              })}
              {results.matchedLessons.map((l) => (
                <Link
                  key={l.id}
                  href={`/lessons/${l.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-accent"
                >
                  <span className="rounded-lg bg-indigo-500/10 p-2 text-indigo-500">
                    <BookOpen size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{l.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{l.description}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-black text-amber-500">
                    <Zap size={12} className="fill-amber-500" /> {l.xp}
                  </span>
                </Link>
              ))}
              {results.matchedProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-accent"
                >
                  <span className="rounded-lg bg-violet-500/10 p-2 text-violet-500">
                    {p.category.includes("Python") || p.category.includes("JavaScript") || p.category.includes("HTML") ? (
                      <Code2 size={17} />
                    ) : (
                      <FolderKanban size={17} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{p.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {p.category} · {p.difficulty}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-black text-amber-500">
                    <Zap size={12} className="fill-amber-500" /> {p.xp}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
