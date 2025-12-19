"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Consent = "accepted" | "declined" | "unknown";
const STORAGE_KEY = "boucherie-limare-cookie";

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>("unknown");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!stored) {
      setConsent("unknown");
      setOpen(true);
    } else {
      setConsent(stored as Consent);
    }
  }, []);

  const handleChoice = (value: Consent) => {
    setConsent(value);
    setOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, value);
    }
  };

  return (
    <>
      {open ? (
        <div className="fixed bottom-4 left-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 rounded-3xl border border-white/70 bg-white/95 p-4 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1 text-sm text-ink/80">
              <p className="font-semibold text-ink">Cookies de mesure d’audience</p>
              <p>
                Nous utilisons des cookies anonymisés pour améliorer l’expérience. Vous pouvez refuser en un clic.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="ghost" onClick={() => handleChoice("declined")}>
                Refuser
              </Button>
              <Button size="sm" onClick={() => handleChoice("accepted")}>
                Accepter
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      <button
        aria-label="Gérer les cookies"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-primary text-white px-4 py-2 text-xs font-semibold shadow-soft transition hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        Cookies
      </button>
      {consent !== "unknown" ? (
        <span className="sr-only">Préférence cookies : {consent === "accepted" ? "accepté" : "refusé"}</span>
      ) : null}
    </>
  );
}
