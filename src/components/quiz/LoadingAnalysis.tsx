import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import type { LoadingStep } from "@/quiz/types";
import { ProgressBar } from "./ProgressBar";

interface LoadingAnalysisProps {
  steps: LoadingStep[];
  onComplete: () => void;
}

/** Simulated AI-analysis loading with checklist + progress. */
export function LoadingAnalysis({ steps, onComplete }: LoadingAnalysisProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) {
      const t = setTimeout(onComplete, 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrent((i) => i + 1), steps[current].durationMs);
    return () => clearTimeout(t);
  }, [current, steps, onComplete]);

  const progress = Math.min(1, current / steps.length);

  return (
    <div className="flex flex-1 flex-col justify-center gap-8 px-6 py-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Analisando suas respostas</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Estamos montando seu protocolo personalizado
        </p>
      </div>

      <ProgressBar value={progress} />

      <ul className="flex flex-col gap-3">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: done || active ? 1 : 0.4, y: 0 }}
              className="flex items-center gap-3 text-sm"
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "bg-primary-soft text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                ) : active ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : null}
              </span>
              <span className={done || active ? "text-foreground" : "text-muted-foreground"}>
                {s.label}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
