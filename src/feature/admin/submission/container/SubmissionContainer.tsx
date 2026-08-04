"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionContent from "../components/submission/SubmissionContent";
import SubmissionDetailModalInternal from "../components/submission/modal/SubmissionDetailModalInternal";
import SubmissionDetailModalExternal from "../components/submission/modal/SubmissionDetailModalExternal";
import ConfirmationDialog from "../components/submission/modal/ConfirmationDialog";
import { useSubmissionDetail } from "../hooks/useSubmissionDetail";

export default function SubmissionContainer() {
  const [activeTab, setActiveTab] = useState<"internal" | "external">(
    "internal",
  );

  const {
    detailOpen,
    setDetailOpen,
    detailData,
    deleteOpen,
    setDeleteOpen,
    deleteLoading,
    handleDetail,
    handleEdit,
    handleDelete,
    confirmDelete,
  } = useSubmissionDetail(activeTab);

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
