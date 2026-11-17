import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ScriptTextProps extends ComponentProps<"span"> {
  text: string;
  /** class untuk huruf kapital script di awal tiap kata (mis. ukuran) */
  initialClassName?: string;
}

/**
 * Teks dengan huruf pertama tiap kata memakai font script (Sloop),
 * sisanya mewarisi font induk. Pola yang sama dengan judul "Total Voting"
 * di PublicVotingResultSection. Screen reader membaca teks utuh.
 */
export function ScriptText({
  text,
  className,
  initialClassName,
  ...rest
}: ScriptTextProps) {
  const words = text.split(" ");

  return (
    <span className={className} {...rest}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span
              className={cn(
                "font-sloop not-italic leading-none",
                initialClassName,
              )}
            >
              {word.charAt(0)}
            </span>
            {word.slice(1)}
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
