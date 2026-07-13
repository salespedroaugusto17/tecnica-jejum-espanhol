import type { ReactNode } from "react";

interface QuestionShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** center content vertically (like most Seca Jejum screens) */
  centered?: boolean;
}

export function QuestionShell({
  title,
  subtitle,
  children,
  footer,
  centered = true,
}: QuestionShellProps) {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div
        className={`flex-1 overflow-y-auto px-5 pb-4 no-scrollbar ${
          centered ? "flex flex-col justify-center pt-4" : "pt-3"
        }`}
      >
        <div className="mx-auto w-full">
          <h2 className="text-balance text-center text-[26px] font-black leading-[1.15] text-foreground tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-pretty text-center text-[18px] font-bold leading-snug text-foreground">
              {subtitle.includes("Seca Jejum Turbo") ? (
                <>
                  {subtitle.split("Seca Jejum Turbo")[0]}
                  <span className="text-primary">Seca Jejum Turbo</span>
                  {subtitle.split("Seca Jejum Turbo")[1]}
                </>
              ) : (
                subtitle
              )}
            </p>
          )}
          <div className="mt-5 flex flex-col gap-2.5">{children}</div>
        </div>
      </div>
      {footer && (
        <div className="shrink-0 z-20 bg-gradient-to-t from-background via-background to-background/0 px-5 pt-3 pb-6">
          <div className="mx-auto w-full">{footer}</div>
        </div>
      )}
    </div>
  );
}
