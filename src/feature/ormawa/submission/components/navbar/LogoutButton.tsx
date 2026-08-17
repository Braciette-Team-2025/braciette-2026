import { LogOut } from "lucide-react";
import { cn } from "@/src/lib/utils";

type LogoutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function LogoutButton({
  className,
  ...props
}: LogoutButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-[10px] rounded-[12px] p-[12px] bg-yellow-500 hover:bg-yellow-400 transition-colors font-jakarta font-bold text-[20px] leading-[32px] text-blue-500",
        className,
      )}
      aria-label="Logout"
      {...props}
    >
      <LogOut className="w-6 h-6" strokeWidth={2.5} />
      <span className="hidden md:inline-block">Logout</span>
    </button>
  );
}
