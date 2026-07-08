import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/quiz/types";

interface SliderScreenProps {
  question: Question;
  initial?: number;
  onChange: (value: number, unit: string) => void;
}

/** Custom horizontal ruler-style slider with unit toggle. */
export function SliderScreen({ question, initial, onChange }: SliderScreenProps) {
  const min = question.min ?? 0;
  const max = question.max ?? 100;
  const step = question.step ?? 1;
  const units = question.units ?? [{ id: "u", label: "" }];
  const [unit, setUnit] = useState(units[0].id);
  const [value, setValue] = useState<number>(initial ?? question.defaultValue ?? Math.round((min + max) / 2));
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onChange(value, unit);
  }, [value, unit, onChange]);

  const pct = ((value - min) / (max - min)) * 100;

  const handleFromClient = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rel = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = min + rel * (max - min);
    const snapped = Math.round(raw / step) * step;
    setValue(Math.max(min, Math.min(max, snapped)));
  };

  // ticks: every step, marker every 5
  const ticks: number[] = [];
  for (let v = min; v <= max; v += step) ticks.push(v);

  return (
    <div className="flex flex-col items-center gap-6">
      {units.length > 1 && (
        <div className="inline-flex rounded-full bg-muted p-1">
          {units.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setUnit(u.id)}
              className={`min-w-16 rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
                unit === u.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-extrabold text-foreground">{value}</span>
        <span className="text-lg font-medium text-muted-foreground">
          {units.find((u) => u.id === unit)?.label}
        </span>
      </div>

      <div
        ref={trackRef}
        className="relative h-16 w-full max-w-[340px] touch-none select-none"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          handleFromClient(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) handleFromClient(e.clientX);
        }}
      >
        {/* baseline */}
        <div className="absolute left-0 right-0 top-6 h-px bg-border-strong" />
        {/* ticks */}
        <div className="absolute left-0 right-0 top-2 flex justify-between">
          {ticks.map((t, i) => {
            const isMajor = t % 5 === 0;
            return (
              <div
                key={t}
                className={`w-px ${isMajor ? "h-5 bg-border-strong" : "h-2.5 bg-border"}`}
                style={{ opacity: i === 0 || i === ticks.length - 1 ? 0.6 : 1 }}
              />
            );
          })}
        </div>
        {/* labels */}
        <div className="absolute left-0 right-0 top-8 flex justify-between text-[11px] font-medium text-muted-foreground">
          {ticks
            .filter((t) => t % 10 === 0)
            .map((t) => (
              <span key={t} style={{ transform: "translateX(-50%)" }}>
                {t}
              </span>
            ))}
        </div>
        {/* pointer */}
        <motion.div
          className="absolute top-0 -ml-2 flex flex-col items-center"
          style={{ left: `${pct}%` }}
          animate={{ left: `${pct}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          <div className="h-6 w-0.5 rounded-full bg-primary" />
          <div className="mt-0.5 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary" />
        </motion.div>
      </div>
      <p className="-mt-2 text-xs text-muted-foreground">Arraste para ajustar</p>
    </div>
  );
}
