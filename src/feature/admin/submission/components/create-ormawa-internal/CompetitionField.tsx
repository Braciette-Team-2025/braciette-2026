import { PlusCircle, MinusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CompetitionFieldProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onRemove: () => void;
  showAdd: boolean;
  id?: string;
}

export default function CompetitionField({
  value,
  onChange,
  onAdd,
  onRemove,
  showAdd,
  id,
}: CompetitionFieldProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Add / Remove button */}
      <button
        type="button"
        onClick={showAdd ? onAdd : onRemove}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={showAdd ? "Tambah lomba" : "Hapus lomba"}
      >
        {showAdd ? (
          <PlusCircle className="h-8 w-8" />
        ) : (
          <MinusCircle className="h-8 w-8" />
        )}
      </button>

      {/* Input */}
      <Input
        id={id}
        placeholder="Nama lomba yang dimenangkan"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 flex-1 border-gray-300 text-sm"
      />
    </div>
  );
}
