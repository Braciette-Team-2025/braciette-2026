import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CreateHeaderProps {
  onBack?: () => void;
}

export default function CreateHeader({ onBack }: CreateHeaderProps) {
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
            href="/admin/open-talent"
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Kembali ke halaman open talent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
      </div>

      <h1 className="text-center text-[32px] font-extrabold text-[#7F7F7F]">
        Daftar Open Talent
      </h1>
    </div>
  );
}
