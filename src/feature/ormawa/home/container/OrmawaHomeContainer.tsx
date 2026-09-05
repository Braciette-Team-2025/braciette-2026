import OptionCard from "../components/OptionCard";
import { OPTIONS } from "../constants/ormawa_home";

export default function OrmawaHomeContainer() {
  const highlight = "font-sloop text-7xl md:text-7xl xl:text-8xl leading-[0.7]";
  const DROP_SHADOW = {
    base: "drop-shadow-[0_0_12px_rgba(218,161,17,0.8)]",
    md: "drop-shadow-[0_0_16px_rgba(218,161,17,0.8)]",
    xl: "drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]",
  };
  return (
    <main className="py-16 md:py-0 px-8 md:px-16 xl:px-24 flex flex-col gap-6 md:gap-8 justify-center md:min-h-[calc(100vh-105px)] lg:min-h-[calc(100vh-121px)]">
      <div className="text-center md:text-left">
        <h1
          className={`pt-4 font-the-seasons text-4xl md:text-5xl xl:text-6xl text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)] ${DROP_SHADOW.base} md:${DROP_SHADOW.md} xl:${DROP_SHADOW.xl}`}
        >
          <span className={highlight}>S</span>elamat{" "}
          <span className={highlight}>D</span>atang
        </h1>
        <p className="font-medium text-lg xl:text-xl">
          Apa yang kamu butuhkan?
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
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
    </main>
  );
}
