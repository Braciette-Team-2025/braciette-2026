import { BookOpen, ShieldCheck } from "lucide-react";
import { ProfileMenuItem } from "../types/menu";
import { UserProfile } from "../types/profile";

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  {
    id: "account-identity",
    label: "Identitas Akun",
    href: "/profile/identity",
    icon: ShieldCheck,
  },
  {
    id: "open-talent-result",
    label: "Hasil Open Talent",
    href: "/profile/open-talent",
    icon: BookOpen,
  },
];

export const CURRENT_USER_PROFILE: UserProfile = {
  id: "davina-berlianne",
  name: "Davina Berlianne",
  email: "davinaberlianne@gmail.com",
  avatarInitials: "DB",
};
