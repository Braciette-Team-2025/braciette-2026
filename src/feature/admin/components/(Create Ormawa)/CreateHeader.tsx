import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Stepper from "./Stepper";

interface CreateHeaderProps {
  currentStep: number;
  steps: string[];
  onBack?: () => void;
}

export default function CreateHeader({
  currentStep,
  steps,
  onBack,
}: CreateHeaderProps) {
  return (
    <div className="space-y-6">
      <div>
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : (
          <Link
            href="/admin/submission"
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Kembali ke halaman submission"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
      </div>

      <h1 className="text-center text-[32px] font-extrabold">
        Daftar Organisasi Mahasiswa
      </h1>
      <Stepper current={currentStep} steps={steps} />
    </div>
  );
}
