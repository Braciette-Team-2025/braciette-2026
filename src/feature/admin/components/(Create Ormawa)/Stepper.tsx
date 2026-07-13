import { cn } from "@/lib/utils";

interface StepperProps {
  current: number;
  steps: string[];
}

export default function Stepper({ current, steps }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === current;
        const isCompleted = stepNumber < current;

        return (
          <div key={step} className="flex items-center">
            <div className="flex items-center gap-1">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isActive && "border-gray-700 bg-gray-700 text-white",
                  isCompleted && "border-gray-500 bg-gray-500 text-white",
                  !isActive &&
                    !isCompleted &&
                    "border-gray-300 bg-white text-gray-400",
                )}
              >
                {stepNumber}
              </div>
              <span
                className={cn(
                  "text-[16px] font-medium",
                  isActive ? "text-gray-700" : "text-gray-400",
                )}
              >
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-[2px] w-8 mx-4",
                  isCompleted ? "bg-gray-500" : "bg-gray-300",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
