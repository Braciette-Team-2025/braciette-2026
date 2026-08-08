import AuthCard from "../../components/AuthCard";
import ExceptionContent from "../components/ExceptionContent";

export default function ExceptionContainer() {
  return (
    <>
      <AuthCard
        title={
          <>
            T <span className="font-the-seasons text-6xl">erjadi</span> M
            <span className="font-the-seasons text-6xl">asalah</span>
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
