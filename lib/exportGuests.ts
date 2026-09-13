import type { WeddingGuestRow } from "@/lib/supabase";
import { wedding } from "@/data/wedding";

const IDA_ROUTE_LABELS: Record<string, string> = {
  "valencia-alzira": "Bus de ida",
  "alzira-picanya": "Bus iglesia-banquete",
};

const IDA_ROUTES = wedding.busRoutes
  .filter((r) => r.direction === "ida")
  .map((r) => ({ ...r, exportLabel: IDA_ROUTE_LABELS[r.id] ?? r.name }));

function busLegValue(busRoute: string | null, routeName: string): string {
  if (!busRoute) return "No";
  const parts = busRoute.split(" + ").map((p) => p.trim());
  const match = parts.find((p) => p.startsWith(routeName));
  if (!match) return "No";
  const hourMatch = match.match(/(\d{2}:\d{2})h?\s*$/);
  return hourMatch ? `Sí (${hourMatch[1]}h)` : "Sí";
}

function returnBusValue(returnBus: string | null): string {
  if (!returnBus || returnBus === "no") return "No";
  return returnBus;
}

export type ExportRow = {
  Nombre: string;
  Asistencia: string;
  "Nº asistentes": number | string;
  Acompañantes: string;
  Niños: string;
  "Nº niños": number | string;
  [key: string]: string | number;
};

export function buildExportRows(rows: WeddingGuestRow[]) {
  const idaHeaders = IDA_ROUTES.map(
    (r) => `${r.exportLabel} (${r.name})`
  );

  const data = rows.map((g) => {
    const base: Record<string, string | number> = {
      Nombre: g.name,
      Asistencia: g.attendance === "si" ? "Sí" : "No",
      "Nº asistentes": g.guest_count ?? "",
      Acompañantes: (g.companions ?? []).join(", "),
      Niños: g.children ? "Sí" : "No",
      "Nº niños": g.children_count ?? "",
    };

    for (const route of IDA_ROUTES) {
      base[`${route.exportLabel} (${route.name})`] = busLegValue(
        g.bus_route,
        route.name
      );
    }

    base["Bus de vuelta"] = returnBusValue(g.return_bus);
    base["Alimentación"] = g.dietary_requirements ?? "";
    base["Canción"] = g.song ?? "";
    base["Observaciones"] = g.notes ?? "";
    base["Mensaje"] = g.message ?? "";
    base["Fecha de confirmación"] = new Date(g.created_at).toLocaleString(
      "es-ES"
    );

    return base;
  });

  const headers = [
    "Nombre",
    "Asistencia",
    "Nº asistentes",
    "Acompañantes",
    "Niños",
    "Nº niños",
    ...idaHeaders,
    "Bus de vuelta",
    "Alimentación",
    "Canción",
    "Observaciones",
    "Mensaje",
    "Fecha de confirmación",
  ];

  return { headers, data };
}

export async function exportGuestsToExcel(rows: WeddingGuestRow[]) {
  const ExcelJS = (await import("exceljs")).default;
  const { headers, data } = buildExportRows(rows);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Confirmaciones");

  sheet.columns = headers.map((header) => ({
    header,
    key: header,
    width: Math.max(14, Math.min(32, header.length + 4)),
  }));

  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).alignment = { vertical: "middle" };
  sheet.views = [{ state: "frozen", ySplit: 1 }];

  for (const row of data) {
    sheet.addRow(row);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "confirmaciones-boda.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
