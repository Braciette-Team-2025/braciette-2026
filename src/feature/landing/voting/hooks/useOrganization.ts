"use client";

import { useEffect, useMemo, useState } from "react";
import { votingService } from "../services/voting.service";
import type { Organization } from "../types/organization";
import { filterOrganization } from "../utils/filterOrganization";

export function useOrganization(categoryId: string) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchOrganizations() {
      const data = await votingService.getOrganizationsByCategory(categoryId);

      if (!ignore) {
        setOrganizations(data);
      }
    }

    fetchOrganizations();

    return () => {
      ignore = true;
    };
  }, [categoryId]);

  const filteredOrganizations = useMemo(() => {
    return filterOrganization(organizations, categoryId, searchQuery);
  }, [organizations, categoryId, searchQuery]);

  return {
    organizations: filteredOrganizations,
    searchQuery,
    setSearchQuery,
    isLoading: false,
  };
}
