import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";

export function Contacto() {
  return (
    <section className="py-24 text-center sm:py-32">
      <div className="mx-auto max-w-xl px-6">
        <FadeUp>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            Contacto
          </p>
          <h2 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
            ¿Alguna duda?
          </h2>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${wedding.whatsapp.carol}`}
              target="_blank"
              rel="noreferrer"
              className="w-full border border-olive px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-olive transition-colors hover:bg-olive hover:text-warm-white sm:w-auto"
            >
              WhatsApp {wedding.couple.bride}
            </a>
            <a
              href={`https://wa.me/${wedding.whatsapp.javier}`}
              target="_blank"
              rel="noreferrer"
              className="w-full border border-olive px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-olive transition-colors hover:bg-olive hover:text-warm-white sm:w-auto"
            >
              WhatsApp Javier
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
