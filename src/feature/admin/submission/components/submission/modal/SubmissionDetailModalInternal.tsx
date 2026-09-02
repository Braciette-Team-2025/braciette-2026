"use client";

import BaseModal from "./BaseModal";
import DetailField from "./DetailField";
import { StatusBadge } from "../table/StatusBadge";

import type { SubmissionDetailModalProps } from "../../../types/ormawa";

export default function SubmissionDetailModalInternal({
  open,
  onOpenChange,
  data,
}: SubmissionDetailModalProps) {
  const isUkm = data.type.startsWith("UKM");

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={data.name}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <DetailField
          label="Tanggal Pendaftaran"
          value={new Date(data.created_at).toLocaleDateString("id-ID")}
        />
        <DetailField
          label="Terakhir diedit"
          value={new Date(data.updated_at).toLocaleDateString("id-ID")}
        />

        <DetailField label="PIC" value={data.pic} />
        <DetailField label="Kontak PIC" value={data.pic_contact} />

        <DetailField label="Nama Ormawa" value={data.name} />
        <DetailField label="Jenis Ormawa" value={data.type} />

        {isUkm ? (
          <>
            <DetailField label="Nama Kabinet" value={data.cabinet_name} />
            <DetailField
              label="Nominasi"
              value={data.nominations?.join(", ")}
            />
          </>
        ) : (
          <>
            <DetailField label="Nama Kabinet" value={data.cabinet_name} />
            <DetailField
              label="Nominasi"
              value={data.nominations?.join(", ")}
            />
          </>
        )}

        <DetailField
          label="Program Kerja Unggulan"
          value={data.major_program}
        />
        <div>
          <p className="mb-1 text-sm font-semibold text-[#4B4B4B]">Status</p>
          <StatusBadge status={data.status} />
        </div>

        <DetailField label="Deskripsi Singkat" value={data.mission} fullWidth />

        <DetailField
          label="Link Drive"
          fullWidth
          value={
            <a
              href={data.drive_link}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-[#8A8A8A] underline hover:text-[#6D6D6D]"
            >
              {data.drive_link}
            </a>
          }
        />
      </div>
    </BaseModal>
  );
}
