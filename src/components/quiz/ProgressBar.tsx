import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0..1
}

export function ProgressBar({ value }: ProgressBarProps) {
  const pct = Math.max(0.02, Math.min(1, value)) * 100;
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-primary-track"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      />
    </div>
  );
}
