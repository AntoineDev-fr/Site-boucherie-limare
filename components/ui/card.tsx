import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl shadow-card transition-shadow duration-200 hover:shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
