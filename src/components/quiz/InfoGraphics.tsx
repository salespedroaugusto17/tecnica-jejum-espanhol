import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface EnergyChartProps {}

/** "Sabemos como mantê-lo em forma" — HOJE vs DEPOIS bar chart. */
export function EnergyChart(_: EnergyChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full scale-110 origin-center py-2"
    >
      <img
        src="/energy-chart.png"
        alt="Gráfico de Calorias Vazias vs Energia — Hoje vs Depois"
        className="w-full h-auto"
      />
    </motion.div>
  );
}

/** Metabolism decline chart with bars + red weight line. */
export function MetabolismChart() {
  const bars = [82, 76, 66, 48, 38, 30, 26, 24];
  return (
    <div className="relative mx-auto flex h-48 w-full max-w-[380px] items-end gap-1.5 rounded-2xl bg-muted/40 p-4">
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

export function FaceTransform() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full scale-105"
    >
      <img
        src="/face-transformation.png"
        alt="Transformação do Rosto pelo Jejum"
        className="w-full h-auto rounded-2xl"
      />
    </motion.div>
  );
}

/** Trio of men illustration (social proof). */
export function TrioMen() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-[360px] items-center justify-center relative mt-4 mb-4"
    >
      <img 
        src="/radial_people.png" 
        alt="Milhares de pessoas já escolheram" 
        className="w-full h-auto object-contain drop-shadow-sm"
      />
    </motion.div>
  );
}

/** BMI gauge with tick marker. */
export function BmiGauge({ percent = 83, label = "Normal - entre 18,4 e 25" }: { percent?: number; label?: string }) {
  // Forçar sempre a mostrar 83%
  const displayPercent = 83;
  const displayLabel = "Normal - entre 18,4 e 25";
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-base">
        <div className="font-semibold text-foreground">Índice de massa corporal (IMC)</div>
        <div className="font-bold text-foreground">{displayPercent}%</div>
      </div>
      <div className="mt-1 text-sm font-semibold text-muted-foreground/80">{displayLabel}</div>
      <div className="relative mt-2.5 h-2 w-full rounded-full bg-gradient-to-r from-[oklch(0.72_0.15_155)] via-[oklch(0.82_0.15_85)] to-[oklch(0.62_0.22_25)]">
        <motion.div
          className="absolute -top-1 h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md"
          initial={{ left: "0%" }}
          animate={{ left: `calc(${displayPercent}% - 8px)` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs font-semibold text-muted-foreground/80">
        <span>Anormal</span>
        <span className="-ml-3">Normal</span>
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

  // Forçar 70kg conforme print do usuário para bater perfeitamente
  const displayTargetWeight = targetWeight;

  return (
    <div className="relative mx-auto w-full max-w-[380px] p-1 mt-6">
      <div className="relative h-56 w-full">
        <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wl_area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.60 0.25 25)" stopOpacity="0.65" />
              <stop offset="50%" stopColor="oklch(0.80 0.18 80)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.68 0.19 150)" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="wl_stroke" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="oklch(0.55 0.25 25)" />
              <stop offset="50%" stopColor="oklch(0.75 0.18 80)" />
              <stop offset="100%" stopColor="oklch(0.60 0.19 150)" />
            </linearGradient>
          </defs>
          {/* Gridlines horizontais cinzas pontilhadas */}
          {[0.2, 0.4, 0.6, 0.8].map((p) => (
            <line key={`h${p}`} x1="0" y1={200 * p} x2="300" y2={200 * p} stroke="oklch(0.85 0.01 260)" strokeDasharray="3 4" strokeWidth="1" />
          ))}
          {/* Gridlines verticais cinzas pontilhadas */}
          {[0.166, 0.333, 0.5, 0.666, 0.833].map((p) => (
            <line key={`v${p}`} x1={300 * p} y1="0" x2={300 * p} y2="200" stroke="oklch(0.85 0.01 260)" strokeDasharray="3 4" strokeWidth="1" />
          ))}
          {/* Area preenchida */}
          <path
            d="M 10 20 C 60 25, 90 40, 130 100 S 220 180, 290 180 L 290 200 L 10 200 Z"
            fill="url(#wl_area)"
            style={{ opacity: progress }}
          />
          {/* Linha principal colorida com gradiente */}
          <path
            d="M 10 20 C 60 25, 90 40, 130 100 S 220 180, 290 180"
            fill="none"
            stroke="url(#wl_stroke)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Pontos com círculo cinza grande e pontinho vermelho no meio */}
          {[
            [10, 20],
            [60, 30],
            [110, 65],
            [160, 130],
            [220, 172],
            [290, 180],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="8" fill="oklch(0.20 0.02 260)" fillOpacity="0.1" />
              <circle cx={x} cy={y} r="4" fill={i === 5 ? "#34C759" : "oklch(0.55 0.25 25)"} />
            </g>
          ))}
        </svg>
        <div className="absolute left-2 -top-4 rounded-md border border-border bg-background px-2.5 py-0.5 text-xs font-semibold shadow-sm text-foreground/80">
          Você
        </div>
        <div className="absolute right-4 top-[70%] -translate-y-1/2 rounded-lg bg-[#10B981] px-3 py-1 text-sm font-extrabold text-white shadow-sm">
          {displayTargetWeight}kg
        </div>
      </div>
      <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground/80">
        <span>Hoje</span>
        <span>{days}d</span>
      </div>
    </div>
  );
}
