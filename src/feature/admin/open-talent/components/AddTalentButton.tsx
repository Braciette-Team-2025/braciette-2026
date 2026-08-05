import { CircleArrowRight } from "lucide-react";

interface AddTalentButtonProps {
  onClick: () => void;
}

export default function AddTalentButton({ onClick }: AddTalentButtonProps) {
  return (
    <div className="w-fit">
      <button
        onClick={() => onClick()}
        className="flex items-center bg-[#858585] text-white px-4 py-2 space-x-10 rounded-[8px] cursor-pointer"
      >
        <h1 className="font-bold text-[16px]">Open Talent Baru</h1>
        <CircleArrowRight className="text-[24px]" />
      </button>
    </div>
  );
}
