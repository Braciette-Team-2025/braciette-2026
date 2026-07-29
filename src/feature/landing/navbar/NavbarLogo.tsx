import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface NavbarLogoProps {
  href?: string;
  label?: string;
  className?: string;
}

export function NavbarLogo({
  href = "/",
  label = "Braciate",
  className,
}: NavbarLogoProps) {
  return (
    <Link
      href={href}
      className={cn("flex shrink-0 items-center gap-2", className)}
      aria-label={label}
    >
      <Image
        src={"/images/logo/braciate-logo.svg"}
        alt="Logo"
        width={45}
        height={65}
      />

      <Image
        src={"/images/logo/braciate-nav-text.svg"}
        alt="text-logo"
        width={114}
        height={52}
      />
    </Link>
  );
}
