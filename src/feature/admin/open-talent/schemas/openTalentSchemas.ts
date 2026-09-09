import z from "zod";
import { PERFORMANCE_TYPES } from "../types";

const UNSAFE_CHARS = /[<>"';&\\`]/;

function safeText(schema: z.ZodString) {
  return schema.refine((val) => !UNSAFE_CHARS.test(val), {
    message: "Input mengandung karakter yang tidak diizinkan",
  });
}

const driveLinkSchema = z
  .string()
  .min(1, "Link Drive wajib diisi")
  .url("Link Drive harus berupa URL yang valid")
  .refine(
    (url) => {
      try {
        return new URL(url).hostname.includes("drive.google.com");
      } catch {
        return false;
      }
    },
    { message: "Link harus berasal dari Google Drive" },
  );

export const stepOneSchema = z.object({
  namaKetua: safeText(z.string().min(1, "Nama ketua wajib diisi")),
  asalFakultas: safeText(z.string().min(1, "Fakultas ketua wajib diisi")),
  kontakKetua: safeText(
    z
      .string()
      .min(1, "Kontak Ketua wajib diisi")
      .max(15, "Maksimal 15 karakter")
      .regex(
        /^08\d{7,14}$/,
        "Nomor harus diawali 08 dan terdiri dari 9-16 digit",
      ),
  ),
});

export const stepTwoSchema = z.object({
  talentDitampilkan: safeText(z.string().min(1, "Talent wajib diisi")),
  jenisPenampilan: z.enum(PERFORMANCE_TYPES),
  jumlahAnggota: z.number().min(1),
  linkDrive: safeText(driveLinkSchema),
});

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
