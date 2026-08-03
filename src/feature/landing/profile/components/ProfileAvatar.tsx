"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  initials: string;
  imageSrc?: string;
  size?: number;
  className?: string;
}

export function ProfileAvatar({
  initials,
  imageSrc,
  size = 140,
  className,
}: ProfileAvatarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-yellow-500 bg-blue-900 shadow-[0_0_25px_-4px_rgba(201,162,39,0.6)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={initials}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-heading text-4xl font-bold text-yellow-500 md:text-6xl">
          {initials}
        </span>
      )}
    </div>
  );
}
