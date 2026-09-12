"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#el-gran-dia", label: "El gran día" },
  { href: "#como-llegar", label: "Cómo llegar" },
  { href: "#autobuses", label: "Autobuses" },
  { href: "#alojamiento", label: "Alojamiento" },
  { href: "#informacion", label: "Información" },
  { href: "#rsvp", label: "Confirmar asistencia" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isSolid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          isSolid ? "bg-warm-white/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="#inicio"
            className={`font-display text-xl tracking-widest transition-colors ${
              isSolid ? "text-ink" : "text-warm-white"
            }`}
          >
            {wedding.couple.initials}
          </a>
          <button
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[6px]"
          >
            <span
              className={`h-px w-6 transition-all duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              } ${isSolid ? "bg-ink" : "bg-warm-white"}`}
            />
            <span
              className={`h-px w-6 transition-all duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              } ${isSolid ? "bg-ink" : "bg-warm-white"}`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-warm-white transition-opacity duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:text-olive"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
