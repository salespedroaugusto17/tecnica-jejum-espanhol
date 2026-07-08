import { ChevronLeft } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface HeaderProps {
  progress?: number; // 0..1
  onBack?: () => void;
  showBack?: boolean;
  title?: string;
}

export function Header({ progress, onBack, showBack = true, title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex flex-col gap-3 bg-background/85 px-5 pt-4 pb-3 backdrop-blur-md">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <button
          type="button"
          aria-label="Voltar"
          onClick={onBack}
          disabled={!showBack}
          className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-opacity disabled:opacity-30 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="truncate text-center text-sm font-semibold text-muted-foreground">
          {title ?? "Truque Jejum"}
        </h1>
        <div className="h-10 w-10" />
      </div>
      {typeof progress === "number" && <ProgressBar value={progress} />}
    </header>
  );
}
