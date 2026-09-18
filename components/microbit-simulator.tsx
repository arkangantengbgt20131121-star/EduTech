"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Copy, Dices, Eraser, Heart, Lightbulb, Paintbrush, Smile, Thermometer, Vibrate } from "lucide-react";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

// ─── 3×5 font for scrolling text ───────────────────────────────────
const FONT: Record<string, string[]> = {
  A: [".#.", "#.#", "###", "#.#", "#.#"],
  B: ["##.", "#.#", "##.", "#.#", "##."],
  C: [".##", "#..", "#..", "#..", ".##"],
  D: ["##.", "#.#", "#.#", "#.#", "##."],
  E: ["###", "#..", "##.", "#..", "###"],
  F: ["###", "#..", "##.", "#..", "#.."],
  G: [".##", "#..", "#.#", "#.#", ".##"],
  H: ["#.#", "#.#", "###", "#.#", "#.#"],
  I: ["###", ".#.", ".#.", ".#.", "###"],
  J: ["..#", "..#", "..#", "#.#", ".#."],
  K: ["#.#", "#.#", "##.", "#.#", "#.#"],
  L: ["#..", "#..", "#..", "#..", "###"],
  M: ["#.#", "###", "###", "#.#", "#.#"],
  N: ["##.", "#.#", "#.#", "#.#", "#.#"],
  O: [".#.", "#.#", "#.#", "#.#", ".#."],
  P: ["##.", "#.#", "##.", "#..", "#.."],
  Q: [".#.", "#.#", "#.#", "##.", ".##"],
  R: ["##.", "#.#", "##.", "#.#", "#.#"],
  S: [".##", "#..", ".#.", "..#", "##."],
  T: ["###", ".#.", ".#.", ".#.", ".#."],
  U: ["#.#", "#.#", "#.#", "#.#", "###"],
  V: ["#.#", "#.#", "#.#", "#.#", ".#."],
  W: ["#.#", "#.#", "###", "###", "#.#"],
  X: ["#.#", "#.#", ".#.", "#.#", "#.#"],
  Y: ["#.#", "#.#", ".#.", ".#.", ".#."],
  Z: ["###", "..#", ".#.", "#..", "###"],
  "0": [".#.", "#.#", "#.#", "#.#", ".#."],
  "1": [".#.", "##.", ".#.", ".#.", "###"],
  "2": ["##.", "..#", ".#.", "#..", "###"],
  "3": ["##.", "..#", ".#.", "..#", "##."],
  "4": ["#.#", "#.#", "###", "..#", "..#"],
  "5": ["###", "#..", "##.", "..#", "##."],
  "6": [".##", "#..", "##.", "#.#", ".#."],
  "7": ["###", "..#", ".#.", ".#.", ".#."],
  "8": [".#.", "#.#", ".#.", "#.#", ".#."],
  "9": [".#.", "#.#", ".##", "..#", "##."],
  " ": ["...", "...", "...", "...", "..."],
  "!": [".#.", ".#.", ".#.", "...", ".#."],
  "?": ["##.", "..#", ".#.", "...", ".#."],
  ".": ["...", "...", "...", "...", ".#."],
  "-": ["...", "...", "###", "...", "..."],
  ":": ["...", ".#.", "...", ".#.", "..."],
};

const HEART_BIG = [".#.#.", "#####", "#####", ".###.", "..#.."];
const HEART_SMALL = [".....", ".#.#.", ".###.", "..#..", "....."];
const SMILEY = [".#.#.", ".#.#.", ".....", "#...#", ".###."];
const SAD = [".#.#.", ".#.#.", ".....", ".###.", "#...#"];

const PIPS: Record<number, number[]> = {
  1: [12],
  2: [0, 24],
  3: [0, 12, 24],
  4: [0, 4, 20, 24],
  5: [0, 4, 12, 20, 24],
  6: [0, 4, 10, 14, 20, 24],
};

function patternToLeds(pattern: string[]): number[] {
  return pattern.join("").split("").map((c) => (c === "#" ? 1 : 0));
}

function textToColumns(text: string): number[][] {
  const cols: number[][] = [];
  for (const ch of text.toUpperCase()) {
    const glyph = FONT[ch] ?? FONT[" "];
    for (let c = 0; c < 3; c++) {
      cols.push([0, 1, 2, 3, 4].map((r) => (glyph[r][c] === "#" ? 1 : 0)));
    }
    cols.push([0, 0, 0, 0, 0]);
  }
  return cols;
}

