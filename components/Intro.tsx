import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";

export function Intro() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-24 pb-12 text-center sm:pt-32 sm:pb-16">
      <FadeUp>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
          Bienvenidos
        </p>
        <p className="mt-8 font-display text-2xl leading-relaxed text-ink sm:text-3xl">
          Después de tantos años compartiendo camino contigo, ha llegado el
          momento de celebrar el nuestro.
        </p>
        <p className="mt-6 font-display text-2xl leading-relaxed text-ink sm:text-3xl">
          Queremos hacerlo como más nos gusta: rodeados de nuestra gente,
          disfrutando, riendo y creando recuerdos que nos acompañen siempre.
        </p>
        <p className="mt-6 font-display text-2xl leading-relaxed text-ink sm:text-3xl">
          Qué bonito poder compartir este día con vosotros.
        </p>
        <p className="mt-6 font-display text-xl italic text-stone">
          {wedding.couple.groom} &amp; {wedding.couple.bride}
        </p>
      </FadeUp>
    </section>
  );
}
