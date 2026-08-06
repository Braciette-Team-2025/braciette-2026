import ExceptionContent from "../components/ExceptionContent";
import FloatingNotesWrapper from "../../components/FloatingNotesWrapper";

export default function ExceptionContainer() {
  return (
    <div className="w-full pt-50 pb-55">
      <div className="flex justify-center items-center h-full">
        <FloatingNotesWrapper>
          <ExceptionContent />
        </FloatingNotesWrapper>
      </div>
    </div>
  );
}
