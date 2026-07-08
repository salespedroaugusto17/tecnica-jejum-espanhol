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
    <div className="flex flex-1 flex-col">
      <div
        className={`flex-1 overflow-y-auto px-5 pb-6 no-scrollbar ${
          centered ? "flex flex-col justify-center pt-6" : "pt-4"
        }`}
      >
        <div className="mx-auto w-full max-w-[380px]">
          <h2 className="text-balance text-center text-[22px] font-extrabold leading-[1.2] text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-pretty text-center text-[14px] leading-snug text-muted-foreground">
              {subtitle}
            </p>
          )}
          <div className="mt-6 flex flex-col gap-2.5">{children}</div>
        </div>
      </div>
      {footer && (
        <div className="sticky bottom-0 z-20 bg-gradient-to-t from-background via-background to-background/0 px-5 pt-3 pb-6">
          <div className="mx-auto w-full max-w-[380px]">{footer}</div>
        </div>
      )}
    </div>
  );
}
