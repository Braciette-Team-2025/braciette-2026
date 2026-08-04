"use client";

import { ReactNode } from "react";

interface DetailFieldProps {
  label: string;
  value?: string | string[] | ReactNode;
  fullWidth?: boolean;
}

export default function DetailField({
  label,
  value,
  fullWidth = false,
}: DetailFieldProps) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <p className="text-sm font-semibold text-[#4B4B4B]">{label}</p>

      {Array.isArray(value) ? (
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[15px] text-[#8A8A8A]">
          {value.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-1 text-[15px] text-[#8A8A8A] break-words">
          {value}
        </div>
      )}
    </div>
  );
}
