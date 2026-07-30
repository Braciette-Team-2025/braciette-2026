interface OrganizationEmptyProps {
  query: string;
}

export function OrganizationEmpty({ query }: OrganizationEmptyProps) {
  return (
    <div className="flex min-h-[160px] w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-yellow-500/40 py-10 text-center">
      <p className="font-medium text-yellow-100">
        No organizations match &quot;{query}&quot;
      </p>
      <p className="text-sm text-yellow-100/60">
        Try a different keyword or clear the search.
      </p>
    </div>
  );
}
