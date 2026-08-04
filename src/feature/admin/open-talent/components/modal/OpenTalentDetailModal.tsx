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
          value={data.tanggalPendaftaran}
        />
        <DetailField label="Terakhir diedit" value={data.terakhirDiedit} />
        <DetailField label="Nama Lengkap Ketua" value={data.namaKetua} />
        <DetailField label="Asal Fakultas" value={data.asalFakultas} />
        <DetailField
          label="Talent yang Ditampilkan"
          value={data.talentDitampilkan}
        />
        <DetailField label="Jenis Penampilan" value={data.jenisPenampilan} />
        <DetailField label="Jumlah Anggota" value={data.jumlahAnggota} />
        <DetailField label="Kontak Ketua" value={data.kontakKetua} />
        <div>
          <p className="mb-1 text-sm font-semibold text-[#4B4B4B]">Status</p>
          <StatusBadge status={data.status} />
        </div>
        <div />{" "}
        {/* Empty div for grid alignment if necessary, though grid-cols-2 will handle it */}
        <DetailField
          label="Link Drive"
          fullWidth
          value={
            <a
              href={data.linkDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-[#8A8A8A] underline hover:text-[#6D6D6D]"
            >
              {data.linkDrive}
            </a>
          }
        />
      </div>
    </BaseModal>
  );
}
