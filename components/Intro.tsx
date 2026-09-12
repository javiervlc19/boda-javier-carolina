import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";

export function Intro() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
      <FadeUp>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
          Bienvenidos
        </p>
        <p className="mt-8 font-display text-2xl leading-relaxed text-ink sm:text-3xl">
          Después de años compartiendo camino, hemos decidido dar el paso más
          bonito de nuestra vida juntos. Queremos celebrarlo rodeados de las
          personas que más queremos, en un día lleno de sol, mar Mediterráneo
          y buenos recuerdos.
        </p>
        <p className="mt-6 font-display text-xl italic text-stone">
          {wedding.couple.groom} &amp; {wedding.couple.bride}
        </p>
      </FadeUp>
    </section>
  );
}
