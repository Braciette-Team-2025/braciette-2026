"use client";

import BaseModal from "./BaseModal";
import DetailField from "./DetailField";
import { StatusBadge } from "../(table)/StatusBadge";

import type { SubmissionDetailModalProps } from "../../../types/ormawa";

export default function SubmissionDetailModalInternal({
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

        <DetailField label="PIC" value={data.pic} />
        <DetailField label="Kontak PIC" value={data.kontakPic} />

        <DetailField label="Nama Ormawa" value={data.namaOrmawa} />
        <DetailField label="Jenis Ormawa" value={data.jenisOrmawa} />

        {isUkm ? (
          <>
            <DetailField label="Sub-Kategori" value={data.subKategori} />
            <DetailField label="Nama Kabinet" value={data.namaKabinet} />

            <DetailField label="Nominasi" value={data.nominasi} />
            <DetailField
              label="Lomba yang Dimenangkan"
              value={data.lombaDimenangkan}
            />
          </>
        ) : (
          <>
            <DetailField label="Nama Kabinet" value={data.namaKabinet} />
            <DetailField label="Nominasi" value={data.nominasi} />
          </>
        )}

        <DetailField
          label="Program Kerja Unggulan"
          value={data.programKerjaUnggulan}
        />
        <div>
          <p className="mb-1 text-sm font-semibold text-[#4B4B4B]">Status</p>
          <StatusBadge status={data.status} />
        </div>

        <DetailField
          label="Deskripsi Singkat"
          value={data.deskripsiSingkat}
          fullWidth
        />

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
