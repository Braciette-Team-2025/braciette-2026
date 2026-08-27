import axios from "axios";

import { OpenTalentFormValues } from "../types/openTalentForm";
import { submitOpenTalent } from "./openTalentApi";

export class OpenTalentSubmitError extends Error {}

interface ApiErrorBody {
  message?: string;
}

export const openTalentFormService = {
  async submit(values: OpenTalentFormValues): Promise<{ success: boolean }> {
    try {
      const response = await submitOpenTalent(values);

      return { success: response.success };
    } catch (error) {
      if (axios.isAxiosError<ApiErrorBody>(error)) {
        const status = error.response?.status;
        const backendMessage = error.response?.data?.message;

        if (status === 409) {
          throw new OpenTalentSubmitError(
            backendMessage ?? "Kamu sudah terdaftar untuk Open Talent.",
          );
        }

        if (status === 403) {
          throw new OpenTalentSubmitError(
            backendMessage ??
              "Kamu tidak punya akses untuk mendaftar Open Talent.",
          );
        }

        if (status === 401) {
          throw new OpenTalentSubmitError(
            "Sesi kamu sudah berakhir, silakan login ulang.",
          );
        }

        if (status && status >= 400 && status < 500) {
          throw new OpenTalentSubmitError(
            backendMessage ?? "Data yang dikirim belum valid.",
          );
        }

        throw new OpenTalentSubmitError(
          backendMessage ?? "Gagal mengirim pendaftaran, coba lagi.",
        );
      }

      throw new OpenTalentSubmitError("Gagal mengirim pendaftaran, coba lagi.");
    }
  },
};
