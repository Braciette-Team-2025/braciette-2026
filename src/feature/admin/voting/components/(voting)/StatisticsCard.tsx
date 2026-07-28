import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatisticCardProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function StatisticCard({ label, value, className }: StatisticCardProps) {
  return (
    <Card className={cn("border-none bg-muted/60 shadow-none", className)}>
      <CardContent className="p-4 sm:p-5">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
