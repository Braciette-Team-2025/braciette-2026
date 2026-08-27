"use client";

import { cn } from "@/lib/utils";

interface OpenTalentFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  type?: string;
  error?: string | null;
  className?: string;
}

export function OpenTalentField({
  label,
  value,
  placeholder,
  onChange,
  readOnly,
  type = "text",
  error,
  className,
}: OpenTalentFieldProps) {
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
      <input
        type={type}
        value={value}
        placeholder={placeholder ?? label}
        readOnly={readOnly}
        onChange={(event) => onChange?.(event.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full rounded-lg border-2 bg-blue-50 text-blue-900 outline-none transition-shadow placeholder:text-blue-300/70 focus:shadow-[0_0_0_3px_rgba(201,162,39,0.35)] read-only:cursor-default",
          error ? "border-red-400" : "border-yellow-500/80",
        )}
        style={{
          fontSize: "clamp(0.85rem, 1.05vw, 1rem)",
          padding: "clamp(0.65rem, 1vw, 0.9rem) clamp(0.9rem, 1.4vw, 1.1rem)",
        }}
      />
      {error && (
        <p
          className="text-red-300"
          style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
