"use client";

import * as React from "react";
import { Layers, MousePointer2, Palette, Square, Trash2, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShapeKind = "rect" | "circle" | "text";

interface CanvasShape {
  id: string;
  kind: ShapeKind;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  radius: number;
  label?: string;
}

const palettes: Record<string, string[]> = {
  Palette: ["#6366F1", "#22D3EE", "#F472B6", "#F59E0B", "#10B981", "#1E293B", "#F8FAFC"],
  Canvas: ["#6366F1", "#22D3EE", "#F472B6", "#F59E0B", "#10B981", "#1E293B", "#F8FAFC"],
};

/**
 * A miniature design canvas — the teaching version of Figma.
 * Add shapes and text, drag them around, and edit fill, radius and size in the
 * inspector. In "auto" layout mode new shapes stack automatically, which is
 * exactly the mental model behind Figma's auto layout.
 */
export function DesignCanvas({
  mode = "canvas",
  layout = "free",
}: {
  mode?: string;
  layout?: string;
}) {
  const [shapes, setShapes] = React.useState<CanvasShape[]>(() =>
    mode === "palette"
      ? [
          { id: "s1", kind: "rect", x: 24, y: 24, width: 140, height: 140, fill: "#6366F1", radius: 20 },
          { id: "s2", kind: "rect", x: 176, y: 24, width: 140, height: 140, fill: "#22D3EE", radius: 20 },
          { id: "s3", kind: "rect", x: 24, y: 176, width: 140, height: 140, fill: "#F472B6", radius: 20 },
          { id: "s4", kind: "rect", x: 176, y: 176, width: 140, height: 140, fill: "#F59E0B", radius: 20 },
        ]
      : [
          { id: "s1", kind: "rect", x: 28, y: 28, width: 148, height: 148, fill: "#6366F1", radius: 18 },
          { id: "s2", kind: "circle", x: 196, y: 42, width: 84, height: 84, fill: "#22D3EE", radius: 42 },
          { id: "s3", kind: "text", x: 196, y: 142, width: 110, height: 34, fill: "#1E293B", radius: 8, label: "Hello" },
        ],
  );
  const [selectedId, setSelectedId] = React.useState<string | null>("s1");
  const [fill, setFill] = React.useState("#6366F1");
  const [radius, setRadius] = React.useState(18);
  const dragState = React.useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const selected = shapes.find((shape) => shape.id === selectedId) ?? null;
  const autoLayout = layout === "auto";

  const addShape = (kind: ShapeKind) => {
    const id = `s${Date.now()}`;
    const base = autoLayout
      ? { x: 24, y: 24 + shapes.length * 58 }
      : { x: 40 + shapes.length * 18, y: 40 + shapes.length * 18 };
    const shape: CanvasShape =
      kind === "rect"
        ? { id, kind, ...base, width: 140, height: 96, fill, radius }
        : kind === "circle"
          ? { id, kind, ...base, width: 96, height: 96, fill, radius: 48 }
          : { id, kind, ...base, width: 120, height: 36, fill: "#1E293B", radius: 8, label: "Text" };
    setShapes((current) => [...current, shape]);
    setSelectedId(id);
  };

  const onPointerDown = (event: React.PointerEvent, shape: CanvasShape) => {
    setSelectedId(shape.id);
    setFill(shape.fill);
    setRadius(shape.radius);
    if (autoLayout) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragState.current = {
      id: shape.id,
      offsetX: event.clientX - rect.left - shape.x,
      offsetY: event.clientY - rect.top - shape.y,
    };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragState.current) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { id, offsetX, offsetY } = dragState.current;
    const x = Math.max(0, Math.min(rect.width - 40, event.clientX - rect.left - offsetX));
    const y = Math.max(0, Math.min(rect.height - 30, event.clientY - rect.top - offsetY));
    setShapes((current) => current.map((shape) => (shape.id === id ? { ...shape, x, y } : shape)));
  };

  const endDrag = () => {
    dragState.current = null;
  };

  const updateSelected = (patch: Partial<CanvasShape>) => {
    if (!selectedId) return;
    setShapes((current) =>
      current.map((shape) => (shape.id === selectedId ? { ...shape, ...patch } : shape)),
    );
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1.5 rounded-lg bg-primary/12 px-2 py-1 text-[11px] font-bold text-primary">
            <MousePointer2 className="size-3" /> {autoLayout ? "Auto layout" : "Free canvas"}
          </span>
          <Button size="sm" variant="ghost" onClick={() => addShape("rect")}>
            <Square className="size-3.5" /> Rectangle
          </Button>
          <Button size="sm" variant="ghost" onClick={() => addShape("circle")}>
            <Layers className="size-3.5" /> Circle
          </Button>
          <Button size="sm" variant="ghost" onClick={() => addShape("text")}>
            <Type className="size-3.5" /> Text
          </Button>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setShapes([]);
            setSelectedId(null);
          }}
        >
          <Trash2 className="size-3.5" /> Clear
        </Button>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_220px]">
        <div
          ref={canvasRef}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="relative h-[320px] touch-none bg-[linear-gradient(0deg,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-[length:22px_22px]"
          style={{ backgroundSize: "22px 22px" }}
        >
          {autoLayout ? (
            <div className="absolute inset-4 space-y-2.5 rounded-2xl border-2 border-dashed border-primary/35 p-3">
              {shapes.map((shape) => (
                <div
                  key={shape.id}
                  onPointerDown={(event) => onPointerDown(event, shape)}
                  className={cn(
                    "flex h-12 cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-semibold text-white transition",
                    selectedId === shape.id ? "ring-2 ring-primary ring-offset-2" : "",
                  )}
                  style={{ background: shape.fill }}
                >
                  {shape.kind === "text" ? shape.label : shape.kind === "circle" ? "●" : "▭"}
                  <span className="text-[10px] font-medium opacity-80">
                    gap 10 · padding 12
                  </span>
                </div>
              ))}
              {shapes.length === 0 ? (
                <p className="text-xs text-muted-foreground">Add a shape to start stacking.</p>
              ) : null}
            </div>
          ) : (
            shapes.map((shape) => (
              <div
                key={shape.id}
                onPointerDown={(event) => onPointerDown(event, shape)}
                className={cn(
                  "absolute cursor-grab select-none transition-shadow active:cursor-grabbing",
                  selectedId === shape.id ? "ring-2 ring-primary ring-offset-1" : "",
                )}
                style={{
                  left: shape.x,
                  top: shape.y,
                  width: shape.width,
                  height: shape.height,
                  background: shape.fill,
                  borderRadius: shape.radius,
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                }}
                role="button"
                tabIndex={0}
                aria-label={`${shape.kind} shape`}
              >
                {shape.kind === "text" ? shape.label : null}
              </div>
            ))
          )}
        </div>

        <aside className="border-t border-border/60 p-3 lg:border-l lg:border-t-0">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <Palette className="size-3" /> Inspector
          </p>

          {selected ? (
            <div className="mt-3 space-y-3">
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground">Fill</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {(palettes[mode] ?? palettes.Canvas).map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setFill(color);
                        updateSelected({ fill: color });
                      }}
                      className={cn(
                        "size-6 rounded-lg border transition hover:scale-110",
                        selected.fill === color ? "border-primary ring-2 ring-primary/30" : "border-border",
                      )}
                      style={{ background: color }}
                      aria-label={`Set fill to ${color}`}
                    />
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Corner radius · {selected.radius}px
                </span>
                <input
                  type="range"
                  min={0}
                  max={Math.round(Math.min(selected.width, selected.height) / 2)}
                  value={selected.radius}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setRadius(value);
                    updateSelected({ radius: value });
                  }}
                  className="mt-1 w-full accent-[var(--primary)]"
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Width · {selected.width}px
                </span>
                <input
                  type="range"
                  min={40}
                  max={200}
                  value={selected.width}
                  onChange={(event) => updateSelected({ width: Number(event.target.value) })}
                  className="mt-1 w-full accent-[var(--primary)]"
                />
              </label>

              {selected.kind === "text" ? (
                <label className="block">
                  <span className="text-[11px] font-semibold text-muted-foreground">Text</span>
                  <input
                    value={selected.label ?? ""}
                    onChange={(event) => updateSelected({ label: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-input bg-card px-2 py-1 text-sm"
                  />
                </label>
              ) : null}
            </div>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">
              Select a shape on the canvas to edit its fill, radius and size.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
