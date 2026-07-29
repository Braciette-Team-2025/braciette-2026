import Image from "next/image";
import SocialLinks from "./SocialLinks";

interface FooterProps {
  tagline?: string;
  teamLabel?: string;
}

export default function Footer({
  tagline = "Bring The Great Story with Harmonization and Collaborative Simpul Brawijaya",
  teamLabel = "Team IT Brawijaya Appreciate 2025",
}: FooterProps) {
  return (
    <footer className="relative w-full bg-blue-900 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:pt-16 lg:pb-10">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-blue-900" />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center sm:gap-5 lg:gap-6">
        <Image
          src="/images/logo/footer-logo.svg"
          alt="Brawijaya Festival Appreciate 2026"
          width={362}
          height={140}
          priority
          className="h-auto w-[180px] xs:w-[220px] sm:w-[260px] md:w-[310px] lg:w-[362px]"
        />

        <p className=" max-w-2xl px-2 text-xs text-yellow-50 sm:px-0 sm:text-sm md:text-base">
          {tagline}
        </p>

        <SocialLinks />
      </div>

      <div className="mx-auto mt-8 w-full max-w-4xl border-t border-yellow-500/60 sm:mt-10" />

      <p className=" mt-5 text-center text-xs font-semibold text-blue-200 sm:mt-6 sm:text-sm">
        {teamLabel}
      </p>
    </footer>
  );
}
