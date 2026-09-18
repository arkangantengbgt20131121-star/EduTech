"use client";

import { useState } from "react";
import { Braces, Eraser, FileCode2, Globe, Play, RotateCcw, Terminal } from "lucide-react";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

type Lang = "javascript" | "python" | "html";

const samples: Record<Lang, { name: string; code: string }[]> = {
  javascript: [
    {
      name: "Greeting bot",
      code: 'const name = "Ayu";\nconst hobby = "robotics";\n\nconsole.log(`Hello, ${name}!`);\nconsole.log(`You love ${hobby}. Cool!`);\n\nfor (let i = 1; i <= 5; i++) {\n  console.log(`Count: ${i}`);\n}',
    },
    {
      name: "FizzBuzz",
      code: "for (let i = 1; i <= 20; i++) {\n  if (i % 15 === 0) console.log(\"FizzBuzz\");\n  else if (i % 3 === 0) console.log(\"Fizz\");\n  else if (i % 5 === 0) console.log(\"Buzz\");\n  else console.log(i);\n}",
    },
    {
      name: "Grade checker",
      code: "function grade(score) {\n  if (score >= 90) return \"A 🌟\";\n  if (score >= 80) return \"B 👍\";\n  if (score >= 70) return \"C 🙂\";\n  return \"Study more! 💪\";\n}\n\n[95, 82, 74, 60].forEach((s) => {\n  console.log(`${s} → ${grade(s)}`);\n});",
    },
  ],
  python: [
    {
      name: "Biodata bot",
      code: 'name = input("Name: ")\nage = int(input("Age: "))\n\nprint("Hello, " + name + "!")\nprint("Next year you will be", age + 1)',
    },
    {
      name: "Guessing game",
      code: 'secret = 7\nattempts = 0\n\nprint("Guess my number (1-10)!")\nwhile attempts < 3:\n    guess = int(input("Your guess: "))\n    attempts = attempts + 1\n    if guess == secret:\n        print("Correct! 🎉")\n        break\n    elif guess < secret:\n        print("Too low!")\n    else:\n        print("Too high!")',
    },
    {
      name: "Star triangle",
      code: "for row in range(1, 6):\n    print(\"*\" * row)\n\nprint(" + '"---"' + ")\nfor row in range(5, 0, -1):\n    print(\"*\" * row)",
    },
  ],
  html: [
    {
      name: "Profile card",
      code: '<div class="card">\n  <div class="avatar">🚀</div>\n  <h2>Ayu Pratama</h2>\n  <p>Future game developer</p>\n  <button>Follow me</button>\n</div>\n\n<style>\nbody { font-family: sans-serif; background: #f1f5f9;\n  display: flex; justify-content: center; padding: 40px; }\n.card { background: white; border-radius: 20px;\n  padding: 32px; text-align: center;\n  box-shadow: 0 12px 32px rgba(0,0,0,.12); }\n.avatar { font-size: 56px; }\nbutton { background: #6366f1; color: white; border: 0;\n  padding: 10px 28px; border-radius: 999px;\n  font-weight: bold; cursor: pointer; }\n</style>',
    },
    {
      name: "Click counter",
      code: '<h1 id="msg">Clicked 0 times</h1>\n<button id="btn">Click me! 👆</button>\n\n<style>\nbody { font-family: sans-serif; text-align: center;\n  padding-top: 60px; background: #eef2ff; }\nbutton { font-size: 20px; padding: 12px 32px;\n  border-radius: 12px; border: 0;\n  background: #6366f1; color: white; cursor: pointer; }\n</style>\n\n<script>\nlet count = 0;\nconst btn = document.querySelector("#btn");\nconst msg = document.querySelector("#msg");\nbtn.addEventListener("click", () => {\n  count++;\n  msg.textContent = `Clicked ${count} times`;\n});\n</script>',
    },
  ],
};

