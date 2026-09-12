"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { WeddingGuestRow } from "@/lib/supabase";

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

function toCsv(rows: WeddingGuestRow[]): string {
  const headers = [
    "Nombre",
    "Asistencia",
    "Nº asistentes",
    "Acompañantes",
    "Niños",
    "Nº niños",
    "Autobús",
    "Autobús vuelta",
    "Alimentación",
    "Canción",
    "Observaciones",
    "Mensaje",
    "Fecha",
  ];

  const escape = (value: unknown) => {
    const s = value === null || value === undefined ? "" : String(value);
    return `"${s.replace(/"/g, '""')}"`;
  };

  const lines = rows.map((row) =>
    [
      row.name,
      row.attendance === "si" ? "Sí" : "No",
      row.guest_count ?? "",
      (row.companions ?? []).join("; "),
      row.children ? "Sí" : "No",
      row.children_count ?? "",
      row.bus_route ?? "",
      row.return_bus ?? "",
      row.dietary_requirements ?? "",
      row.song ?? "",
      row.notes ?? "",
      row.message ?? "",
      new Date(row.created_at).toLocaleString("es-ES"),
    ]
      .map(escape)
      .join(",")
  );

  return [headers.map(escape).join(","), ...lines].join("\n");
}

export function AdminDashboard({ guests }: { guests: WeddingGuestRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("todos");
  const [busFilter, setBusFilter] = useState("todos");

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
        if (busFilter !== "ninguno" && g.bus_route !== busFilter) return false;
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

  function exportCsv() {
    const csv = toCsv(filtered);
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "confirmaciones-boda.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
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
            <option value="Valencia">Valencia</option>
            <option value="Castellón">Castellón</option>
            <option value="Altura">Altura</option>
          </select>
          <button
            onClick={exportCsv}
            className="ml-auto border border-olive bg-olive px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-warm-white hover:opacity-90"
          >
            Exportar CSV
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
          <table className="w-full min-w-[900px] border-collapse text-left font-sans text-sm">
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
    </div>
  );
}
