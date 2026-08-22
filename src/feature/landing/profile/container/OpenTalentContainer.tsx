"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FloatingNotesWrapper from "@/src/feature/auth/components/FloatingNotesWrapper";
import { getMyOpenTalent } from "@/src/feature/landing/profile/services/openTalentApi";

import { OpenTalentDetailCard } from "../(open-talent)/components/OpenTalentDetailCard";
import type { OpenTalentDetail } from "../(open-talent)/types/open-talent";

export function OpenTalentContainer() {
  const router = useRouter();

  const [data, setData] = useState<OpenTalentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOpenTalent() {
      try {
        const response = await getMyOpenTalent();

        const openTalent = response.data;

        setData({
          tanggalPendaftaran: formatDate(openTalent.created_at),
          terakhirDiedit: formatDate(openTalent.updated_at),
          namaLengkapKetua: openTalent.leader_name,
          asalFakultas: openTalent.leader_faculty,
          talentYangDitampilkan: openTalent.talent_name,
          jenisPenampilan: openTalent.performance_type,
          kontakKetua: openTalent.leader_wa_contact,
          linkDrive: openTalent.drive_link,
          status: openTalent.status,
        });
      } catch (error) {
        console.error("Failed to get open talent:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOpenTalent();
  }, []);

  if (isLoading) {
    return (
      <section className="flex w-full justify-center px-4 py-16 sm:py-20 md:py-28 lg:py-32">
        <p>Memuat data open talent...</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="flex w-full justify-center px-4 py-16 sm:py-20 md:py-28 lg:py-32">
        <p>Data open talent tidak ditemukan.</p>
      </section>
    );
  }

  return (
    <section className="flex w-full justify-center px-4 py-16 sm:py-20 md:py-28 lg:py-32">
      <FloatingNotesWrapper>
        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-6 md:gap-8">
          <OpenTalentDetailCard data={data} />
        </div>
      </FloatingNotesWrapper>
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
