import { cn } from "@/lib/utils";
import AuthCard from "@/src/feature/auth/components/AuthCard";
import ExceptionContent from "@/src/feature/auth/login/components/ExceptionContent";

export default function ExceptionPage() {
  return (
    <>
      <AuthCard
        title={
          <>
            T{" "}
            <span
              className={cn(
                "font-the-seasons text-4xl",
                "md:text-4xl",
                "lg:text-5xl",
              )}
            >
              erjadi
            </span>{" "}
            M
            <span
              className={cn(
                "font-the-seasons text-4xl",
                "md:text-4xl",
                "lg:text-5xl",
              )}
            >
              asalah
            </span>
          </>
        }
        description={
          <>
            Halaman yang Anda tuju tidak ditemukan
            <br />
            atau sedang <span className="text-yellow-500">tidak tersedia.</span>
          </>
        }
      >
        <ExceptionContent />
      </AuthCard>
    </>
  );
}
