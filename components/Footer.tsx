import { wedding } from "@/data/wedding";

export function Footer() {
  return (
    <footer className="bg-olive py-16 text-center text-warm-white">
      <p className="font-display text-2xl tracking-widest">
        {wedding.couple.initials}
      </p>
      <p className="mt-4 font-sans text-xs uppercase tracking-[0.25em] text-warm-white/70">
        {wedding.weddingDateHuman}
      </p>
    </footer>
  );
}
