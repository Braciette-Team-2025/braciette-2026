import type { ReactNode } from "react";
import SubmissionLayout from "@/src/feature/ormawa/components/SubmissionLayout";

export default function OrmawaLayout({ children }: { children: ReactNode }) {
  return <SubmissionLayout>{children}</SubmissionLayout>;
}
