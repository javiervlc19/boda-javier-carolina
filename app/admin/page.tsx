import { isAdminAuthenticated } from "@/lib/admin-session";
import { fetchAllGuests } from "@/lib/supabase-admin";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <LoginForm />;
  }

  let guests: Awaited<ReturnType<typeof fetchAllGuests>> = [];
  let loadError: string | null = null;

  try {
    guests = await fetchAllGuests();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Error desconocido";
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6 text-center">
        <p className="font-sans text-sm text-red-700">
          No se pudieron cargar las confirmaciones: {loadError}
        </p>
      </div>
    );
  }

  return <AdminDashboard guests={guests} />;
}
