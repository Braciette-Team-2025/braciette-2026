"use client";

import { cn } from "@/lib/utils";

interface ProfileFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function ProfileField({
  label,
  value,
  onChange,
  editable = false,
  fullWidth = false,
  className,
}: ProfileFieldProps) {
  return (
    <div className={cn(fullWidth && "sm:col-span-2", className)}>
      <p className="mb-1.5 text-sm font-bold text-blue-900 md:text-base">
        {label}
      </p>

      {editable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full rounded-lg border border-blue-900/10 bg-slate-100 px-4 py-3 text-sm text-blue-900/70 outline-none transition focus:border-blue-900/30 md:text-base"
        />
      ) : (
        <div className="w-full truncate rounded-lg border border-blue-900/10 bg-white px-4 py-3 text-sm text-blue-900/80 md:text-base">
          {value}
        </div>
      )}
    </div>
  );
}
