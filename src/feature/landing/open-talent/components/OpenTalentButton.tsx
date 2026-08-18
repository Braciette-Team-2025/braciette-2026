"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpenTalentButtonProps {
  label: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export function OpenTalentButton({
  label,
  icon: Icon,
  iconPosition = "right",
  onClick,
  href,
  disabled,
  className,
}: OpenTalentButtonProps) {
  const content = (
    <span className="flex items-center justify-center gap-2">
      {Icon && iconPosition === "left" && <Icon className="h-4 w-4" />}
      {label}
      {Icon && iconPosition === "right" && <Icon className="h-4 w-4" />}
    </span>
  );

  const sharedClassName = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-yellow-500 font-bold text-blue-900 shadow-[0_0_18px_-4px_rgba(201,162,39,0.7)] transition-colors hover:bg-yellow-400",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-yellow-500",
    className,
  );

  const style = {
    fontSize: "clamp(0.85rem, 1vw, 1rem)",
    padding: "clamp(0.6rem, 1vw, 0.85rem) clamp(1.5rem, 2.5vw, 2rem)",
  };

  if (href && !disabled) {
    return (
      <Link href={href} className={sharedClassName} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={sharedClassName}
      style={style}
    >
      {content}
    </button>
  );
}
