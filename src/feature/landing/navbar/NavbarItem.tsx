import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "./types/navigation";

export interface NavbarItemProps {
  item: NavigationItem;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavbarItem({
  item,
  isActive,
  onClick,
  className,
}: NavbarItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-xl body-medium text-yellow-400 transition-colors hover:text-yellow-500",
        isActive && "text-yellow-500",
        className,
      )}
    >
      {item.label}
    </Link>
  );
}
