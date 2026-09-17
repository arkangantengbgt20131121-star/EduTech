"use client";

import * as React from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookMarked,
  Check,
  Copy,
  Info,
  Lightbulb,
  ListChecks,
  Quote,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { RichText } from "@/components/lessons/rich-text";
import { WidgetRenderer } from "@/components/widgets/widget-renderer";
import { cn } from "@/lib/utils";
import type { LessonBlock } from "@/data/types";

const calloutStyles = {
  tip: {
    icon: Lightbulb,
    className: "border-[color-mix(in_oklab,var(--success)_35%,transparent)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)]",
    iconClass: "text-[color-mix(in_oklab,var(--success)_80%,var(--foreground))]",
  },
  info: {
    icon: Info,
    className: "border-primary/30 bg-primary/6",
    iconClass: "text-primary",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-[color-mix(in_oklab,var(--warning)_45%,transparent)] bg-[color-mix(in_oklab,var(--warning)_10%,transparent)]",
    iconClass: "text-[color-mix(in_oklab,var(--warning)_70%,var(--foreground))]",
  },
  didYouKnow: {
    icon: Sparkles,
    className: "border-[color-mix(in_oklab,var(--brand-pink)_35%,transparent)] bg-[color-mix(in_oklab,var(--brand-pink)_8%,transparent)]",
    iconClass: "text-[color-mix(in_oklab,var(--brand-pink)_80%,var(--foreground))]",
  },
} as const;