const CODE_SNIPPETS: Record<string, string> = {
  heart: `basic.forever(function () {\n  basic.showIcon(IconNames.Heart)\n  basic.pause(500)\n  basic.showIcon(IconNames.SmallHeart)\n  basic.pause(500)\n})`,
  dice: `input.onGesture(Gesture.Shake, function () {\n  // rolling animation\n  for (let i = 0; i < 6; i++) {\n    basic.showNumber(randint(1, 6))\n    basic.pause(100)\n  }\n  basic.showNumber(randint(1, 6))\n})`,
  text: `basic.showString("HELLO!")\n// scrolls across the LEDs,\n// one letter at a time`,
  thermo: `basic.forever(function () {\n  let t = input.temperature()\n  // light a bar 0-25 LEDs\n  let level = Math.map(t, 15, 35, 0, 25)\n  basic.clearScreen()\n  for (let i = 0; i < level; i++) {\n    led.plot(i % 5, 4 - Math.floor(i / 5))\n  }\n})`,
  counter: `let count = 0\ninput.onButtonPressed(Button.A, function () {\n  count += 1\n  basic.showNumber(count)\n})\ninput.onButtonPressed(Button.B, function () {\n  count = 0\n  basic.clearScreen()\n})`,
};

type ButtonAction = "dice" | "counter" | "smile" | "heart";

