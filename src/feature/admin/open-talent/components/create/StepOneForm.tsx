import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FormField from "./FormField";

interface StepOneData {
  namaKetua: string;
  asalFakultas: string;
  kontakKetua: string;
}

interface StepOneFormProps {
  data: StepOneData;
  onChange: (data: Partial<StepOneData>) => void;
  onNext: () => void;
}

export default function StepOneForm({
  data,
  onChange,
  onNext,
}: StepOneFormProps) {
  const isComplete =
    data.namaKetua.trim() !== "" &&
    data.asalFakultas.trim() !== "" &&
    data.kontakKetua.trim() !== "";

  return (
    <div className="space-y-6">
      <FormField
        label="Nama Lengkap Ketua"
        placeholder="Gipar"
        value={data.namaKetua}
        onChange={(val) => onChange({ namaKetua: val })}
      />

      <FormField
        label="Asal Fakultas Ketua"
        placeholder="Fakultas Ilmu Komputer"
        value={data.asalFakultas}
        onChange={(val) => onChange({ asalFakultas: val })}
      />

      <FormField
        label="Kontak Ketua"
        placeholder="0876767676"
        value={data.kontakKetua}
        onChange={(val) => onChange({ kontakKetua: val })}
        type="tel"
      />

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!isComplete}
          className="bg-[#666666] hover:bg-[#555555] text-white px-6 h-11 text-base font-semibold rounded-[8px]"
        >
          Selanjutnya <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
