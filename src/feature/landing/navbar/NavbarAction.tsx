import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface NavbarActionsProps {
  loginHref?: string;
}

export function NavbarActions({ loginHref = "/login" }: NavbarActionsProps) {
  return (
    <div className="hidden md:block">
      <Button
        asChild
        className="rounded-[12px] h-12 bg-yellow-500 px-8 heading-bold text-xl text-blue-800 hover:bg-yellow-600"
      >
        <Link href={loginHref}>Login</Link>
      </Button>
    </div>
  );
}
