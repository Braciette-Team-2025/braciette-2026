import { cn } from "@/src/lib/utils";
import { Upload } from "lucide-react";

interface RequiredFilesInfoProps {
  requiredFiles?: string[];
  isVisible?: boolean;
}

export function RequiredFilesInfo({
  requiredFiles,
  isVisible = true,
}: RequiredFilesInfoProps) {
  if (!requiredFiles || requiredFiles.length === 0) return null;

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        isVisible
          ? "grid-rows-[1fr] opacity-100 mt-1"
          : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div className="w-[812px] max-w-full">
          <div className="w-full flex flex-col gap-3 px-5 py-4 rounded-[12px] bg-[#E7D6A1] border-2 border-[#C6A648]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-[6px] border-[1.5px] border-[#161D3D] bg-transparent text-[#161D3D] shrink-0">
                <Upload className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-[#161D3D] font-jakarta font-bold text-sm md:text-base">
                File yang perlu dikumpulkan:
              </span>
            </div>

            <ul className="list-disc text-[#161D3D] font-jakarta text-sm md:text-base flex flex-col gap-1 ml-10">
              {requiredFiles.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
