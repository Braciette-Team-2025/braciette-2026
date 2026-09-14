import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CreateHeaderProps {
  onBack?: () => void;
  title?: string;
}

export default function CreateHeader({ onBack, title }: CreateHeaderProps) {
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
        {title ?? "Daftar Organisasi Mahasiswa"}
      </h1>
    </div>
  );
}
