import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;
  max?: number;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showValue = true,
  className,
}: ProgressBarProps) {
  const percentage =
    max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Progress value={percentage} className="h-2.5 flex-1" />
      {showValue && (
        <span className="w-10 shrink-0 text-right text-sm font-medium text-muted-foreground">
          {value}
        </span>
      )}
    </div>
  );
}
