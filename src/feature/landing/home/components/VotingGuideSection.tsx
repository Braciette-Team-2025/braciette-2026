"use client";

import { useRef } from "react";
import { VOTE_GUIDE_DATA } from "../constants/constants";
import FloatingNotesWrapper from "./ui/FloatingNotesWrapper";
import { LandingButton } from "./ui/LandingButton";
import VotingTextbox from "./ui/VotingTextbox";
import { useGuideAnimation } from "../hooks/animation/Useguideanimation";

export default function VotingGuideSection() {
  const highlightClass =
    "font-sloop text-[60px] md:text-[120px] xl:text-[200px]";

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGuideAnimation({ containerRef, sectionRef });

  return (
    <FloatingNotesWrapper containerRef={containerRef}>
      <section
        ref={sectionRef}
        className="flex flex-col items-center justify-center px-4 lg:px-25 gap-5 md:gap-7 xl:gap-10 md:h-screen"
      >
        <h1 className="font-the-seasons text-[24px] md:text-[40px] xl:text-[80px] leading-[0.6] text-center flex flex-col justify-center pt-4 md:pt-8 xl:pt-12">
          <span
            data-guide-heading
            className="block text-blue-100 drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]"
          >
            <span className={highlightClass}>G</span>uide to
          </span>
          <span
            data-guide-heading
            className="block text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]"
          >
            <span className={highlightClass}>V</span>oting
          </span>
        </h1>

        <div className="flex gap-6">
          {VOTE_GUIDE_DATA.map((data) => {
            return (
              <div data-guide-item key={data.id}>
                <VotingTextbox id={data.id} desc={data.desc} />
              </div>
            );
          })}
        </div>

        <div
          data-guide-cta
          className="w-32 md:w-64 xl:w-100 mt-4 md:mt-7 xl:mt-10"
        >
          <LandingButton className="w-full" href="/voting">
            Voting
          </LandingButton>
        </div>
      </section>
    </FloatingNotesWrapper>
  );
}