export function LessonBlocks({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <LessonBlockView key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function LessonBlockView({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case "text":
      return (
        <section className="animate-fade-up">
          {block.title ? (
            <h2 className="mb-3 text-xl font-black tracking-tight">{block.title}</h2>
          ) : null}
          <div className="space-y-3 text-[15px] leading-[1.75] text-foreground/85">
            {block.body.map((paragraph, index) => (
              <p key={index}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </section>
      );

    case "callout": {
      const style = calloutStyles[block.variant];
      const Icon = style.icon;
      return (
        <aside className={cn("rounded-2xl border p-4", style.className)}>
          <p className="flex items-center gap-2 text-sm font-bold">
            <Icon className={cn("size-4 shrink-0", style.iconClass)} />
            {block.title}
          </p>
          <p className="mt-1.5 pl-6 text-sm leading-relaxed text-foreground/80">
            <RichText text={block.body} />
          </p>
        </aside>
      );
    }

    case "code":
      return <CodeBlock block={block} />;

    case "list":
      return (
        <section className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5">
          {block.title ? (
            <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
              <ListChecks className="size-4 text-primary" />
              {block.title}
            </h3>
          ) : null}
          <ul className="space-y-2.5">
            {block.items.map((item, index) => (
              <li key={index} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                    block.ordered ? "bg-primary/12 text-primary" : "bg-muted text-muted-foreground",
                  )}
                >
                  {block.ordered ? index + 1 : "•"}
                </span>
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      );

    case "steps":
      return (
        <section>
          {block.title ? (
            <h3 className="mb-4 text-xl font-black tracking-tight">{block.title}</h3>
          ) : null}
          <ol className="relative space-y-4 border-l-2 border-dashed border-border pl-6">
            {block.steps.map((step, index) => (
              <li key={step.title} className="animate-fade-up relative">
                <span className="absolute -left-[35px] grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand-indigo),var(--brand-cyan))] text-xs font-black text-white shadow-[0_8px_20px_-10px_var(--brand-indigo)]">
                  {index + 1}
                </span>
                <div className="rounded-2xl border border-border/70 bg-card p-4">
                  <p className="text-[15px] font-bold">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    <RichText text={step.body} />
                  </p>
                  {step.code ? (
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-3 font-mono text-[12px] leading-relaxed text-slate-100">
                      <code>{step.code}</code>
                    </pre>
                  ) : null}
                  {step.hint ? (
                    <p className="mt-3 flex items-start gap-2 rounded-xl bg-muted/60 p-2.5 text-xs text-muted-foreground">
                      <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-[color-mix(in_oklab,var(--warning)_75%,var(--foreground))]" />
                      <RichText text={step.hint} />
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case "table":
      return (
        <section className="overflow-hidden rounded-2xl border border-border/70">
          {block.title ? (
            <div className="border-b border-border/60 bg-muted/40 px-4 py-2.5">
              <p className="text-sm font-bold">{block.title}</p>
            </div>
          ) : null}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-muted/60">
                <tr>
                  {block.headers.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-border/60">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={cn(
                          "px-4 py-2.5 align-top",
                          cellIndex === 0 ? "font-semibold" : "text-muted-foreground",
                        )}
                      >
                        <RichText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );

    case "compare":
      return (
        <section>
          {block.title ? (
            <h3 className="mb-3 text-base font-bold">{block.title}</h3>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            {block.columns.map((column) => (
              <div
                key={column.title}
                className={cn(
                  "rounded-2xl border p-4",
                  column.tone === "good" && "border-[color-mix(in_oklab,var(--success)_35%,transparent)] bg-[color-mix(in_oklab,var(--success)_7%,transparent)]",
                  column.tone === "bad" && "border-destructive/30 bg-destructive/6",
                  column.tone === "neutral" && "border-border/70 bg-card",
                )}
              >
                <p className="text-sm font-bold">{column.title}</p>
                <ul className="mt-2.5 space-y-2">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <span
                        className={cn(
                          "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full text-[10px] font-black text-white",
                          column.tone === "bad" ? "bg-destructive" : "bg-[color-mix(in_oklab,var(--success)_85%,black)]",
                        )}
                      >
                        {column.tone === "bad" ? "✕" : "✓"}
                      </span>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    case "keyTerms":
      return (
        <section className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5">
          <h3 className="flex items-center gap-2 text-base font-bold">
            <BookMarked className="size-4 text-primary" /> Key terms
          </h3>
          <dl className="mt-3 divide-y divide-border/60">
            {block.terms.map((term) => (
              <div key={term.term} className="grid gap-1 py-2.5 sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-sm font-bold text-primary">{term.term}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  <RichText text={term.definition} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case "diagram":
      return (
        <section className="rounded-2xl border border-border/70 bg-[linear-gradient(150deg,color-mix(in_oklab,var(--card)_92%,var(--brand-indigo)_8%),var(--card))] p-4 sm:p-5">
          {block.title ? <p className="text-sm font-bold">{block.title}</p> : null}
          <div className="mt-4 flex flex-wrap items-stretch gap-3">
            {block.nodes.map((node, index) => (
              <React.Fragment key={node.title}>
                <div className="min-w-[140px] flex-1 rounded-2xl border border-border/60 bg-card/80 p-3.5 text-center">
                  <span className="text-2xl" aria-hidden>
                    {node.emoji}
                  </span>
                  <p className="mt-1.5 text-sm font-bold">{node.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{node.detail}</p>
                </div>
                {index < block.nodes.length - 1 ? (
                  <ArrowRight
                    className="hidden size-4 shrink-0 self-center text-muted-foreground sm:block"
                    aria-hidden
                  />
                ) : null}
              </React.Fragment>
            ))}
          </div>
          {block.caption ? (
            <p className="mt-3 text-xs text-muted-foreground">
              {block.loop ? "↻ Loops back to the start · " : ""}
              {block.caption}
            </p>
          ) : null}
        </section>
      );

    case "figure":
      return <FigureBlock block={block} />;

    case "widget":
      return <WidgetRenderer block={block} />;

    case "quote":
      return (
        <blockquote className="rounded-2xl border border-border/70 bg-card p-5">
          <Quote className="size-4 text-primary" aria-hidden />
          <p className="mt-2 text-lg font-semibold italic leading-relaxed">“{block.quote}”</p>
          <footer className="mt-3 text-sm text-muted-foreground">
            — <span className="font-semibold text-foreground">{block.author}</span>
            {block.role ? `, ${block.role}` : ""}
          </footer>
        </blockquote>
      );

    default:
      return null;
  }
}

function CodeBlock({
  block,
}: {
  block: Extract<LessonBlock, { type: "code" }>;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(block.code);
      setCopied(true);
      toast.success("Code copied");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy — select the code manually");
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-border/70">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/40 px-4 py-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{languageName(block.language)}</Badge>
          {block.title ? <p className="text-xs font-semibold">{block.title}</p> : null}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-slate-950 p-4 font-mono text-[12.5px] leading-relaxed text-slate-100">
        <code>{block.code}</code>
      </pre>
      {block.output ? (
        <div className="border-t border-border/60 bg-slate-900 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Output</p>
          <pre className="mt-1.5 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-emerald-300">
            <code>{block.output}</code>
          </pre>
        </div>
      ) : null}
    </section>
  );
}

function languageName(language: string) {
  switch (language) {
    case "python":
      return "Python 3";
    case "javascript":
      return "JavaScript";
    case "html":
      return "HTML + CSS";
    case "makecode":
      return "MakeCode blocks";
    default:
      return language;
  }
}

const figureThemes: Record<string, { gradient: string; emoji: string }> = {
  microbit: { gradient: "linear-gradient(135deg,#f97316,#ef4444)", emoji: "🤖" },
  figma: { gradient: "linear-gradient(135deg,#ec4899,#8b5cf6)", emoji: "🎨" },
  formula: { gradient: "linear-gradient(135deg,#0ea5e9,#6366f1)", emoji: "➗" },
  molecule: { gradient: "linear-gradient(135deg,#10b981,#22d3ee)", emoji: "🔬" },
  artifact: { gradient: "linear-gradient(135deg,#f59e0b,#ef4444)", emoji: "🏛️" },
  chart: { gradient: "linear-gradient(135deg,#14b8a6,#3b82f6)", emoji: "📈" },
};

function FigureBlock({ block }: { block: Extract<LessonBlock, { type: "figure" }> }) {
  const theme = figureThemes[block.visual] ?? figureThemes.microbit;
  return (
    <figure className="overflow-hidden rounded-2xl border border-border/70">
      <div
        className="relative flex flex-col items-center gap-4 p-6"
        style={{ background: theme.gradient }}
      >
        <span className="absolute inset-0 bg-grid opacity-20" aria-hidden />
        <span className="text-5xl drop-shadow-lg" aria-hidden>
          {theme.emoji}
        </span>
        {block.items?.length ? (
          <div className="relative flex flex-wrap justify-center gap-2">
            {block.items.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-slate-900 shadow-sm backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {block.title || block.caption ? (
        <figcaption className="bg-card px-4 py-3">
          {block.title ? <p className="text-sm font-bold">{block.title}</p> : null}
          {block.caption ? (
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{block.caption}</p>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
