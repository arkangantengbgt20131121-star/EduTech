"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";
import { useEduTech } from "@/lib/store";
import { Button, Progress } from "./ui";
import { cn } from "@/lib/utils";

export function QuizRunner({ quiz, lessonId }: { quiz: QuizQuestion[]; lessonId: string }) {
  const { recordQuizAce } = useEduTech();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quiz[index];
  const correct = picked === q.answer;

  const check = () => {
    if (picked === null) return;
    setChecked(true);
    if (picked === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= quiz.length) {
      setFinished(true);
      const finalScore = score + (picked === q.answer && !checked ? 1 : 0);
      // score state may lag by the current question; compute directly
      if (finalScore === quiz.length) recordQuizAce(lessonId);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
      setChecked(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / quiz.length) * 100);
    const passed = score >= Math.ceil(quiz.length * 0.67);
    const perfect = score === quiz.length;
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div
          className={cn(
            "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl",
            perfect ? "bg-amber-500/15 text-amber-500" : passed ? "bg-emerald-500/15 text-emerald-500" : "bg-indigo-500/15 text-indigo-500"
          )}
        >
          <Trophy size={30} />
        </div>
        <h3 className="mt-4 text-2xl font-black">
          {perfect ? "Perfect score! 🏆" : passed ? "Quiz passed! 🎉" : "Good try — review & retry! 💪"}
        </h3>
        <p className="mt-2 text-muted-foreground">
          You scored {score} out of {quiz.length} ({pct}%)
          {perfect && " — Quiz Ace badge progress updated!"}
        </p>
        <div className="mx-auto mt-5 max-w-xs">
          <Progress value={pct} barClassName={passed ? "from-emerald-500 to-teal-500" : "from-indigo-500 to-violet-500"} />
        </div>
        <Button variant="outline" onClick={restart} className="mt-6">
          <RotateCcw size={16} /> Retake quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-muted-foreground">
          Question {index + 1} of {quiz.length}
        </span>
        <span className="text-indigo-500">Score: {score}</span>
      </div>
      <Progress value={((index + (checked ? 1 : 0)) / quiz.length) * 100} className="mt-3" />

      <h3 className="mt-6 text-lg font-black leading-snug sm:text-xl">{q.question}</h3>

      <div className="mt-5 grid gap-3">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isPicked = i === picked;
          return (
            <button
              key={i}
              disabled={checked}
              onClick={() => setPicked(i)}
              className={cn(
                "flex items-center gap-3 rounded-xl border-2 p-4 text-left text-[15px] font-medium transition",
                !checked && !isPicked && "border-border hover:border-indigo-400 hover:bg-indigo-500/5",
                !checked && isPicked && "border-indigo-500 bg-indigo-500/10",
                checked && isAnswer && "border-emerald-500 bg-emerald-500/10",
                checked && isPicked && !isAnswer && "border-red-500 bg-red-500/10",
                checked && !isPicked && !isAnswer && "border-border opacity-60"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black",
                  checked && isAnswer
                    ? "bg-emerald-500 text-white"
                    : checked && isPicked && !isAnswer
                      ? "bg-red-500 text-white"
                      : isPicked
                        ? "bg-indigo-500 text-white"
                        : "bg-muted text-muted-foreground"
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {checked && isAnswer && <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />}
              {checked && isPicked && !isAnswer && <XCircle size={20} className="shrink-0 text-red-500" />}
            </button>
          );
        })}
      </div>

      {checked && (
        <div
          className={cn(
            "mt-5 rounded-xl border p-4 text-sm leading-relaxed animate-fade-up",
            correct
              ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300"
              : "border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300"
          )}
        >
          <strong>{correct ? "✅ Correct! " : "💡 Not quite. "}</strong>
          {q.explanation}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="ghost"
          disabled={index === 0}
          onClick={() => {
            setIndex((i) => i - 1);
            setPicked(null);
            setChecked(false);
          }}
        >
          <ArrowLeft size={16} /> Back
        </Button>
        {!checked ? (
          <Button variant="primary" disabled={picked === null} onClick={check}>
            Check answer
          </Button>
        ) : (
          <Button variant="primary" onClick={next}>
            {index + 1 >= quiz.length ? "See results" : "Next question"} <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
