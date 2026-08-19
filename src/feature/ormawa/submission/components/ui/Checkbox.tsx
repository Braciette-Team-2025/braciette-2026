import * as React from "react";
import { cn } from "@/src/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label
        className={cn(
          "group flex items-center gap-3 cursor-pointer w-[812px] max-w-full",
          className,
        )}
      >
        <input type="checkbox" className="peer sr-only" ref={ref} {...props} />

        <div className="flex items-center justify-center w-[52px] h-[52px] shrink-0 rounded-[12px] border-2 border-yellow-500 bg-transparent hover:bg-yellow-50/20 transition-all peer-checked:bg-yellow-500 peer-checked:hover:bg-yellow-700 [&>svg]:text-yellow-500 peer-checked:[&>svg]:text-yellow-50">
          <Check
            className="w-6 h-6 transition-colors duration-200"
            strokeWidth={3}
          />
        </div>

        <div className="flex flex-1 items-center px-4 py-3 rounded-[12px] border-2 border-yellow-500 bg-blue-50 text-blue-900 font-jakarta text-sm md:text-base transition-all shadow-[0_0_40px_0_#544410]">
          {label}
        </div>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
