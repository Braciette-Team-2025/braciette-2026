"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LandingButton } from "./ui/LandingButton";
import { useRef } from "react";
import { useHeroAnimation } from "../hooks/animation/useHeroAnimation";

export default function HeroSection() {
  const router = useRouter();
  const highlightClass =
    "font-sloop text-[60px] md:text-[120px] xl:text-[200px]";

  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    sectionRef,
    starsRef,
    titleRef,
    subtitleRef,
    ctaRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full  md:min-h-[calc(100vh-106px)] flex flex-col items-center justify-center gap-4 md:gap-8 lg:gap-14"
    >
      <div
        ref={starsRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-[45%] left-[23%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <div className="absolute top-[10%] right-[25%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <div className="absolute bottom-[20%] right-[28%] w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>

      <div className="pointer-events-none absolute -left-20 md:-left-40 lg:-left-65 top-1/2 -translate-y-1/2 w-[40vw] max-w-[600px] min-w-[150px] lg:min-w-[250px] rotate-180 scale-y-[-1]">
        <Image
          src="/images/gold_string/gold_string_1.svg"
          alt="Gold String"
          width={600}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div className="pointer-events-none absolute -right-20 md:-right-40 lg:-right-65 top-1/2 -translate-y-1/2 w-[40vw] max-w-[600px] min-w-[150px] lg:min-w-[250px]">
        <Image
          src="/images/gold_string/gold_string_1.svg"
          alt="Gold String"
          width={600}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div className="relative z-10 text-center space-y-2  lg:space-y-6 flex flex-col justify-center items-center">
        <h1
          ref={titleRef}
          className="font-the-seasons text-[24px] md:text-[40px] xl:text-[80px] leading-[0.7]"
        >
          <span className="block text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]">
            <span className="sr-only">Brawijaya Festival</span>
            <span aria-hidden="true">
              <span className={highlightClass}>B</span>
              rawijaya <span className={highlightClass}>F</span>
              estival
            </span>
          </span>
          <span className="block text-[#B2B4C6] drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]">
            <span className="sr-only">Appreciate 2026</span>
            <span aria-hidden="true">
              <span className={highlightClass}>A</span>
              ppreciate 2026
            </span>
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="font-the-seasons text-xs max-w-[244px] md:max-w-[320px] lg:max-w-fit md:text-md xl:text-2xl text-blue-50"
        >
          Bring The Great Story with Harmonization and Collaborative Simpul
          Brawijaya
        </p>
      </div>
      <div ref={ctaRef} className="flex gap-4 md:gap-6 lg:gap-10">
     
        <LandingButton
          className="min-w-24.5 md:min-w-36 lg:min-w-55"
          onClick={() => router.push("/open-talent")}
        >
          Open Talent
        </LandingButton>
        <LandingButton
          className="min-w-24.5 md:min-w-36 lg:min-w-55"
          onClick={() => router.push("/voting")}
        >
          Voting
        </LandingButton>
      </div>
    </section>
  );
}
