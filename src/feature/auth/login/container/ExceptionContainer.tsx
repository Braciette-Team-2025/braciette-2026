import { cn } from "@/lib/utils";
import AuthCard from "../../components/AuthCard";
import ExceptionContent from "../components/ExceptionContent";

export default function ExceptionContainer() {
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
            Pastikan email Anda menggunakan domain
            <br />
            <span className="text-yellow-500">student.ub.ac.id.</span>
          </>
        }
      >
        <ExceptionContent />
      </AuthCard>
    </>
  );
}
