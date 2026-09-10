"use client";

import { useRef } from "react";
import { SUBMISSION_GUIDE_DATA } from "../constants/constants";
import SubmissionTextbox from "./ui/SubmissionTextbox";
import { useOpenTalentAnimation } from "../hooks/animation/useOpenTalentAnimation";
import { LandingButton } from "./ui/LandingButton";
import { useAuthStore } from "@/src/feature/auth/store/authStore";

interface OpenTalentGuideSectionProps {
  disabled?: boolean;
}

export default function OpenTalentGuideSection({
  disabled,
}: OpenTalentGuideSectionProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const buttonHref = disabled && !isAuthenticated ? "/login" : "/open-talent";
  const buttonDisabled = disabled && isAuthenticated;

  const highlightClass =
    "font-sloop text-[60px] md:text-[120px] xl:text-[200px]";

  const sectionRef = useRef<HTMLElement>(null);

  useOpenTalentAnimation({ sectionRef });

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center px-4 lg:px-25 gap-5 md:gap-7 xl:gap-10 md:h-screen"
    >
      <div className="flex flex-col w-full gap-3">
        <h1 className="font-the-seasons text-[24px] md:text-[40px] xl:text-[80px] leading-[0.6] pt-4 md:pt-8 xl:pt-12">
          <span
            data-ot-heading
            className="block text-blue-100 drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]"
          >
            <span className={highlightClass}>P</span>anduan
          </span>
          <span
            data-ot-heading
            className="block text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]"
          >
            <span className={highlightClass}>O</span>pen{" "}
            <span className={highlightClass}>T</span>alent
          </span>
        </h1>
        <p
          data-ot-subtitle
          className="text-xs md:text-2xl xl:text-4xl font-the-seasons"
        >
          Cari tahu cara mendaftar dan tunjukkan potensi terbaikmu.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-16 md:gap-24 xl:gap-48 xl:my-10">
        {SUBMISSION_GUIDE_DATA.map((data) => {
          return (
            <div data-ot-item key={data.id} className="will-change-transform">
              <SubmissionTextbox id={data.id} desc={data.desc} />
            </div>
          );
        })}
      </div>

      <div data-ot-cta className="w-32 md:w-64 xl:w-100">
        <LandingButton
          className="w-full"
          href={buttonHref}
          disabled={buttonDisabled}
        >
          Open Talent
        </LandingButton>
      </div>
    </section>
  );
}
