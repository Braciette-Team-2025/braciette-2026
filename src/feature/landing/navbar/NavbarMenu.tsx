import { NavbarItem } from "./NavbarItem";
import type { NavigationItem } from "./types/navigation";

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
      {items.map((item) => {
        return item.disabled ? (
          <span
            key={item.href}
            className="text-xl body-medium text-yellow-400/40 cursor-not-allowed select-none"
            aria-disabled="true"
          >
            {item.label}
          </span>
        ) : (
          <NavbarItem
            key={item.id}
            item={item}
            isActive={item.id === activeId}
          />
        );
      })}
    </nav>
  );
}
