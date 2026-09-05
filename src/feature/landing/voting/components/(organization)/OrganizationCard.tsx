"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Organization } from "../../types/organization";

interface OrganizationCardProps {
  organization: Organization;
  isSelected: boolean;
  onSelect: (organizationId: string) => void;
  disabled?: boolean;
}

export function OrganizationCard({
  organization,
  isSelected,
  onSelect,
  disabled = false,
}: OrganizationCardProps) {
  const handleSelect = () => {
    if (disabled) {
      return;
    }

    onSelect(organization.id);
  };

  return (
    <Card
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-pressed={disabled ? false : isSelected}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (disabled) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(organization.id);
        }
      }}
      className={cn(
        "group relative flex aspect-[353/209] flex-col items-center justify-center gap-2 rounded-xl border px-6 py-8 text-center transition-all duration-300",
        disabled
          ? "cursor-not-allowed border-gray-500/40 bg-gray-700/40 opacity-50 shadow-none"
          : [
              "cursor-pointer hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-yellow-400 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-blue-900",
              isSelected
                ? "border-yellow-400 bg-yellow-500/20 shadow-[0_0_28px_-4px_rgba(201,162,39,0.7)] hover:shadow-[0_0_34px_-4px_rgba(201,162,39,0.85)]"
                : "border-yellow-500/60 bg-blue-700/60 shadow-[0_0_30px_-6px_rgba(201,162,10,0.45)] hover:border-yellow-400 hover:shadow-[0_0_28px_-4px_rgba(201,162,39,0.7)]",
            ],
      )}
    >
      <span
        className={cn(
          "text-2xl font-bold",
          disabled ? "text-gray-400" : "text-yellow-300",
        )}
      >
        {organization.name}
      </span>

      {disabled && (
        <span className="text-xs font-semibold text-gray-400">
          Sudah memilih
        </span>
      )}
    </Card>
  );
}
