import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnswerCardProps {
  selected?: boolean;
  onClick?: () => void;
  emoji?: string;
  image?: string;
  imagePosition?: "left" | "right";
  title: string;
  description?: string;
  /** show right-side checkbox (multi-select) */
  showCheck?: boolean;
  /** compact = smaller row, used inside food grid */
  size?: "md" | "sm";
  children?: ReactNode;
}

/**
 * Matches the "Seca Jejum" answer card:
 * - default: white pill with 1.5px border, teal outline on hover
 * - selected (single): filled teal with white text
 * - selected (multi): teal outline + filled check
 */
export function AnswerCard({
  selected,
  onClick,
  emoji,
  image,
  imagePosition = "right",
  title,
  description,
  showCheck = false,
  size = "md",
  children,
}: AnswerCardProps) {
  const selClass = selected ? (showCheck ? "card-outline" : "card-selected") : "";
  const padY = size === "sm" ? "py-3" : "py-5";
  const titleSize = size === "sm" ? "text-[17px]" : "text-[19px]";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={`card-interactive relative flex w-full items-stretch overflow-hidden text-left ${selClass}`}
      aria-pressed={selected}
    >
      {image && imagePosition === "left" && (
        <div className="relative -my-px w-20 shrink-0 overflow-hidden rounded-l-[inherit]">
          <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}

      <div className={`flex min-w-0 flex-1 items-center gap-3 px-5 ${padY}`}>
        {emoji && !image && (
          <span className="text-3xl leading-none" aria-hidden>
            {emoji}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {description ? (
            <>
              <div className={`${titleSize} font-bold leading-tight`}>{title}</div>
              <div className="mt-0.5 text-[17px] leading-snug opacity-80">{description}</div>
            </>
          ) : (
            <div className={`${titleSize} font-semibold leading-snug`}>{title}</div>
          )}
          {children}
        </div>

        {showCheck && (
          <div
            className={`h-6 w-6 shrink-0 rounded-[8px] border-2 transition-colors ${
              selected
                ? "border-primary"
                : "border-border-strong"
            }`}
            aria-hidden
          />
        )}
      </div>

      {image && imagePosition === "right" && (
        <div className="relative -my-px w-[105px] shrink-0 overflow-hidden rounded-r-[inherit]">
          <img src={image} alt="" className="h-full w-full object-cover object-center" loading="lazy" />
        </div>
      )}
    </motion.button>
  );
}
