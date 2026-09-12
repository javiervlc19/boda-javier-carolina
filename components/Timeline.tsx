import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";
import { timelineIconFor } from "@/components/TimelineIcons";

export function Timeline() {
  return (
    <section className="bg-warm-white py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            Programa
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            El día, minuto a minuto
          </h2>
        </FadeUp>

        <div className="mt-16 overflow-x-auto sm:mt-20 sm:overflow-visible">
          <div className="flex min-w-[560px] items-start justify-between gap-2 px-2 sm:min-w-0 sm:px-0">
            {wedding.timeline.map((item, index) => {
              const Icon = timelineIconFor(item.icon);
              return (
                <FadeUp
                  key={item.time}
                  delay={index * 90}
                  className="flex flex-1 flex-col items-center text-center"
                >
                  <Icon className="h-10 w-10 text-olive sm:h-12 sm:w-12" />

                  <div className="relative mt-6 w-full">
                    <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-stone/40" />
                    <span className="relative mx-auto block h-2 w-2 rounded-full bg-olive" />
                  </div>

                  <p className="mt-5 font-display text-lg text-ink sm:text-xl">
                    {item.time}
                  </p>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.25em] text-stone sm:text-xs">
                    {item.title}
                  </p>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
