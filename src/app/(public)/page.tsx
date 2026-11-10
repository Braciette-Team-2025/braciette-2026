import HomeContainer from "@/src/feature/landing/home/container/HomeContainer";

export default async function Home() {
  const settings = await getSettings();
  return (
    <HomeContainer
      votingEnabled={isFeatureEnabled(settings, "voting")}
      openTalentEnabled={true}
    />
  );
}
