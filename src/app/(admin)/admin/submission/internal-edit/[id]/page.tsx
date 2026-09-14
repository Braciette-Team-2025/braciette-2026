import { Suspense } from "react";
import EditInternalPage from "@/src/feature/admin/submission/container/EditInternalPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditOrmawaInternal({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-[#7F7F7F]">Memuat halaman...</div>
      }
    >
      <EditInternalPage id={id} />
    </Suspense>
  );
}
