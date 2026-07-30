"use client";

import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VoteSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleImageSrc?: string;
  onConfirm?: () => void;
}

export function VoteSuccessModal({
  open,
  onOpenChange,
  titleImageSrc = "/images/logo/modal-voting.svg",
  onConfirm,
}: VoteSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-lg overflow-hidden rounded-2xl border border-yellow-500/70 bg-blue-900 p-10 text-center shadow-[0_0_45px_-8px_rgba(201,162,39,0.75)] sm:max-w-xl md:p-14"
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

        <div className="relative flex flex-col items-center gap-8">
          {titleImageSrc ? (
            <Image
              src={titleImageSrc}
              alt="Thanks For Voting!"
              width={500}
              height={220}
              className="h-auto w-full max-w-sm object-contain md:max-w-md"
            />
          ) : (
            <div
              role="img"
              aria-label="Thanks For Voting!"
              className="flex h-[160px] w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-yellow-500/40 text-sm text-yellow-100/50 md:h-[200px] md:max-w-md"
            >
              Thanks For Voting!
            </div>
          )}

          <Button
            type="button"
            onClick={onConfirm ?? (() => onOpenChange(false))}
            className="h-12 w-full max-w-xs rounded-full bg-yellow-500 text-lg font-bold text-blue-900 shadow-[0_0_20px_-4px_rgba(201,162,39,0.7)] hover:bg-yellow-400"
          >
            Ok
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
