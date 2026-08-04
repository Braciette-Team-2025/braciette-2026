"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload } from "lucide-react";
import ConfirmationDialog from "../create-ormawa-internal/dialog/ConfirmationDialog";
import { useState } from "react";
import { ORMAWA_TYPES } from "../../constants/nominations";

const ORMAWA_ENUM = [
  "BEM",
  "DPM",
  "HIMA",
  "UKM PENALARAN",
  "UKM OLAHRAGA",
  "UKM KESENIAN",
  "UKM KEROHANIAN",
] as const;

const formSchema = z.object({
  ormawaType: z.enum(ORMAWA_ENUM),

  namaOrmawa: z.string(),

  logo: z
    .any()
    .refine((files) => files?.length > 0, "Logo wajib diunggah")
    .refine((files) => files?.[0]?.size <= 5000000, "Ukuran file maksimal 5 MB")
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Hanya menerima format PDF",
    ),
});
type FormValues = z.infer<typeof formSchema>;

export default function ExternalForm() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaOrmawa: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setPendingData(data);
    setOpenConfirm(true);
  };

  const handleFinalSubmit = async () => {
    if (!pendingData) return;

    try {
      console.log("Mengirim data final ke database:", pendingData);

      setOpenConfirm(false);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="jenisOrmawa"
            className="block text-sm font-semibold text-gray-700"
          >
            Jenis Ormawa
          </label>
          <div className="relative">
            <select
              id="ormawaType"
              {...register("ormawaType")}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              <option value="" disabled className="text-gray-400">
                Pilih Jenis Ormawa
              </option>
              {ORMAWA_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.ormawaType && (
            <p className="text-sm text-red-500">{errors.ormawaType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="namaOrmawa"
            className="block text-sm font-semibold text-gray-700"
          >
            Nama Ormawa
          </label>
          <input
            id="namaOrmawa"
            type="text"
            placeholder="Kabinet Departemen Sistem Informasi"
            {...register("namaOrmawa")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          {errors.namaOrmawa && (
            <p className="text-sm text-red-500">{errors.namaOrmawa.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Logo
          </label>

          <div>
            <label
              htmlFor="logoUpload"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Upload className="h-4 w-4" />
              Upload File
            </label>
            <input
              id="logoUpload"
              type="file"
              accept=".pdf"
              className="hidden"
              {...register("logo")}
            />
          </div>

          <p className="text-xs text-gray-500">Unggah file PDF (maks. 5 MB)</p>
          {errors.logo && (
            <p className="text-sm text-red-500">
              {errors.logo?.message as string}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-[#5e5e5e] px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Selanjutnya
          </button>
        </div>
      </form>
      <ConfirmationDialog
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        title="Konfirmasi data"
        description="Pastikan seluruh data yang dimasukkan sudah benar sebelum disimpan"
        confirmText="Konfirmasi"
        onConfirm={handleFinalSubmit}
      />
    </div>
  );
}
