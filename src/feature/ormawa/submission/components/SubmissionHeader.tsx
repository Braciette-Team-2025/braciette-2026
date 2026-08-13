import { ArrowLeft } from "lucide-react";

export default function SubmissionHeader() {
  return (
    <header className="w-full space-y-12">
      <ArrowLeft
        height={34}
        width={34}
        strokeWidth={2}
        className="text-yellow-300"
      />
      <h1 className="text-4xl font-jakarta font-bold text-center text-yellow-300">
        Daftar Organisasi Mahasiswa
      </h1>
    </header>
  );
}
