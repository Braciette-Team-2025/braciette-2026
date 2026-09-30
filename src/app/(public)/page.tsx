import HomeContainer from "@/src/feature/landing/home/container/HomeContainer";
import { getSettings, isFeatureEnabled } from "@/src/lib/settings";

export default async function Home() {
  const settings = await getSettings();
  return (
    <HomeContainer
      votingEnabled={false}
      openTalentEnabled={isFeatureEnabled(settings, "open_talent")}
    />
  );
}
