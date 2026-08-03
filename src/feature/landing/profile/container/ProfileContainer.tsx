"use client";

import { useRouter } from "next/navigation";
import { MusicBackground } from "@/src/feature/landing/components/MusicBackground";
import { PROFILE_MENU_ITEMS } from "../constants/menu";
import { CURRENT_USER_PROFILE } from "../constants/menu";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileMenu } from "../components/ProfileMenu";
import { LogoutButton } from "../components/LogoutButton";

export function ProfileContainer() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <MusicBackground>
      <ProfileCard profile={CURRENT_USER_PROFILE} />

      <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
        <ProfileMenu items={PROFILE_MENU_ITEMS} />
        <LogoutButton onClick={handleLogout} />
      </div>
    </MusicBackground>
  );
}
