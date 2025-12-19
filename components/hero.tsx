import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string; variant?: "primary" | "secondary" | "ghost" | "outline" };

type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  className?: string;
  actions?: Action[];
};

export function Hero({ eyebrow, title, description, image, actions = [], className }: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-white/50 bg-cream-light/80 px-6 py-10 shadow-soft backdrop-blur-xl md:px-10 md:py-14",
        className
      )}
    >
      <div className="absolute inset-0 bg-radial-cream" aria-hidden />
      <div className="pointer-events-none absolute -right-10 top-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div className="space-y-6">
          {eyebrow ? <Badge>{eyebrow}</Badge> : null}
          <h1 className="font-display text-3xl leading-tight text-ink md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-ink/80 md:text-xl">{description}</p>
          {actions.length ? (
            <div className="flex flex-wrap gap-3">
              {actions.map((action) => (
                <Button key={action.label} variant={action.variant ?? "primary"} size="lg" asChild>
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-soft md:h-[360px]">
          <Image
            src={image}
            alt="Boucherie Limare"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/12 via-transparent to-cream/60" />
        </div>
      </div>
    </section>
  );
}
