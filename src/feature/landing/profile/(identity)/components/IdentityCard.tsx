"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ProfileAvatar } from "../../components/ProfileAvatar";
import { ProfileContentCard } from "../../components/ProfileContentCard";
import { ProfileField } from "../../components/ProfileField";
import { ProfilePageHeader } from "../../components/ProfilePageHeader";
import { getInitials } from "../../utils/getInitials";

import type { IdentityFormData } from "../types/identity";

interface IdentityCardProps {
  initialData: IdentityFormData;
  onSubmit?: (data: IdentityFormData) => void;
}

export function IdentityCard({ initialData, onSubmit }: IdentityCardProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);

  return (
    <ProfileContentCard>
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <div className="mx-auto w-full">
          <ProfilePageHeader
            title="Identitas Akun"
            subtitle="Lengkapi identitas akun Anda untuk memastikan data tetap akurat."
            onBack={() => router.back()}
          />
        </div>

        <ProfileAvatar
          initials={initialData.avatarInitials ?? getInitials(initialData.name)}
          imageSrc={initialData.photoUrl}
          size={150}
        />

        <div className="flex w-full flex-col gap-4 md:gap-5">
          <ProfileField label="Nama" value={name} editable onChange={setName} />

          <ProfileField
            label="Email"
            value={email}
            editable
            onChange={setEmail}
          />
        </div>
      </div>
    </ProfileContentCard>
  );
}
