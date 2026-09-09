"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface VoteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleImageSrc?: string;
  onConfirm?: () => void;
  isSubmitting?: boolean;
}

export function VoteConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting = false,
}: VoteConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-2xl border border-yellow-500/70 bg-blue-900 p-10 text-center shadow-[0_0_45px_-8px_rgba(201,162,39,0.75)] sm:w-full sm:max-w-xl md:p-8"
      >
        {/* Background layers */}
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
          <div className="flex w-full items-start gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-5 py-4 text-left">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400"
              strokeWidth={2}
            />
            <p className="text-xs md:text-sm leading-relaxed text-yellow-100/90">
              Perhatian! Kamu hanya dapat melakukan{" "}
              <span className="font-bold text-yellow-400">
                voting satu kali
              </span>{" "}
              untuk setiap kategori. Pastikan pilihanmu sudah tepat sebelum
              mengkonfirmasi.
            </p>
          </div>

          {/* Actions */}
          <div className="flex w-full gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
              className="h-12 flex-1 rounded-full border-yellow-500/50 bg-transparent text-base font-bold text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300 disabled:cursor-not-allowed"
            >
              Batal
            </Button>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={onConfirm}
              className="h-12 flex-1 rounded-full bg-yellow-500 text-base font-bold text-blue-900 shadow-[0_0_20px_-4px_rgba(201,162,39,0.7)] hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Memproses..." : "Submit Vote"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
