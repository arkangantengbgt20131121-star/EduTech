"use client";

import * as React from "react";

/**
 * Tiny inline formatter for lesson copy: **bold**, *italic* and `code`.
 * Keeps the content files readable without pulling in a markdown library.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = React.useMemo(() => tokenize(text), [text]);
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === "bold") {
          return (
            <strong key={index} className="font-bold text-foreground">
              {part.value}
            </strong>
          );
        }
        if (part.type === "italic") {
          return (
            <em key={index} className="italic">
              {part.value}
            </em>
          );
        }
        if (part.type === "code") {
          return (
            <code
              key={index}
              className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] font-semibold text-primary"
            >
              {part.value}
            </code>
          );
        }
        return <React.Fragment key={index}>{part.value}</React.Fragment>;
      })}
    </span>
  );
}

interface Part {
  type: "text" | "bold" | "italic" | "code";
  value: string;
}

function tokenize(text: string): Part[] {
  const parts: Part[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith("**")) parts.push({ type: "bold", value: token.slice(2, -2) });
    else if (token.startsWith("`")) parts.push({ type: "code", value: token.slice(1, -1) });
    else parts.push({ type: "italic", value: token.slice(1, -1) });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }
  return parts;
}
