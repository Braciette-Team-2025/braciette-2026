import { Skeleton } from "@/components/ui/skeleton";

interface OrganizationSkeletonProps {
  count?: number;
}

export function OrganizationSkeleton({ count = 6 }: OrganizationSkeletonProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className="aspect-[353/209] rounded-xl border border-yellow-500/20 bg-blue-500/40"
        />
      ))}
    </div>
  );
}