// ─── Mini Python → JS transpiler (beginner subset) ─────────────────
function transpilePython(src: string): string {
  const lines = src.split("\n");
  const out: string[] = ["let __guard = 0;", "const __tick = () => { if (++__guard > 200000) throw new Error('Loop ran too long — infinite loop?'); };"];
  const indentStack: number[] = [0];
  let inBlock: string[] = [];

  const convertExpr = (expr: string): string => {
    let e = expr;
    // f-strings → template literals (basic, double-quoted)
    e = e.replace(/f"([^"]*)"/g, (_m, inner: string) => "`" + inner.replace(/\{([^}]+)\}/g, "${$1}") + "`");
    e = e.replace(/f'([^']*)'/g, (_m, inner: string) => "`" + inner.replace(/\{([^}]+)\}/g, "${$1}") + "`");
    e = e.replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null");
    e = e.replace(/\band\b/g, "&&").replace(/\bor\b/g, "||").replace(/\bnot\b/g, "!");
    e = e.replace(/\bint\(/g, "Number(").replace(/\bfloat\(/g, "Number(").replace(/\bstr\(/g, "String(");
    e = e.replace(/\bprint\(/g, "__print(").replace(/\binput\(/g, "__input(");
    // string repeat: "..." * n  →  "...".repeat(n)
    e = e.replace(/("([^"]*)"|'([^']*)')\s*\*\s*([A-Za-z0-9_]+|\d+)/g, "($1).repeat($4)");
    e = e.replace(/([A-Za-z0-9_\)\]]+)\s*\*\s*("([^"]*)"|'([^']*)')/g, "($4$5).repeat($1)");
    return e;
  };

  const closeTo = (indent: number) => {
    while (indentStack.length > 1 && indentStack[indentStack.length - 1] > indent) {
      indentStack.pop();
      inBlock.pop();
      out.push("}");
    }
  };

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed.startsWith("#")) {
      if (trimmed.startsWith("#")) out.push("//" + raw.slice(raw.indexOf("#") + 1));
      continue;
    }
    const indent = raw.match(/^ */)?.[0].length ?? 0;
    const isElse = /^(elif|else)\b/.test(trimmed);

    if (isElse) {
      // close one level but stay in parent
      if (indentStack.length > 1) {
        indentStack.pop();
        inBlock.pop();
        out.push("}");
      }
    } else {
      closeTo(indent);
    }

    let js = trimmed;
    const rangeMatch = trimmed.match(/^for\s+(\w+)\s+in\s+range\(([^)]*)\)\s*:\s*$/);
    const forInMatch = trimmed.match(/^for\s+(\w+)\s+in\s+(.+)\s*:\s*$/);
    const whileMatch = trimmed.match(/^while\s+(.+)\s*:\s*$/);
    const ifMatch = trimmed.match(/^if\s+(.+)\s*:\s*$/);
    const elifMatch = trimmed.match(/^elif\s+(.+)\s*:\s*$/);
    const elseMatch = trimmed.match(/^else\s*:\s*$/);
    const defMatch = trimmed.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:\s*$/);

    if (rangeMatch) {
      const v = rangeMatch[1];
      const parts = rangeMatch[2].split(",").map((s) => s.trim()).filter(Boolean);
      let start = "0", end = "0", step = "1";
      if (parts.length === 1) end = parts[0];
      else if (parts.length === 2) { start = parts[0]; end = parts[1]; }
      else if (parts.length >= 3) { start = parts[0]; end = parts[1]; step = parts[2]; }
      js = `for (let ${v} = ${start}; ${step.startsWith("-") ? `${v} > ${end}` : `${v} < ${end}`}; ${v} += (${step})) { __tick();`;
      indentStack.push(indent + 1);
      inBlock.push("for");
    } else if (forInMatch) {
      js = `for (const ${forInMatch[1]} of ${convertExpr(forInMatch[2])}) { __tick();`;
      indentStack.push(indent + 1);
      inBlock.push("for");
    } else if (whileMatch) {
      js = `while (${convertExpr(whileMatch[1])}) { __tick();`;
      indentStack.push(indent + 1);
      inBlock.push("while");
    } else if (ifMatch) {
      js = `if (${convertExpr(ifMatch[1])}) {`;
      indentStack.push(indent + 1);
      inBlock.push("if");
    } else if (elifMatch) {
      js = `else if (${convertExpr(elifMatch[1])}) {`;
      indentStack.push(indent + 1);
      inBlock.push("if");
    } else if (elseMatch) {
      js = `else {`;
      indentStack.push(indent + 1);
      inBlock.push("else");
    } else if (defMatch) {
      js = `function ${defMatch[1]}(${defMatch[2]}) {`;
      indentStack.push(indent + 1);
      inBlock.push("def");
    } else {
      js = convertExpr(trimmed);
      if (!/[;{}]$/.test(js)) js += ";";
    }
    out.push(js);
  }
  closeTo(0);
  return out.join("\n");
}

function runJavaScript(code: string): string[] {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
    error: (...args: unknown[]) => logs.push("❌ " + args.map(String).join(" ")),
    warn: (...args: unknown[]) => logs.push("⚠️ " + args.map(String).join(" ")),
  };
  try {
    const fn = new Function("console", `"use strict";\n${code}`);
    fn(fakeConsole);
    if (logs.length === 0) logs.push("✅ Ran with no output. Try console.log()!");
  } catch (err) {
    logs.push(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
  }
  return logs;
}

