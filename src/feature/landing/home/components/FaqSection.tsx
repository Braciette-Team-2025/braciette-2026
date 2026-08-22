"use client";
import { useState } from "react";
import { FAQ_DATA } from "../constants/constants";
import FaqTextbox from "./ui/FaqTextbox";

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const highlightClass =
    "font-sloop text-[60px] md:text-[120px] xl:text-[200px]";

  return (
    <section className="flex flex-col items-center px-4 lg:px-25 gap-6 xl:gap-23">
      <h1 className="font-the-seasons text-[24px] md:text-[40px] xl:text-[80px] leading-[0.6] text-center flex flex-col justify-center py-4 md:py-8 xl:py-12">
        <span className="block text-blue-100 drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]">
          <span className={highlightClass}>F</span>requently{" "}
          <span className={highlightClass}>A</span>sk
        </span>
        <span className="block text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]">
          <span className={highlightClass}>Q</span>uestions
        </span>
      </h1>
      <div className="w-full flex flex-col gap-6 md:gap-10 xl:gap-16">
        {FAQ_DATA.map((data) => (
          <FaqTextbox
            key={data.id}
            title={data.title}
            desc={data.desc}
            isOpen={openId === data.id}
            onToggle={() => setOpenId(openId === data.id ? null : data.id)}
          />
        ))}
      </div>
    </section>
  );
}
