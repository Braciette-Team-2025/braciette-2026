import React, { useState } from "react";
import { CirclePlus, CircleMinus } from "lucide-react";
import { Input } from "./Input";

interface MultiValueInputProps {
  values: string[];
  onChange: (values: string[]) => void;
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
      onChange([...values, inputValue]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleChange = (index: number, newValue: string) => {
    const newValues = [...values];
    newValues[index] = newValue;
    onChange(newValues);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 w-[812px] max-w-full">
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center w-[52px] h-[52px] shrink-0 rounded-[12px] bg-yellow-500 hover:bg-yellow-700 transition-colors text-yellow-50 focus:outline-none"
        >
          <CirclePlus className="w-7 h-7" strokeWidth={1.5} />
        </button>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Ketik untuk menambahkan..."}
          maxLength={maxLength}
          className="flex-1"
        />
      </div>

      {values.length === 0 ? (
        <div className="flex items-center gap-3 w-[812px] max-w-full opacity-50">
          <button
            type="button"
            disabled
            className="flex items-center justify-center w-[52px] h-[52px] shrink-0 rounded-[12px] bg-yellow-700 text-yellow-50 cursor-not-allowed"
          >
            <CircleMinus className="w-7 h-7" strokeWidth={1.5} />
          </button>
          <Input
            disabled
            value=""
            placeholder="Data yang ditambahkan akan muncul di sini"
            className="flex-1 cursor-not-allowed"
          />
        </div>
      ) : (
        values.map((value, index) => (
          <div
            key={index}
            className="flex items-center gap-3 w-[812px] max-w-full"
          >
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="flex items-center justify-center w-[52px] h-[52px] shrink-0 rounded-[12px] bg-yellow-500 hover:bg-yellow-700 transition-colors text-yellow-50 focus:outline-none"
            >
              <CircleMinus className="w-7 h-7" strokeWidth={1.5} />
            </button>
            <Input
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1"
            />
          </div>
        ))
      )}
    </div>
  );
}
