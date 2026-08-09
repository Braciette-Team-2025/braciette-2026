"use client";

import { useRouter } from "next/navigation";
import { PROFILE_MENU_ITEMS, CURRENT_USER_PROFILE } from "../constants/menu";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileMenu } from "../components/ProfileMenu";
import { LogoutButton } from "../components/LogoutButton";

export function ProfileContainer() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="relative z-10 mx-auto flex w-[535px] max-w-[calc(100vw-32px)] flex-col gap-4">
      <ProfileCard profile={CURRENT_USER_PROFILE} />

      <ProfileMenu items={PROFILE_MENU_ITEMS} />

      <LogoutButton onClick={handleLogout} />
    </div>
  );
}
