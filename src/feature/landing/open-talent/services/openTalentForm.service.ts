import { OpenTalentFormValues } from "../types/openTalentForm";

const SIMULATED_LATENCY_MS = 600;

function delay<T>(value: T, ms: number = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const openTalentFormService = {
  async submit(values: OpenTalentFormValues): Promise<{ success: boolean }> {
    // Swap this for a real POST request once the backend is ready.
    return delay({ success: true });
  },
};
