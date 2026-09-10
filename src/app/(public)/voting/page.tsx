import { redirect } from "next/navigation";
import { VotingContainer } from "@/src/feature/landing/voting/container/VotingContainer";
import { getSettings, isFeatureEnabled } from "@/src/lib/settings";

export default async function VotingPage() {
  const settings = await getSettings();
  if (!isFeatureEnabled(settings, "voting")) {
    redirect("/");
  }

  return <VotingContainer />;
}
