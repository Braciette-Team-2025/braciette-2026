"use client";

import { useEffect, useMemo, useState } from "react";
import { votingService } from "../services/voting.service";
import type { Organization } from "../types/organization";
import { filterOrganization } from "../utils/filterOrganization";

export function useOrganization(categoryId: string) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    let ignore = false;

    async function fetchOrganizations() {
      setIsLoading(true);

      try {
        const data: Organization[] =
          await votingService.getOrganizationsByCategory(categoryId);

        if (!ignore) {
          const acceptedOrganizations = data.filter(
            (organization) => organization.status === "accepted",
          );

          setOrganizations(acceptedOrganizations);
        }
      } catch (error) {
        console.error(
          "[useOrganization] Failed to fetch organizations:",
          error,
        );

        if (!ignore) {
          setOrganizations([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchOrganizations();

    return () => {
      ignore = true;
    };
  }, [categoryId]);

  const filteredOrganizations = useMemo(() => {
    if (!categoryId) {
      return [];
    }

    return filterOrganization(organizations, categoryId, searchQuery);
  }, [organizations, categoryId, searchQuery]);

  return {
    organizations: filteredOrganizations,
    searchQuery,
    setSearchQuery,
    isLoading: categoryId ? isLoading : false,
  };
}
