import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";

export function Alojamiento() {
  return (
    <section id="alojamiento" className="bg-warm-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <FadeUp className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            Descanso
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Alojamiento
          </h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {wedding.hotels.map((hotel, index) => (
            <FadeUp
              key={hotel.name}
              delay={index * 100}
              className="flex flex-col items-center text-center"
            >
              <p className="font-display text-2xl text-ink">{hotel.name}</p>
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-stone">
                {hotel.location}
              </p>
              <p className="mt-3 font-sans text-sm text-ink">
                {hotel.distance}
              </p>
              {hotel.price && (
                <p className="mt-1 font-sans text-sm text-stone">
                  {hotel.price}
                </p>
              )}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-olive px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-olive transition-colors hover:bg-olive hover:text-warm-white"
                >
                  Web
                </a>
                <a
                  href={hotel.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-olive px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-olive transition-colors hover:bg-olive hover:text-warm-white"
                >
                  Google Maps
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
