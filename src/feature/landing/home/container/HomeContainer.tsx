"use client";
import AboutSection from "../components/AboutSection";
import FaqSection from "../components/FaqSection";
import HeroSection from "../components/HeroSection";
import OpenTalentGuideSection from "../components/OpenTalentGuideSection";
import PhotoSection from "../components/PhotoSection";
import TimelineSection from "../components/TimelineSection";
import VotingGuideSection from "../components/VotingGuideSection";
import { useScrollToHashOnMount } from "../hooks/useScrollToHashOnMount";

interface HomeContainerProps {
  votingEnabled?: boolean;
  openTalentEnabled?: boolean;
}

export default function HomeContainer({
  votingEnabled = true,
  openTalentEnabled = true,
}: HomeContainerProps) {
  useScrollToHashOnMount();
  return (
    <main className="w-full flex flex-col gap-12 md:gap-0 pt-12 md:pt-0 pb-12">
      <HeroSection
        votingEnabled={votingEnabled}
        openTalentEnabled={openTalentEnabled}
      />
      <div className="flex flex-col gap-12 md:gap-28">
        <AboutSection />
        <PhotoSection />
        <TimelineSection />
        <VotingGuideSection disabled={!votingEnabled} />
        <OpenTalentGuideSection disabled={!openTalentEnabled} />
        <FaqSection />
      </div>
    </main>
  );
}
