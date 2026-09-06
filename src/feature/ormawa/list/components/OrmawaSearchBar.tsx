import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OrmawaSearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value !== localValue) {
        onChange(localValue);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, onChange, value]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-300" />
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Cari berdasarkan nama ormawa"
        className="h-12 border-2 border-yellow-500 bg-yellow-100 text-blue-900 pl-10 placeholder:text-blue-300"
      />
    </div>
  );
}
