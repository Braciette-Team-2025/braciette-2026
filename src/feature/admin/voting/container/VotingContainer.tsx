"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { useAuthStore } from "@/src/feature/auth/store/authStore";

import { useCategory } from "../hooks/useCategory";
import { useOrganization } from "../hooks/useOrganization";
import { useVote } from "../hooks/useVote";

import { VotingHero } from "../components/VotingHero";
import { VotingSearch } from "../components/VotingSearch";
import { VotingConfirmButton } from "../components/VotingConfirmButton";
import { VotingSuccessModal } from "../components/VotingSuccessModal";
import { CategoryGrid } from "../components/(category)/CategoryGrid";
import { CategoryButton } from "../components/(category)/CategoryButton";
import { OrganizationGrid } from "../components/(organization)/OrganizationGrid";
import { VoteConfirmationModal } from "../components/(modal)/VoteConfirmationModal";

export function VotingContainer() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const { categories, selectedCategory, selectCategory, resetCategory } =
    useCategory();

  const {
    organizations,
    searchQuery,
    setSearchQuery,
    isLoading: isLoadingOrganizations,
  } = useOrganization(selectedCategory?.id ?? "");

  const {
    selectedOrganizationId,
    selectOrganization,
    openConfirmModal,
    closeConfirmModal,
    confirmVote,
    isSubmitting,
    isConfirmModalOpen,
    isSuccessModalOpen,
    closeSuccessModal,
  } = useVote();

  const hasVotedByCategory: Record<string, boolean> = {
    BEM: user?.has_voted_bem ?? false,
    DPM: user?.has_voted_dpm ?? false,
    HIMA: user?.has_voted_hima ?? false,
    UKM: user?.has_voted_ukm ?? false,
  };

  const hasVotedThisCategory = selectedCategory
    ? (hasVotedByCategory[selectedCategory.code] ?? false)
    : false;

  return (
    <section className="relative flex w-full flex-col items-center gap-10 overflow-hidden px-4 py-16 md:py-24">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Kembali"
        className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-yellow-500/70 bg-blue-500/60 text-yellow-500 shadow-[0_0_16px_-6px_rgba(201,162,39,0.5)] transition-colors hover:border-yellow-400 hover:text-yellow-400 sm:h-10 sm:w-10 md:left-6 md:top-6 md:h-11 md:w-11 lg:left-8 lg:top-8"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
      </button>

      {!selectedCategory ? (
        <>
          <VotingHero variant="category" />

          <CategoryGrid
            categories={categories}
            onSelect={selectCategory}
            hasVotedByCategory={hasVotedByCategory}
          />
        </>
      ) : (
        <>
          <VotingHero variant="organization" />

          <CategoryButton category={selectedCategory} onClick={resetCategory} />

          <VotingSearch
            value={searchQuery}
            onChange={setSearchQuery}
            statusMessage={
              hasVotedThisCategory
                ? `Kamu sudah melakukan voting ${selectedCategory.code}.`
                : "You haven't voted for your favorite student organization yet. Vote now!"
            }
          />

          <OrganizationGrid
            organizations={organizations}
            isLoading={isLoadingOrganizations}
            searchQuery={searchQuery}
            selectedOrganizationId={selectedOrganizationId}
            onSelect={selectOrganization}
            disabled={hasVotedThisCategory}
          />

          <VotingConfirmButton
            disabled={!selectedOrganizationId || hasVotedThisCategory}
            isSubmitting={isSubmitting}
            onConfirm={() => openConfirmModal(selectedCategory.id)}
          />

          <VoteConfirmationModal
            open={isConfirmModalOpen}
            onOpenChange={(open) => {
              if (!open) closeConfirmModal();
            }}
            onConfirm={confirmVote}
            isSubmitting={isSubmitting}
          />

          <VotingSuccessModal
            open={isSuccessModalOpen}
            onOpenChange={(open) => {
              if (!open) {
                closeSuccessModal();
              }
            }}
            onConfirm={closeSuccessModal}
          />
        </>
      )}
    </section>
  );
}
