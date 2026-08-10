import { cn } from "@/lib/utils";
import { ScriptWord } from "../components/ScriptWord";

type VotingHeroVariant = "category" | "organization";

interface VotingHeroProps {
  variant?: VotingHeroVariant;
  className?: string;
}

export function VotingHero({
  variant = "category",
  className,
}: VotingHeroProps) {
  return (
    <div className={cn("mx-auto flex w-full justify-center px-4", className)}>
      <h1 className={cn("text-center leading-none", "tracking-[-0.03em]")}>
        <span
          className={cn(
            "flex items-end justify-center",
            "gap-4 md:gap-6 lg:gap-8",
          )}
        >
          <ScriptWord
            initial="C"
            rest="hoose"
            color="light"
            initialClassName="-left-1 md:-left-2"
          />

          <ScriptWord
            initial="Y"
            rest="our"
            color="light"
            initialClassName="-left-1 md:-left-2"
          />
        </span>

        <span
          className={cn(
            "mt-[1rem]",
            "flex items-end justify-center",
            "gap-4 md:gap-6 lg:gap-8",
          )}
        >
          <ScriptWord
            initial="F"
            rest="avorite"
            color="gold"
            initialClassName="-left-1 md:-left-2"
            suffix={variant === "organization" ? "!" : undefined}
            suffixClassName={cn(
              "ml-1",
              "font-sloop",
              "text-[4rem]",
              "md:text-[5rem]",
              "lg:text-[6rem]",
              "align-middle",
              "-rotate-[8deg]",
            )}
          />

          {variant === "category" && (
            <ScriptWord
              initial="O"
              rest="rmawa"
              color="gold"
              initialClassName="-left-1 md:-left-2"
            />
          )}
        </span>
      </h1>
    </div>
  );
}
