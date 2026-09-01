"use client";

import BaseModal from "./BaseModal";
import DetailField from "./DetailField";

import type { ExternalSubmissionDetailModalProps } from "../../../types/ormawa";

/**
 * Modal detail untuk submission external.
 * Menggunakan ExternalSubmissionDetail (shape API real) bukan SubmissionDetailData.
 *
 * Field yang ditampilkan:
 * - Tanggal Pendaftaran (created_at)
 * - Terakhir Diedit (updated_at)
 * - Nama Ormawa (name)
 * - Jenis Ormawa (type)
 * - Sub-Kategori (hanya jika type === "UKM")
 * - Logo (logo_url sebagai link preview)
 */
export default function SubmissionDetailModalExternal({
  open,
  onOpenChange,
  data,
}: ExternalSubmissionDetailModalProps) {
  // Format ISO datetime ke "DD/MM/YYYY"
  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={data.name}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <DetailField
          label="Tanggal Pendaftaran"
          value={formatDate(data.created_at)}
        />
        <DetailField
          label="Terakhir Diedit"
          value={formatDate(data.updated_at)}
        />

        <DetailField label="Nama Ormawa" value={data.name} />
        <DetailField label="Jenis Ormawa" value={data.type} />

        <DetailField
          label="Logo"
          value={
            data.logo_url ? (
              <a
                href={data.logo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src={data.logo_url}
                  alt={`Logo ${data.name}`}
                  className="h-16 w-16 rounded-lg object-contain border border-[#E0E0E0]"
                />
              </a>
            ) : (
              "-"
            )
          }
        />
      </div>
    </BaseModal>
  );
}
