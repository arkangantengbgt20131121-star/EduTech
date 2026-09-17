"use client";

import * as React from "react";
import {
  Activity,
  Gauge,
  Play,
  RotateCcw,
  Square,
  Thermometer,
  Vibrate,
  Zap,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/misc";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MicrobitRuntime, type RuntimeState } from "@/lib/microbit/runtime";
import { microbitPrograms, programById, type MicrobitProgram } from "@/lib/microbit/simulator";

interface MicrobitSimulatorProps {
  programId?: string;
  showSensors?: boolean;
  showEventLog?: boolean;
  height?: number | string;
  compact?: boolean;
  className?: string;
}

export function MicrobitSimulator({
  programId = "heart",
  showSensors = false,
  showEventLog = false,
  height,
  compact = false,
  className,
}: MicrobitSimulatorProps) {
  // `useState` with a lazy initialiser gives us one runtime per mounted simulator
  // without touching refs during render.
  const [runtime] = React.useState(() => new MicrobitRuntime());
  const [state, setState] = React.useState<RuntimeState | null>(null);
  const [activeProgramId, setActiveProgramId] = React.useState(programId);
  const [speed, setSpeed] = React.useState(1);
  const program = programById[activeProgramId] ?? microbitPrograms[0];

  React.useEffect(() => {
    const unsubscribe = runtime.subscribe(setState);
    return () => {
      unsubscribe();
      runtime.stop();
    };
  }, [runtime]);

  React.useEffect(() => {
    runtime.setSpeed(speed);
  }, [runtime, speed]);

  const run = React.useCallback(() => {
    void runtime.start(program);
  }, [program, runtime]);

  const stop = React.useCallback(() => {
    runtime.stop("■ Stopped by you");
  }, [runtime]);

  const reset = React.useCallback(() => {
    runtime.reset();
  }, [runtime]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const key = event.key.toLowerCase();
      if (key === "a" || event.key === "ArrowLeft") {
        event.preventDefault();
        runtime.pressButton("A");
      } else if (key === "b" || event.key === "ArrowRight") {
        event.preventDefault();
        runtime.pressButton("B");
      } else if (key === "s" || event.key === " ") {
        event.preventDefault();
        runtime.shake();
      } else if (key === "enter") {
        event.preventDefault();
        if (runtime.running) stop();
        else run();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [run, runtime, stop]);

  const frame = state?.frame ?? Array.from({ length: 5 }, () => Array(5).fill(false));
  const sensors = state?.sensors;
  const log = state?.log ?? [];
  const running = state?.running ?? false;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--card)_92%,var(--brand-indigo)_8%),var(--card))] shadow-lg",
        className,
      )}
      style={height ? { minHeight: typeof height === "number" ? `${height}px` : height } : undefined}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-xl bg-[linear-gradient(135deg,#f97316,#ef4444)] text-sm">
            🤖
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">Micro:bit simulator</p>
            <p className="text-[11px] text-muted-foreground">
              {running ? "Running" : "Ready"} · {program.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Button size="sm" variant={running ? "secondary" : "gradient"} onClick={running ? stop : run}>
            {running ? <Square className="size-3.5" /> : <Play className="size-3.5" />}
            {running ? "Stop" : "Run"}
          </Button>
          <Button size="icon-sm" variant="ghost" onClick={reset} aria-label="Reset simulator">
            <RotateCcw className="size-4" />
          </Button>
          <div className="ml-1 hidden items-center gap-1 sm:flex">
            {[0.5, 1, 2].map((value) => (
              <button
                key={value}
                onClick={() => setSpeed(value)}
                aria-label={`Speed ${value}x`}
                className={cn(
                  "rounded-lg px-2 py-1 text-[11px] font-bold transition",
                  speed === value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {value}×
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Board */}
        <div>
          <div className="relative mx-auto max-w-[300px] rounded-[28px] bg-[linear-gradient(150deg,#0f172a,#1e293b_55%,#0b1120)] p-4 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.9)] ring-1 ring-white/10">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                BBC micro:bit
              </span>
              <span className="flex gap-1">
                {[...Array(3)].map((_, index) => (
                  <span key={index} className="size-1 rounded-full bg-slate-600" />
                ))}
              </span>
            </div>

            <div
              className="grid grid-cols-5 gap-1.5 rounded-2xl bg-slate-950/80 p-3 ring-1 ring-white/10"
              role="img"
              aria-label="Micro:bit 5 by 5 LED matrix"
            >
              {frame.map((row, rowIndex) =>
                row.map((on, columnIndex) => (
                  <span
                    key={`${rowIndex}-${columnIndex}`}
                    className={cn(
                      "aspect-square rounded-[3px] transition-all duration-150",
                      on ? "led-on" : "led-off",
                    )}
                  />
                )),
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => runtime.pressButton("A")}
                className="grid size-14 shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#475569,#1e293b)] text-sm font-black text-slate-200 ring-2 ring-white/10 transition active:scale-95 hover:ring-[#f97316]/60"
                aria-label="Press Button A"
              >
                A
              </button>

              <div className="flex flex-col items-center gap-1">
                <Vibrate className="size-3.5 text-slate-500" />
                <button
                  onClick={() => runtime.shake()}
                  className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 ring-1 ring-white/10 transition hover:bg-slate-700 active:scale-95"
                >
                  Shake
                </button>
                <button
                  onClick={() => runtime.pressButton("AB")}
                  className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 ring-1 ring-white/10 transition hover:bg-slate-700 active:scale-95"
                >
                  A + B
                </button>
              </div>

              <button
                onClick={() => runtime.pressButton("B")}
                className="grid size-14 shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#475569,#1e293b)] text-sm font-black text-slate-200 ring-2 ring-white/10 transition active:scale-95 hover:ring-[#f97316]/60"
                aria-label="Press Button B"
              >
                B
              </button>
            </div>

            {state?.lastTone ? (
              <p className="mt-3 text-center text-[11px] font-semibold text-[#fbbf24]">
                ♪ {state.lastTone}
              </p>
            ) : null}
          </div>

          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Keyboard: <kbd className="rounded bg-muted px-1">A</kbd>{" "}
            <kbd className="rounded bg-muted px-1">B</kbd>{" "}
            <kbd className="rounded bg-muted px-1">S</kbd> shake ·{" "}
            <kbd className="rounded bg-muted px-1">Enter</kbd> run
          </p>

          {showSensors ? (
            <div className="mt-4 space-y-3 rounded-2xl border border-border/60 bg-card/60 p-3">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Activity className="size-3.5" /> Sensors
              </p>
              <SensorSlider
                icon={<Sun className="size-3.5" />}
                label="Light level"
                value={sensors?.lightLevel ?? 180}
                min={0}
                max={255}
                onChange={(value) => runtime.setSensor("lightLevel", value)}
                suffix={sensors && sensors.lightLevel < 50 ? "dark" : "bright"}
              />
              <SensorSlider
                icon={<Thermometer className="size-3.5" />}
                label="Temperature"
                value={sensors?.temperature ?? 26}
                min={-5}
                max={45}
                onChange={(value) => runtime.setSensor("temperature", value)}
                suffix="°C"
              />
              <SensorSlider
                icon={<Gauge className="size-3.5" />}
                label="Tilt (X axis)"
                value={sensors?.accelerationX ?? 0}
                min={-2000}
                max={2000}
                onChange={(value) => runtime.setSensor("accelerationX", value)}
                suffix="mg"
              />
            </div>
          ) : null}
        </div>

        {/* Right column */}
        <div className="flex min-w-0 flex-col gap-3">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Example programs
            </p>
            <div className="flex flex-wrap gap-1.5">
              {microbitPrograms.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    runtime.stop();
                    setActiveProgramId(item.id);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition",
                    item.id === activeProgramId
                      ? "border-primary/40 bg-primary/12 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  <span aria-hidden>{item.emoji}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-muted/35 p-3">
            <p className="text-sm font-bold">{program.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {program.description}
            </p>
            <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
              <Zap className="mt-0.5 size-3.5 shrink-0 text-[#f59e0b]" />
              {program.interaction}
            </p>
          </div>

          <Tabs defaultValue={showEventLog ? "log" : "code"} className="min-w-0">
            <TabsList className="w-full">
              <TabsTrigger value="code">
                <ProgramIcon /> Program
              </TabsTrigger>
              <TabsTrigger value="log">
                <ActivityIcon /> Event log
                {log.length > 0 ? (
                  <span className="rounded-full bg-primary/15 px-1.5 text-[10px] font-bold text-primary">
                    {log.length}
                  </span>
                ) : null}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code">
              <pre className="max-h-52 overflow-auto rounded-xl border border-border/60 bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-200">
                <code>{program.blocks}</code>
              </pre>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {program.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="log">
              <div
                className="max-h-52 min-h-24 overflow-auto rounded-xl border border-border/60 bg-slate-950 p-3 font-mono text-[11px] leading-relaxed text-slate-300"
                aria-live="polite"
              >
                {log.length === 0 ? (
                  <p className="text-slate-500">
                    Press Run and interact with the board — every event shows up here.
                  </p>
                ) : (
                  log.map((entry) => (
                    <p
                      key={entry.id}
                      className={cn(
                        "flex gap-2",
                        entry.kind === "sound" && "text-amber-300",
                        entry.kind === "event" && "text-sky-300",
                      )}
                    >
                      <span className="text-slate-500">
                        {(entry.time / 1000).toFixed(1)}s
                      </span>
                      <span>{entry.message}</span>
                    </p>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {compact ? null : (
        <div className="border-t border-border/60 bg-muted/30 px-4 py-2.5 text-[11px] text-muted-foreground">
          This simulator runs the same programs as a physical board. Swap it for a real
          Micro:bit connection by implementing the same runtime API over WebUSB.
        </div>
      )}
    </div>
  );
}

function SensorSlider({
  icon,
  label,
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          {label}
        </span>
        <span className="tabular-nums text-foreground">
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <Slider
        className="mt-1.5"
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={([next]) => onChange(next)}
        aria-label={label}
      />
    </div>
  );
}

function ProgramIcon() {
  return <Square className="size-3.5" />;
}

function ActivityIcon() {
  return <Activity className="size-3.5" />;
}

export type { MicrobitProgram };
