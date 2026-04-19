"use client";

import { useCallback, useRef, useState } from "react";
import type { EventRecord } from "@/infrastructure/apis/client/models";
import { getEventsPage, addEvent, updateEvent, deleteEvent } from "@/services/event";

export function useEvent() {
  const [items, setItems] = useState<EventRecord[]>([]);
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
        const result = await getEventsPage(nextPage, PAGE_SIZE, nextSearch || undefined);
        setItems(result.data ?? []);
        setTotalCount(result.totalCount ?? 0);
        setPage(nextPage);
        setSearch(nextSearch);
        pageRef.current = nextPage;
        searchRef.current = nextSearch;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events");
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
    location: string;
    date: Date;
  }) => {
    await addEvent(data);
    await fetchPage();
  };

  const handleUpdate = async (
    id: string,
    data: { name?: string; description?: string; location?: string; date?: Date },
  ) => {
    await updateEvent(id, data);
    await fetchPage();
  };

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
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
