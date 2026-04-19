"use client";

import { useCallback, useRef, useState } from "react";
import type { ReleaseRecord } from "@/infrastructure/apis/client/models";
import { ReleaseTypeEnum } from "@/infrastructure/apis/client/models";
import { getReleasesPage, addRelease, updateRelease, deleteRelease } from "@/services/release";
import { useAuthStore } from "@/stores/authStore";

export function useRelease() {
  const user = useAuthStore((s) => s.user);

  const [items, setItems] = useState<ReleaseRecord[]>([]);
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
        const result = await getReleasesPage(nextPage, PAGE_SIZE, nextSearch || undefined);
        setItems(result.data ?? []);
        setTotalCount(result.totalCount ?? 0);
        setPage(nextPage);
        setSearch(nextSearch);
        pageRef.current = nextPage;
        searchRef.current = nextSearch;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load releases");
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
    title: string;
    label: string;
    releaseType: ReleaseTypeEnum;
    releaseDate: Date;
    trackIds: string[];
    platformIds: string[];
    artistId?: string;
  }) => {
    await addRelease({
      title: data.title,
      label: data.label,
      releaseType: data.releaseType,
      releaseDate: data.releaseDate,
      trackIds: data.trackIds,
      platformIds: data.platformIds,
      artistId: data.artistId,
    });
    await fetchPage();
  };

  const handleUpdate = async (
    id: string,
    data: {
      title?: string;
      label?: string;
      releaseType?: ReleaseTypeEnum;
      releaseDate?: Date;
      trackIds?: string[];
      platformIds?: string[];
    },
  ) => {
    await updateRelease(id, data);
    await fetchPage();
  };

  const handleDelete = async (id: string) => {
    await deleteRelease(id);
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
    user,
  };
}
