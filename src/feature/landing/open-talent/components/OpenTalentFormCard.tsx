import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OpenTalentFormCardProps {
  children: ReactNode;
  className?: string;
}

export function OpenTalentFormCard({
  children,
  className,
}: OpenTalentFormCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-yellow-500/70 bg-blue-700/95 shadow-[0_0_30px_-6px_rgba(201,162,39,0.55)]",
        className,
      )}
      style={{ padding: "clamp(1.25rem, 3vw, 2rem)" }}
    >
      {children}
    </div>
  );
}
