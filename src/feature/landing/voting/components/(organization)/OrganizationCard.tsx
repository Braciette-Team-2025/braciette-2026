"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Organization } from "../../types/organization";

interface OrganizationCardProps {
  organization: Organization;
  isSelected: boolean;
  onSelect: (organizationId: string) => void;
}

export function OrganizationCard({
  organization,
  isSelected,
  onSelect,
}: OrganizationCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect(organization.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(organization.id);
        }
      }}
      aria-pressed={isSelected}
      className={cn(
        "group relative flex aspect-[353/209] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border px-6 py-8 text-center transition-all duration-300",
        "hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900",
        isSelected
          ? "border-yellow-400 bg-yellow-500/20 shadow-[0_0_28px_-4px_rgba(201,162,39,0.7)] hover:shadow-[0_0_34px_-4px_rgba(201,162,39,0.85)]"
          : "border-yellow-500/60 bg-blue-700/60 shadow-[0_0_30px_-6px_rgba(201,162,10,0.45)] hover:border-yellow-400 hover:shadow-[0_0_28px_-4px_rgba(201,162,39,0.7)]",
      )}
    >
      <span className="text-2xl font-bold text-yellow-300 md:text-2xl">
        {organization.name}
      </span>
    </Card>
  );
}
