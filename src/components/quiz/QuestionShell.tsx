import type { ReactNode } from "react";

interface QuestionShellProps {
  title: string;
  subtitle?: ReactNode;
  subtitleStyle?: "default" | "small-muted";
  children: ReactNode;
  footer?: ReactNode;
  /** center content vertically (like most Seca Jejum screens) */
  centered?: boolean;
}

export function QuestionShell({
  title,
  subtitle,
  subtitleStyle = "default",
  children,
  footer,
  centered = true,
}: QuestionShellProps) {
  return (
    <div className="flex flex-1 flex-col justify-between px-5 pt-2 pb-6 w-full">
      <div className={`flex flex-col w-full mx-auto ${centered ? "my-auto py-2" : "py-2"}`}>
        <h2 className="text-center text-[27px] font-black leading-[1.12] text-foreground tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-2.5 text-center leading-snug ${
            subtitleStyle === "small-muted"
              ? "text-[15px] font-semibold text-muted-foreground"
              : "text-[17.5px] font-semibold text-foreground/95"
          }`}>
            {typeof subtitle === "string" && subtitle.includes("Seca Ayuno Turbo") ? (
              <>
                {subtitle.split("Seca Ayuno Turbo")[0]}
                <span className="text-primary">Seca Ayuno Turbo</span>
                {subtitle.split("Seca Ayuno Turbo")[1]}
              </>
            ) : (
              subtitle
            )}
          </p>
        )}
        <div className="mt-5 flex flex-col gap-3">{children}</div>
      </div>
      {footer && (
        <div className="mt-6 w-full shrink-0 z-20">
          {footer}
        </div>
      )}
    </div>
  );
}
