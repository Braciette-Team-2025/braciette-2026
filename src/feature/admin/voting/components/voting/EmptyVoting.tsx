import { Inbox } from "lucide-react";

export interface EmptyVotingProps {
  title?: string;
  description?: string;
}

export function EmptyVoting({
  title = "Belum ada data voting",
  description = "Hasil voting akan muncul di sini setelah peserta mulai memberikan suara.",
}: EmptyVotingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 text-center sm:py-16">
      <Inbox className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
