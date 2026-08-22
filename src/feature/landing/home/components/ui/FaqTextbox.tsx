import { ChevronDown } from "lucide-react";
import { FaqItem } from "../../types/types";

type FaqTextboxProps = Pick<FaqItem, "title" | "desc"> & {
  isOpen: boolean;
  onToggle: () => void;
};

export default function FaqTextbox({
  title,
  desc,
  isOpen,
  onToggle,
}: FaqTextboxProps) {
  return (
    <div className="px-4 py-2 xl:py-5 xl:px-10 bg-[#393E6D1F] border border-blue-50 w-full rounded-[8px] md:rounded-[10px] xl:rounded-[12px]">
      <div className="flex flex-col font-semibold text-[8px] md:text-md xl:text-2xl">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={onToggle}
        >
          <h1>{title}</h1>
          <ChevronDown
            className={`w-4 h-4 md:w-6 md:h-6 xl:w-8 xl:h-8 transition-transform duration-300 ${isOpen ? "-scale-100" : ""}`}
          />
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="pt-2 xl:pt-5 flex flex-col gap-2 xl:gap-5">
              <div className="border border-yellow-600" />
              <p className="">{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
