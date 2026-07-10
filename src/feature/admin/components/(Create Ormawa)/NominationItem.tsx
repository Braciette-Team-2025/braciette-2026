import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface NominationItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export default function NominationItem({
  label,
  checked,
  onChange,
  disabled = false,
  id,
}: NominationItemProps) {
  const itemId = id ?? `nomination-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        id={itemId}
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-colors",
          checked
            ? "border-gray-500 bg-gray-500 text-white"
            : "border-gray-300 bg-white text-transparent",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <Check className="h-4 w-4" strokeWidth={3} />
      </button>

      <div className="h-11 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700">
        {label}
      </div>
    </div>
  );
}
