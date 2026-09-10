import type { ReactNode } from "react";
import SubmissionLayout from "@/src/feature/ormawa/components/SubmissionLayout";
import { ProtectedRoute } from "@/src/feature/auth/components/ProtectedRoute";

export default function OrmawaLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["Ormawa"]}>
      <SubmissionLayout>{children}</SubmissionLayout>
    </ProtectedRoute>
  );
}
