"use client";

import BaseModal from "./BaseModal";
import DetailField from "./DetailField";

import type { SubmissionDetailModalProps } from "../../../types/ormawa";
import { Button } from "@/components/ui/button";
import LogoFileButton from "./LogoFileButton";

export default function SubmissionDetailModalExternal({
  open,
  onOpenChange,
  data,
}: SubmissionDetailModalProps) {
  const isUkm = data.jenisOrmawa === "UKM";

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={data.namaOrmawa}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <DetailField
          label="Tanggal Pendaftaran"
          value={data.tanggalPendaftaran}
        />
        <DetailField label="Terakhir diedit" value={data.terakhirDiedit} />

        <DetailField label="Nama Ormawa" value={data.namaOrmawa} />
        <DetailField label="Jenis Ormawa" value={data.jenisOrmawa} />

        {isUkm && (
          <>
            <DetailField label="Sub-Kategori" value={data.subKategori} />
          </>
        )}

        <DetailField
          label="Logo"
          value={<LogoFileButton href={data.linkDrive} />}
        />
      </div>
    </BaseModal>
  );
}
