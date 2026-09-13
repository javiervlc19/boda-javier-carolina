"use client";

import { useInView } from "@/lib/useInView";
import type { ReactNode } from "react";

export function SectionReveal({ children }: { children: ReactNode }) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.08);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView ? "opacity-100 scale-100" : "opacity-0 scale-[0.985]"
      }`}
    >
      {children}
    </div>
  );
}
