import { cn } from "@/src/lib/utils";
import FormStepper from "./FormStepper";

interface SubmissionCardProps {
  children: React.ReactNode;
  currentStep?: 1 | 2;
}

export default function SubmissionCard({
  children,
  currentStep = 1,
}: SubmissionCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-full",
        // Mobile (Base)
        "py-4 px-6 bg-blue-900 shadow-[0_0_40px_rgba(255,214,133,0.16)] rounded-[12px]",
        // Tablet (md)
        "md:py-6 md:px-9 md:rounded-[20px] md:mx-0",
        // Desktop (lg)
        "lg:py-10 lg:px-15",
      )}
    >
      <FormStepper currentStep={currentStep} className="mb-4 lg:mb-12" />
      <div className="w-full">{children}</div>
    </div>
  );
}
