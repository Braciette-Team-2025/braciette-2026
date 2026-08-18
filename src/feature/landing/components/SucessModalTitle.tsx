import { cn } from "@/lib/utils";

interface SuccessModalTitleProps {
  variant: "voting" | "applying";
  className?: string;
}

const TITLE_CONFIG = {
  voting: {
    word: "Voting",
  },
  applying: {
    word: "Applying",
  },
} as const;

export function SuccessModalTitle({
  variant,
  className,
}: SuccessModalTitleProps) {
  const { word } = TITLE_CONFIG[variant];

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center text-center leading-none",
        className,
      )}
    >
      <h2 className="whitespace-nowrap" aria-label={`Thanks For ${word}!`}>
        <span
          className="font-sloop text-blue-100 drop-shadow-[0_0_16px_rgba(178,180,198,0.55)]"
          style={{
            fontSize: "clamp(3.2rem, min(15vw, 13vh), 7.5rem)",
          }}
        >
          T
        </span>

        <span
          className="font-the-seasons text-blue-100"
          style={{
            fontSize: "clamp(1.4rem, min(5.2vw, 4.8vh), 3.2rem)",
          }}
        >
          hanks
        </span>

        <span
          className="ml-[0.12em] font-sloop text-blue-100 drop-shadow-[0_0_16px_rgba(178,180,198,0.55)]"
          style={{
            fontSize: "clamp(3.2rem, min(15vw, 13vh), 7.5rem)",
          }}
        >
          F
        </span>

        <span
          className="font-the-seasons text-blue-100"
          style={{
            fontSize: "clamp(1.4rem, min(5.2vw, 4.8vh), 3.2rem)",
          }}
        >
          or
        </span>
      </h2>

      <h2 className="mt-[-2.5em] whitespace-nowrap" aria-hidden="true">
        <span
          className="font-sloop text-yellow-300 drop-shadow-[0_0_16px_rgba(255,225,140,0.6)]"
          style={{
            fontSize: "clamp(3.4rem, min(16vw, 14vh), 8rem)",
          }}
        >
          {word.charAt(0)}
        </span>

        <span
          className="font-the-seasons text-yellow-300"
          style={{
            fontSize: "clamp(1.5rem, min(5.5vw, 5.2vh), 3.4rem)",
          }}
        >
          {word.slice(1)}
        </span>

        <span
          className="font-sloop text-yellow-300 drop-shadow-[0_0_16px_rgba(255,225,140,0.6)]"
          style={{
            fontSize: "clamp(3.4rem, min(16vw, 14vh), 8rem)",
          }}
        >
          !
        </span>
      </h2>
    </div>
  );
}
