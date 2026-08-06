"use client";

import { useRouter } from "next/navigation";
import { MusicBackground } from "@/src/feature/landing/components/MusicBackground";
import { ProfilePageHeader } from "../components/ProfilePageHeader";
import { IdentityCard } from "../(identity)/components/IdentityCard";
import { DUMMY_IDENTITY } from "../(identity)/constants/identity";
import type { IdentityFormData } from "../(identity)/types/identity";

export function IdentityContainer() {
  const router = useRouter();

  const handleSubmit = (data: IdentityFormData) => {
    console.log("Update identity:", data);
  };

  return (
    <MusicBackground>
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 md:gap-8">
        <ProfilePageHeader
          title="Identitas Akun"
          subtitle="Lengkapi identitas akun Anda untuk memastikan data tetap akurat."
          onBack={() => router.back()}
        />

        <IdentityCard initialData={DUMMY_IDENTITY} onSubmit={handleSubmit} />
      </div>
    </MusicBackground>
  );
}
