"use client";

import CreateHeader from "../components/create-ormawa-external/CreateHeader";
import EditExternalForm from "../components/create-ormawa-external/EditExternalForm";
import type { ExternalSubmissionDetail } from "../types/ormawa";

interface EditOrmawaEksternalContainerProps {
  initialData: ExternalSubmissionDetail;
}

export default function EditOrmawaEksternalContainer({
  initialData,
}: EditOrmawaEksternalContainerProps) {
  return (
    <div className="min-h-full py-12 px-6 font-inter">
      <div className="mx-auto max-w-[715px] space-y-8">
        <CreateHeader title="Edit Organisasi Mahasiswa" />
        <EditExternalForm initialData={initialData} />
      </div>
    </div>
  );
}
