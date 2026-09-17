"use client";

import * as React from "react";

import { CodingPlayground } from "@/components/coding/coding-playground";
import { MicrobitSimulator } from "@/components/microbit/microbit-simulator";
import { DesignCanvas } from "@/components/widgets/design-canvas";
import { FractionLab } from "@/components/widgets/fraction-lab";
import { SolarSystem } from "@/components/widgets/solar-system";
import { Timeline, type TimelineEvent } from "@/components/widgets/timeline";
import type { LessonBlock } from "@/data/types";

type WidgetBlock = Extract<LessonBlock, { type: "widget" }>;

/**
 * Every lesson widget is described in data, so a lesson file can embed an
 * interactive activity without importing any React components.
 */
export function WidgetRenderer({ block }: { block: WidgetBlock }) {
  const config = (block.config ?? {}) as Record<string, unknown>;

  return (
    <section className="rounded-3xl border border-border/70 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--card)_94%,var(--brand-indigo)_6%),var(--card))] p-3 sm:p-4">
      {block.title || block.caption ? (
        <header className="mb-3 px-1">
          {block.title ? (
            <p className="flex items-center gap-2 text-sm font-bold">
              <span className="grid size-5 place-items-center rounded-md bg-primary/12 text-[10px] text-primary">
                ▶
              </span>
              {block.title}
            </p>
          ) : null}
          {block.caption ? (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{block.caption}</p>
          ) : null}
        </header>
      ) : null}

      {renderWidget(block.widget, config)}
    </section>
  );
}

function renderWidget(widget: WidgetBlock["widget"], config: Record<string, unknown>) {
  switch (widget) {
    case "playground":
      return (
        <CodingPlayground
          language={(config.language as "python" | "javascript" | "html") ?? "python"}
          initialCode={(config.code as string) ?? 'print("Hello!")'}
          title={(config.title as string) ?? "Coding playground"}
          height="300px"
        />
      );

    case "microbit":
      return (
        <MicrobitSimulator
          programId={(config.programId as string) ?? "heart"}
          showSensors={Boolean(config.showSensors)}
          showEventLog={Boolean(config.showEventLog)}
          compact
        />
      );

    case "fractionLab":
      return <FractionLab />;

    case "designCanvas":
      return (
        <DesignCanvas mode={(config.mode as string) ?? "canvas"} layout={(config.layout as string) ?? "free"} />
      );

    case "solarSystem":
      return <SolarSystem />;

    case "timeline":
      return (
        <Timeline
          events={
            (config.events as TimelineEvent[]) ?? [
              { year: "1908", title: "Budi Utomo", detail: "The first modern nationalist organisation." },
            ]
          }
        />
      );

    default:
      return <p className="p-4 text-sm text-muted-foreground">Unknown widget: {String(widget)}</p>;
  }
}
