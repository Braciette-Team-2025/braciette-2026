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
        "flex flex-col items-center",
        // Mobile (Base)
        "px-6 py-8 bg-blue-900 w-fit shadow-[0_0_40px_rgba(255,214,133,0.16)] rounded-[12px]",
        // Tablet (md)
        "md:p-10 md:max-w-none md:rounded-[20px] md:mx-0",
        // Desktop (lg)
        "lg:py-10 lg:px-19.5",
      )}
    >
      <FormStepper currentStep={currentStep} className="mb-10 lg:mb-12" />
      <div className="w-full">{children}</div>
    </div>
  );
}
