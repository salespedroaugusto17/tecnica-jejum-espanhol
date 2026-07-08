import type { ReactNode } from "react";

interface QuestionShellProps {
  title: string;
  subtitle?: string;
  image?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** Standard content layout for a question screen. */
export function QuestionShell({ title, subtitle, image, children, footer }: QuestionShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-5 pt-2 pb-8 no-scrollbar">
        {image && (
          <img
            src={image}
            alt=""
            className="mx-auto mb-5 h-40 w-40 rounded-2xl object-cover"
            loading="lazy"
          />
        )}
        <h2 className="text-balance text-2xl font-bold leading-tight text-foreground">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3">{children}</div>
      </div>
      {footer && (
        <div className="sticky bottom-0 z-20 bg-gradient-to-t from-background via-background/95 to-background/0 px-5 pt-4 pb-6">
          {footer}
        </div>
      )}
    </div>
  );
}
