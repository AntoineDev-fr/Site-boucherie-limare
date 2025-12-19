"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-overlay/70 px-4 py-10 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          "relative w-full max-w-3xl rounded-3xl bg-white p-6 shadow-soft sm:p-8",
          className
        )}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-light text-ink transition hover:bg-cream focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-5 w-5" />
        </button>
        {title ? (
          <div className="mb-4 pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              À la une
            </p>
            <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
          </div>
        ) : null}
        <div className="space-y-4 text-base leading-7 text-ink/80">{children}</div>
      </div>
    </div>
  );
}
