interface Props {
  status: "approved" | "pending" | "rejected";
}

export function StatusBadge({ status }: Props) {
  const config = {
    approved: {
      label: "Disetujui",
      color: "bg-green-500",
    },
    pending: {
      label: "Menunggu",
      color: "bg-yellow-500",
    },
    rejected: {
      label: "Ditolak",
      color: "bg-red-500",
    },
  };

  const current = config[status];

  return (
    <div className="flex items-center justify-between rounded-full bg-muted px-3 py-1 text-xs">
      <span>{current.label}</span>
      <div className={`h-2 w-2 rounded-full ${current.color}`} />
    </div>
  );
}
