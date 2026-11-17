import HomeContainer from "@/src/feature/landing/home/container/HomeContainer";

export default async function Home() {
  return <HomeContainer votingEnabled={false} openTalentEnabled={false} />;
}
