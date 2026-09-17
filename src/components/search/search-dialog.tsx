"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Command, Search, Sparkles } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { groupSearchResults, searchCatalog, type SearchResult } from "@/data";

const suggestions = [
  "Python loops",
  "Micro:bit sensors",
  "World War II",
  "Fractions",
  "Figma components",
];

const groupOrder: SearchResult["group"][] = ["Lessons", "Projects", "Challenges", "Subjects"];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  const results = React.useMemo(() => searchCatalog(query, 16), [query]);
  const groups = React.useMemo(() => groupSearchResults(results), [results]);
  const flat = React.useMemo(
    () => groupOrder.flatMap((group) => groups[group]),
    [groups],
  );

  const go = React.useCallback(
    (result?: SearchResult) => {
      const target = result ?? flat[activeIndex];
      if (!target) return;
      onOpenChange(false);
      setQuery("");
      router.push(target.href);
    },
    [activeIndex, flat, onOpenChange, router],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, flat.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go();
    }
  };

  let runningIndex = -1;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setActiveIndex(0);
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-2xl gap-0 p-0" showClose={false}>
        <DialogTitle className="sr-only">Search EduTech</DialogTitle>
        <DialogDescription className="sr-only">
          Search lessons, projects, challenges and subjects.
        </DialogDescription>

        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search lessons, projects, challenges…"
            aria-label="Search EduTech"
            className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-[26rem] overflow-y-auto p-2">
          {query.trim().length === 0 ? (
            <div className="p-2">
              <p className="flex items-center gap-1.5 px-1.5 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Sparkles className="size-3.5" /> Popular searches
              </p>
              <div className="flex flex-wrap gap-1.5 px-1.5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-muted/50 p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Search across <strong className="text-foreground">every lesson, project, challenge and subject</strong>{" "}
                  in EduTech. Tip: use <kbd className="rounded bg-card px-1">↑</kbd>{" "}
                  <kbd className="rounded bg-card px-1">↓</kbd> to move and{" "}
                  <kbd className="rounded bg-card px-1">Enter</kbd> to open.
                </p>
              </div>
            </div>
          ) : flat.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-3xl">🔍</p>
              <p className="mt-2 text-sm font-bold">No results for “{query}”</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a shorter phrase, or search for a subject like “Robotics” or “Fractions”.
              </p>
            </div>
          ) : (
            groupOrder.map((group) => {
              const items = groups[group];
              if (!items.length) return null;
              return (
                <div key={group} className="mb-2">
                  <p className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {group} · {items.length}
                  </p>
                  <ul>
                    {items.map((result) => {
                      runningIndex += 1;
                      const index = runningIndex;
                      return (
                        <li key={`${group}-${result.id}`}>
                          <button
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => go(result)}
                            className={cn(
                              "flex w-full items-start gap-3 rounded-xl px-2.5 py-2 text-left transition",
                              index === activeIndex ? "bg-muted" : "hover:bg-muted/60",
                            )}
                          >
                            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-card text-base ring-1 ring-border/70">
                              {result.emoji}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold">
                                {result.title}
                              </span>
                              <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">
                                {result.description}
                              </span>
                              <span className="mt-1 block text-[11px] text-muted-foreground/80">
                                {result.meta}
                              </span>
                            </span>
                            <ArrowRight
                              className={cn(
                                "mt-1 size-4 shrink-0 text-muted-foreground transition-opacity",
                                index === activeIndex ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Command className="size-3" /> EduTech search
          </span>
          <span>{flat.length > 0 ? `${flat.length} results` : "Type to search"}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
