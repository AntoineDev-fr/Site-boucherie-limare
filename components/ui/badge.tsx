import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "neutral";
};

export function Badge({ className, tone = "primary", ...props }: BadgeProps) {
  const toneClass =
    tone === "primary"
      ? "bg-primary/10 text-primary border border-primary/20"
      : "bg-white/60 text-ink border border-ink/10";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneClass,
        className
      )}
      {...props}
    />
  );
}
