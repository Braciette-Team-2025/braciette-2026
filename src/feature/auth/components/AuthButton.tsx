import * as React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-3 rounded-[8px] bg-yellow-500 px-20 py-3 text-md font-bold text-blue-700 shadow-[0_0_40px_0_rgba(255,203,71,0.8)] transition-all hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
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
