import { api } from "@/src/lib/axios";
import type { CreateInternalSubmissionResponse } from "../types/submission.type";

const BASE_URL = "/v1/submission/internal";

export async function createInternalSubmission(
  formData: FormData,
): Promise<CreateInternalSubmissionResponse> {
  const response = await api.post<CreateInternalSubmissionResponse>(
    BASE_URL,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}
