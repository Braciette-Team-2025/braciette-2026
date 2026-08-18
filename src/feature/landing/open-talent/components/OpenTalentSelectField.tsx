"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface OpenTalentSelectFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  options: Option[];
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function OpenTalentSelectField({
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled,
  className,
}: OpenTalentSelectFieldProps) {
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
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.value)}
          className={cn(
            "w-full appearance-none rounded-lg border-2 border-yellow-500/80 bg-blue-50 pr-10 text-blue-900 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(201,162,39,0.35)] disabled:cursor-default",
            !value && "text-blue-300/70",
          )}
          style={{
            fontSize: "clamp(0.85rem, 1.05vw, 1rem)",
            padding: "clamp(0.65rem, 1vw, 0.9rem) clamp(0.9rem, 1.4vw, 1.1rem)",
          }}
        >
          <option value="" disabled hidden>
            {placeholder ?? label}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-blue-900"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-600" />
      </div>
    </div>
  );
}
