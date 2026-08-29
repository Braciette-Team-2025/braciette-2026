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
          "absolute hidden",
          // Tablet
          "md:block md:scale-60 opacity-80 md:-top-20 md:left-0",
          // Desktop
          "xl:scale-100 xl:-top-20 xl:left-20",
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
          "absolute hidden rotate-30",
          // Tablet
          "md:block md:scale-60 opacity-80 md:-top-0 md:right-10",

          // Desktop
          "xl:scale-100 xl:-top-0 xl:right-30",
        )}
      >
        <Image
          src="/images/block_notes/block_1.svg"
          alt="Music Note 1"
          width={118}
          height={187}
          className=""
        />
      </div>

      {children}
    </div>
  );
}
