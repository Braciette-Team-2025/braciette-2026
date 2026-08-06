import type { ReactNode } from "react";

import AuthLayout from "@/src/feature/auth/components/AuthLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
