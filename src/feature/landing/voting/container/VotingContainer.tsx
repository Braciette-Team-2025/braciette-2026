"use client";

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
