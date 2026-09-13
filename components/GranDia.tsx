import Image from "next/image";
import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";

function EventCard({
  eyebrow,
  time,
  name,
  address,
  mapsUrl,
}: {
  eyebrow: string;
  time: string;
  name: string;
  address: string;
  mapsUrl: string;
}) {
  return (
    <FadeUp className="flex-1">
      <div className="flex h-full flex-col items-center px-6 py-10 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
          {eyebrow}
        </p>
        <p className="mt-6 font-display text-4xl text-ink">{time}</p>
        <p className="mt-6 font-display text-2xl text-ink">{name}</p>
        <p className="mt-2 font-sans text-sm text-stone">{address}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 border border-olive px-6 py-3 font-sans text-xs uppercase tracking-[0.25em] text-olive transition-colors hover:bg-olive hover:text-warm-white"
        >
          Ver en Google Maps
        </a>
      </div>
    </FadeUp>
  );
}

export function GranDia() {
  return (
    <section id="el-gran-dia" className="relative bg-warm-white pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            {wedding.weddingDateLabel}
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            El gran día
          </h2>
        </FadeUp>

        <div className="relative mt-16 aspect-4/5 w-full overflow-hidden sm:aspect-16/9">
          <Image
            src="/images/venue.jpg"
            alt="Lugar de la celebración"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </div>

        <div className="mt-4 flex flex-col divide-y divide-stone/30 sm:mt-8 sm:flex-row sm:divide-x sm:divide-y-0">
          <EventCard
            eyebrow="Ceremonia"
            time={wedding.ceremony.time}
            name={wedding.ceremony.name}
            address={wedding.ceremony.address}
            mapsUrl={wedding.ceremony.mapsUrl}
          />
          <EventCard
            eyebrow="Celebración"
            time={wedding.celebration.time}
            name={wedding.celebration.name}
            address={wedding.celebration.address}
            mapsUrl={wedding.celebration.mapsUrl}
          />
        </div>
      </div>
    </section>
  );
}
