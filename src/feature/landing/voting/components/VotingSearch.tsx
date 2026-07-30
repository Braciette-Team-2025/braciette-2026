"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface VotingSearchProps {
  value: string;
  onChange: (value: string) => void;
  statusMessage?: string;
  className?: string;
}

export function VotingSearch({
  value,
  onChange,
  statusMessage,
  className,
}: VotingSearchProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col items-center gap-4",
        className,
      )}
    >
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-500/80" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by Organizations name"
          className={cn(
            "h-12 rounded-full border-yellow-500/60 bg-blue-500/60 pl-11 text-xl font-bold text-yellow-100",
            "placeholder:text-yellow-100/50 shadow-[0_0_16px_-6px_rgba(201,162,39,0.5)]",
            "focus-visible:border-yellow-400 focus-visible:ring-yellow-400/40",
          )}
        />
      </div>

      {statusMessage ? (
        <p className="text-center pt-6 text-xl font-bold text-yellow-500">
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}
