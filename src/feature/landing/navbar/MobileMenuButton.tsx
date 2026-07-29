"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MobileMenuButtonProps {
  onClick: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="text-yellow-400 hover:bg-yellow-500 hover:text-blue-800 md:hidden"
      aria-label="Buka menu navigasi"
    >
      <Menu className="h-6 w-6" aria-hidden="true" />
    </Button>
  );
}
