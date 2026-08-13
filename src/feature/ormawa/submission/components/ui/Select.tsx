import * as React from "react";
import { cn } from "@/src/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, placeholder, children, ...props }, ref) => {
    return (
      <div className={cn("relative w-[812px] max-w-full h-fit", className)}>
        <select
          className={cn(
            // Layout & Sizing
            "flex w-full h-full appearance-none",
            "pl-4 pr-12 py-3",

            // Appearance (Background, Border, Radius, Shadow)
            "rounded-[12px] bg-blue-50",
            "border-2 border-yellow-500",
            "shadow-[0_0_40px_0_#544410]",

            // Typography
            "font-jakarta text-sm md:text-md",
            !props.value || props.value === ""
              ? "text-blue-200"
              : "text-blue-500",
            "[&_option]:text-blue-500",

            // States (Focus, Disabled, Error)
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:border-yellow-400",
            "disabled:cursor-not-allowed disabled:opacity-50",

            // Error State
            error && "border-red-500 focus-visible:ring-red-400",
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden className="text-blue-200">
              {placeholder}
            </option>
          )}
          {children}
        </select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-yellow-500">
          <div className="flex items-center justify-center w-6 h-6 rounded-full border-3 border-yellow-500">
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={6} />
          </div>
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
