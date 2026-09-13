import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";

export function DressCode() {
  return (
    <section id="informacion" className="py-24 text-center sm:py-32">
      <div className="mx-auto max-w-xl px-6">
        <FadeUp>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            {wedding.dresscode.title}
          </p>
          <p className="mt-6 font-display text-4xl text-ink sm:text-5xl">
            {wedding.dresscode.level}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
