"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  loading = false,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogOverlay className="bg-black/40 backdrop-blur-[2px]" />

      <AlertDialogContent className="w-[520px] max-w-[calc(100%-2rem)] rounded-[20px] border-2 border-[#AFAFAF] bg-white px-10 pt-12 pb-10 shadow-xl flex flex-col gap-8">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-600 transition hover:opacity-70"
        >
          <X size={20} className="text-blue-800" strokeWidth={2.5} />
        </button>

        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-[32px] font-extrabold leading-none tracking-[-0.02em] text-yellow-500">
            {title}
          </h2>

          <p className="max-w-[340px] text-[18px] font-medium leading-7 text-blue-800">
            {description}
          </p>
        </div>

        <div className="flex justify-center gap-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-13 rounded-xl border-2 border-yellow-500 bg-yellow-100 px-8 py-3 text-lg font-semibold text-yellow-600 hover:bg-yellow-200"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="h-13 rounded-xl px-10 py-3 text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-yellow-50"
          >
            {loading ? "Loading..." : confirmText}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
