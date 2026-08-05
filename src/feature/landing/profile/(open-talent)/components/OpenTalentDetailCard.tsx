"use client";

import { ProfileContentCard } from "../../components/ProfileContentCard";
import { ProfileField } from "../../components/ProfileField";
import { ProfilePageHeader } from "../../components/ProfilePageHeader";
import { ProfileStatusBadge } from "../../components/ProfileStatusBadge";
import type { OpenTalentDetail } from "../types/open-talent";
import { useRouter } from "next/navigation";

interface OpenTalentDetailCardProps {
  data: OpenTalentDetail;
}

export function OpenTalentDetailCard({ data }: OpenTalentDetailCardProps) {
  const router = useRouter();
  return (
    <ProfileContentCard>
      <div className="w-full mx-auto mt-4 mb-12">
        <ProfilePageHeader
          title="Hasil Open Talent"
          subtitle="Hasil open talent yang sudah kamu daftarkan."
          onBack={() => router.back()}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
        <ProfileField
          label="Tanggal Pendaftaran"
          value={data.tanggalPendaftaran}
        />
        <ProfileField label="Terakhir Diedit" value={data.terakhirDiedit} />

        <ProfileField
          label="Nama Lengkap Ketua"
          value={data.namaLengkapKetua}
          fullWidth
        />
        <ProfileField
          label="Asal Fakultas"
          value={data.asalFakultas}
          fullWidth
        />

        <ProfileField
          label="Talent yang Ditampilkan"
          value={data.talentYangDitampilkan}
        />
        <ProfileField label="Jenis Penampilan" value={data.jenisPenampilan} />

        <ProfileField label="Kontak Ketua" value={data.kontakKetua} fullWidth />
        <ProfileField label="Link Drive" value={data.linkDrive} fullWidth />

        <div className="sm:col-span-2">
          <p className="mb-1.5 text-sm font-bold text-blue-900 md:text-base">
            Status
          </p>
          <ProfileStatusBadge status={data.status} />
        </div>
      </div>
    </ProfileContentCard>
  );
}
