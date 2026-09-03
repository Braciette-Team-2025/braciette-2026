"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/src/feature/auth/store/authStore";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileMenu } from "../components/ProfileMenu";
import { LogoutButton } from "../components/LogoutButton";
import { PROFILE_MENU_ITEMS } from "../constants/menu";
import FloatingNotesWrapper from "@/src/feature/auth/components/FloatingNotesWrapper";

export function ProfileContainer() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (isLoading) {
    return (
      <section className="flex w-full justify-center px-4 py-16 sm:py-20 md:py-28 lg:py-32">
        <FloatingNotesWrapper>
          <div className="relative z-10 mx-auto flex w-[535px] max-w-[calc(100vw-32px)] justify-center">
            <p className="text-blue-900">Memuat profil...</p>
          </div>
        </FloatingNotesWrapper>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  const profile = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return (
    <section className="flex w-full justify-center px-4 py-16 sm:py-20 md:py-28 lg:py-32">
      <FloatingNotesWrapper>
        <div className="relative z-10 mx-auto flex w-[535px] max-w-[calc(100vw-32px)] flex-col gap-4">
          <ProfileCard profile={profile} />

          <ProfileMenu items={PROFILE_MENU_ITEMS} />

          <LogoutButton onClick={handleLogout} />
        </div>
      </FloatingNotesWrapper>
    </section>
  );
}
