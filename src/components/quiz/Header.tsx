import { ChevronLeft } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface HeaderProps {
  progress?: number;
  onBack?: () => void;
  showBack?: boolean;
  showProgress?: boolean;
}

export function Header({ progress, onBack, showBack = true, showProgress = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex flex-col gap-3 bg-background px-5 pt-4 pb-3">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <button
          type="button"
          aria-label="Voltar"
          onClick={onBack}
          disabled={!showBack}
          className="grid h-9 w-9 place-items-center rounded-full text-foreground transition-opacity disabled:opacity-0 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-xl leading-none" aria-hidden>🔥</span>
          <span className="text-[15px] font-extrabold tracking-tight text-foreground">SECA JEJUM</span>
        </div>
        <div className="h-9 w-9" />
      </div>
      {showProgress && typeof progress === "number" && <ProgressBar value={progress} />}
    </header>
  );
}
