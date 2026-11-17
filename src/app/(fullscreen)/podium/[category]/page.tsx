import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VOTING_CATEGORIES } from "@/src/feature/admin/voting/constants/voting";
import PodiumContainer from "@/src/feature/landing/podium/components/PodiumContainer";
import { PODIUM_CATEGORY_LABEL } from "@/src/feature/landing/podium/constants/podium.content";
import {
  getPodiumEntries,
  isPodiumCategory,
} from "@/src/feature/landing/podium/utils/getPodiumEntries";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return VOTING_CATEGORIES.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isPodiumCategory(category)) return {};
  return { title: `Most Favorite ${PODIUM_CATEGORY_LABEL[category]}` };
}

export default async function PodiumPage({ params }: Props) {
  const { category } = await params;
  if (!isPodiumCategory(category)) notFound();

  return (
    <PodiumContainer
      key={category}
      categoryLabel={PODIUM_CATEGORY_LABEL[category]}
      entries={getPodiumEntries(category)}
    />
  );
}
