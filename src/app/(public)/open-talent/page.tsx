import { redirect } from "next/navigation";
import { OpenTalentFormContainer } from "@/src/feature/landing/open-talent/container/OpenTalentFormContainer";
import { getSettings, isFeatureEnabled } from "@/src/lib/settings";
import { ProtectedRoute } from "@/src/feature/auth/components/ProtectedRoute";

export default async function OpenTalentPage() {
  const settings = await getSettings();
  if (!isFeatureEnabled(settings, "open_talent")) {
    redirect("/");
  }
  return (
    <ProtectedRoute>
      <OpenTalentFormContainer />
    </ProtectedRoute>
  );
}
