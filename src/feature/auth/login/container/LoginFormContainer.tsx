import { cn } from "@/lib/utils";
import AuthCard from "../../components/AuthCard";
import LoginForm from "../components/LoginForm";

export default function LoginFormContainer() {
  return (
    <>
      <AuthCard
        title={
          <>
            L
            <span
              className={cn(
                "font-the-seasons text-4xl",
                "md:text-4xl",
                "lg:text-5xl",
              )}
            >
              ogin
            </span>{" "}
            O
            <span
              className={cn(
                "font-the-seasons text-4xl",
                "md:text-4xl",
                "lg:text-5xl",
              )}
            >
              rmawa
            </span>
          </>
        }
        description={
          <>
            Masuk sebagai ormawa menggunakan akun
            <br />
            yang telah disediakan
          </>
        }
      >
        <LoginForm />
      </AuthCard>
    </>
  );
}
