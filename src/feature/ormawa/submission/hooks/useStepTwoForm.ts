import { JenisOrmawa } from "../constants/submission";
import { STEP_TWO_SCHEMA_MAP } from "../schemas/submissionSchema";
import type { SubmissionFormData } from "./useSubmissionContainer";

export function useStepTwoForm(formData: SubmissionFormData) {
  const { jenisOrmawa } = formData;

  if (!jenisOrmawa) {
    return { isValid: false, fieldErrors: {} };
  }

  const schema = STEP_TWO_SCHEMA_MAP[jenisOrmawa as JenisOrmawa];

  if (!schema) {
    return { isValid: false, fieldErrors: {} };
  }

  const result = schema.safeParse(formData);

  const fieldErrors = !result.success
    ? Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(
          ([key, messages]) => [key, messages?.[0]],
        ),
      )
    : {};

  return {
    isValid: result.success,
    fieldErrors,
  };
}
