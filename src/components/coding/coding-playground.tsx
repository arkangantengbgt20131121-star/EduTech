"use client";

import * as React from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  Eraser,
  Lightbulb,
  Play,
  RotateCcw,
  Terminal,
  WrapText,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeEditor } from "@/components/coding/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { runPython, type RunResult } from "@/lib/engine/python";
import type { CodeLanguage } from "@/data/types";

export interface PlaygroundStarter {
  label: string;
  code: string;
  hint?: string;
}

interface CodingPlaygroundProps {
  language?: CodeLanguage;
  initialCode: string;
  /** Left panel: what the student should try to achieve. */
  title?: string;
  instructions?: string[];
  starters?: PlaygroundStarter[];
  /** Extra notes shown under the instructions (e.g. lesson tips). */
  notes?: string[];
  height?: string;
  className?: string;
}

const languageLabels: Record<CodeLanguage, string> = {
  python: "Python 3",
  javascript: "JavaScript",
  html: "HTML · CSS · JS",
  makecode: "MakeCode",
};

export function CodingPlayground({
  language = "python",
  initialCode,
  title = "Coding playground",
  instructions = [
    "Read the code and predict what it will print.",
    "Press Run (or Ctrl + Enter) to see the result.",
    "Change one thing, run again and compare.",
  ],
  starters = [],
  notes = [],
  height = "420px",
  className,
}: CodingPlaygroundProps) {
  const [code, setCode] = React.useState(initialCode);
  const [stdin, setStdin] = React.useState("");
  const [result, setResult] = React.useState<RunResult | null>(null);
  const [running, setRunning] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("output");
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  const isHtml = language === "html";

  const runPythonCode = React.useCallback(() => {
    setRunning(true);
    // Give the button a frame to show its pressed state, then run synchronously.
    window.setTimeout(() => {
      const inputLines = stdin.split("\n").filter((line) => line.length > 0);
      const outcome = runPython(code, { stdin: inputLines });
      setResult(outcome);
      setRunning(false);
      setActiveTab(outcome.error ? "errors" : "output");
      if (outcome.error) {
        toast.error("Your program hit an error", {
          description: outcome.error.message,
        });
      } else {
        toast.success("Program finished", {
          description: outcome.output.length
            ? `${outcome.output.length} line${outcome.output.length === 1 ? "" : "s"} of output`
            : "No output — try adding a print() statement",
        });
      }
    }, 60);
  }, [code, stdin]);

  const runHtml = React.useCallback(() => {
    setRunning(true);
    setActiveTab("preview");
    const frame = iframeRef.current;
    if (!frame) return;
    const errorBridge = `
      <script>
        window.onerror = function (message, source, line, column) {
          parent.postMessage({ type: "edutech-error", message: message, line: line }, "*");
          return true;
        };
        const originalLog = console.log;
        console.log = function (...args) {
          parent.postMessage({ type: "edutech-log", message: args.map(String).join(" ") }, "*");
          originalLog.apply(console, args);
        };
      </script>`;
    const document_ = /<html/i.test(code)
      ? code.replace(/<head>/i, `<head>${errorBridge}`)
      : `<!DOCTYPE html><html><head>${errorBridge}<meta name="viewport" content="width=device-width, initial-scale=1" /></head><body>${code}</body></html>`;
    frame.srcdoc = document_;
    window.setTimeout(() => setRunning(false), 300);
  }, [code]);

  const run = React.useCallback(() => {
    if (isHtml) runHtml();
    else if (language === "python") runPythonCode();
    else runHtml();
  }, [isHtml, language, runHtml, runPythonCode]);

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; message?: string; line?: number };
      if (data?.type === "edutech-error") {
        setResult({
          output: [],
          error: { message: data.message ?? "JavaScript error", line: data.line },
          steps: 0,
          variables: {},
        });
        setActiveTab("errors");
      }
      if (data?.type === "edutech-log") {
        setResult((current) => ({
          output: [...(current?.output ?? []), data.message ?? ""],
          error: current?.error,
          steps: 0,
          variables: current?.variables ?? {},
        }));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to your clipboard");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed — select the code and copy manually");
    }
  };

  const outputLines = result?.output ?? [];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lg",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2 text-sm font-bold">{title}</span>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {languageLabels[language]}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Button size="sm" variant="ghost" onClick={copyCode} className="gap-1.5">
            {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
            <span className="hidden sm:inline">Copy</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setCode(initialCode);
              setResult(null);
              setStdin("");
              toast.info("Code reset to the original example");
            }}
            className="gap-1.5"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button size="sm" variant="gradient" onClick={run} disabled={running} className="gap-1.5">
            <Play className="size-3.5" />
            {running ? "Running…" : "Run"}
          </Button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(240px,1fr)_minmax(0,1.6fr)_minmax(0,1.35fr)]">
        {/* Instructions */}
        <aside className="border-b border-border/60 p-4 lg:border-b-0 lg:border-r">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="size-3.5" /> Your task
          </p>
          <ol className="mt-2.5 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {instructions.map((instruction, index) => (
              <li key={instruction} className="flex gap-2">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/12 text-[11px] font-bold text-primary">
                  {index + 1}
                </span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>

          {starters.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Try an example
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {starters.map((starter) => (
                  <button
                    key={starter.label}
                    onClick={() => {
                      setCode(starter.code);
                      toast.info(`Loaded example: ${starter.label}`);
                    }}
                    className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                  >
                    {starter.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {notes.length > 0 ? (
            <div className="mt-4 space-y-2 rounded-2xl bg-muted/50 p-3">
              {notes.map((note) => (
                <p key={note} className="text-xs leading-relaxed text-muted-foreground">
                  💡 {note}
                </p>
              ))}
            </div>
          ) : null}
        </aside>

        {/* Editor */}
        <section className="border-b border-border/60 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border/50 px-3 py-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Editor
            </span>
            <span className="text-[11px] text-muted-foreground">Ctrl + Enter to run</span>
          </div>
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            minHeight={height}
            onRun={run}
          />
          {language === "python" ? (
            <div className="border-t border-border/50 p-3">
              <label
                htmlFor="playground-stdin"
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
              >
                <Terminal className="size-3.5" /> Program input (one value per line)
              </label>
              <Textarea
                id="playground-stdin"
                value={stdin}
                onChange={(event) => setStdin(event.target.value)}
                placeholder={"Used by input()\nFor example:\nAlya\n12"}
                className="mt-2 min-h-16 font-mono text-xs"
              />
            </div>
          ) : null}
        </section>

        {/* Output */}
        <section className="min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between border-b border-border/50 px-3 py-1.5">
              <TabsList className="border-0 bg-transparent p-0">
                <TabsTrigger value="output" className="px-2.5 py-1 text-xs">
                  Output
                </TabsTrigger>
                {language !== "python" ? (
                  <TabsTrigger value="preview" className="px-2.5 py-1 text-xs">
                    Preview
                  </TabsTrigger>
                ) : null}
                <TabsTrigger value="errors" className="px-2.5 py-1 text-xs">
                  Errors
                  {result?.error ? (
                    <span className="ml-1 size-1.5 rounded-full bg-destructive" />
                  ) : null}
                </TabsTrigger>
                {language === "python" ? (
                  <TabsTrigger value="variables" className="px-2.5 py-1 text-xs">
                    Variables
                  </TabsTrigger>
                ) : null}
              </TabsList>
              {outputLines.length > 0 ? (
                <button
                  onClick={() => setResult({ output: [], error: result?.error, steps: 0, variables: {} })}
                  className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground transition hover:text-foreground"
                >
                  <Eraser className="size-3" /> Clear
                </button>
              ) : null}
            </div>

            <TabsContent value="output">
              <OutputPanel
                lines={outputLines}
                emptyMessage={
                  isHtml || language === "javascript"
                    ? "Press Run to render your page — the result appears in the Preview tab."
                    : "No output yet. Press Run to execute your program."
                }
              />
            </TabsContent>

            {language !== "python" ? (
              <TabsContent value="preview">
                <div className="p-3">
                  <iframe
                    ref={iframeRef}
                    title="Rendered output preview"
                    sandbox="allow-scripts allow-modals allow-forms"
                    className="h-[320px] w-full rounded-xl border border-border/70 bg-white"
                  />
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <WrapText className="size-3" /> Preview runs in a sandbox, exactly like a real
                    browser tab.
                  </p>
                </div>
              </TabsContent>
            ) : null}

            <TabsContent value="errors">
              <div className="p-3">
                {result?.error ? (
                  <div className="animate-shake rounded-xl border border-destructive/40 bg-destructive/8 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-destructive">
                      <AlertTriangle className="size-3.5" />
                      {result.error.line ? `Line ${result.error.line}` : "Error"}
                    </p>
                    <p className="mt-1.5 font-mono text-xs leading-relaxed text-foreground/90">
                      {result.error.message}
                    </p>
                    {result.error.hint ? (
                      <p className="mt-2 rounded-lg bg-card/70 p-2 text-xs text-muted-foreground">
                        💡 {result.error.hint}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-xl border border-success/30 bg-success/8 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-[color-mix(in_oklab,var(--success)_75%,var(--foreground))]">
                      <Check className="size-3.5" /> No errors
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Nothing to fix right now. Try breaking your code on purpose to see how Python
                      reports problems.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {language === "python" ? (
              <TabsContent value="variables">
                <div className="p-3">
                  {result && Object.keys(result.variables).length > 0 ? (
                    <ul className="space-y-1.5">
                      {Object.entries(result.variables).map(([name, value]) => (
                        <li
                          key={name}
                          className="flex items-center justify-between gap-3 rounded-lg border border-border/60 px-2.5 py-1.5 font-mono text-xs"
                        >
                          <span className="text-primary">{name}</span>
                          <span className="truncate text-muted-foreground">{value}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Values appear here after you run a program that creates variables.
                    </p>
                  )}
                  {result ? (
                    <p className="mt-3 text-[11px] text-muted-foreground">
                      Executed in {result.steps.toLocaleString()} interpreter steps.
                    </p>
                  ) : null}
                </div>
              </TabsContent>
            ) : null}
          </Tabs>
        </section>
      </div>
    </div>
  );
}

function OutputPanel({ lines, emptyMessage }: { lines: string[]; emptyMessage: string }) {
  const endRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  return (
    <div className="p-3" aria-live="polite">
      <div className="max-h-[320px] min-h-[240px] overflow-auto rounded-xl border border-border/70 bg-slate-950 p-3 font-mono text-xs leading-relaxed text-slate-100">
        {lines.length === 0 ? (
          <p className="text-slate-500">{emptyMessage}</p>
        ) : (
          lines.map((line, index) => (
            <p key={`${index}-${line}`} className="whitespace-pre-wrap break-words">
              <span className="mr-2 select-none text-slate-600">{String(index + 1).padStart(2, "0")}</span>
              {line}
            </p>
          ))
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
