"use client";

import { useState, useCallback } from "react";
import type { TrackRecord } from "@/infrastructure/apis/client/models";
import { getTracksPage, addTrack, updateTrack, deleteTrack } from "@/services/track";
import { useAuthStore } from "@/stores/authStore";

export function useTrack() {
  const user = useAuthStore((s) => s.user);

  const [items, setItems] = useState<TrackRecord[]>([]);
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
        const result = await getTracksPage(p, PAGE_SIZE, s || undefined);
        setItems(result.data ?? []);
        setTotalCount(result.totalCount ?? 0);
        setPage(p);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tracks");
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

  const handleAdd = async (data: { title: string; durationInSeconds: number; isrc: string }) => {
    await addTrack({
      title: data.title,
      durationInSeconds: data.durationInSeconds,
      isrc: data.isrc,
      artistId: user?.id ?? "",
    });
    await fetchPage(page, search);
  };

  const handleUpdate = async (
    id: string,
    data: { title: string; durationInSeconds: number; isrc: string },
  ) => {
    await updateTrack(id, {
      id,
      title: data.title,
      durationInSeconds: data.durationInSeconds,
      isrc: data.isrc,
      artistId: user?.id ?? "",
    });
    await fetchPage(page, search);
  };

  const handleDelete = async (id: string) => {
    await deleteTrack(id);
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
