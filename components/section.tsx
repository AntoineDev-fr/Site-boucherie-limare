import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, title, eyebrow, description, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("space-y-8 rounded-[28px] bg-white/70 p-6 shadow-card backdrop-blur", className)}
    >
      {title ? (
        <div className="space-y-3">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
          ) : null}
          <h2 className="font-display text-2xl text-ink md:text-3xl">{title}</h2>
          {description ? (
            <p className="max-w-3xl text-base text-ink/80 md:text-lg">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
