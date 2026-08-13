import { cn } from "@/src/lib/utils";

interface FormStepperProps {
  currentStep: 1 | 2;
  className?: string;
}

export default function FormStepper({
  currentStep,
  className,
}: FormStepperProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 md:gap-8",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full font-jakarta font-semibold text-lg transition-colors",
            currentStep >= 1
              ? "bg-yellow-300 text-yellow-900"
              : "border border-yellow-300 text-yellow-300 bg-transparent",
          )}
        >
          1
        </div>
        <span
          className={cn(
            "font-jakarta text-sm md:text-md tracking-wide",
            currentStep >= 1 ? "text-yellow-300" : "text-yellow-300/70",
          )}
        >
          Informasi Ormawa
        </span>
      </div>

      <div className="w-10 md:w-16 h-px bg-gray-300"></div>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full font-jakarta font-semibold text-md transition-colors",
            currentStep >= 2
              ? "bg-yellow-300 text-yellow-900"
              : "border border-yellow-300 text-yellow-300 bg-transparent",
          )}
        >
          2
        </div>
        <span
          className={cn(
            "font-jakarta text-md tracking-wide",
            currentStep >= 2 ? "text-yellow-300" : "text-yellow-300",
          )}
        >
          Kredensial
        </span>
      </div>
    </div>
  );
}
