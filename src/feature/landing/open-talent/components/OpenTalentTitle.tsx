import { cn } from "@/lib/utils";

interface OpenTalentTitleProps {
  className?: string;
}

export function OpenTalentTitle({ className }: OpenTalentTitleProps) {
  return (
    <h1 className={cn("whitespace-nowrap text-center leading-none", className)}>
      <span
        className="font-sloop text-blue-100 drop-shadow-[0_0_16px_rgba(178,180,198,0.55)]"
        style={{ fontSize: "clamp(4rem, 10vw, 8.5rem)" }}
      >
        O
      </span>
      <span
        className="ml-[0.05em] font-the-seasons text-blue-100"
        style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
      >
        pen
      </span>
      <span
        className="ml-[0.25em] font-sloop text-yellow-300 drop-shadow-[0_0_16px_rgba(255,225,140,0.6)]"
        style={{ fontSize: "clamp(4rem, 10vw, 8.5rem)" }}
      >
        T
      </span>
      <span
        className="ml-[0.05em] font-the-seasons text-yellow-300"
        style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
      >
        alent
      </span>
    </h1>
  );
}
