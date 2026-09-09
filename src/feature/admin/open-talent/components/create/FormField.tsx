import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  id?: string;
  error?: string;
}

export default function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  id,
  error,
}: FormFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${inputId}-error`;
  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-[16px] font-semibold text-blue-800"
      >
        {label}
      </label>
      <Input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`h-11 w-full border-2 text-sm text-blue-800 bg-yellow-100 placeholder:text-blue-300 ring-0! ${
          error ? "border-red-500" : "border-yellow-500"
        }`}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
