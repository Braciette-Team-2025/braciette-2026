import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FormField from "./FormField";
import SelectField from "./SelectField";
import NumberField from "./NumberField";

interface StepTwoData {
  talentDitampilkan: string;
  jenisPenampilan: string;
  jumlahAnggota: number;
  linkDrive: string;
}

interface StepTwoFormProps {
  data: StepTwoData;
  onChange: (data: Partial<StepTwoData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const JENIS_PENAMPILAN_OPTIONS = [
  { label: "Individu", value: "individu" },
  { label: "Kelompok", value: "kelompok" },
];

export default function StepTwoForm({
  data,
  onChange,
  onBack,
  onSubmit,
}: StepTwoFormProps) {
  const isComplete =
    data.talentDitampilkan.trim() !== "" &&
    data.jenisPenampilan.trim() !== "" &&
    data.linkDrive.trim() !== "";

  return (
    <div className="space-y-6">
      <FormField
        label="Talent yang Akan Ditampilkan"
        placeholder="Dance"
        value={data.talentDitampilkan}
        onChange={(val) => onChange({ talentDitampilkan: val })}
      />

      <SelectField
        label="Jenis Penampilan"
        placeholder="Individu"
        options={JENIS_PENAMPILAN_OPTIONS}
        value={data.jenisPenampilan}
        onValueChange={(val) => onChange({ jenisPenampilan: val })}
      />

      <NumberField
        label="Jumlah Anggota"
        value={data.jumlahAnggota}
        onChange={(val) => onChange({ jumlahAnggota: val })}
      />

      <FormField
        label="Link Drive"
        placeholder="http://"
        value={data.linkDrive}
        onChange={(val) => onChange({ linkDrive: val })}
        type="url"
      />

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-[#666666] hover:bg-[#555555] text-white px-6 h-11 text-base font-semibold rounded-[8px] border-0"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Kembali
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!isComplete}
          className="bg-[#666666] hover:bg-[#555555] text-white px-8 h-11 text-base font-semibold rounded-[8px]"
        >
          Konfirmasi
        </Button>
      </div>
    </div>
  );
}
