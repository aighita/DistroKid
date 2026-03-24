"use client";

import { useState, useCallback } from "react";
import type { EventRecord } from "@/infrastructure/apis/client/models";
import { getEventsPage, addEvent, updateEvent, deleteEvent } from "@/services/event";

export function useEvent() {
  const [items, setItems] = useState<EventRecord[]>([]);
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
        const result = await getEventsPage(p, PAGE_SIZE, s || undefined);
        setItems(result.data ?? []);
        setTotalCount(result.totalCount ?? 0);
        setPage(p);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setIsLoading(false);
      }
    },
    [page, search],
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchPage(1, value);
  };

  const handleAdd = async (data: {
    name: string;
    description: string;
    location: string;
    date: Date;
  }) => {
    await addEvent(data);
    await fetchPage(page, search);
  };

  const handleUpdate = async (
    id: string,
    data: { name?: string; description?: string; location?: string; date?: Date },
  ) => {
    await updateEvent(id, data);
    await fetchPage(page, search);
  };

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    await fetchPage(page, search);
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
