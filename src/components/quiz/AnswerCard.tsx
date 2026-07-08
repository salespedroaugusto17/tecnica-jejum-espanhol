import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnswerCardProps {
  selected?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  image?: string;
  title: string;
  description?: string;
  showCheck?: boolean;
}

export function AnswerCard({
  selected,
  onClick,
  icon,
  image,
  title,
  description,
  showCheck = true,
}: AnswerCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`card-interactive flex w-full items-center gap-4 p-4 text-left ${
        selected ? "card-selected" : ""
      }`}
      aria-pressed={selected}
    >
      {image ? (
        <img
          src={image}
          alt=""
          className="h-14 w-14 shrink-0 rounded-xl object-cover"
          loading="lazy"
        />
      ) : icon ? (
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          {icon}
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-semibold text-foreground">{title}</div>
        {description && (
          <div className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{description}</div>
        )}
      </div>

      {showCheck && (
        <div
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border-strong bg-transparent"
          }`}
          aria-hidden
        >
          {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </div>
      )}
    </motion.button>
  );
}
