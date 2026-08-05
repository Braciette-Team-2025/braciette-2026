import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProfileContentCardProps {
  children: ReactNode;
  className?: string;
}

export function ProfileContentCard({
  children,
  className,
}: ProfileContentCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-yellow-500 p-6 shadow-[0_0_75px_-6px_rgba(201,162,39,0.6)] md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