function runPython(code: string, stdin: string): string[] {
  const logs: string[] = [];
  const inputs = stdin.split("\n");
  let cursor = 0;
  const api = {
    __print: (...args: unknown[]) => {
      logs.push(
        args
          .map((a) => {
            if (a === null || a === undefined) return "None";
            if (typeof a === "boolean") return a ? "True" : "False";
            if (typeof a === "object") return JSON.stringify(a);
            return String(a);
          })
          .join(" ")
      );
    },
    __input: (prompt = "") => {
      if (String(prompt)) logs.push(String(prompt));
      if (cursor >= inputs.length || (inputs.length === 1 && inputs[0] === "")) {
        throw new Error("input() needs a value — type it in the 'Program input' box, one per line.");
      }
      const v = inputs[cursor++];
      logs.push(`› ${v}`);
      return v;
    },
  };
  try {
    const js = transpilePython(code);
    const fn = new Function("__print", "__input", `"use strict";\n${js}`);
    fn(api.__print, api.__input);
    if (logs.length === 0) logs.push("✅ Ran with no output. Try print()!");
  } catch (err) {
    logs.push(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
  }
  return logs;
}

const langMeta: Record<Lang, { label: string; icon: typeof Braces; hint: string }> = {
  javascript: { label: "JavaScript", icon: Braces, hint: "Real JavaScript, executed safely in your browser." },
  python: { label: "Python", icon: FileCode2, hint: "Beginner Python (print, input, loops, if/else, functions). Provide input values below." },
  html: { label: "HTML + CSS + JS", icon: Globe, hint: "Live preview — write a full page with <style> and <script>." },
};

export function CodePlayground({ defaultLang = "javascript" as Lang }) {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [code, setCode] = useState(samples[defaultLang][0].code);
  const [stdin, setStdin] = useState("Ayu\n14");
  const [output, setOutput] = useState<string[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const switchLang = (l: Lang) => {
    setLang(l);
    setCode(samples[l][0].code);
    setOutput([]);
    setHasRun(false);
  };

  const run = () => {
    if (lang === "javascript") setOutput(runJavaScript(code));
    else if (lang === "python") setOutput(runPython(code, stdin));
    setHasRun(true);
  };

  const Meta = langMeta[lang];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {(Object.keys(langMeta) as Lang[]).map((l) => {
            const M = langMeta[l];
            const Icon = M.icon;
            return (
              <button
                key={l}
                onClick={() => switchLang(l)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-bold transition",
                  lang === l ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={15} /> {M.label}
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <select
            onChange={(e) => {
              const s = samples[lang].find((x) => x.name === e.target.value);
              if (s) {
                setCode(s.code);
                setOutput([]);
                setHasRun(false);
              }
            }}
            className="rounded-lg border border-input bg-background px-2.5 py-2 text-[13px] font-semibold"
            aria-label="Load sample"
          >
            {samples[lang].map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>
          <Button size="sm" variant="outline" onClick={() => { setCode(""); setOutput([]); setHasRun(false); }}>
            <Eraser size={14} /> Clear
          </Button>
          {lang !== "html" && (
            <Button size="sm" variant="primary" onClick={run}>
              <Play size={14} /> Run
            </Button>
          )}
        </div>
      </div>

      <p className="border-b border-border bg-indigo-500/5 px-4 py-2 text-xs font-medium text-muted-foreground">
        💡 {Meta.hint}
      </p>

      <div className={cn("grid", lang === "html" ? "lg:grid-cols-2" : "lg:grid-cols-[1fr_320px]")}>
        {/* Editor */}
        <div className="relative border-b border-border lg:border-b-0 lg:border-r">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            placeholder={lang === "html" ? "<!-- Write your page here -->" : "// Write your code here"}
            className="code-scroll h-[340px] w-full resize-y bg-[#0b0f1a] p-4 font-mono text-[13.5px] leading-6 text-slate-100 outline-none placeholder:text-slate-500"
          />
          <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-400">
            {lang === "javascript" ? "main.js" : lang === "python" ? "main.py" : "index.html"}
          </span>
        </div>

        {/* Output / preview */}
        {lang === "html" ? (
          <div className="flex min-h-[340px] flex-col bg-white">
            <p className="border-b border-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Live preview
            </p>
            <iframe title="preview" sandbox="allow-scripts" srcDoc={code} className="min-h-[300px] w-full flex-1" />
          </div>
        ) : (
          <div className="flex min-h-[340px] flex-col bg-[#0b0f1a]">
            {lang === "python" && (
              <div className="border-b border-white/10 p-3">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Program input (one value per line)
                </label>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  rows={2}
                  spellCheck={false}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-2 font-mono text-[13px] text-slate-100 outline-none focus:border-indigo-500"
                />
              </div>
            )}
            <div className="flex items-center justify-between px-4 py-2">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <Terminal size={13} /> Console
              </p>
              {hasRun && (
                <button onClick={() => { setOutput([]); setHasRun(false); }} className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-white">
                  <RotateCcw size={12} /> Clear
                </button>
              )}
            </div>
            <div className="code-scroll flex-1 space-y-1 overflow-y-auto p-4 pt-1 font-mono text-[13px] leading-6">
              {!hasRun ? (
                <p className="text-slate-500">Press <span className="font-bold text-indigo-400">Run</span> to execute your code…</p>
              ) : (
                output.map((line, i) => (
                  <p key={i} className={line.startsWith("❌") ? "text-red-400" : line.startsWith("›") ? "text-indigo-300" : "text-slate-200"}>
                    {line}
                  </p>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
