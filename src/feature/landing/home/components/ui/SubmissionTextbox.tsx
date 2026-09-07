import { GuideItem } from "../../types/types";

export default function SubmissionTextbox({ id, desc }: GuideItem) {
  return (
    <div className="group flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">
      <div className="flex items-center h-80 bg-blue-800 p-3 md:p-6 xl:p-9 rounded-lg xl:rounded-[12px] border-b-4 md:border-b-[6px] border-transparent group-hover:border-yellow-500 shadow-[0_0_4px_rgba(178,180,198,1)] md:shadow-[0_0_6px_rgba(178,180,198,1)] xl:shadow-[0_0_12px_rgba(230,231,237,1)] transition-colors duration-300">
        <p className="text-center text-yellow-500 text-[8px] md:text-md xl:text-2xl">
          {desc}
        </p>
      </div>
      <div className="mt-[-4] md:mt-[-12] lg:mt-[-16] flex items-center justify-center w-5 h-5 md:w-10 md:h-10 xl:w-16 xl:h-16 rounded-full bg-blue-50 shadow-[0_0_6px_rgba(178,180,198,1)] md:shadow-[0_0_14px_rgba(178,180,198,1)] xl:shadow-[0_0_20px_rgba(178,180,198,1)] text-blue-800 text-xs md:text-xl xl:text-4xl leading-none shrink-0">
        {id}
      </div>
    </div>
  );
}
