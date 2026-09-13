"use client";

import { useState } from "react";
import type { WeddingGuestRow } from "@/lib/supabase";

const inputClasses =
  "w-full border-b border-stone/50 bg-transparent py-2 font-sans text-sm text-ink focus:border-olive focus:outline-none";
const labelClasses = "font-sans text-xs uppercase tracking-[0.2em] text-stone";

export function EditGuestModal({
  guest,
  onClose,
  onSaved,
}: {
  guest: WeddingGuestRow;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: guest.name,
    attendance: guest.attendance,
    guest_count: guest.guest_count ?? 1,
    companions: (guest.companions ?? []).join(", "),
    children: guest.children ?? false,
    children_count: guest.children_count ?? 0,
    bus_route: guest.bus_route ?? "",
    return_bus: guest.return_bus ?? "",
    dietary_requirements: guest.dietary_requirements ?? "",
    song: guest.song ?? "",
    notes: guest.notes ?? "",
    message: guest.message ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);

    const isAttending = form.attendance === "si";
    const companions = isAttending
      ? form.companions
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
      : [];

    const res = await fetch(`/api/admin/guests/${guest.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        attendance: form.attendance,
        guest_count: isAttending ? Number(form.guest_count) : null,
        companions: isAttending ? companions : null,
        children: isAttending ? form.children : null,
        children_count: isAttending && form.children ? Number(form.children_count) : null,
        bus_route: isAttending ? form.bus_route || null : null,
        return_bus: isAttending ? form.return_bus || null : null,
        dietary_requirements: isAttending ? form.dietary_requirements || null : null,
        song: isAttending ? form.song || null : null,
        notes: isAttending ? form.notes || null : null,
        message: form.message || null,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "No se pudo guardar el cambio.");
      return;
    }

    onSaved();
  }

  const isAttending = form.attendance === "si";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 py-8">
      <div className="max-h-full w-full max-w-lg overflow-y-auto bg-warm-white p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Editar confirmación</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="font-sans text-sm text-stone hover:text-ink"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label className={labelClasses}>Nombre y apellidos</label>
            <input
              className={inputClasses}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          <fieldset>
            <legend className={labelClasses}>Asistencia</legend>
            <div className="mt-2 flex gap-6">
              <label className="flex items-center gap-2 font-sans text-sm text-ink">
                <input
                  type="radio"
                  checked={form.attendance === "si"}
                  onChange={() => setForm((f) => ({ ...f, attendance: "si" }))}
                />
                Sí
              </label>
              <label className="flex items-center gap-2 font-sans text-sm text-ink">
                <input
                  type="radio"
                  checked={form.attendance === "no"}
                  onChange={() => setForm((f) => ({ ...f, attendance: "no" }))}
                />
                No
              </label>
            </div>
          </fieldset>

          {isAttending && (
            <>
              <div>
                <label className={labelClasses}>Número de asistentes</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  className={inputClasses}
                  value={form.guest_count}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, guest_count: Number(e.target.value) }))
                  }
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Acompañantes (separados por coma)
                </label>
                <input
                  className={inputClasses}
                  value={form.companions}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, companions: e.target.value }))
                  }
                />
              </div>

              <fieldset>
                <legend className={labelClasses}>¿Vendrán niños?</legend>
                <div className="mt-2 flex gap-6">
                  <label className="flex items-center gap-2 font-sans text-sm text-ink">
                    <input
                      type="radio"
                      checked={form.children === true}
                      onChange={() => setForm((f) => ({ ...f, children: true }))}
                    />
                    Sí
                  </label>
                  <label className="flex items-center gap-2 font-sans text-sm text-ink">
                    <input
                      type="radio"
                      checked={form.children === false}
                      onChange={() => setForm((f) => ({ ...f, children: false }))}
                    />
                    No
                  </label>
                </div>
              </fieldset>

              {form.children && (
                <div>
                  <label className={labelClasses}>Número de niños</label>
                  <input
                    type="number"
                    min={0}
                    className={inputClasses}
                    value={form.children_count}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        children_count: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              )}

              <div>
                <label className={labelClasses}>Autobús de ida</label>
                <input
                  className={inputClasses}
                  value={form.bus_route}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bus_route: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className={labelClasses}>Autobús de vuelta</label>
                <input
                  className={inputClasses}
                  value={form.return_bus}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, return_bus: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className={labelClasses}>Alimentación</label>
                <input
                  className={inputClasses}
                  value={form.dietary_requirements}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      dietary_requirements: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className={labelClasses}>Canción</label>
                <input
                  className={inputClasses}
                  value={form.song}
                  onChange={(e) => setForm((f) => ({ ...f, song: e.target.value }))}
                />
              </div>

              <div>
                <label className={labelClasses}>Observaciones</label>
                <textarea
                  rows={2}
                  className={inputClasses}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                />
              </div>
            </>
          )}

          <div>
            <label className={labelClasses}>Mensaje para los novios</label>
            <textarea
              rows={2}
              className={inputClasses}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>

          {error && <p className="font-sans text-sm text-red-700">{error}</p>}

          <div className="mt-2 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="border border-olive bg-olive px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-warm-white hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              onClick={onClose}
              className="border border-stone px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-stone hover:text-ink"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
