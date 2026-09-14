"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getInternalSubmissionById } from "../services/submissionInternalService";
import EditOrmawaInternalContainer from "./EditOrmawaInternalContainer";
import type { InternalSubmissionDetail } from "../types/ormawa";

interface EditInternalPageProps {
  id: string;
}

export default function EditInternalPage({ id }: EditInternalPageProps) {
  const router = useRouter();
  const [data, setData] = useState<InternalSubmissionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await getInternalSubmissionById(id);
        if (!cancelled) {
          setData(res.data);
        }
      } catch (err) {
        console.error("[EditInternalPage] Gagal memuat data:", err);
        if (!cancelled) {
          setIsError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#7F7F7F]">Memuat data...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-sm text-red-500">
          Gagal memuat data. Silakan coba lagi.
        </p>
        <button
          onClick={() => router.push("/admin/submission?tab=internal")}
          className="rounded-lg bg-gray-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-600"
        >
          Kembali
        </button>
      </div>
    );
  }

  return <EditOrmawaInternalContainer initialData={data} />;
}
