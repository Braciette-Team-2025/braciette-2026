import { TimelineItem } from "../../types/types";

type TimelineProps = Pick<TimelineItem, "title" | "date" | "desc"> & {
  isEven: boolean;
  isLast: boolean;
  isFirst: boolean;
};

export default function Timeline({
  title,
  date,
  desc,
  isEven,
  isLast,
  isFirst,
}: TimelineProps) {
  const gapWidths =
    "w-[calc(100%+2.5rem)] md:w-[calc(100%+4rem)] xl:w-[calc(100%+6.25rem)]";

  const lineWidth = isLast
    ? "w-full rounded-r-[10px]"
    : isFirst
      ? `${gapWidths} rounded-l-[10px]`
      : gapWidths;

  return (
    <div
      className={`flex items-center justify-between shrink-0 w-40 md:w-72 xl:w-82 h-50 md:h-90 xl:h-132 py-4 md:py-6 xl:py-16 ${isEven ? "flex-col" : "flex-col-reverse"}`}
    >
      <div
        className={`flex flex-1 justify-end items-center w-full ${isEven ? "flex-col" : "flex-col-reverse"}`}
      >
        <div className="timeline-shape-circle w-6 h-6 md:w-10 md:h-10 xl:w-15 xl:h-15 rounded-full bg-yellow-500 shadow-[0_0_20px_rgba(201,162,39,1)] xl:shadow-[0_0_83px_rgba(201,162,39,1)] shrink-0" />
        <div className="timeline-shape-line w-px bg-yellow-500 h-12 md:h-24 xl:h-31 shrink-0 origin-bottom" />
      </div>
      <div className="w-full h-2.5 md:h-6 xl:h-8 relative shrink-0">
        <div
          className={`timeline-shape-horizontal absolute top-0 left-0 h-4 md:h-6 xl:h-8 bg-blue-100 shadow-[0_0_8px_rgba(178,180,198,1)] xl:shadow-[0_0_16px_rgba(178,180,198,1)] ${lineWidth}`}
        />
      </div>
      <div
        className={`flex flex-1 items-center justify-end ${isEven ? "flex-col" : "flex-col-reverse"}`}
      >
        <div className="timeline-text text-center space-y-1 md:space-y-1.5 xl:space-y-2.5">
          <h1 className="text-xs md:text-xl xl:text-2xl font-bold text-yellow-500">
            {title}
          </h1>
          <h2 className="text-[10px] md:text-lg xl:text-xl font-medium text-yellow-100 ">
            {date}
          </h2>
          <p className="text-[8px] md:text-md font-medium text-yellow-100">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
