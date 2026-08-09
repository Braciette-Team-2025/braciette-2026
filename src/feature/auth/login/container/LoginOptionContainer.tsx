import { cn } from "@/lib/utils";
import AuthCard from "../../components/AuthCard";
import LoginOptions from "../components/LoginOptions";

export default function LoginOptionContainer() {
  return (
    <>
      <AuthCard
        title={
          <>
            S{" "}
            <span
              className={cn(
                "font-the-seasons text-4xl",
                "md:text-4xl",
                "lg:text-5xl",
              )}
            >
              elamat
            </span>{" "}
            D
            <span
              className={cn(
                "font-the-seasons text-4xl",
                "md:text-4xl",
                "lg:text-5xl",
              )}
            >
              atang
            </span>
          </>
        }
        description={
          <>
            Silakan masuk terlebih dahulu
            <br />
            menggunakan akun Google Anda.
          </>
        }
      >
        <LoginOptions />
      </AuthCard>
    </>
  );
}
