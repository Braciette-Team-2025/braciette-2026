import LoginForm from "../components/LoginForm";
import FloatingNotesWrapper from "../../components/FloatingNotesWrapper";

export default function LoginContainer() {
  return (
    <div className="w-full pt-50 pb-55">
      <div className="flex justify-center items-center h-full">
        <FloatingNotesWrapper>
          <LoginForm />
        </FloatingNotesWrapper>
      </div>
    </div>
  );
}
