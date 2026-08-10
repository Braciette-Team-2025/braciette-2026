"use client";

import { useRouter } from "next/navigation";
import { OpenTalentDetailCard } from "../(open-talent)/components/OpenTalentDetailCard";
import { DUMMY_OPEN_TALENT } from "../(open-talent)/constants/open-talent";
import FloatingNotesWrapper from "@/src/feature/auth/components/FloatingNotesWrapper";

export function OpenTalentContainer() {
  const router = useRouter();

  return (
    <FloatingNotesWrapper>
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-6 md:gap-8">
        <OpenTalentDetailCard data={DUMMY_OPEN_TALENT} />
      </div>
    </FloatingNotesWrapper>
  );
}
