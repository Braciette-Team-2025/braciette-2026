import { Suspense } from "react";
import SubmissionContainer from "@/src/feature/admin/submission/container/SubmissionContainer";

export default function Submission() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-[#7F7F7F]">Memuat halaman...</div>
      }
    >
      <SubmissionContainer />
    </Suspense>
  );
}
