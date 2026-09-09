"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

import type { BaseModalProps } from "../../types";

export default function BaseModal({
  open,
  onOpenChange,
  title,
  children,
  widthClassName = "w-[420px]",
}: BaseModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogOverlay className="bg-black/40 backdrop-blur-[2px]" />

      <AlertDialogContent
        className={`${widthClassName} max-w-[calc(100%-2rem)] max-h-[85vh] overflow-hidden rounded-2xl border border-yellow-700 bg-yellow-50 p-0 shadow-xl flex flex-col`}
      >
        <div className="flex items-center justify-between rounded-t-2xl border-b border-yellow-700 bg-yellow-500 px-6 py-4">
          <h2 className="text-[15px] font-semibold text-yellow-50">{title}</h2>

          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1 text-yellow-50 transition hover-bg-yellow-600"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
