import * as React from "react";
import { cn } from "@/src/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Layout & Spacing
          "flex items-center justify-center gap-3 px-6 py-1.5 lg:px-12.5 lg:py-2",
          // Typography
          "text-[8px] md:text-sm lg:text-xl font-bold text-blue-700",
          // Appearance & Styling
          "rounded-[4px] lg:rounded-[8px] bg-yellow-500 shadow-[0_0_40px_0_rgba(255,203,71,0.8)] cursor-pointer transition-all",
          // States (Hover, Focus, Disabled)
          "hover:bg-yellow-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          // Custom Classes Passed via Props
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