export function MicrobitSimulator() {
  const [leds, setLeds] = useState<number[]>(patternToLeds(HEART_BIG));
  const [pressA, setPressA] = useState(0);
  const [pressB, setPressB] = useState(0);
  const [count, setCount] = useState(0);
  const [temp, setTemp] = useState(28);
  const [text, setText] = useState("HELLO!");
  const [action, setAction] = useState<ButtonAction>("dice");
  const [codeKey, setCodeKey] = useState("heart");
  const [status, setStatus] = useState("Press a button or try a demo!");
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAnim = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => () => stopAnim(), []);

  const flash = (pattern: string[], ms = 900) => {
    stopAnim();
    setLeds(patternToLeds(pattern));
    timer.current = setInterval(() => {}, 999999); // placeholder cleared below
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setTimeout(() => {}, ms);
  };

  const showHeart = () => {
    stopAnim();
    setCodeKey("heart");
    setStatus("💓 Beating heart — forever loop alternating two frames");
    let big = true;
    setLeds(patternToLeds(HEART_BIG));
    timer.current = setInterval(() => {
      big = !big;
      setLeds(patternToLeds(big ? HEART_BIG : HEART_SMALL));
    }, 500);
  };

  const rollDice = () => {
    stopAnim();
    setCodeKey("dice");
    setStatus("🎲 Shaking…");
    let ticks = 0;
    timer.current = setInterval(() => {
      ticks++;
      const n = 1 + Math.floor(Math.random() * 6);
      const grid = Array(25).fill(0);
      PIPS[n].forEach((i) => (grid[i] = 1));
      setLeds(grid);
      if (ticks >= 8) {
        stopAnim();
        setStatus(`🎲 You rolled a ${n}!`);
      }
    }, 120);
  };

  const scrollText = (msg: string) => {
    stopAnim();
    setCodeKey("text");
    const cols = textToColumns(` ${msg} `);
    let offset = 0;
    setStatus(`📜 Scrolling: "${msg}"`);
    timer.current = setInterval(() => {
      const grid = Array(25).fill(0);
      for (let x = 0; x < 5; x++) {
        const col = cols[offset + x];
        if (!col) continue;
        for (let y = 0; y < 5; y++) grid[y * 5 + x] = col[y];
      }
      setLeds(grid);
      offset++;
      if (offset > cols.length) offset = 0;
    }, 170);
  };

  const showThermo = () => {
    stopAnim();
    setCodeKey("thermo");
    const level = Math.max(0, Math.min(25, Math.round(((temp - 15) / 20) * 25)));
    const grid = Array(25).fill(0);
    for (let i = 0; i < level; i++) grid[24 - i] = 1;
    setLeds(grid);
    setStatus(`🌡️ ${temp}°C — ${level}/25 LEDs lit. Move the slider and press again!`);
  };

  const doCounter = (reset = false) => {
    stopAnim();
    setCodeKey("counter");
    const next = reset ? 0 : count + 1;
    setCount(next);
    const grid = Array(25).fill(0);
    for (let i = 0; i < Math.min(25, next); i++) grid[24 - i] = 1;
    setLeds(grid);
    setStatus(reset ? "🔄 Counter reset!" : `🔢 Count = ${next}`);
  };

  const handleA = () => {
    setPressA((p) => p + 1);
    if (action === "dice") rollDice();
    else if (action === "counter") doCounter();
    else if (action === "smile") {
      stopAnim();
      flash(SMILEY);
      setLeds(patternToLeds(SMILEY));
      setStatus("😊 Button A says hi!");
    } else showHeart();
  };

  const handleB = () => {
    setPressB((p) => p + 1);
    if (action === "counter") doCounter(true);
    else {
      stopAnim();
      setLeds(patternToLeds(SAD));
      setStatus("Button B pressed!");
      setTimeout(() => scrollText("B!"), 700);
    }
  };

  const toggleLed = (i: number) => {
    stopAnim();
    setLeds((prev) => {
      const next = [...prev];
      next[i] = next[i] ? 0 : 1;
      return next;
    });
    setStatus("🎨 Painting mode — click LEDs to draw!");
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(CODE_SNIPPETS[codeKey]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
      {/* Device */}
      <div className="rounded-[2rem] border border-border bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            <Lightbulb size={14} /> micro:bit v2
          </p>
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse-glow" />
        </div>

        <div className="mx-auto mt-5 grid w-fit grid-cols-5 gap-2.5 rounded-2xl bg-black/40 p-5">
          {leds.map((on, i) => (
            <button
              key={i}
              onClick={() => toggleLed(i)}
              aria-label={`LED ${i}`}
              className={cn(
                "h-9 w-9 rounded-full transition-all duration-100 sm:h-10 sm:w-10",
                on
                  ? "bg-red-400 shadow-[0_0_18px_4px_rgba(248,113,113,0.8)]"
                  : "bg-slate-700/70 hover:bg-slate-600"
              )}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            onClick={handleA}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-700 text-lg font-black transition hover:bg-indigo-500 active:scale-95"
          >
            A
          </button>
          <button
            onClick={() => {
              setPressA((p) => p + 1);
              setPressB((p) => p + 1);
              rollDice();
              setStatus("🎲 A+B pressed — lucky roll!");
            }}
            className="rounded-full bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 transition hover:bg-slate-700"
          >
            A+B
          </button>
          <button
            onClick={handleB}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-700 text-lg font-black transition hover:bg-indigo-500 active:scale-95"
          >
            B
          </button>
        </div>

        <button
          onClick={rollDice}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-bold transition hover:bg-indigo-500 active:scale-[0.99]"
        >
          <Vibrate size={16} /> Shake!
        </button>

        <div className="mt-5 space-y-4 rounded-2xl bg-white/5 p-4">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Thermometer size={14} /> Temperature
              </span>
              <span>{temp}°C</span>
            </div>
            <input
              type="range"
              min={10}
              max={40}
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="mt-2 w-full accent-indigo-500"
            />
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>A pressed: {pressA}×</span>
            <span>B pressed: {pressB}×</span>
            <span>Count: {count}</span>
          </div>
        </div>

        <p className="mt-4 min-h-10 rounded-xl bg-white/5 p-3 text-center text-[13px] font-semibold text-indigo-200">
          {status}
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 text-[15px] font-black">
            <Bell size={17} className="text-indigo-500" /> Quick demos
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Button variant="outline" onClick={showHeart}>
              <Heart size={16} className="text-rose-500" /> Heart
            </Button>
            <Button variant="outline" onClick={rollDice}>
              <Dices size={16} className="text-indigo-500" /> Dice
            </Button>
            <Button variant="outline" onClick={() => scrollText(text)}>
              <Smile size={16} className="text-amber-500" /> Scroll
            </Button>
            <Button variant="outline" onClick={showThermo}>
              <Thermometer size={16} className="text-orange-500" /> Thermo
            </Button>
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 24))}
              placeholder="Type text to scroll…"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-semibold outline-none focus:border-indigo-500"
            />
            <Button variant="primary" onClick={() => scrollText(text || "HELLO")}>
              Show
            </Button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-[15px] font-black">🔘 Button A does…</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(
                [
                  ["dice", "🎲 Dice"],
                  ["counter", "🔢 Counter"],
                  ["smile", "😊 Smiley"],
                  ["heart", "💓 Heart"],
                ] as [ButtonAction, string][]
              ).map(([v, label]) => (
                <button
                  key={v}
                  onClick={() => {
                    setAction(v);
                    setStatus(`Button A will now: ${label}`);
                  }}
                  className={cn(
                    "rounded-xl border-2 px-3 py-2 text-sm font-bold transition",
                    action === v
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                      : "border-border hover:border-indigo-300"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Button B resets the counter — or says hi in other modes. Just like event blocks in
              MakeCode!
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="flex items-center gap-2 text-[15px] font-black">
              <Paintbrush size={16} className="text-indigo-500" /> Paint tools
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  stopAnim();
                  setLeds(Array(25).fill(0));
                  setStatus("🧹 Cleared!");
                }}
              >
                <Eraser size={14} /> Clear
              </Button>
              <Button variant="outline" size="sm" onClick={() => { stopAnim(); setLeds(Array(25).fill(1)); }}>
                Fill all
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  stopAnim();
                  setLeds((p) => p.map((v) => (v ? 0 : 1)));
                }}
              >
                Invert
              </Button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Tip: click any LED on the board to draw your own pixel art, then screenshot it!
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3">
            <p className="text-sm font-black">
              💻 MakeCode JavaScript <span className="font-medium text-muted-foreground">— updates with each demo</span>
            </p>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5 text-xs font-bold hover:bg-accent"
            >
              <Copy size={13} /> {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="code-scroll overflow-x-auto bg-[#0b0f1a] p-5 font-mono text-[13px] leading-6 text-slate-100">
            {CODE_SNIPPETS[codeKey]}
          </pre>
        </div>
      </div>
    </div>
  );
}
