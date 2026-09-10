import type { NavigationItem } from "../types/navigation";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "faq", label: "FAQ", href: "/#faq" },
  { id: "vote", label: "Vote", href: "/voting", featureFlag: "voting" },
  { id: "rank", label: "Rank", href: "/rank", disabled: true },
];
