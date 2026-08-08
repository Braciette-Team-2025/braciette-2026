import type { ReactNode } from "react";

import AuthLayout from "@/src/feature/auth/components/layout/AuthLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
