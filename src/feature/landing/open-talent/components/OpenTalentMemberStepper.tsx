"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpenTalentMemberStepperProps {
  label: string;
  value: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export function OpenTalentMemberStepper({
  label,
  value,
  disabled,
  onChange,
  className,
}: OpenTalentMemberStepperProps) {
  const decrement = () => onChange?.(Math.max(1, value - 1));
  const increment = () => onChange?.(value + 1);

  const fieldStyle = {
    fontSize: "clamp(0.85rem, 1.05vw, 1rem)",
    padding: "clamp(0.65rem, 1vw, 0.9rem) clamp(0.9rem, 1.4vw, 1.1rem)",
  };
  const buttonSize = {
    width: "clamp(2.25rem, 3vw, 2.75rem)",
    height: "clamp(2.25rem, 3vw, 2.75rem)",
  };

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      style={{ gap: "clamp(0.375rem, 0.6vw, 0.5rem)" }}
    >
      <label
        className="font-semibold text-yellow-100"
        style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
      >
        {label}
      </label>

      {disabled ? (
        // Individu performances don't need a member count — show a plain
        // disabled dash instead of the +/- controls.
        <div
          className="flex w-full items-center rounded-lg border-2 border-yellow-500/80 bg-blue-50 text-blue-300"
          style={fieldStyle}
        >
          –
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={decrement}
            aria-label="Kurangi jumlah anggota"
            style={buttonSize}
            className="flex shrink-0 items-center justify-center rounded-lg border-2 border-yellow-500/80 bg-blue-50 text-blue-900 transition-colors hover:bg-yellow-100"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={increment}
            aria-label="Tambah jumlah anggota"
            style={buttonSize}
            className="flex shrink-0 items-center justify-center rounded-lg border-2 border-yellow-500/80 bg-blue-50 text-blue-900 transition-colors hover:bg-yellow-100"
          >
            <Plus className="h-4 w-4" />
          </button>
          <div
            className="flex-1 rounded-lg border-2 border-yellow-500/80 bg-blue-50 text-center text-blue-900"
            style={fieldStyle}
          >
            {value}
          </div>
        </div>
      )}
    </div>
  );
}
