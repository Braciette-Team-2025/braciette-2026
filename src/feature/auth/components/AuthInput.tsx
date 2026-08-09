import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Layout & Spacing
          "flex w-full px-4 py-2",
          // Typography
          "text-sm placeholder:text-sm md:text-md text-gray-900 md:placeholder:text-md placeholder:text-[#666666]",
          // Appearance & Styling
          "rounded-[8px] border-2 border-[#E3E3E3] bg-white transition-colors",
          // States (Focus, Disabled)
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          // Custom Classes Passed via Props
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
