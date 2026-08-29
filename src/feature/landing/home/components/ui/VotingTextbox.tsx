import { VotingGuideItem } from "../../types/types";

export default function VotingTextbox({ id, desc }: VotingGuideItem) {
  return (
    <div className="flex flex-col gap-0.5 md:gap-2 xl:gap-4 items-center">
      <div className="flex items-center justify-center w-5 h-5 md:w-10 md:h-10 xl:w-16 xl:h-16 rounded-full bg-blue-50 shadow-[0_0_6px_rgba(178,180,198,1)] md:shadow-[0_0_14px_rgba(178,180,198,1)] xl:shadow-[0_0_20px_rgba(178,180,198,1)] text-blue-800 text-xs md:text-xl xl:text-4xl leading-none shrink-0">
        {id}
      </div>
      <div className="bg-blue-800 py-4 px-1.5 md:py-6 md:px-3 xl:py-14 xl:px-10 rounded-[4px] xl:rounded-[12px] shadow-[0_0_4px_rgba(178,180,198,1)] md:shadow-[0_0_6px_rgba(178,180,198,1)] xl:shadow-[0_0_12px_rgba(230,231,237,1)]">
        <p className="text-center font-semibold text-yellow-500 text-[8px] md:text-md xl:text-2xl">
          {desc}
        </p>
      </div>
    </div>
  );
}
