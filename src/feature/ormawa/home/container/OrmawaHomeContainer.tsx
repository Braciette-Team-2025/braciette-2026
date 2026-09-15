import { LandingButton } from "@/src/feature/landing/home/components/ui/LandingButton";
import OptionCard from "../components/OptionCard";
import { OPTIONS } from "../constants/ormawa_home";
import cover_booklet from "@/public/images/booklet/cover_booklet_real.png";
import Image from "next/image";
import Link from "next/link";

export default function OrmawaHomeContainer() {
  const highlight = "font-sloop text-5xl md:text-6xl xl:text-7xl leading-[0.7]";
  const DROP_SHADOW = {
    base: "drop-shadow-[0_0_12px_rgba(218,161,17,0.8)]",
    md: "drop-shadow-[0_0_16px_rgba(218,161,17,0.8)]",
    xl: "drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]",
  };
  const BOOKLET_HREF =
    "https://drive.google.com/drive/folders/1w-1zWM2Ok8pbcgp4HUQ1OBvBdFIZQSRP";
  return (
    <main className="px-8 md:px-12 xl:px-24 flex flex-col gap-4 md:gap-6 justify-center min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-105px)] lg:min-h-[calc(100vh-121px)]">
      <div className="text-center md:text-left">
        <h1
          className={`pt-4 font-the-seasons text-2xl md:text-3xl xl:text-4xl text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)] ${DROP_SHADOW.base} md:${DROP_SHADOW.md} xl:${DROP_SHADOW.xl}`}
        >
          <span className={highlight}>S</span>elamat{" "}
          <span className={highlight}>D</span>atang
        </h1>
        <p className="font-medium text-md xl:text-lg">
          Apa yang kamu butuhkan?
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 xl:gap-12">
        <div className="flex flex-col gap-4 md:gap-0 md:justify-between md:flex-1 bg-blue-700 p-4 xl:p-6 border-yellow-50 border-2 rounded-2xl md:rounded-3xl xl:rounded-4xl items-center">
          <h2
            className={`font-semibold text-sm lg:text-md xl:text-2xl text-yellow-200 ${DROP_SHADOW.base}`}
          >
            Booklet Ormawa
          </h2>
          <Link
            href={BOOKLET_HREF}
            className={` w-2/3 transform -rotate-3 transition-all duration-300 hover:scale-105 hover:-rotate-1 hidden md:block border-2 border-yellow-300 rounded-lg overflow-hidden ${DROP_SHADOW["md"]}`}
          >
            <Image
              src={cover_booklet}
              alt="booklet"
              className="object-cover w-full h-auto drop-shadow-xl"
            />
          </Link>
          <div className="w-full">
            <LandingButton
              href={BOOKLET_HREF}
              className="w-full md:text-sm! xl:text-md! px-0! "
            >
              Cek Booklet
            </LandingButton>
          </div>
        </div>
        <div className="flex flex-col gap-4 xl:gap-6 md:flex-2 lg:flex-3 xl:flex-4">
          {OPTIONS.map((data) => {
            return (
              <OptionCard
                key={data.title}
                icon={data.icon}
                title={data.title}
                desc={data.desc}
                href={data.href}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
