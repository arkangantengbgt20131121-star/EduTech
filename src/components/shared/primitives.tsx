"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/data/types";

/* ------------------------------ Section head ------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* -------------------------------- Difficulty ------------------------------- */

const difficultyStyles: Record<Difficulty, string> = {
  Beginner:
    "bg-[color-mix(in_oklab,var(--success)_16%,transparent)] text-[color-mix(in_oklab,var(--success)_78%,var(--foreground))]",
  Intermediate:
    "bg-[color-mix(in_oklab,var(--warning)_20%,transparent)] text-[color-mix(in_oklab,var(--warning)_68%,var(--foreground))]",
  Advanced: "bg-destructive/12 text-destructive",
};

export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold",
        difficultyStyles[difficulty],
        className,
      )}
    >
      {difficulty}
    </span>
  );
}

/* --------------------------------- XP chip -------------------------------- */

export function XpChip({ xp, className }: { xp: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary/12 px-2.5 py-0.5 text-xs font-bold text-primary",
        className,
      )}
    >
      ⚡ {xp} XP
    </span>
  );
}

/* ------------------------------ Progress line ----------------------------- */

export function ProgressLine({
  value,
  label,
  color = "var(--primary)",
  className,
}: {
  value: number;
  label?: string;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
          <span className="text-muted-foreground">{label}</span>
          <span className="tabular-nums">{value}%</span>
        </div>
      ) : null}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, value))}%`,
            background: `linear-gradient(90deg, ${color}, color-mix(in oklab, ${color} 55%, white))`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------- XP counter ------------------------------- */

export function XpCounter({
  value,
  prefix = "",
  suffix = " XP",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = React.useState(value);
  const previous = React.useRef(value);

  React.useEffect(() => {
    const from = previous.current;
    const to = value;
    if (from === to) return;
    let frame = 0;
    const start = performance.now();
    const duration = 800;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else previous.current = to;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ----------------------------- Empty / error ------------------------------ */

export function EmptyState({
  emoji = "🔍",
  title,
  description,
  action,
  actionHref,
  className,
}: {
  emoji?: string;
  title: string;
  description: string;
  action?: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-14 text-center",
        className,
      )}
    >
      <span className="text-4xl" aria-hidden>
        {emoji}
      </span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && actionHref ? (
        <Button asChild variant="gradient" className="mt-5">
          <Link href={actionHref}>
            {action} <ArrowRight className="size-4" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

/* --------------------------------- Chips ---------------------------------- */

export function Chip({
  children,
  active,
  onClick,
  className,
  ...rest
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all duration-200",
        active
          ? "border-primary/45 bg-primary/12 text-primary shadow-[0_8px_20px_-14px_var(--primary)]"
          : "border-border bg-card/60 text-muted-foreground hover:border-primary/30 hover:text-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <Badge key={tag} variant="outline">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

/* --------------------------------- Stats ---------------------------------- */

export function StatCard({
  emoji,
  label,
  value,
  hint,
  accent = "var(--primary)",
  className,
}: {
  emoji: string;
  label: string;
  value: React.ReactNode;
  hint?: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-lift relative overflow-hidden rounded-2xl border border-border/70 bg-card p-4",
        className,
      )}
    >
      <span
        className="absolute -right-8 -top-8 size-24 rounded-full opacity-15 blur-2xl"
        style={{ background: accent }}
        aria-hidden
      />
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden>
          {emoji}
        </span>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-black tracking-tight">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
