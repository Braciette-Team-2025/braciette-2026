"use client";

import { useRef, useCallback } from "react";
import { TIMELINE_DATA } from "../constants/constants";
import Timeline from "./ui/Timeline";
import { useTimelineAnimation } from "../hooks/animation/useTimelineAnimation";

export default function TimelineSection() {
  const highlightClass =
    "font-sloop text-[60px] md:text-[120px] xl:text-[200px]";

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setItemRef = useCallback((el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el;
  }, []);

  useTimelineAnimation({ sectionRef, headerRef, trackRef, itemRefs });

  return (
    <div className="w-full">
      <section
        ref={sectionRef}
        className="min-h-screen flex flex-col justify-center gap-4 md:gap-12 xl:gap-16"
      >
        <div
          ref={headerRef}
          className="flex flex-col justify-center items-center"
        >
          <h1 className="font-the-seasons text-[24px] md:text-[40px] xl:text-[80px] text-center flex justify-center items-center gap-1 md:gap-2 xl:gap-3 leading-[0.5] pt-6 xl:pt-14">
            <span className="text-blue-100 drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]">
              <span className={highlightClass}>E</span>vent
            </span>
            <span className="text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]">
              <span className={highlightClass}>T</span>imeline
            </span>
          </h1>
          <h2 className="font-the-seasons text-md md:text-2xl xl:text-[40px] text-blue-50 mt-1 xl:mt-3">
            Road to Awarding
          </h2>
        </div>
        <div
          ref={trackRef}
          className="flex gap-10 md:gap-16 xl:gap-25 overflow-x-hidden overflow-y-hidden pb-6 w-fit px-6 md:px-12 xl:px-25"
        >
          {TIMELINE_DATA.map((data, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === TIMELINE_DATA.length - 1;
            const isFirst = index === 0;
            return (
              <div
                key={data.id}
                ref={(el) => setItemRef(el, index)}
                className="shrink-0"
              >
                <Timeline
                  title={data.title}
                  date={data.date}
                  desc={data.desc}
                  isEven={isEven}
                  isLast={isLast}
                  isFirst={isFirst}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
