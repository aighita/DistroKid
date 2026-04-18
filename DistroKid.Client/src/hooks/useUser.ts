"use client";

import { useState, useCallback, useEffect } from "react";
import type { UserRecord } from "@/infrastructure/apis/client/models";
import { getUsersPage, deleteUser, updateUser } from "@/services/user";




export function useUser() {
  const [items, setItems] = useState<UserRecord[]>([]);
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
        const result = await getUsersPage(p, PAGE_SIZE, s || undefined);
        setItems(result.data ?? []);
        setTotalCount(result.totalCount ?? 0);
        setPage(p);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users");
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

  const handleUpdate = async (id: string, data: { name?: string; password?: string }) => {
      try {
        await updateUser({ id, ...data });
        await fetchPage(page, search);
      } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to update user");
      }
  };

  const handleDelete = async (id: string) => {
      try {
        await deleteUser(id);
        await fetchPage(page, search);
      } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to delete user");
      }
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
    handleUpdate,
    handleDelete,
    setPage,
    PAGE_SIZE,
  };
}
