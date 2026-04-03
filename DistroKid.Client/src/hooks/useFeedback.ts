"use client";

import { useState, useCallback, useEffect } from "react";
import type { FeedbackRecord } from "@/infrastructure/apis/client/models";
import { getFeedbackPage } from "@/services/feedback";

/**
 * Custom hook for managing the list of feedback entries in the administration dashboard.
 */
export function useFeedback() {
  const [items, setItems] = useState<FeedbackRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PAGE_SIZE = 10;

  const fetchPage = useCallback(
    async (p: number = page, s: string = search) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getFeedbackPage(p, PAGE_SIZE, s || undefined);
        setItems(result.data ?? []);
        setTotalCount(result.totalCount ?? 0);
        setPage(p);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load feedback");
      } finally {
        setIsLoading(false);
      }
    },
    [page, search],
  );

  useEffect(() => {
    fetchPage(1, "");
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchPage(1, value);
  };

  const pageCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return {
    items,
    totalCount,
    page,
    pageCount,
    search,
    isLoading,
    error,
    fetchPage,
    handleSearch,
    setPage,
    PAGE_SIZE,
  };
}
