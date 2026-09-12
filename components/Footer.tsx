import { wedding } from "@/data/wedding";

export function Footer() {
  return (
    <footer className="bg-olive py-16 text-center text-warm-white">
      <p className="font-display text-2xl tracking-widest">
        {wedding.couple.initials}
      </p>
      <p className="mt-4 font-display text-lg italic">Juntos es mejor ♡</p>
      <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-warm-white/70">
        {wedding.weddingDateHuman}
      </p>
    </footer>
  );
}
