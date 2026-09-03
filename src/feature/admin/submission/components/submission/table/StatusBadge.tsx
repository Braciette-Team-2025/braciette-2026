interface Props {
  status: "pending" | "rejected" | "accepted";
}

export function StatusBadge({ status }: Props) {
  const config = {
    accepted: {
      label: "Disetujui",
      bg: "bg-green-100",
      circle: "bg-green-500",
      text: "text-green-700",
      border: "border-green-500",
    },
    pending: {
      label: "Menunggu",
      bg: "bg-yellow-300",
      circle: "bg-yellow-500",
      text: "text-yellow-800",
      border: "border-yellow-500",
    },
    rejected: {
      label: "Ditolak",
      bg: "bg-red-100",
      circle: "bg-red-500",
      text: "text-red-700",
      border: "border-red-500",
    },
  };

  const current = config[status];

  return (
    <div
      className={`flex items-center justify-between rounded-full w-full ${current.bg} px-2 py-1 text-[14px] font-semibold border-2 ${current.border}`}
    >
      <span className={`${current.text}`}>{current.label}</span>
      <div className={`h-2 w-2 rounded-full ${current.circle}`} />
    </div>
  );
}
