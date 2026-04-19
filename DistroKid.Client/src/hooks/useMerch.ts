"use client";

import { useCallback, useRef, useState } from "react";
import type { MerchRecord } from "@/infrastructure/apis/client/models";
import { getMerchPage, addMerch, updateMerch, deleteMerch } from "@/services/merch";

export function useMerch() {
  const [items, setItems] = useState<MerchRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageRef = useRef(1);
  const searchRef = useRef("");

  const PAGE_SIZE = 10;

  const fetchPage = useCallback(
    async (p: number = pageRef.current, s: string = searchRef.current) => {
      const nextPage = Math.max(1, p);
      const nextSearch = s ?? "";

      setIsLoading(true);
      setError(null);
      try {
        const result = await getMerchPage(nextPage, PAGE_SIZE, nextSearch || undefined);
        setItems(result.data ?? []);
        setTotalCount(result.totalCount ?? 0);
        setPage(nextPage);
        setSearch(nextSearch);
        pageRef.current = nextPage;
        searchRef.current = nextSearch;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load merch");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const handleSearch = (value: string) => {
    return fetchPage(1, value);
  };

  const handleAdd = async (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) => {
    await addMerch(data);
    await fetchPage();
  };

  const handleUpdate = async (
    id: string,
    data: { name?: string; description?: string; price?: number; stock?: number },
  ) => {
    await updateMerch(id, data);
    await fetchPage();
  };

  const handleDelete = async (id: string) => {
    await deleteMerch(id);
    await fetchPage();
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
    handleAdd,
    handleUpdate,
    handleDelete,
    setPage,
    PAGE_SIZE,
  };
}
