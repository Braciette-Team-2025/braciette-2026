import AboutSection from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import LogoTransition from "../components/LogoTransition";
import PhotoSection from "../components/PhotoSection";

export default function HomeContainer() {
  return (
    <main className="w-full flex flex-col gap-7 md:gap-0 pt-12 md:pt-0 pb-12">
      <HeroSection />
      <div className="flex flex-col gap-7 md:gap-28">
        <AboutSection />
        <PhotoSection />
      </div>
    </main>
  );
}
