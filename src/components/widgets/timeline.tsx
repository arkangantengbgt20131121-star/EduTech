"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  year: string;
  title: string;
  detail: string;
}

/**
 * Interactive timeline — a slider plus keyboard navigation, used by history
 * lessons and the Indonesian history project.
 */
export function Timeline({
  events,
  initialIndex = 0,
  className,
}: {
  events: TimelineEvent[];
  initialIndex?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(initialIndex);
  const event = events[index];

  const move = React.useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => Math.min(events.length - 1, Math.max(0, current + direction)));
    },
    [events.length],
  );

  React.useEffect(() => {
    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      const target = keyboardEvent.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (keyboardEvent.key === "ArrowLeft") move(-1);
      if (keyboardEvent.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  return (
    <div className={cn("rounded-3xl border border-border/70 bg-card p-4 shadow-sm sm:p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Timeline · {index + 1} of {events.length}
        </p>
        <div className="flex items-center gap-1.5">
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => move(-1)}
            disabled={index === 0}
            aria-label="Previous event"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => move(1)}
            disabled={index === events.length - 1}
            aria-label="Next event"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Rail */}
      <div className="relative mt-4">
        <div className="absolute left-0 right-0 top-3 h-0.5 bg-border" />
        <div
          className="absolute left-0 top-3 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${(index / Math.max(1, events.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {events.map((item, itemIndex) => (
            <button
              key={`${item.year}-${item.title}`}
              onClick={() => setIndex(itemIndex)}
              className="group flex flex-col items-center gap-2 pt-0.5"
              aria-label={`${item.year}: ${item.title}`}
              aria-current={itemIndex === index}
            >
              <span
                className={cn(
                  "size-3.5 rounded-full border-2 transition-all duration-300",
                  itemIndex <= index
                    ? "border-primary bg-primary"
                    : "border-border bg-card group-hover:border-primary/50",
                  itemIndex === index && "scale-125 ring-4 ring-primary/15",
                )}
              />
              <span
                className={cn(
                  "hidden text-[10px] font-bold sm:block",
                  itemIndex === index ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={events.length - 1}
        value={index}
        onChange={(event_) => setIndex(Number(event_.target.value))}
        className="mt-4 w-full accent-[var(--primary)]"
        aria-label="Timeline position"
      />

      <div key={index} className="mt-3 animate-fade-up rounded-2xl bg-muted/50 p-4">
        <p className="text-xs font-black uppercase tracking-wider text-primary">{event.year}</p>
        <p className="mt-1 text-base font-bold">{event.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.detail}</p>
      </div>
    </div>
  );
}
