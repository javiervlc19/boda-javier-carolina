import Image from "next/image";
import { wedding } from "@/data/wedding";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex h-[100svh] w-full items-end justify-center overflow-hidden"
    >
      <Image
        src="/images/hero.jpg"
        alt={`${wedding.couple.groom} y ${wedding.couple.bride}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

      <div className="relative z-10 flex w-full flex-col items-center px-6 pb-16 text-center text-warm-white">
        <p className="font-sans text-xs uppercase tracking-[0.35em]">
          Nos casamos
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none tracking-wide sm:text-6xl">
          {wedding.couple.groom}
        </h1>
        <p className="my-2 font-display text-xl italic text-warm-white/80">
          y
        </p>
        <h1 className="font-display text-5xl leading-none tracking-wide sm:text-6xl">
          {wedding.couple.bride}
        </h1>
        <p className="mt-6 font-sans text-xs uppercase tracking-[0.35em] text-warm-white/90">
          {wedding.weddingDateLabel} &middot; {wedding.city.toUpperCase()}
        </p>

        <a
          href="#rsvp"
          className="mt-10 border border-warm-white px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] transition-colors hover:bg-warm-white hover:text-ink"
        >
          Confirmar asistencia
        </a>

        <a
          href="#el-gran-dia"
          aria-label="Desplázate hacia abajo"
          className="mt-12 flex flex-col items-center gap-2 text-warm-white/80"
        >
          <span className="h-10 w-px animate-pulse bg-warm-white/70" />
        </a>
      </div>
    </section>
  );
}
