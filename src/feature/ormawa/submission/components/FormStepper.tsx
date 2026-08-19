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
        "flex items-center justify-center gap-2 sm:gap-4 md:gap-8 w-full",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
        <div
          className={cn(
            "flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full font-jakarta font-semibold text-xs sm:text-sm md:text-base transition-colors",
            currentStep >= 1
              ? "bg-yellow-300 text-yellow-900"
              : "border border-yellow-300 text-yellow-300 bg-transparent",
          )}
        >
          1
        </div>
        <span
          className={cn(
            "font-jakarta text-[10px] sm:text-xs md:text-base tracking-wide whitespace-nowrap",
            currentStep >= 1 ? "text-yellow-300" : "text-yellow-300/70",
          )}
        >
          Informasi Ormawa
        </span>
      </div>

      <div className="w-4 sm:w-8 md:w-16 h-px bg-gray-300 shrink"></div>

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
        <div
          className={cn(
            "flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full font-jakarta font-semibold text-xs sm:text-sm md:text-base transition-colors",
            currentStep >= 2
              ? "bg-yellow-300 text-yellow-900"
              : "border border-yellow-300 text-yellow-300 bg-transparent",
          )}
        >
          2
        </div>
        <span
          className={cn(
            "font-jakarta text-[10px] sm:text-xs md:text-base tracking-wide whitespace-nowrap",
            currentStep >= 2 ? "text-yellow-300" : "text-yellow-300/70",
          )}
        >
          Kredensial
        </span>
      </div>
    </div>
  );
}
