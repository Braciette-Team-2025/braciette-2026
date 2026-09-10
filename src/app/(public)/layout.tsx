import { PublicRouteGuard } from "@/src/feature/auth/components/PublicRouteGuard";
import PublicLayout from "@/src/feature/landing/components/PublicLayout";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PublicRouteGuard>
      <PublicLayout>{children}</PublicLayout>
    </PublicRouteGuard>
  );
}
