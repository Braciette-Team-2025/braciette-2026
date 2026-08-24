import AboutSection from "../components/AboutSection";
import FaqSection from "../components/FaqSection";
import HeroSection from "../components/HeroSection";
import PhotoSection from "../components/PhotoSection";
import TimelineSection from "../components/TimelineSection";

export default function HomeContainer() {
  return (
    <main className="w-full flex flex-col gap-12 md:gap-0 pt-12 md:pt-0 pb-12">
      <HeroSection />
      <div className="flex flex-col gap-12 md:gap-28">
        <AboutSection />
        <PhotoSection />
        <TimelineSection />
        <FaqSection />
      </div>
    </main>
  );
}
