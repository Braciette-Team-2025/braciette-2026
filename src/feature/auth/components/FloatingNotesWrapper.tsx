import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function FloatingNotesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          // Mobile (Base)
          "absolute opacity-80 scale-50 -top-40 right-20",
          // Tablet
          "md:scale-70 md:-top-50 md:left-40",
          // Desktop
          "lg:scale-100 lg:-top-20 lg:-left-70",
        )}
      >
        <Image
          src="/images/block_notes/block_3.svg"
          alt="Music Note 3"
          width={250}
          height={250}
          className=""
        />
      </div>
      <div
        className={cn(
          // Mobile (Base)
          "absolute opacity-80 scale-50 -bottom-45 -right-5",
          // Tablet
          "md:scale-70 md:-bottom-50 md:-right-5",
          // Desktop
          "lg:scale-100 lg:top-1/3 lg:-right-60",
        )}
      >
        <Image
          src="/images/block_notes/block_2.svg"
          alt="Music Note 2"
          width={200}
          height={200}
          className=""
        />
      </div>
      <div
        className={cn(
          // Mobile (Base)
          "absolute opacity-80 scale-40 -bottom-55",
          // Tablet
          "md:scale-65 md:-bottom-60",
          // Desktop
          "lg:scale-100 lg:-bottom-30 lg:-left-50",
        )}
      >
        <Image
          src="/images/block_notes/block_1.svg"
          alt="Music Note 1"
          width={150}
          height={150}
          className=""
        />
      </div>

      {children}
    </div>
  );
}
