import { NavbarItem } from "./NavbarItem";
import type { NavigationItem } from "../../types/navigation";

export interface NavbarMenuProps {
  items: NavigationItem[];
  activeId?: string;
}

export function NavbarMenu({ items, activeId }: NavbarMenuProps) {
  return (
    <nav
      aria-label="Navigasi utama"
      className="hidden items-center gap-[100px] md:flex"
    >
      {items.map((item) => (
        <NavbarItem key={item.id} item={item} isActive={item.id === activeId} />
      ))}
    </nav>
  );
}
