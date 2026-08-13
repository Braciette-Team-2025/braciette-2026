import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Jika nanti butuh props tambahan khusus (misal: icon, error state), bisa ditambahkan di sini
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Layout & Sizing
          "flex w-[812px] max-w-full h-fit",
          "px-4 py-3",

          // Appearance (Background, Border, Radius, Shadow)
          "rounded-[12px] bg-blue-50",
          "border-2 border-yellow-500",
          "shadow-[0_0_40px_0_#544410]",

          // Typography
          "text-blue-500 font-medium font-jakarta text-sm md:text-md",
          "placeholder:text-blue-200 ",

          // States (Focus, Disabled, Error)
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:border-yellow-400",
          "disabled:cursor-not-allowed disabled:opacity-50",

          // Jika ada error (opsional untuk react-hook-form nanti)
          error && "border-red-500 focus-visible:ring-red-400",

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
