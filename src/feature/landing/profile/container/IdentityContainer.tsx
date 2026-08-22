"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/src/feature/auth/store/authStore";
import FloatingNotesWrapper from "@/src/feature/auth/components/FloatingNotesWrapper";

import { IdentityCard } from "../(identity)/components/IdentityCard";
import type { IdentityFormData } from "../(identity)/types/identity";

export function IdentityContainer() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const handleSubmit = (data: IdentityFormData) => {
    console.log("Update identity:", data);
  };

  // Auth masih sedang diinisialisasi
  if (!isInitialized) {
    return null;
  }

  // User tidak login
  if (!user) {
    router.replace("/login");
    return null;
  }

  const identityData: IdentityFormData = {
    name: user.name,
    email: user.email,
    avatarInitials: undefined,
    photoUrl: user.photo_url || undefined,
  };

  return (
    <section className="flex w-full justify-center px-4 py-16 sm:py-20 md:py-28 lg:py-32">
      <FloatingNotesWrapper>
        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-6 md:gap-8">
          <IdentityCard initialData={identityData} onSubmit={handleSubmit} />
        </div>
      </FloatingNotesWrapper>
    </section>
  );
}
