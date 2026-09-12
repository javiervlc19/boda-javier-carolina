import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";
import type { BusRoute } from "@/data/wedding";

function RouteCard({ route, delay }: { route: BusRoute; delay: number }) {
  return (
    <FadeUp delay={delay} className="border-t border-stone/30 pt-8 text-center">
      <p className="font-display text-3xl text-ink">{route.name}</p>
      <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-stone">
        Salida {route.departureTime}h
      </p>
      <p className="mt-3 font-sans text-sm text-ink">{route.stops.join(" · ")}</p>
      <a
        href={route.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block border border-olive px-6 py-3 font-sans text-xs uppercase tracking-[0.25em] text-olive transition-colors hover:bg-olive hover:text-warm-white"
      >
        Ver ruta
      </a>
    </FadeUp>
  );
}

export function Autobuses() {
  const outbound = wedding.busRoutes.filter((r) => r.direction === "ida");
  const returning = wedding.busRoutes.filter((r) => r.direction === "vuelta");

  return (
    <section id="autobuses" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <FadeUp className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            Transporte
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Autobuses
          </h2>
          <p className="mt-4 font-sans text-sm text-stone">
            Queremos que solo tengas que preocuparte de disfrutar. Indícanos
            si lo usarás en el formulario de confirmación.
          </p>
        </FadeUp>

        <div className="mt-16">
          <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-olive">
            Ida
          </p>
          <div className="mt-8 flex flex-col gap-12">
            {outbound.map((route, index) => (
              <RouteCard key={route.name} route={route} delay={index * 100} />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <p className="text-center font-sans text-xs uppercase tracking-[0.3em] text-olive">
            Vuelta
          </p>
          <div className="mt-8 flex flex-col gap-12">
            {returning.map((route, index) => (
              <RouteCard key={route.name} route={route} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
