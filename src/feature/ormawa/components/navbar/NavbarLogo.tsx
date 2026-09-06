import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface NavbarLogoProps {
  className?: string;
}

export default function NavbarLogo({ className }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-1 lg:gap-3", className)}
      aria-label="Braciate Logo"
    >
      <Image
        src="/images/logo/braciate-logo.svg"
        alt="Logo"
        width={45}
        height={65}
        priority
        className="w-7 md:w-auto"
      />

      <div className="flex items-center text-yellow-400 translate-y-2 ">
        <span className="font-sloop text-[32px] md:text-[48px]  leading-none">
          B
        </span>
        <span className="font-the-seasons text-[16px] md:text-[24px] leading-none">
          raciate
        </span>
      </div>
    </Link>
  );
}
