import Image from "next/image";

export default function PhotoSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-[10%] lg:px-[17%]">
      <div className="w-38 sm:w-64 md:w-96 lg:w-118 -scale-100">
        <Image
          src={"/images/about/frame.svg"}
          width={472}
          height={472}
          alt="photo frame"
          className="w-full h-auto"
        />
      </div>
      <div className="relative w-full flex justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10">
        <div className="h-28 sm:h-36 md:h-56 lg:h-82 -rotate-12 aspect-3/4 overflow-hidden rounded-[8px] md:rounded-[12px] lg:rounded-[20px] shadow-[0_0_15px_0_rgba(201,162,39,0.5)] lg:shadow-[0_0_40px_0_rgba(201,162,39,1)]">
          <Image
            src={"/images/about/about-pic-2.webp"}
            width={1280}
            height={1080}
            alt="photo 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-36 sm:h-48 md:h-72 lg:h-110 aspect-3/4 overflow-hidden rounded-[10px] md:rounded-[16px] lg:rounded-[20px] shadow-[0_0_20px_0_rgba(201,162,39,0.6)] lg:shadow-[0_0_40px_0_rgba(201,162,39,1)] z-10">
          <Image
            src={"/images/about/about-pic-1.webp"}
            width={1280}
            height={1080}
            alt="photo 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-28 sm:h-36 md:h-56 lg:h-82 rotate-12 aspect-3/4 overflow-hidden rounded-[8px] md:rounded-[12px] lg:rounded-[20px] shadow-[0_0_15px_0_rgba(201,162,39,0.5)] lg:shadow-[0_0_40px_0_rgba(201,162,39,1)]">
          <Image
            src={"/images/about/about-pic-3.webp"}
            width={1280}
            height={1080}
            alt="photo 3"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-38 sm:w-64 md:w-96 lg:w-118">
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
