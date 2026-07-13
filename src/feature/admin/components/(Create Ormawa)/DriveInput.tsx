import { Input } from "@/components/ui/input";

interface DriveInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DriveInput({ value, onChange }: DriveInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="drive-link"
        className="block text-[16px] font-semibold text-gray-700"
      >
        Link Drive
      </label>
      <Input
        id="drive-link"
        type="url"
        placeholder="https://drive.google.com/file/d/..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full border-gray-300 text-sm"
      />
    </div>
  );
}
