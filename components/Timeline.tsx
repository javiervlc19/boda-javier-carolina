import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";
import { timelineIconFor } from "@/components/TimelineIcons";

export function Timeline() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            Programa
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            El día, minuto a minuto
          </h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-4 gap-1 sm:mt-20 sm:gap-2">
          {wedding.timeline.map((item, index) => {
            const Icon = timelineIconFor(item.icon);
            return (
              <FadeUp
                key={item.time}
                delay={index * 90}
                className="flex flex-col items-center text-center"
              >
                <Icon className="h-7 w-7 text-olive sm:h-10 sm:w-10 md:h-12 md:w-12" />

                <div className="relative mt-3 w-full sm:mt-6">
                  <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-stone/40" />
                  <span className="relative mx-auto block h-2 w-2 rounded-full bg-olive" />
                </div>

                <p className="mt-3 font-display text-sm text-ink sm:mt-5 sm:text-lg md:text-xl">
                  {item.time}
                </p>
                <p className="mt-1 font-sans text-[9px] uppercase leading-tight tracking-[0.15em] text-stone sm:text-[11px] sm:tracking-[0.25em] md:text-xs">
                  {item.title}
                </p>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
