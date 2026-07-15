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
    <div className="flex flex-1 flex-col min-h-0">
      <div
        className={`flex-1 overflow-y-auto px-5 pb-2 no-scrollbar ${
          centered ? "flex flex-col justify-center pt-2" : "pt-2"
        }`}
      >
        <div className="mx-auto w-full">
          <h2 className="text-balance text-center text-[25px] font-black leading-[1.12] text-foreground tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-1.5 text-pretty text-center leading-snug ${
              subtitleStyle === "small-muted"
                ? "text-[13px] font-medium text-muted-foreground"
                : "text-[15.5px] font-medium text-foreground/90"
            }`}>
              {typeof subtitle === "string" && subtitle.includes("Seca Jejum Turbo") ? (
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
          <div className="mt-4 flex flex-col gap-2.5">{children}</div>
        </div>
      </div>
      {footer && (
        <div className="shrink-0 z-20 bg-gradient-to-t from-background via-background to-background/0 px-5 pt-2 pb-4">
          <div className="mx-auto w-full">{footer}</div>
        </div>
      )}
    </div>
  );
}
