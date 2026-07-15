"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionContent from "../components/(Submission)/SubmissionContent";
import SubmissionDetailModalInternal from "../components/(Admin Submission)/(modal)/SubmissionDetailModalInternal";
import SubmissionDetailModalExternal from "../components/(Admin Submission)/(modal)/SubmissionDetailModalExternal";
import ConfirmationDialog from "../components/(Admin Submission)/(modal)/ConfirmationDialog";
import type { OrmawaTable, SubmissionDetailData } from "../types/ormawa";
import {
  externalSubmissionList,
  internalSubmissionList,
} from "../constants/ormawaList";

export default function SubmissionContainer() {
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<SubmissionDetailData | null>(
    null,
  );

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"internal" | "external">(
    "internal",
  );

  const handleDetail = (row: OrmawaTable) => {
    const source =
      activeTab === "internal"
        ? internalSubmissionList
        : externalSubmissionList;

    const found = source.find((item) => item.id === row.id);

    if (!found) return;

    const detail: SubmissionDetailData = {
      id: found.id,
      namaOrmawa: found.namaOrmawa,
      jenisOrmawa: found.jenisOrmawa,
      namaKabinet: found.namaKabinet,
      pic: found.pic,
      kontakPic: found.kontakPic,
      status: found.status,
      tanggalPendaftaran: found.tanggalPendaftaran,
      terakhirDiedit: found.terakhirDiedit,
      nominasi: found.nominasi,
      programKerjaUnggulan: found.programKerjaUnggulan,
      deskripsiSingkat: found.deskripsiSingkat,
      linkDrive: found.linkDrive,
      lombaDimenangkan: found.lombaDimenangkan || [],
      subKategori: found.subKategori || "-",
    };

    setDetailData(detail);
    setDetailOpen(true);
  };

  const handleEdit = (row: OrmawaTable) => {
    console.log("Edit:", row.id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    setDeleteLoading(true);
    setDeleteLoading(false);
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const DetailModal =
    activeTab === "internal"
      ? SubmissionDetailModalInternal
      : SubmissionDetailModalExternal;

  return (
    <div className="py-15 pl-6 pr-[100px] bg-white space-y-4">
      <div className="space-y-2 text-[#7F7F7F]">
        <h1 className="text-[32px] font-extrabold">Statistik Pendaftaran</h1>
        <p className="text-[20px] font-bold">Hasil pendaftaran ormawa</p>
      </div>

      <Tabs
        defaultValue="internal"
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "internal" | "external")
        }
      >
        <TabsList>
          <TabsTrigger value="internal">Internal</TabsTrigger>
          <TabsTrigger value="external">Eksternal</TabsTrigger>
        </TabsList>
        <TabsContent value="internal">
          <SubmissionContent
            type="internal"
            onDetail={handleDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
        <TabsContent value="external">
          <SubmissionContent
            type="external"
            onDetail={handleDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      {detailData && (
        <DetailModal
          open={detailOpen}
          onOpenChange={setDetailOpen}
          data={detailData}
        />
      )}

      <ConfirmationDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Hapus Ormawa"
        description="Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan."
        confirmText="Hapus"
        variant="destructive"
        loading={deleteLoading}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

function fetchOrmawaDetail(
  id: number,
): SubmissionDetailData | PromiseLike<SubmissionDetailData> {
  throw new Error("Function not implemented.");
}
