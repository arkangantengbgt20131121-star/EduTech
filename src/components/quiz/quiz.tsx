"use client";

import * as React from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useProgress } from "@/components/progress/progress-provider";
import type { QuizQuestion } from "@/data/types";

interface QuizProps {
  lessonId: string;
  questions: QuizQuestion[];
  onComplete?: (correct: number, total: number, xp: number) => void;
  onNext?: () => void;
}

type AnswerValue = string | boolean | number | number[] | Record<number, string>;

export function Quiz({ lessonId, questions, onComplete, onNext }: QuizProps) {
  const { recordQuiz } = useProgress();
  const [answers, setAnswers] = React.useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [showReview, setShowReview] = React.useState(true);

  const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);

  const correctness = React.useMemo(
    () =>
      questions.map((question) => ({
        id: question.id,
        correct: checkAnswer(question, answers[question.id]),
      })),
    [answers, questions],
  );

  const correctCount = correctness.filter((entry) => entry.correct).length;
  const earnedPoints = questions.reduce(
    (sum, question, index) => (correctness[index].correct ? sum + question.points : sum),
    0,
  );
  const score = Math.round((earnedPoints / totalPoints) * 100);
  const answeredCount = questions.filter((question) => isAnswered(question, answers[question.id])).length;

  const submit = () => {
    if (answeredCount < questions.length) {
      toast.error("Answer every question first", {
        description: `${questions.length - answeredCount} question${questions.length - answeredCount === 1 ? "" : "s"} still need an answer.`,
      });
      return;
    }
    setSubmitted(true);
    const xp = earnedPoints;
    recordQuiz(lessonId, correctCount, questions.length, xp);
    onComplete?.(correctCount, questions.length, xp);
    if (correctCount === questions.length) {
      toast.success("Perfect score! 🎉", { description: `+${xp} XP added to your profile` });
      void fireConfetti();
    } else if (correctCount >= questions.length / 2) {
      toast.info(`${correctCount}/${questions.length} correct`, { description: `+${xp} XP earned — review the explanations below.` });
    } else {
      toast.warning("Keep learning", { description: "Re-read the lesson and try again — mistakes are how you learn." });
    }
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section id="quiz" className="rounded-3xl border border-border/70 bg-card p-4 shadow-sm sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-black tracking-tight">
            <Sparkles className="size-5 text-primary" /> Check your understanding
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {questions.length} question{questions.length === 1 ? "" : "s"} · up to {totalPoints} XP
          </p>
        </div>
        <Badge variant={submitted ? (correctCount === questions.length ? "success" : "secondary") : "outline"}>
          {submitted ? "Submitted" : `${answeredCount}/${questions.length} answered`}
        </Badge>
      </header>

      {!submitted ? (
        <div className="mt-4">
          <Progress value={Math.round((answeredCount / questions.length) * 100)} className="h-1.5" />
        </div>
      ) : (
        <div className="mt-4 animate-pop rounded-2xl border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_12%,transparent),color-mix(in_oklab,var(--brand-cyan)_10%,transparent))] p-5 text-center">
          <p className="text-4xl font-black tracking-tight">
            {correctCount} / {questions.length} Correct{" "}
            {correctCount === questions.length ? "🎉" : correctCount >= questions.length / 2 ? "👍" : "💪"}
          </p>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-sm font-bold text-primary shadow-sm">
            <Trophy className="size-3.5" /> +{earnedPoints} XP · {score}%
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {correctCount === questions.length
              ? "Flawless. Ready for something harder?"
              : score >= 60
                ? "Solid work — read the explanations for the ones you missed."
                : "Keep learning! Review the lesson and try again — that is how it sticks."}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Button variant="secondary" size="sm" onClick={retry} className="gap-1.5">
              <RotateCcw className="size-3.5" /> Try again
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowReview((value) => !value)} className="gap-1.5">
              {showReview ? "Hide" : "Show"} explanations <ChevronDown className={cn("size-3.5 transition", showReview && "rotate-180")} />
            </Button>
            {onNext ? (
              <Button variant="gradient" size="sm" onClick={onNext} className="gap-1.5">
                Next lesson <ArrowRight className="size-3.5" />
              </Button>
            ) : null}
          </div>
        </div>
      )}

      <ol className="mt-6 space-y-6">
        {questions.map((question, index) => {
          const isCorrect = correctness[index]?.correct;
          return (
            <li key={question.id} className="animate-fade-up">
              <QuizQuestionView
                index={index}
                question={question}
                value={answers[question.id]}
                onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))}
                submitted={submitted && showReview}
                isCorrect={isCorrect}
              />
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="gradient" size="lg" onClick={submit} className="gap-2">
            Submit answers <ArrowRight className="size-4" />
          </Button>
          <p className="text-xs text-muted-foreground">
            You can retry as many times as you like — your best score is saved.
          </p>
        </div>
      ) : null}
    </section>
  );
}

