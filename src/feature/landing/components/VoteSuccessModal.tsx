"use client";

import Image from "next/image";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { SuccessModalTitle } from "@/src/feature/landing/components/SucessModalTitle";

interface VoteSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "voting" | "applying";
  onConfirm?: () => void;
}

export function VoteSuccessModal({
  open,
  onOpenChange,
  variant,
  onConfirm,
}: VoteSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className=" max-w-lg overflow-hidden rounded-2xl border border-yellow-500/70 bg-blue-900 p-10 text-center shadow-[0_0_45px_-8px_rgba(201,162,39,0.75)] sm:max-w-xl md:p-14
        "
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#141a4a_0%,#040828_65%,#03061e_100%)]" />

          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: "url('/images/background/dots.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "1480px 1480px",
            }}
          />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="relative mb-[clamp(0.5rem,1.5vh,1rem)] h-[clamp(3.5rem,9vh,6rem)] w-[clamp(3.5rem,9vh,6rem)] shrink-0">
            <Image
              src="/images/logo/braciate-logo.svg"
              alt="Braciate"
              fill
              sizes="96px"
              className="object-contain"
              priority
            />
          </div>

          <SuccessModalTitle variant={variant} />

          <Button
            type="button"
            onClick={onConfirm ?? (() => onOpenChange(false))}
            className="mt-[clamp(0.5rem,1.75vh,0.15rem)] h-[clamp(2.75rem,6vh,3rem)] w-full max-w-xs rounded-full bg-yellow-500 text-[clamp(0.95rem,2vw,1.125rem)] font-bold text-blue-900 shadow-[0_0_20px_-4px_rgba(201,162,39,0.7)] hover:bg-yellow-400
            "
          >
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
