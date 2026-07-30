"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Organization } from "../../types/organization";
import { OrganizationCard } from "./OrganizationCard";
import { OrganizationEmpty } from "./OrganizationEmpty";
import { OrganizationSkeleton } from "./OrganizationSkeleton";
import { OrganizationScrollbar } from "./OrganizationScrollbar";

interface OrganizationGridProps {
  organizations: Organization[];
  isLoading: boolean;
  searchQuery: string;
  selectedOrganizationId: string | null;
  onSelect: (organizationId: string) => void;
}

const ROW_GAP_PX = 16;

export function OrganizationGrid({
  organizations,
  isLoading,
  searchQuery,
  selectedOrganizationId,
  onSelect,
}: OrganizationGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ heightPercent: 100, topPercent: 0 });
  const [canScrollDown, setCanScrollDown] = useState(false);

  const measure = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const heightPercent = Math.min(100, (clientHeight / scrollHeight) * 100);
    const maxScrollTop = scrollHeight - clientHeight;
    const topPercent =
      maxScrollTop > 0 ? (scrollTop / maxScrollTop) * (100 - heightPercent) : 0;

    setThumb({ heightPercent, topPercent });
    setCanScrollDown(maxScrollTop > 0 && scrollTop < maxScrollTop - 1);
  };

  useEffect(() => {
    measure();

    const contentEl = contentRef.current;
    if (!contentEl || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(measure);
    observer.observe(contentEl);
    return () => observer.disconnect();
  }, [organizations]);

  const scrollOneRow = () => {
    const el = scrollRef.current;
    const firstCard = contentRef.current
      ?.firstElementChild as HTMLElement | null;
    const rowHeight = firstCard?.offsetHeight ?? 0;
    if (!el || rowHeight === 0) return;

    el.scrollBy({ top: rowHeight + ROW_GAP_PX, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      {isLoading ? (
        <OrganizationSkeleton />
      ) : organizations.length === 0 ? (
        <OrganizationEmpty query={searchQuery} />
      ) : (
        <>
          <div className="flex h-[420px] w-full gap-5">
            <div
              ref={scrollRef}
              onScroll={measure}
              className={cn(
                "max-h-[420px] w-full flex-1 overflow-y-auto",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              <div
                ref={contentRef}
                className="grid py-2 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {organizations.map((organization) => (
                  <OrganizationCard
                    key={organization.id}
                    organization={organization}
                    isSelected={selectedOrganizationId === organization.id}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>

            <OrganizationScrollbar
              thumbHeightPercent={thumb.heightPercent}
              thumbTopPercent={thumb.topPercent}
            />
          </div>

          <button
            type="button"
            onClick={scrollOneRow}
            aria-label="Show more organizations"
            className={cn(
              "mx-auto mt-4 flex h-9 w-9 items-center justify-center rounded-full text-yellow-500",
              "transition-[opacity,transform] duration-300 hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900",
              canScrollDown
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
          >
            <ArrowDown className="h-6 w-6 animate-bounce" />
          </button>
        </>
      )}
    </div>
  );
}
