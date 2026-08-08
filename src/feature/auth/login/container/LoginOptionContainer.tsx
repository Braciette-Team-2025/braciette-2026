import AuthCard from "../../components/AuthCard";
import LoginOptions from "../components/LoginOptions";

export default function LoginOptionContainer() {
  return (
    <>
      <AuthCard
        title={
          <>
            S <span className="font-the-seasons text-6xl">elamat</span> D
            <span className="font-the-seasons text-6xl">atang</span>
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
