"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePhotoAnimation } from "../hooks/animation/usePhotoAnimation";

// Ukuran kartu kini SERAGAM. Yang membesarkan kartu tengah adalah `scale`
// dari slot di usePhotoAnimation, bukan class di sini — kalau ukurannya
// menempel pada elemen, kartu yang pindah ke tengah akan tetap kecil.
const CARD_CLASS =
  "absolute left-1/2 top-1/2 h-28 sm:h-36 md:h-56 xl:h-82 aspect-3/4 overflow-hidden rounded-[8px] md:rounded-[12px] xl:rounded-[20px] shadow-[0_0_15px_0_rgba(201,162,39,0.5)] xl:shadow-[0_0_40px_0_rgba(201,162,39,1)] cursor-pointer will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300";

export default function PhotoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameTopRef = useRef<HTMLDivElement>(null);
  const frameBottomRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  usePhotoAnimation({
    sectionRef,
    frameTopRef,
    frameBottomRef,
    cardLeftRef,
    cardCenterRef,
    cardRightRef,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-[10%] xl:px-[17%] md:min-h-screen"
    >
      <div
        ref={frameTopRef}
        className="w-38 sm:w-64 md:w-96 xl:w-118 -scale-100"
      >
        <Image
          src={"/images/about/frame.svg"}
          width={472}
          height={472}
          alt="photo frame"
          className="w-full h-auto"
        />
      </div>

      {/* Kartu di-absolute pada satu titik jangkar yang sama, lalu digeser
          ke slot masing-masing lewat xPercent. Karena absolute tidak
          menyumbang tinggi, wrapper diberi tinggi eksplisit sebesar kartu
          tengah (kartu kecil x 1.32). */}
      <div className="relative w-full h-36 sm:h-48 md:h-72 xl:h-110">
        <div
          ref={cardLeftRef}
          role="button"
          tabIndex={0}
          aria-label="Tampilkan foto 2 di tengah"
          className={CARD_CLASS}
        >
          <Image
            src={"/images/about/about-pic-2.webp"}
            width={1280}
            height={1080}
            alt="photo 2"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={cardCenterRef}
          role="button"
          tabIndex={0}
          aria-label="Tampilkan foto 1 di tengah"
          className={CARD_CLASS}
        >
          <Image
            src={"/images/about/about-pic-1.webp"}
            width={1280}
            height={1080}
            alt="photo 1"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          ref={cardRightRef}
          role="button"
          tabIndex={0}
          aria-label="Tampilkan foto 3 di tengah"
          className={CARD_CLASS}
        >
          <Image
            src={"/images/about/about-pic-3.webp"}
            width={1280}
            height={1080}
            alt="photo 3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div ref={frameBottomRef} className="w-38 sm:w-64 md:w-96 xl:w-118">
        <Image
          src={"/images/about/frame.svg"}
          width={472}
          height={472}
          alt="photo frame"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
