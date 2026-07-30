import { Organization } from "../types/organization";

/**
 * Filters a list of organizations by category and an optional search query.
 * The search is case-insensitive and matches anywhere in the organization name.
 */
export function filterOrganization(
  organizations: Organization[],
  categoryId: string | null,
  query: string,
): Organization[] {
  const normalizedQuery = query.trim().toLowerCase();

  return organizations.filter((organization) => {
    const matchesCategory = categoryId
      ? organization.categoryId === categoryId
      : true;

    const matchesQuery = normalizedQuery
      ? organization.name.toLowerCase().includes(normalizedQuery)
      : true;

    return matchesCategory && matchesQuery;
  });
}
