import { z } from "zod";
import { JenisOrmawa } from "../constants/submission";

const UNSAFE_CHARS = /[<>"';&\\`]/;

function safeText(schema: z.ZodString) {
  return schema.refine((val) => !UNSAFE_CHARS.test(val), {
    message: "Input mengandung karakter yang tidak diizinkan",
  });
}

const socialMediaItemSchema = z.object({
  id: z.string(),
  platform: safeText(z.string().min(1, "Platform tidak boleh kosong")),
  username: safeText(z.string().min(1, "Nama akun tidak boleh kosong")),
});

const lombaItemSchema = z.object({
  id: z.string(),
  value: safeText(z.string().min(1, "Nama lomba tidak boleh kosong")),
});

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

const nominasiSchema = z
  .array(z.string())
  .min(1, "Pilih minimal satu nominasi");

export const stepOneSchema = z.object({
  jenisOrmawa: z.nativeEnum(JenisOrmawa, {
    message: "Jenis Ormawa wajib dipilih",
  }),

  namaOrmawa: safeText(
    z
      .string()
      .min(1, "Nama Ormawa wajib diisi")
      .max(100, "Maksimal 100 karakter"),
  ),

  namaKabinet: safeText(
    z
      .string()
      .min(1, "Nama Kabinet wajib diisi")
      .max(100, "Maksimal 100 karakter"),
  ),

  pic: safeText(
    z.string().min(1, "PIC wajib diisi").max(60, "Maksimal 60 karakter"),
  ),

  kontakPic: z
    .string()
    .min(1, "Kontak PIC wajib diisi")
    .max(15, "Maksimal 15 karakter")
    .regex(
      /^08\d{7,14}$/,
      "Nomor harus diawali 08 dan terdiri dari 9-16 digit",
    ),

  deskripsi: safeText(z.string().min(1, "Deskripsi wajib diisi")),

  proker: safeText(
    z
      .string()
      .min(1, "Program Kerja wajib diisi")
      .max(50, "Maksimal 50 karakter"),
  ),

  mediaSosial: z
    .array(socialMediaItemSchema)
    .min(1, "Tambahkan minimal satu media sosial")
    .refine(
      (list) => list.every((m) => m.platform.trim() && m.username.trim()),
      { message: "Setiap media sosial harus terisi platform dan nama akun" },
    ),
});

const stepTwoBaseSchema = z.object({
  selectedNominasi: nominasiSchema,
  linkDrive: driveLinkSchema,
});

export const stepTwoBEMSchema = stepTwoBaseSchema;
export const stepTwoDPMSchema = stepTwoBaseSchema;
export const stepTwoHIMASchema = stepTwoBaseSchema;

export const stepTwoUKMSchema = stepTwoBaseSchema.extend({
  lomba: z.array(lombaItemSchema).optional(),
});

export const STEP_TWO_SCHEMA_MAP = {
  [JenisOrmawa.BEM]: stepTwoBEMSchema,
  [JenisOrmawa.DPM]: stepTwoDPMSchema,
  [JenisOrmawa.HIMA]: stepTwoHIMASchema,
  [JenisOrmawa.UKM_PENALARAN]: stepTwoUKMSchema,
  [JenisOrmawa.UKM_OLAHRAGA]: stepTwoUKMSchema,
  [JenisOrmawa.UKM_KESENIAN]: stepTwoUKMSchema,
  [JenisOrmawa.UKM_KEROHANIAN]: stepTwoUKMSchema,
} as const;

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoBaseData = z.infer<typeof stepTwoBaseSchema>;
