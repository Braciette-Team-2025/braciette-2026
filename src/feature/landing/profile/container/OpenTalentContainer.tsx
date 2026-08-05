"use client";

import { useRouter } from "next/navigation";
import { MusicBackground } from "@/src/feature/landing/components/MusicBackground";
import { ProfilePageHeader } from "../components/ProfilePageHeader";
import { OpenTalentDetailCard } from "../(open-talent)/components/OpenTalentDetailCard";
import { DUMMY_OPEN_TALENT } from "../(open-talent)/constants/open-talent";

export function OpenTalentContainer() {
  const router = useRouter();

  return (
    <MusicBackground>
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 md:gap-8">
        <div className="w-full mx-auto">
          <ProfilePageHeader
            title="Hasil Open Talent"
            subtitle="Hasil open talent yang sudah kamu daftarkan."
            onBack={() => router.back()}
          />
        </div>

        <OpenTalentDetailCard data={DUMMY_OPEN_TALENT} />
      </div>
    </MusicBackground>
  );
}
