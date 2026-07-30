import type { ReactNode } from "react";

import PublicLayout from "@/src/feature/landing/components/PublicLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
