"use client";

import BaseModal from "./BaseModal";
import DetailField from "./DetailField";
import { StatusBadge } from "../table/StatusBadge";
import { OpenTalentDetailModalProps } from "../../types";

export default function OpenTalentDetailModal({
  open,
  onOpenChange,
  data,
}: OpenTalentDetailModalProps) {
  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title="Open Talent">
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <DetailField
          label="Tanggal Pendaftaran"
          value={new Date(data.created_at).toLocaleDateString("id-ID")}
        />
        <DetailField
          label="Terakhir diedit"
          value={new Date(data.updated_at).toLocaleDateString("id-ID")}
        />
        <DetailField label="Nama Lengkap Ketua" value={data.leader_name} />
        <DetailField label="Asal Fakultas" value={data.leader_faculty} />
        <DetailField label="Talent yang Ditampilkan" value={data.talent_name} />
        <DetailField label="Jenis Penampilan" value={data.performance_type} />
        <DetailField
          label="Jumlah Anggota"
          value={data.member_count?.toString() || "-"}
        />
        <DetailField label="Kontak Ketua" value={data.leader_wa_contact} />
        <div>
          <p className="mb-1 text-sm font-semibold text-[#4B4B4B]">Status</p>
          <StatusBadge status={data.status} />
        </div>
        <div />{" "}
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
