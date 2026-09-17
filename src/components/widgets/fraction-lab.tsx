"use client";

import * as React from "react";
import { Minus, Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Fraction Lab — an interactive bar model.
 * Students cut a whole into equal pieces, build two fractions and compare them.
 */
export function FractionLab() {
  const [first, setFirst] = React.useState({ numerator: 3, denominator: 4 });
  const [second, setSecond] = React.useState({ numerator: 5, denominator: 8 });

  const firstValue = first.numerator / first.denominator;
  const secondValue = second.numerator / second.denominator;
  const comparison =
    firstValue === secondValue
      ? `${first.numerator}/${first.denominator} = ${second.numerator}/${second.denominator}`
      : firstValue > secondValue
        ? `${first.numerator}/${first.denominator} is larger by ${Math.abs(firstValue - secondValue).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}`
        : `${second.numerator}/${second.denominator} is larger by ${Math.abs(secondValue - firstValue).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}`;

  const commonDenominator = first.denominator * second.denominator;

  return (
    <div className="rounded-3xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold">Fraction Lab</p>
          <p className="text-xs text-muted-foreground">
            Cut the bar into equal parts, then compare the two fractions.
          </p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setFirst({ numerator: 3, denominator: 4 });
            setSecond({ numerator: 5, denominator: 8 });
          }}
        >
          <RefreshCw className="size-3.5" /> Reset
        </Button>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <FractionBar
          label="First fraction"
          numerator={first.numerator}
          denominator={first.denominator}
          onChange={setFirst}
          tone="var(--brand-indigo)"
        />
        <FractionBar
          label="Second fraction"
          numerator={second.numerator}
          denominator={second.denominator}
          onChange={setSecond}
          tone="var(--brand-cyan)"
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-muted/50 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            As decimals
          </p>
          <p className="mt-1 font-mono text-sm">
            {firstValue.toFixed(3)} vs {secondValue.toFixed(3)}
          </p>
        </div>
        <div className="rounded-2xl bg-muted/50 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Common denominator
          </p>
          <p className="mt-1 font-mono text-sm">
            {(first.numerator * second.denominator)}/{commonDenominator} vs{" "}
            {(second.numerator * first.denominator)}/{commonDenominator}
          </p>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Compare</p>
          <p className="mt-1 text-sm font-semibold">{comparison}</p>
        </div>
      </div>
    </div>
  );
}

function FractionBar({
  label,
  numerator,
  denominator,
  onChange,
  tone,
}: {
  label: string;
  numerator: number;
  denominator: number;
  onChange: (value: { numerator: number; denominator: number }) => void;
  tone: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-mono text-sm font-bold" style={{ color: tone }}>
          {numerator}/{denominator}
        </p>
      </div>

      <div className="mt-2 flex gap-1" role="img" aria-label={`${numerator} of ${denominator} parts shaded`}>
        {Array.from({ length: denominator }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-10 flex-1 rounded-md border transition-all duration-300",
              index < numerator ? "border-transparent" : "border-border bg-muted/60",
            )}
            style={
              index < numerator
                ? { background: `linear-gradient(135deg, ${tone}, color-mix(in oklab, ${tone} 60%, white))` }
                : undefined
            }
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Stepper
          label="Numerator"
          value={numerator}
          min={0}
          max={denominator}
          onChange={(value) => onChange({ numerator: value, denominator })}
        />
        <Stepper
          label="Denominator"
          value={denominator}
          min={2}
          max={12}
          onChange={(value) =>
            onChange({ denominator: value, numerator: Math.min(numerator, value) })
          }
        />
      </div>
    </div>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/70 px-2 py-1.5">
      <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid size-6 place-items-center rounded-lg bg-muted text-muted-foreground transition hover:text-foreground disabled:opacity-40"
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          <Minus className="size-3" />
        </button>
        <span className="w-6 text-center font-mono text-sm font-bold tabular-nums">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid size-6 place-items-center rounded-lg bg-muted text-muted-foreground transition hover:text-foreground disabled:opacity-40"
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          <Plus className="size-3" />
        </button>
      </span>
    </div>
  );
}
