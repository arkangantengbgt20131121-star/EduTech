"use client";

import * as React from "react";

import { CodingPlayground, type PlaygroundStarter } from "@/components/coding/coding-playground";
import { Chip } from "@/components/shared/primitives";
import type { CodeLanguage } from "@/data/types";

const languages: { id: CodeLanguage; label: string; emoji: string }[] = [
  { id: "python", label: "Python", emoji: "🐍" },
  { id: "javascript", label: "JavaScript", emoji: "⚡" },
  { id: "html", label: "HTML & CSS", emoji: "🎨" },
];

const samples: Record<
  CodeLanguage,
  { title: string; instructions: string[]; starters: PlaygroundStarter[]; notes: string[] }
> = {
  python: {
    title: "Python playground",
    instructions: [
      "Read the code, then press Run (or Ctrl + Enter).",
      "Change a value and run again — predict the output first.",
      "Use the Variables tab to see exactly what your program stored.",
    ],
    starters: [
      {
        label: "Hello world",
        code: 'print("Hello, EduTech!")\nprint("I am learning Python.")',
      },
      {
        label: "Loops & totals",
        code: 'total = 0\n\nfor lap in range(1, 6):\n    total = total + lap\n    print(f"Lap {lap}: running total {total}")\n\nprint(f"Final total: {total}")',
      },
      {
        label: "Guessing game",
        code: 'secret = 42\nattempts = 0\n\nfor guess in [10, 30, 50, 42]:\n    attempts += 1\n    if guess < secret:\n        print(f"{guess} is too low")\n    elif guess > secret:\n        print(f"{guess} is too high")\n    else:\n        print(f"Correct! You needed {attempts} guesses.")\n        break',
      },
      {
        label: "FizzBuzz",
        code: 'for number in range(1, 21):\n    if number % 15 == 0:\n        print("FizzBuzz")\n    elif number % 3 == 0:\n        print("Fizz")\n    elif number % 5 == 0:\n        print("Buzz")\n    else:\n        print(number)',
      },
      {
        label: "Use input()",
        code: 'name = input("What is your name? ")\nage = int(input("How old are you? "))\n\nprint(f"Hello, {name}!")\nprint(f"In 10 years you will be {age + 10}.")',
      },
    ],
    notes: [
      "input() reads from the “Program input” box — one value per line.",
      "Errors show the line number and a hint explaining how to fix them.",
    ],
  },
  javascript: {
    title: "JavaScript playground",
    instructions: [
      "Press Run to execute your script.",
      "console.log() output appears in the Output tab.",
      "Check the Errors tab if nothing seems to happen — the browser tells you why.",
    ],
    starters: [
      { label: "Hello world", code: 'console.log("Hello from JavaScript!");\nconst year = 2026;\nconsole.log("The year is " + year);' },
      {
        label: "Loop & total",
        code: "let total = 0;\nfor (let lap = 1; lap <= 5; lap++) {\n  total += lap;\n  console.log(`Lap ${lap}: running total ${total}`);\n}\nconsole.log(`Final total: ${total}`);",
      },
      {
        label: "Arrays & objects",
        code: 'const students = [\n  { name: "Nadia", xp: 4820 },\n  { name: "Kevin", xp: 4610 },\n  { name: "Alya", xp: 4380 },\n];\n\nstudents\n  .slice()\n  .sort((a, b) => b.xp - a.xp)\n  .forEach((student, index) => {\n    console.log(`${index + 1}. ${student.name} — ${student.xp} XP`);\n  });',
      },
    ],
    notes: [
      "JavaScript runs inside a sandboxed preview frame, not on the EduTech server.",
      "Try toggling console.log() calls off to see the difference between data and output.",
    ],
  },
  html: {
    title: "HTML · CSS · JS playground",
    instructions: [
      "Write your markup and styles, then press Run.",
      "The Preview tab renders real HTML in a sandbox.",
      "Click buttons in the preview to test your JavaScript.",
    ],
    starters: [
      {
        label: "Profile card",
        code: '<article class="card">\n  <div class="avatar">🚀</div>\n  <div>\n    <h2>Alya Ramadhani</h2>\n    <p>Robotics · Coding · Design</p>\n    <span class="tag">Level 3 Creator</span>\n  </div>\n</article>\n\n<style>\n  body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 24px; }\n  .card { display: flex; gap: 16px; align-items: center; max-width: 380px;\n          background: #1e293b; padding: 20px; border-radius: 18px; }\n  .avatar { width: 56px; height: 56px; border-radius: 50%; display: grid;\n            place-items: center; font-size: 28px;\n            background: linear-gradient(135deg, #6366f1, #22d3ee); }\n  h2 { margin: 0 0 4px; font-size: 18px; }\n  p { margin: 0; color: #94a3b8; font-size: 14px; }\n  .tag { display: inline-block; margin-top: 8px; font-size: 12px;\n         background: rgba(99,102,241,0.2); color: #a5b4fc;\n         padding: 3px 10px; border-radius: 999px; }\n</style>',
      },
      {
        label: "Interactive counter",
        code: '<h1 id="score">0</h1>\n<button id="add">Add a point</button>\n<p id="message">Press the button to begin.</p>\n\n<style>\n  body { font-family: system-ui, sans-serif; text-align: center; padding: 24px; }\n  h1 { font-size: 48px; margin: 8px 0; color: #6366f1; }\n  button { font-size: 16px; padding: 10px 18px; border-radius: 10px; border: 0;\n           background: #6366f1; color: white; cursor: pointer; }\n</style>\n\n<script>\n  let score = 0;\n  const scoreEl = document.getElementById("score");\n  const messageEl = document.getElementById("message");\n\n  document.getElementById("add").addEventListener("click", () => {\n    score += 1;\n    scoreEl.textContent = score;\n    messageEl.textContent = score >= 10\n      ? "Level up! You reached 10 points."\n      : "Keep going, you have " + (10 - score) + " to go.";\n  });\n</script>',
      },
    ],
    notes: [
      "Everything here is real HTML — inspect it in the preview with your browser's dev tools.",
      "Always test at a narrow width: most of your visitors are on phones.",
    ],
  },
  makecode: {
    title: "MakeCode preview",
    instructions: ["MakeCode programs run in the Micro:bit simulator instead."],
    starters: [],
    notes: ["Open the Micro:bit simulator to run MakeCode-style programs."],
  },
};

export function PlaygroundWorkspace() {
  const [language, setLanguage] = React.useState<CodeLanguage>("python");
  const sample = samples[language];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {languages.map((item) => (
          <Chip
            key={item.id}
            active={language === item.id}
            onClick={() => setLanguage(item.id)}
          >
            <span aria-hidden>{item.emoji}</span>
            {item.label}
          </Chip>
        ))}
      </div>

      <div className="mt-4">
        <CodingPlayground
          key={language}
          language={language}
          initialCode={sample.starters[0]?.code ?? ""}
          title={sample.title}
          instructions={sample.instructions}
          starters={sample.starters}
          notes={sample.notes}
          height="440px"
        />
      </div>
    </div>
  );
}
