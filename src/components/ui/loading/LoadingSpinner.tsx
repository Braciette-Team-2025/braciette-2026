import { cn } from "@/lib/utils";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
  color?: "yellow" | "white" | "blue";
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: "w-4 h-4 border-2",
  sm: "w-6 h-6 border-2",
  md: "w-8 h-8 border-[3px]",
  lg: "w-12 h-12 border-4",
  xl: "w-16 h-16 border-4",
};

const colorMap: Record<string, string> = {
  yellow: "border-yellow-500/30 border-t-yellow-500",
  white: "border-white/30 border-t-white",
  blue: "border-blue-500/30 border-t-blue-500",
};

export function LoadingSpinner({
  size = "md",
  className,
  color = "yellow",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Memuat..."
      className={cn(
        "rounded-full animate-spin",
        sizeMap[size],
        colorMap[color],
        className,
      )}
    />
  );
}
