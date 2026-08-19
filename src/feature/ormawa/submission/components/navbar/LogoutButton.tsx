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
        "flex items-center gap-2.5 rounded-lg md:rounded-[12px] p-2 md:p-3 bg-yellow-500 hover:bg-yellow-400 transition-colors font-jakarta font-bold text-[20px] leading-8 text-blue-500",
        className,
      )}
      aria-label="Logout"
      {...props}
    >
      <LogOut className="aspect-square h-4  md:h-6 " strokeWidth={2.5} />
      <span className="hidden md:inline-block">Logout</span>
    </button>
  );
}
