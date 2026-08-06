import React from "react";
import Image from "next/image";

export default function FloatingNotesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute -top-20 -left-70">
        <Image
          src="/images/block_notes/block_3.svg"
          alt="Music Note 3"
          width={250}
          height={250}
          className=""
        />
      </div>
      <div className="absolute top-1/3 -right-60">
        <Image
          src="/images/block_notes/block_2.svg"
          alt="Music Note 2"
          width={200}
          height={200}
          className=""
        />
      </div>
      <div className="absolute -bottom-30 -left-50">
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
