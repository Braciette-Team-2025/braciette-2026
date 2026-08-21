import Image from "next/image";
import LogoTransition from "./LogoTransition";

export default function AboutSection() {
  const highlightClass =
    "font-sloop text-[60px] md:text-[120px] xl:text-[200px]";

  return (
    <section className="w-full items-center flex flex-col gap-4 md: lg:gap-8 md:min-h-screen justify-center xl">
      <LogoTransition />
      <div className="w-full flex justify-between relative py-4 md:py-6 lg:py-8">
        <div className="w-22 md:w-46 xl:w-74 relative -left-4 md:-left-12 lg:-left-20">
          <Image
            className="-scale-x-100"
            src="/images/disc/disc-jockey.svg"
            width={296}
            height={316}
            alt="Disc Jockey"
          />
        </div>
        <h1 className="font-the-seasons text-[24px] md:text-[40px] xl:text-[80px] leading-[0.55] text-right flex flex-col justify-center">
          <span className="block text-blue-100 drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]">
            <span className={highlightClass}>A</span>bout
          </span>
          <span className="block text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]">
            <span className={highlightClass}>U</span>s
          </span>
        </h1>
        <div className="w-22 md:w-46 xl:w-74 relative -right-4 md:-right-12 lg:-right-20">
          <Image
            className=""
            src="/images/disc/disc-jockey.svg"
            width={296}
            height={316}
            alt="Disc Jockey"
          />
        </div>
      </div>
      <div className="w-full px-[16%]">
        <p className="text-center text-yellow-100 text-[8px] md:text-md xl:text-2xl font-semibold">
          Brawijaya Appreciate merupakan program kerja dari Kementerian Dalam
          Negeri Eksekutif Mahasiswa Universitas Brawijaya yang berbentuk malam
          penghargaan dengan tujuan sebagai bentuk kolaborasi, harmonisasi, dan
          apresiasi untuk simpul Brawijaya, yaitu BEM, DPM, HIMA, dan UKM.
        </p>
      </div>
    </section>
  );
}
