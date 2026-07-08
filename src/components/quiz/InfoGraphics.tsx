import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EnergyChartProps {}

/** "Sabemos como mantê-lo em forma" — HOJE vs DEPOIS bar chart. */
export function EnergyChart(_: EnergyChartProps) {
  return (
    <div className="relative mx-auto flex h-64 w-full max-w-[380px] items-end gap-6 rounded-2xl bg-muted/40 p-4">
      {/* dividers */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-px w-full bg-border" />
        ))}
      </div>

      {/* HOJE column */}
      <div className="relative flex flex-1 items-end justify-center gap-2">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "88%" }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="w-8 rounded-t-md bg-[oklch(0.68_0.20_25)]"
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "52%" }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-8 rounded-t-md bg-[oklch(0.85_0.10_25)]"
        />
        <span className="absolute -top-1 left-2 rounded-md bg-[oklch(0.95_0.05_75)] px-1.5 py-0.5 text-[9px] font-bold text-[oklch(0.45_0.15_75)]">
          CALORIAS VAZIAS 😩 ↑
        </span>
      </div>

      {/* DEPOIS column */}
      <div className="relative flex flex-1 items-end justify-center gap-2">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "40%" }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="w-8 rounded-t-md bg-[oklch(0.85_0.08_175)]"
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "85%" }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="w-8 rounded-t-md bg-primary"
        />
        <span className="absolute -top-1 right-2 rounded-md bg-[oklch(0.95_0.05_75)] px-1.5 py-0.5 text-[9px] font-bold text-[oklch(0.45_0.15_75)]">
          ENERGIA ⚡ ↑
        </span>
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-[10px] font-bold text-muted-foreground">
        <span className="flex-1 text-center">HOJE</span>
        <span className="flex-1 text-center">DEPOIS</span>
      </div>
    </div>
  );
}

/** Metabolism decline chart with bars + red weight line. */
export function MetabolismChart() {
  const bars = [82, 76, 66, 48, 38, 30, 26, 24];
  return (
    <div className="relative mx-auto flex h-56 w-full max-w-[380px] items-end gap-1.5 rounded-2xl bg-muted/40 p-4">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.05 * i, duration: 0.6 }}
          className="flex-1 rounded-t-md bg-gradient-to-t from-[oklch(0.78_0.18_60)] to-[oklch(0.86_0.15_75)]"
        />
      ))}
      {/* weight curve (SVG overlay) */}
      <svg
        viewBox="0 0 200 120"
        className="pointer-events-none absolute inset-4"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 30 C 40 30, 70 50, 110 80 S 180 110, 200 115"
          fill="none"
          stroke="oklch(0.65 0.20 25)"
          strokeWidth="2.5"
        />
      </svg>
      <div className="pointer-events-none absolute right-6 top-6 rounded-md bg-[oklch(0.65_0.20_25)] px-2 py-0.5 text-[10px] font-bold text-white">
        Peso
      </div>
      <div className="pointer-events-none absolute bottom-6 left-6 rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
        Metabolismo
      </div>
    </div>
  );
}

/** Face transformation — 3 placeholders showing progressive slimming. */
export function FaceTransform() {
  return (
    <div className="mx-auto grid w-full max-w-[380px] grid-cols-3 gap-1.5">
      {[
        { emoji: "😐", tint: "oklch(0.90 0.08 30)" },
        { emoji: "🙂", tint: "oklch(0.82 0.06 40)" },
        { emoji: "😊", tint: "oklch(0.80 0.10 50)" },
      ].map((f, i) => (
        <div
          key={i}
          className="grid aspect-[3/4] place-items-center rounded-lg text-6xl"
          style={{ backgroundColor: f.tint }}
        >
          {f.emoji}
        </div>
      ))}
    </div>
  );
}

/** Trio of men illustration (social proof). */
export function TrioMen() {
  return (
    <div className="mx-auto flex w-full max-w-[300px] items-end justify-center gap-2">
      {["🧍‍♂️", "🏋️‍♂️", "🧍‍♂️"].map((e, i) => (
        <motion.div
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 * i }}
          className="text-[110px] leading-none"
          style={{ fontSize: i === 1 ? 140 : 110 }}
        >
          {e}
        </motion.div>
      ))}
    </div>
  );
}

/** BMI gauge with tick marker. */
export function BmiGauge({ percent = 78, label = "Normal - entre 18,4 e 25" }: { percent?: number; label?: string }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm">
        <div className="font-semibold text-foreground">Índice de massa corporal (IMC)</div>
        <div className="font-bold text-foreground">{percent}%</div>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
      <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-gradient-to-r from-[oklch(0.72_0.15_155)] via-[oklch(0.82_0.15_85)] to-[oklch(0.62_0.22_25)]">
        <motion.div
          className="absolute -top-1 h-4 w-4 rounded-full border-2 border-primary bg-background"
          initial={{ left: "0%" }}
          animate={{ left: `calc(${percent}% - 8px)` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[11px] font-medium text-muted-foreground">
        <span>Anormal</span>
        <span>Normal</span>
        <span>Obeso</span>
      </div>
    </div>
  );
}

/** Weight-loss curve chart (Você → 21d). */
export function WeightLossChart({ currentWeight, targetWeight, days = 21 }: { currentWeight: number; targetWeight: number; days?: number }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(1), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px] rounded-2xl border border-border p-3">
      <div className="relative h-56 w-full">
        <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wl_area" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="oklch(0.75 0.22 25)" stopOpacity="0.35" />
              <stop offset="0.5" stopColor="oklch(0.82 0.18 80)" stopOpacity="0.3" />
              <stop offset="1" stopColor="oklch(0.72 0.18 150)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wl_stroke" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="oklch(0.65 0.22 25)" />
              <stop offset="0.5" stopColor="oklch(0.72 0.18 80)" />
              <stop offset="1" stopColor="oklch(0.65 0.19 150)" />
            </linearGradient>
          </defs>
          {/* gridlines */}
          {[0.2, 0.4, 0.6, 0.8].map((p) => (
            <line key={p} x1="0" y1={200 * p} x2="300" y2={200 * p} stroke="oklch(0.9 0 0)" strokeDasharray="3 4" strokeWidth="1" />
          ))}
          {/* area */}
          <path
            d="M 10 20 C 60 25, 90 40, 130 100 S 220 180, 290 180 L 290 200 L 10 200 Z"
            fill="url(#wl_area)"
            style={{ opacity: progress }}
          />
          {/* line */}
          <path
            d="M 10 20 C 60 25, 90 40, 130 100 S 220 180, 290 180"
            fill="none"
            stroke="url(#wl_stroke)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* dots */}
          {[
            [10, 20],
            [60, 30],
            [110, 65],
            [160, 130],
            [220, 172],
            [290, 180],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="6" fill="white" stroke="oklch(0.7 0.02 260)" strokeWidth="2" />
          ))}
        </svg>
        <div className="absolute left-2 top-1 rounded-md bg-background px-2 py-0.5 text-xs font-semibold shadow-sm">
          Você
        </div>
        <div className="absolute right-4 top-[70%] -translate-y-1/2 rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground shadow-sm">
          {targetWeight}kg
        </div>
      </div>
      <div className="mt-1 flex justify-between text-[11px] font-medium text-muted-foreground">
        <span>Hoje</span>
        <span>{days}d</span>
      </div>
    </div>
  );
}