function QuizQuestionView({
  index,
  question,
  value,
  onChange,
  submitted,
  isCorrect,
}: {
  index: number;
  question: QuizQuestion;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  submitted: boolean;
  isCorrect?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-colors",
        submitted && isCorrect && "border-[color-mix(in_oklab,var(--success)_45%,transparent)] bg-[color-mix(in_oklab,var(--success)_6%,transparent)]",
        submitted && !isCorrect && "border-destructive/40 bg-destructive/5",
        !submitted && "border-border/70",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[15px] font-semibold leading-relaxed">
          <span className="mr-2 text-muted-foreground">{index + 1}.</span>
          {question.prompt}
        </p>
        <div className="flex shrink-0 items-center gap-1.5">
          <Badge variant="outline" className="capitalize">
            {question.type === "multipleChoice"
              ? "Multiple choice"
              : question.type === "trueFalse"
                ? "True / false"
                : question.type === "fillBlank"
                  ? "Fill in the blank"
                  : "Matching"}
          </Badge>
          {submitted ? (
            isCorrect ? (
              <span className="grid size-6 place-items-center rounded-full bg-success text-success-foreground">
                <Check className="size-3.5" />
              </span>
            ) : (
              <span className="grid size-6 place-items-center rounded-full bg-destructive text-destructive-foreground">
                <X className="size-3.5" />
              </span>
            )
          ) : null}
        </div>
      </div>

      <div className="mt-3.5">
        {question.type === "multipleChoice" ? (
          <div className="grid gap-2">
            {question.options.map((option, optionIndex) => {
              const isSelected = value === optionIndex;
              const isAnswer = question.answer === optionIndex;
              return (
                <button
                  key={option}
                  onClick={() => !submitted && onChange(optionIndex)}
                  disabled={submitted}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all",
                    !submitted && isSelected && "border-primary bg-primary/8 shadow-[0_8px_20px_-16px_var(--primary)]",
                    !submitted && !isSelected && "border-border hover:border-primary/40 hover:bg-muted/50",
                    submitted && isAnswer && "border-[color-mix(in_oklab,var(--success)_50%,transparent)] bg-[color-mix(in_oklab,var(--success)_10%,transparent)]",
                    submitted && !isAnswer && isSelected && "border-destructive/50 bg-destructive/8",
                    submitted && !isAnswer && !isSelected && "border-border opacity-60",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold",
                      isSelected || (submitted && isAnswer) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      submitted && isAnswer && "bg-success text-success-foreground",
                    )}
                  >
                    {submitted && isAnswer ? <Check className="size-3.5" /> : String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {question.type === "trueFalse" ? (
          <div className="flex gap-2">
            {[true, false].map((option) => {
              const isSelected = value === option;
              const isAnswer = question.answer === option;
              return (
                <button
                  key={String(option)}
                  onClick={() => !submitted && onChange(option)}
                  disabled={submitted}
                  className={cn(
                    "flex-1 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-all",
                    !submitted && isSelected && "border-primary bg-primary/8 text-primary",
                    !submitted && !isSelected && "border-border hover:border-primary/40 hover:bg-muted/50",
                    submitted && isAnswer && "border-[color-mix(in_oklab,var(--success)_50%,transparent)] bg-[color-mix(in_oklab,var(--success)_10%,transparent)]",
                    submitted && !isAnswer && isSelected && "border-destructive/50 bg-destructive/8",
                    submitted && !isAnswer && !isSelected && "border-border opacity-60",
                  )}
                >
                  {option ? "True" : "False"}
                </button>
              );
            })}
          </div>
        ) : null}

        {question.type === "fillBlank" ? (
          <div>
            <Input
              value={typeof value === "string" ? value : ""}
              onChange={(event) => onChange(event.target.value)}
              disabled={submitted}
              placeholder={question.placeholder ?? "Type your answer"}
              aria-label="Your answer"
              className={cn(
                "font-mono",
                submitted && isCorrect && "border-[color-mix(in_oklab,var(--success)_50%,transparent)]",
                submitted && !isCorrect && "border-destructive/50",
              )}
            />
            {question.hint && !submitted ? (
              <p className="mt-2 text-xs text-muted-foreground">💡 {question.hint}</p>
            ) : null}
          </div>
        ) : null}

        {question.type === "matching" ? (
          <MatchingInput
            question={question}
            value={(value as Record<number, string>) ?? {}}
            onChange={onChange}
            submitted={submitted}
          />
        ) : null}
      </div>

      {submitted ? (
        <div
          className={cn(
            "mt-3.5 rounded-xl p-3 text-sm leading-relaxed",
            isCorrect
              ? "bg-[color-mix(in_oklab,var(--success)_10%,transparent)] text-foreground/85"
              : "bg-muted/60 text-foreground/85",
          )}
        >
          <p className="font-bold">
            {isCorrect ? "Correct ✓" : `Not quite — the answer is: ${correctAnswerText(question)}`}
          </p>
          <p className="mt-1 text-muted-foreground">{question.explanation}</p>
        </div>
      ) : null}
    </div>
  );
}

function MatchingInput({
  question,
  value,
  onChange,
  submitted,
}: {
  question: Extract<QuizQuestion, { type: "matching" }>;
  value: Record<number, string>;
  onChange: (value: Record<number, string>) => void;
  submitted: boolean;
}) {
  const options = React.useMemo(
    () => question.pairs.map((pair) => pair.right).sort((a, b) => a.localeCompare(b)),
    [question.pairs],
  );
  const [activeLeft, setActiveLeft] = React.useState<number | null>(null);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Tap an item, then its match
        </p>
        {question.pairs.map((pair, index) => {
          const assigned = value[index];
          const correct = assigned === pair.right;
          return (
            <button
              key={pair.left}
              onClick={() => !submitted && setActiveLeft(index)}
              disabled={submitted}
              className={cn(
                "w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                activeLeft === index && "border-primary bg-primary/8",
                activeLeft !== index && "border-border hover:border-primary/40",
                submitted && correct && "border-[color-mix(in_oklab,var(--success)_50%,transparent)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)]",
                submitted && !correct && "border-destructive/50 bg-destructive/6",
              )}
            >
              <span className="font-semibold">{pair.left}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {assigned ? `→ ${assigned}` : "Not matched yet"}
              </span>
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Matching options
        </p>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              if (submitted || activeLeft === null) return;
              onChange({ ...value, [activeLeft]: option });
              setActiveLeft(null);
            }}
            disabled={submitted || activeLeft === null}
            className="w-full rounded-xl border border-border px-3 py-2 text-left text-sm transition hover:border-primary/40 disabled:opacity-60"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- Utilities -------------------------------- */

function isAnswered(question: QuizQuestion, value: AnswerValue | undefined): boolean {
  if (value === undefined || value === null) return false;
  if (question.type === "matching") {
    const record = value as Record<number, string>;
    return Object.keys(record).length === question.pairs.length;
  }
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

function checkAnswer(question: QuizQuestion, value: AnswerValue | undefined): boolean {
  if (!isAnswered(question, value)) return false;
  switch (question.type) {
    case "multipleChoice":
      return value === question.answer;
    case "trueFalse":
      return value === question.answer;
    case "fillBlank": {
      const normalise = (text: string) =>
        text
          .toString()
          .trim()
          .toLowerCase()
          .replace(/[.,!?;:"'`]/g, "")
          .replace(/\s+/g, " ");
      return question.answer.some((accepted) => normalise(accepted) === normalise(String(value)));
    }
    case "matching": {
      const record = value as Record<number, string>;
      return question.pairs.every((pair, index) => record[index] === pair.right);
    }
    default:
      return false;
  }
}

function correctAnswerText(question: QuizQuestion): string {
  switch (question.type) {
    case "multipleChoice":
      return question.options[question.answer];
    case "trueFalse":
      return question.answer ? "True" : "False";
    case "fillBlank":
      return question.answer[0];
    case "matching":
      return question.pairs.map((pair) => `${pair.left} → ${pair.right}`).join("; ");
    default:
      return "";
  }
}

async function fireConfetti() {
  try {
    const confettiModule = await import("canvas-confetti");
    const launch = confettiModule.default;
    launch({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: ["#6366f1", "#22d3ee", "#f472b6", "#f59e0b"] });
    window.setTimeout(
      () => launch({ particleCount: 60, spread: 100, origin: { x: 0.2, y: 0.6 } }),
      200,
    );
    window.setTimeout(
      () => launch({ particleCount: 60, spread: 100, origin: { x: 0.8, y: 0.6 } }),
      380,
    );
  } catch {
    // Confetti is a nice-to-have; never let it break the quiz.
  }
}
