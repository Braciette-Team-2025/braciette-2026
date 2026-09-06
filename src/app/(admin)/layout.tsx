import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/src/feature/admin/components/AdminSidebar";
import { ProtectedRoute } from "@/src/feature/auth/components/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["Admin"]}>
      <SidebarProvider
        style={{ "--sidebar-width": "24rem" } as React.CSSProperties}
      >
        <AdminSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
