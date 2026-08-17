import React, { useState } from "react";
import { CirclePlus, CircleMinus } from "lucide-react";
import { Input } from "./Input";

export type SocialMedia = { id: string; platform: string; username: string };

interface MultiSocialMediaInputProps {
  values: SocialMedia[];
  onChange: (values: SocialMedia[]) => void;
}

export function MultiSocialMediaInput({
  values,
  onChange,
}: MultiSocialMediaInputProps) {
  const [inputPlatform, setInputPlatform] = useState("");
  const [inputUsername, setInputUsername] = useState("");

  const handleAdd = () => {
    if (inputPlatform.trim() || inputUsername.trim()) {
      onChange([
        ...values,
        {
          id: crypto.randomUUID(),
          platform: inputPlatform.trim(),
          username: inputUsername.trim(),
        },
      ]);
      setInputPlatform("");
      setInputUsername("");
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleChange = (
    index: number,
    field: Exclude<keyof SocialMedia, "id">,
    newValue: string,
  ) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [field]: newValue };
    onChange(newValues);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-full">
      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center w-10 h-10 md:w-[52px] md:h-[52px] shrink-0 rounded-[8px] md:rounded-[12px] bg-yellow-500 hover:bg-yellow-600 transition-colors text-yellow-50 focus:outline-none shadow-[0_0_20px_0_rgba(234,179,8,0.3)]"
        >
          <CirclePlus className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
        </button>
        <Input
          value={inputPlatform}
          onChange={(e) => setInputPlatform(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nama Media Sosial"
          className="flex-1 w-full"
        />
        <Input
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nama Akun"
          className="flex-1 w-full"
        />
      </div>

      {values.length > 0 && (
        <div className="flex flex-col gap-2 md:gap-3 bg-yellow-400 p-2 md:p-3 rounded-[12px] md:rounded-[16px]">
          {values.map((val, index) => (
            <div key={val.id} className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="flex items-center justify-center w-10 h-10 md:w-[52px] md:h-[52px] shrink-0 rounded-[8px] md:rounded-[12px] bg-yellow-800 hover:bg-yellow-900 transition-colors text-white focus:outline-none"
              >
                <CircleMinus
                  className="w-6 h-6 md:w-7 md:h-7"
                  strokeWidth={1.5}
                />
              </button>
              <Input
                value={val.platform}
                onChange={(e) =>
                  handleChange(index, "platform", e.target.value)
                }
                className="flex-1 w-full !shadow-none"
              />
              <Input
                value={val.username}
                onChange={(e) =>
                  handleChange(index, "username", e.target.value)
                }
                className="flex-1 w-full !shadow-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
