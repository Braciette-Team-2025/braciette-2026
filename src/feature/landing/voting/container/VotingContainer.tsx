"use client";

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

export function VotingContainer() {
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
    confirmVote,
    isSubmitting,
    isSuccessModalOpen,
    closeSuccessModal,
  } = useVote();

  const hasVotedThisRound = false;

  return (
    <section className="relative flex w-full flex-col items-center gap-10 overflow-hidden px-4 py-16 md:py-24">
      {!selectedCategory ? (
        <>
          <VotingHero variant="category" />

          <CategoryGrid categories={categories} onSelect={selectCategory} />
        </>
      ) : (
        <>
          <VotingHero variant="organization" />

          <CategoryButton category={selectedCategory} onClick={resetCategory} />

          <VotingSearch
            value={searchQuery}
            onChange={setSearchQuery}
            statusMessage={
              hasVotedThisRound
                ? undefined
                : "You haven't voted for your favorite student organization yet. Vote now!"
            }
          />

          <OrganizationGrid
            organizations={organizations}
            isLoading={isLoadingOrganizations}
            searchQuery={searchQuery}
            selectedOrganizationId={selectedOrganizationId}
            onSelect={selectOrganization}
          />

          <VotingConfirmButton
            disabled={!selectedOrganizationId}
            isSubmitting={isSubmitting}
            onConfirm={() => confirmVote(selectedCategory.id)}
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
