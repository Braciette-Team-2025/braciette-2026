import type { ReactNode } from "react";
import SubmissionLayout from "@/src/feature/ormawa/submission/components/SubmissionLayout";

export default function OrmawaLayout({ children }: { children: ReactNode }) {
  return <SubmissionLayout>{children}</SubmissionLayout>;
}
