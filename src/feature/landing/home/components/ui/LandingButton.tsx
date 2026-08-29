import * as React from "react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

const LandingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, ...props }, ref) => {
    const classes = cn(
      // Layout & Spacing
      "flex items-center justify-center gap-3 px-6 py-1.5 lg:px-12.5 lg:py-2",
      // Typography
      "text-[8px] md:text-sm lg:text-xl font-bold text-blue-700",
      // Appearance & Styling
      "rounded-[4px] lg:rounded-[8px] bg-yellow-500 shadow-[0_0_15.82px_0_rgba(255,203,71,0.8)] md:shadow-[0_0_40px_0_rgba(255,203,71,0.8)] cursor-pointer transition-all",
      // States (Hover, Focus, Disabled)
      "hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      // Custom Classes Passed via Props
      className,
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);
LandingButton.displayName = "Button";

export { LandingButton };
