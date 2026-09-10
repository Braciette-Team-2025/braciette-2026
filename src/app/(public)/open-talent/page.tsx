import { redirect } from "next/navigation";
import { OpenTalentFormContainer } from "@/src/feature/landing/open-talent/container/OpenTalentFormContainer";
import { getSettings, isFeatureEnabled } from "@/src/lib/settings";

export default async function OpenTalentPage() {
  const settings = await getSettings();
  if (!isFeatureEnabled(settings, "open_talent")) {
    redirect("/");
  }

  return <OpenTalentFormContainer />;
}
