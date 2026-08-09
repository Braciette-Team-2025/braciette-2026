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
          "md:scale-60 md:-top-20 md:-left-70",
          // Desktop
          "lg:scale-75 lg:-top-20 lg:-left-70",
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
          "md:scale-60 md:top-15 md:-right-45",
          // Desktop
          "lg:scale-75 lg:top-15 lg:-right-45",
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
          "md:scale-60 md:-bottom-20 md:-left-40",
          // Desktop
          "lg:scale-70 lg:-bottom-20 lg:-left-45",
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
