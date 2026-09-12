import type { ReactNode } from "react";

import { Reveal } from "@/components/Reveal";
import { useMode } from "@/hooks/useMode";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, lead, children, className }: Props) {
  const { isDev } = useMode();
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p
            className={cn(
              "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent",
              isDev && "font-mono normal-case tracking-normal before:content-['$_']",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "font-display text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl",
              isDev && "text-2xl font-bold sm:text-3xl md:text-4xl",
            )}
          >
            {title}
          </h2>
          {lead && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
        </Reveal>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
