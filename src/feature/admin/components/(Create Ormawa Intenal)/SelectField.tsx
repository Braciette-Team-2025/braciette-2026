"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  id?: string;
}

export default function SelectField({
  label,
  placeholder = "Pilih...",
  options,
  value,
  onValueChange,
  id,
}: SelectFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-[16px] font-semibold">
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={inputId}
          className="h-11 w-full border-gray-300 text-sm"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
