import { Suspense } from "react";
import EditExternalPage from "@/src/feature/admin/submission/container/EditExternalPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditOrmawaExternal({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-[#7F7F7F]">Memuat halaman...</div>
      }
    >
      <EditExternalPage id={id} />
    </Suspense>
  );
}
