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
    <Card
      className={cn(
        "border-2 border-yellow-500 bg-yellow-100 shadow-none rounded-[12px]",
        className,
      )}
    >
      <CardContent className="p-4 sm:p-5">
        <p className="text-sm font-medium text-blue-900">{label}</p>
        <div className="mt-2 text-xl font-bold text-blue-900 leading-snug sm:text-2xl">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
