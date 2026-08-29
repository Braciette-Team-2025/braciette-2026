import { z } from "zod";

export const openTalentStepOneSchema = z.object({
  leaderName: z.string().min(1, "Nama lengkap ketua wajib diisi"),
  faculty: z.string().min(1, "Asal fakultas wajib diisi"),
  leaderContact: z
    .string()
    .min(1, "Kontak ketua wajib diisi")
    .regex(/^08/, "Nomor HP harus diawali dengan 08")
    .min(10, "Nomor HP minimal 10 digit")
    .max(20, "Nomor HP maksimal 20 karakter"),
});

export const openTalentStepTwoSchema = z.object({
  talent: z.string().min(1, "Talent yang ditampilkan wajib diisi"),
  performanceType: z.enum(["Individu", "Kelompok"], {
    message: "Jenis penampilan wajib dipilih",
  }),
  memberCount: z.number().int().min(1, "Jumlah anggota minimal 1"),
  driveLink: z
    .string()
    .min(1, "Link Drive wajib diisi")
    .startsWith(
      "https://drive.google.com/",
      "Link harus diawali https://drive.google.com/",
    ),
});

export const openTalentFullSchema = openTalentStepOneSchema.merge(
  openTalentStepTwoSchema,
);

export type OpenTalentStepOneData = z.infer<typeof openTalentStepOneSchema>;
export type OpenTalentStepTwoData = z.infer<typeof openTalentStepTwoSchema>;
export type OpenTalentFullData = z.infer<typeof openTalentFullSchema>;
