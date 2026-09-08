import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

export default function NumberField({
  label,
  value,
  onChange,
  min = 1,
}: NumberFieldProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= min) {
      onChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-[16px] font-semibold text-blue-800">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-yellow-500 text-yellow-50 disabled:opacity-50"
          type="button"
        >
          <Minus size={20} />
        </button>
        <button
          onClick={handleIncrement}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-yellow-500 text-yellow-50"
          type="button"
        >
          <Plus size={20} />
        </button>
        <Input
          type="number"
          value={value}
          onChange={handleChange}
          className="h-11 w-full border-yellow-500 text-sm text-blue-800 bg-yellow-100 border-2"
        />
      </div>
    </div>
  );
}
