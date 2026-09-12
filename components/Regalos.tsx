"use client";

import { useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import { wedding } from "@/data/wedding";

export function Regalos() {
  const [revealed, setRevealed] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(wedding.bankAccount.iban);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2200);
    } catch {
      // Clipboard API unavailable; silently ignore.
    }
  }

  return (
    <section className="bg-warm-white py-24 text-center sm:py-32">
      <div className="mx-auto max-w-xl px-6">
        <FadeUp>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-stone">
            Regalos
          </p>
          <h2 className="mt-6 font-display text-3xl leading-snug text-ink sm:text-4xl">
            El mejor regalo es que vengas
          </h2>

          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="mt-8 border border-olive px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] text-olive transition-colors hover:bg-olive hover:text-warm-white"
            >
              Ver información
            </button>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-4">
              <p className="font-sans text-sm text-stone">
                Si aun así quieres tener un detalle con nosotros, puedes
                hacerlo a través de este número de cuenta:
              </p>
              <p className="font-display text-xl tracking-wider text-ink">
                {wedding.bankAccount.iban}
              </p>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone">
                {wedding.bankAccount.holder}
              </p>
              <button
                onClick={copyIban}
                className="mt-2 border border-olive px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-olive transition-colors hover:bg-olive hover:text-warm-white"
              >
                Copiar IBAN
              </button>
            </div>
          )}
        </FadeUp>
      </div>

      <div
        className={`fixed inset-x-0 bottom-8 z-50 mx-auto w-fit rounded-none bg-ink px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-warm-white transition-all duration-300 ${
          toastVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        IBAN copiado
      </div>
    </section>
  );
}
