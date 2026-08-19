import React, { useState } from "react";
import { Input } from "./Input";

interface DriveLinkInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DriveLinkInput({ value, onChange }: DriveLinkInputProps) {
  const [isTouched, setIsTouched] = useState(false);

  const isValidDriveLink = (url: string) => {
    if (!url) return true;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname.includes("drive.google.com");
    } catch {
      return false;
    }
  };

  const isValid = isValidDriveLink(value);
  const showError = isTouched && !isValid && value.length > 0;

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
        Link Drive
      </label>
      <Input
        placeholder="https://drive.google.com/"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsTouched(true);
        }}
        onBlur={() => setIsTouched(true)}
        error={showError}
      />
      {showError && (
        <p className="text-red-500 text-xs md:text-sm font-jakarta font-medium mt-[-4px]">
          Tautan tidak valid. Mohon masukkan tautan Google Drive yang benar.
        </p>
      )}
      <p className="text-[10px] md:text-xs text-yellow-200  mt-1 font-jakarta">
        Pastikan link yang sudah dimasukkan ke dalam field berstatuskan
        &quot;Anyone can view&quot;.
      </p>
    </div>
  );
}
