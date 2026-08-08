import AuthCard from "../../components/AuthCard";
import LoginForm from "../components/LoginForm";

export default function LoginFormContainer() {
  return (
    <>
      <AuthCard
        title={
          <>
            L<span className="font-the-seasons text-6xl">ogin</span> O
            <span className="font-the-seasons text-6xl">rmawa</span>
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
