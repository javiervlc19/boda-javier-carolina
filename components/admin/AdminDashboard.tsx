"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { WeddingGuestRow } from "@/lib/supabase";
import { EditGuestModal } from "@/components/admin/EditGuestModal";
import { exportGuestsToExcel } from "@/lib/exportGuests";
import { wedding } from "@/data/wedding";

function Kpi({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-stone/30 p-6 text-center">
      <p className="font-display text-3xl text-ink">{value}</p>
      <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-stone">
        {label}
      </p>
    </div>
  );
}

export function AdminDashboard({ guests }: { guests: WeddingGuestRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("todos");
  const [busFilter, setBusFilter] = useState("todos");
  const [editingGuest, setEditingGuest] = useState<WeddingGuestRow | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      if (search && !g.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (attendanceFilter !== "todos" && g.attendance !== attendanceFilter) {
        return false;
      }
      if (busFilter !== "todos") {
        if (busFilter === "ninguno" && g.bus_route) return false;
        if (busFilter !== "ninguno" && !g.bus_route?.includes(busFilter)) {
          return false;
        }
      }
      return true;
    });
  }, [guests, search, attendanceFilter, busFilter]);

  const kpis = useMemo(() => {
    const asistiran = guests.filter((g) => g.attendance === "si");
    const noAsistiran = guests.filter((g) => g.attendance === "no");
    const totalAdultos = asistiran.reduce(
      (sum, g) => sum + (g.guest_count ?? 1),
      0
    );
    const totalNinos = asistiran.reduce(
      (sum, g) => sum + (g.children_count ?? 0),
      0
    );
    const necesitanBus = asistiran.filter((g) => g.bus_route).length;
    const conNecesidades = asistiran.filter(
      (g) => g.dietary_requirements && g.dietary_requirements.trim().length > 0
    ).length;

    return {
      total: guests.length,
      asistiran: asistiran.length,
      noAsistiran: noAsistiran.length,
      totalAdultos,
      totalNinos,
      necesitanBus,
      conNecesidades,
    };
  }, [guests]);

  async function exportExcel() {
    setExporting(true);
    try {
      await exportGuestsToExcel(filtered);
    } finally {
      setExporting(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function handleDelete(guest: WeddingGuestRow) {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar la confirmación de "${guest.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    setDeletingId(guest.id);
    try {
      const res = await fetch(`/api/admin/guests/${guest.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body.error ?? "No se pudo eliminar la confirmación.");
        return;
      }
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-ink">
            Confirmaciones de invitados
          </h1>
          <button
            onClick={logout}
            className="border border-olive px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] text-olive hover:bg-olive hover:text-warm-white"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Kpi label="Confirmaciones recibidas" value={kpis.total} />
          <Kpi label="Asistirán" value={kpis.asistiran} />
          <Kpi label="No asistirán" value={kpis.noAsistiran} />
          <Kpi label="Total adultos" value={kpis.totalAdultos} />
          <Kpi label="Total niños" value={kpis.totalNinos} />
          <Kpi label="Necesitan autobús" value={kpis.necesitanBus} />
          <Kpi label="Con necesidades alimentarias" value={kpis.conNecesidades} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre..."
            className="border-b border-stone/50 bg-transparent py-2 font-sans text-sm text-ink focus:border-olive focus:outline-none"
          />
          <select
            value={attendanceFilter}
            onChange={(e) => setAttendanceFilter(e.target.value)}
            className="border-b border-stone/50 bg-transparent py-2 font-sans text-sm text-ink focus:border-olive focus:outline-none"
          >
            <option value="todos">Todos</option>
            <option value="si">Asistirán</option>
            <option value="no">No asistirán</option>
          </select>
          <select
            value={busFilter}
            onChange={(e) => setBusFilter(e.target.value)}
            className="border-b border-stone/50 bg-transparent py-2 font-sans text-sm text-ink focus:border-olive focus:outline-none"
          >
            <option value="todos">Todos los autobuses</option>
            <option value="ninguno">Sin autobús</option>
            {wedding.busRoutes
              .filter((r) => r.direction === "ida")
              .map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
          </select>
          <button
            onClick={exportExcel}
            disabled={exporting}
            className="ml-auto border border-olive bg-olive px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-warm-white hover:opacity-90 disabled:opacity-50"
          >
            {exporting ? "Generando..." : "Exportar Excel"}
          </button>
        </div>

        {/* Mobile: cards */}
        <div className="mt-8 flex flex-col gap-4 sm:hidden">
          {filtered.map((g) => (
            <div key={g.id} className="border border-stone/30 p-5">
              <p className="font-display text-lg text-ink">{g.name}</p>
              <p className="mt-1 font-sans text-xs uppercase tracking-[0.15em] text-stone">
                {g.attendance === "si" ? "Asistirá" : "No asistirá"}
              </p>
              {g.attendance === "si" && (
                <div className="mt-3 font-sans text-sm text-ink">
                  <p>Asistentes: {g.guest_count}</p>
                  {g.companions && g.companions.length > 0 && (
                    <p>Acompañantes: {g.companions.join(", ")}</p>
                  )}
                  {g.children && <p>Niños: {g.children_count}</p>}
                  {g.bus_route && <p>Autobús: {g.bus_route}</p>}
                  {g.dietary_requirements && (
                    <p>Alimentación: {g.dietary_requirements}</p>
                  )}
                </div>
              )}
              {g.message && (
                <p className="mt-3 font-sans text-sm italic text-stone">
                  &ldquo;{g.message}&rdquo;
                </p>
              )}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setEditingGuest(g)}
                  className="border border-olive px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-olive hover:bg-olive hover:text-warm-white"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(g)}
                  disabled={deletingId === g.id}
                  className="border border-stone px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-stone hover:border-red-700 hover:text-red-700 disabled:opacity-50"
                >
                  {deletingId === g.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-12 text-center font-sans text-sm text-stone">
              No hay resultados.
            </p>
          )}
        </div>

        {/* Desktop: table */}
        <div className="mt-8 hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[960px] border-collapse text-left font-sans text-sm">
            <thead>
              <tr className="border-b border-stone/40 text-xs uppercase tracking-[0.15em] text-stone">
                <th className="py-3 pr-4">Nombre</th>
                <th className="py-3 pr-4">Asistencia</th>
                <th className="py-3 pr-4">Asistentes</th>
                <th className="py-3 pr-4">Acompañantes</th>
                <th className="py-3 pr-4">Niños</th>
                <th className="py-3 pr-4">Autobús</th>
                <th className="py-3 pr-4">Vuelta</th>
                <th className="py-3 pr-4">Alimentación</th>
                <th className="py-3 pr-4">Mensaje</th>
                <th className="py-3 pr-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <tr key={g.id} className="border-b border-stone/20 align-top">
                  <td className="py-3 pr-4">{g.name}</td>
                  <td className="py-3 pr-4">
                    {g.attendance === "si" ? "Sí" : "No"}
                  </td>
                  <td className="py-3 pr-4">{g.guest_count ?? "-"}</td>
                  <td className="py-3 pr-4">
                    {g.companions && g.companions.length > 0
                      ? g.companions.join(", ")
                      : "-"}
                  </td>
                  <td className="py-3 pr-4">
                    {g.children ? g.children_count : "-"}
                  </td>
                  <td className="py-3 pr-4">{g.bus_route ?? "-"}</td>
                  <td className="py-3 pr-4">{g.return_bus ?? "-"}</td>
                  <td className="py-3 pr-4">{g.dietary_requirements ?? "-"}</td>
                  <td className="py-3 pr-4">{g.message ?? "-"}</td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingGuest(g)}
                        className="border border-olive px-3 py-1.5 font-sans text-xs uppercase tracking-[0.15em] text-olive hover:bg-olive hover:text-warm-white"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(g)}
                        disabled={deletingId === g.id}
                        className="border border-stone px-3 py-1.5 font-sans text-xs uppercase tracking-[0.15em] text-stone hover:border-red-700 hover:text-red-700 disabled:opacity-50"
                      >
                        {deletingId === g.id ? "..." : "Eliminar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-12 text-center font-sans text-sm text-stone">
              No hay resultados.
            </p>
          )}
        </div>
      </div>

      {editingGuest && (
        <EditGuestModal
          guest={editingGuest}
          onClose={() => setEditingGuest(null)}
          onSaved={() => {
            setEditingGuest(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
