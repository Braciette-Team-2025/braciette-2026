import { CircleArrowRight } from "lucide-react";

interface AddOrmawaButtonProps {
  onClick: () => void;
}

export default function AddOrmawaButton({ onClick }: AddOrmawaButtonProps) {
  return (
    <div className="w-fit">
      <button
        onClick={() => onClick()}
        className="flex bg-[#858585] text-white p-3 space-x-15 rounded-[8px]"
      >
        <h1 className="font-bold text-[16px]">Daftar Ormawa</h1>
        <CircleArrowRight className="text-[24px]" />
      </button>
    </div>
  );
}
