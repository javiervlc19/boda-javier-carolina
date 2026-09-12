"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "No se pudo iniciar sesión");
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-stone/30 p-10 text-center"
      >
        <p className="font-display text-2xl tracking-widest text-ink">J | C</p>
        <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-stone">
          Panel de administración
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="mt-8 w-full border-b border-stone/50 bg-transparent py-2 text-center font-sans text-sm text-ink focus:border-olive focus:outline-none"
        />

        {error && <p className="mt-3 text-xs text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full border border-olive bg-olive px-8 py-3 font-sans text-xs uppercase tracking-[0.25em] text-warm-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Comprobando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
