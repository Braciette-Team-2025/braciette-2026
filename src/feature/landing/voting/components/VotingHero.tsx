"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type VotingHeroVariant = "step-1" | "step-2";

const HERO_IMAGES: Record<
  VotingHeroVariant,
  {
    src: string;
    width: number;
    height: number;
    alt: string;
  }
> = {
  "step-1": {
    src: "/images/logo/Hero-title.svg",
    width: 900,
    height: 330,
    alt: "Voting Hero Step 1",
  },
  "step-2": {
    src: "/images/logo/Hero-title-step2.svg",
    width: 900,
    height: 330,
    alt: "Voting Hero Step 2",
  },
};

interface VotingHeroProps {
  variant?: VotingHeroVariant;
  className?: string;
}

export function VotingHero({ variant = "step-1", className }: VotingHeroProps) {
  const hero = HERO_IMAGES[variant];

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl justify-center px-4",
        className,
      )}
    >
      <Image
        src={hero.src}
        alt={hero.alt}
        width={hero.width}
        height={hero.height}
        priority
        className="h-auto w-full max-w-2xl md:max-w-3xl lg:max-w-4xl"
      />
    </div>
  );
}
