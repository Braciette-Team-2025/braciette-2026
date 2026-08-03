"use client";

import { cn } from "@/lib/utils";
import { UserProfile } from "../types/profile";
import { getInitials } from "../utils/getInitials";
import { ProfileAvatar } from "./ProfileAvatar";

interface ProfileCardProps {
  profile: UserProfile;
  className?: string;
}

export function ProfileCard({ profile, className }: ProfileCardProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-xl flex-col items-center",
        className,
      )}
    >
      <ProfileAvatar
        initials={profile.avatarInitials ?? getInitials(profile.name)}
        imageSrc={profile.avatarImageSrc}
        size={190}
        className="relative z-20 -mb-[60px]"
      />

      <div className="w-full rounded-2xl bg-yellow-500 px-8 pb-8 pt-[72px] gap-2 text-center shadow-[0_0_75px_-6px_rgba(201,162,39,0.6)]">
        <h1 className="font-heading text-3xl font-bold text-blue-900 md:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-md font-medium text-blue-900/80 md:text-xl">
          {profile.email}
        </p>
      </div>
    </div>
  );
}
