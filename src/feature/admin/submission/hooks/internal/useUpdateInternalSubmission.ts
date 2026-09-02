import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getInternalSubmissionById,
  updateInternalSubmission,
} from "../../services/submissionInternalService";
import { internalSubmissionKeys } from "./useInternalSubmissionList";

interface UpdateInternalParams {
  id: string;
  data: {
    name: string;
    type: string;
    pic: string;
    pic_contact: string;
  };
}

export function useUpdateInternalSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateInternalParams) => {
      // 1. Fetch current detail data so we don't lose other fields
      const original = await getInternalSubmissionById(id);
      const originalData = original.data;

      // 2. Build FormData
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("pic", data.pic);
      formData.append("pic_contact", data.pic_contact);

      formData.append("cabinet_name", originalData.cabinet_name || "");
      formData.append("mission", originalData.mission || "");
      formData.append("major_program", originalData.major_program || "");
      formData.append("drive_link", originalData.drive_link || "");

      if (originalData.nominations) {
        formData.append("nominations", originalData.nominations.join(",")); // or JSON.stringify depending on backend
      }

      if (originalData.social_medias) {
        formData.append(
          "social_medias",
          JSON.stringify(originalData.social_medias),
        );
      }

      const extraFields = ["vision", "target", "achievements"];
      extraFields.forEach((field) => {
        if ((originalData as unknown as Record<string, unknown>)[field]) {
          formData.append(
            field,
            String((originalData as unknown as Record<string, unknown>)[field]),
          );
        }
      });

      return updateInternalSubmission(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: internalSubmissionKeys.all,
      });
    },
    onError: (error) => {
      console.error("[updateInternalSubmission] Gagal memperbarui:", error);
    },
  });
}
