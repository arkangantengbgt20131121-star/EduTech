"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { useMounted } from "@/lib/hooks";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";

import { cn } from "@/lib/utils";
import type { CodeLanguage } from "@/data/types";

const lightTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent",
    fontSize: "13px",
  },
  ".cm-content": {
    fontFamily: "var(--font-mono)",
    padding: "14px 0",
    caretColor: "#6366f1",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "1px solid rgba(148,163,184,0.18)",
    color: "#94a3b8",
  },
  ".cm-activeLine": { backgroundColor: "rgba(99,102,241,0.06)" },
  ".cm-activeLineGutter": { backgroundColor: "transparent", color: "#6366f1" },
  ".cm-selectionBackground, ::selection": { backgroundColor: "rgba(99,102,241,0.18) !important" },
  "&.cm-focused": { outline: "none" },
  ".cm-scroller": { fontFamily: "var(--font-mono)", lineHeight: "1.65" },
});

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language: CodeLanguage;
  readOnly?: boolean;
  minHeight?: string;
  onRun?: () => void;
  className?: string;
}

export function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  minHeight = "320px",
  onRun,
  className,
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const extensions = React.useMemo(() => {
    const lang =
      language === "python"
        ? python()
        : language === "html"
          ? html({ autoCloseTags: true })
          : javascript({ jsx: false, typescript: false });

    const runKeymap = EditorView.domEventHandlers({
      keydown: (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          onRun?.();
          return true;
        }
        return false;
      },
    });

    return [lang, lightTheme, runKeymap, EditorView.lineWrapping];
  }, [language, onRun]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={extensions}
        theme={isDark ? oneDark : "light"}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          bracketMatching: true,
          autocompletion: true,
          indentOnInput: true,
          tabSize: 4,
        }}
        style={{ minHeight, fontSize: "13px" }}
        className="[&_.cm-editor]:bg-transparent [&_.cm-editor]:outline-none"
      />
    </div>
  );
}
