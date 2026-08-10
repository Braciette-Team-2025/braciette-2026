import { cn } from "@/lib/utils";

type ScriptWordColor = "light" | "gold";
type ScriptWordSize = "hero" | "modal";

interface ScriptWordProps {
  initial: string;
  rest: string;
  color: ScriptWordColor;
  size?: ScriptWordSize;
  initialClassName?: string;
  suffix?: React.ReactNode;
  suffixClassName?: string;
  className?: string;
}

const SIZE_STYLES: Record<
  ScriptWordSize,
  {
    initial: string;
    rest: string;
    padding: string;
  }
> = {
  hero: {
    initial: "text-[clamp(6rem,12vw,10rem)]",
    rest: "text-[clamp(3rem,6vw,5rem)]",
    padding: "pl-[3.8rem] md:pl-[5rem] lg:pl-[6rem]",
  },

  modal: {
    initial: "text-[clamp(4.5rem,9vw,7rem)]",
    rest: "text-[clamp(2.5rem,5vw,4rem)]",
    padding: "pl-[2.8rem] md:pl-[3.8rem] lg:pl-[4.5rem]",
  },
};

export function ScriptWord({
  initial,
  rest,
  color,
  size = "hero",
  initialClassName,
  suffix,
  suffixClassName,
  className,
}: ScriptWordProps) {
  const styles = SIZE_STYLES[size];

  const initialColor =
    color === "light"
      ? "text-blue-100/80 drop-shadow-[0_0_8px_rgba(190,190,255,0.35)]"
      : "text-yellow-300 drop-shadow-[0_0_8px_rgba(255,210,80,0.35)]";

  const restColor =
    color === "light"
      ? "text-blue-100/80 drop-shadow-[0_0_6px_rgba(190,190,255,0.3)]"
      : "text-yellow-300 drop-shadow-[0_0_6px_rgba(255,210,80,0.35)]";

  return (
    <span
      className={cn(
        "relative inline-block whitespace-nowrap",
        "font-the-seasons",
        color === "light" ? "text-blue-100/80" : "text-yellow-300",
        className,
      )}
    >
      {/* Initial */}
      <span
        className={cn(
          "absolute z-10",
          "left-0 top-1/2 -translate-y-1/2",
          "font-sloop leading-none",
          styles.initial,
          initialColor,
          initialClassName,
        )}
      >
        {initial}
      </span>

      {/* Word */}
      <span
        className={cn(
          "relative z-0 block",
          "font-the-seasons leading-none",
          styles.rest,
          styles.padding,
          restColor,
        )}
      >
        {rest}

        {suffix && (
          <span
            className={cn(
              "relative inline-block",
              color === "light"
                ? "drop-shadow-[0_0_6px_rgba(190,190,255,0.3)]"
                : "drop-shadow-[0_0_8px_rgba(255,210,80,0.4)]",
              suffixClassName,
            )}
          >
            {suffix}
          </span>
        )}
      </span>
    </span>
  );
}
