"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import type { ConfirmationDialogProps } from "../../../types/ormawa";

export default function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  loading = false,
  variant = "default",
}: ConfirmationDialogProps) {
  const confirmButtonStyle =
    variant === "destructive"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-[#6D6D6D] hover:bg-[#5B5B5B] text-white";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogOverlay className="bg-black/40 backdrop-blur-[2px]" />

      <AlertDialogContent className="w-[520px] max-w-[calc(100%-2rem)] rounded-[20px] border-2 border-[#AFAFAF] bg-white px-10 pt-12 pb-10 shadow-xl flex flex-col gap-8">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#AFAFAF] transition hover:opacity-70"
        >
          <X size={20} className="text-[#7F7F7F]" strokeWidth={2.5} />
        </button>

        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-[32px] font-extrabold leading-none tracking-[-0.02em] text-[#7F7F7F]">
            {title}
          </h2>

          <p className="max-w-[340px] text-[18px] font-medium leading-7 text-[#7F7F7F]">
            {description}
          </p>
        </div>

        <div className="flex justify-center gap-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-13 rounded-xl border-[#D4D4D4] bg-[#ECECEC] px-8 py-3 text-lg font-semibold text-[#7F7F7F] hover:bg-[#E3E3E3]"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`h-13 rounded-xl px-10 py-3 text-lg font-semibold ${confirmButtonStyle}`}
          >
            {loading ? "Loading..." : confirmText}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
