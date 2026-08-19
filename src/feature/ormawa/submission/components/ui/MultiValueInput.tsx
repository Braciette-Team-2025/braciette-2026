import React, { useState } from "react";
import { CirclePlus, CircleMinus } from "lucide-react";
import { Input } from "./Input";

export type LombaItem = { id: string; value: string };

interface MultiValueInputProps {
  values: LombaItem[];
  onChange: (values: LombaItem[]) => void;
  placeholder?: string;
  maxLength?: number;
}

export function MultiValueInput({
  values,
  onChange,
  placeholder,
  maxLength,
}: MultiValueInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...values, { id: crypto.randomUUID(), value: inputValue }]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleChange = (index: number, newValue: string) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], value: newValue };
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Ketik untuk menambahkan..."}
          maxLength={maxLength}
          className="flex-1 w-full"
        />
      </div>

      {values.length > 0 && (
        <div className="flex flex-col gap-2 md:gap-3 bg-yellow-400 p-2 md:p-3 rounded-[12px] md:rounded-[16px]">
          {values.map((item, index) => (
            <div key={item.id} className="flex gap-2 md:gap-3">
              <div className="h-full flex justify-center">
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
              </div>
              <Input
                value={item.value}
                onChange={(e) => handleChange(index, e.target.value)}
                className="flex-1 w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
