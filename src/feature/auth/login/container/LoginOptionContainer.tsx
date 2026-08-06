import LoginOptions from "../components/LoginOptions";
import FloatingNotesWrapper from "../../components/FloatingNotesWrapper";

export default function LoginOptionContainer() {
  return (
    <div className="w-full pt-50 pb-55">
      <div className="flex justify-center items-center h-full">
        <FloatingNotesWrapper>
          <LoginOptions />
        </FloatingNotesWrapper>
      </div>
    </div>
  );
}
