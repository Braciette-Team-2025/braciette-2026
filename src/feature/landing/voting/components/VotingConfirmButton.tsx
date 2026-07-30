"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VotingConfirmButtonProps {
  onConfirm: () => void;
  disabled?: boolean;
  isSubmitting?: boolean;
  className?: string;
}

export function VotingConfirmButton({
  onConfirm,
  disabled,
  isSubmitting,
  className,
}: VotingConfirmButtonProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-md flex-col items-center gap-3 px-4",
        className,
      )}
    >
      <Button
        type="button"
        onClick={onConfirm}
        disabled={disabled || isSubmitting}
        className={cn(
          "h-12 w-full rounded-md bg-yellow-500 text-base font-bold text-blue-900 shadow-[0_0_20px_-4px_rgba(201,162,39,0.7)] hover:bg-yellow-400",
          "disabled:cursor-not-allowed disabled:bg-yellow-500/40 disabled:text-blue-900/60 disabled:shadow-none",
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </span>
        ) : (
          "Confirm"
        )}
      </Button>
    </div>
  );
}
