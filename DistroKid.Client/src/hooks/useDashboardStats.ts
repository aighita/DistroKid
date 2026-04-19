"use client";

import { useEffect, useState } from "react";
import { UserRoleEnum } from "@/infrastructure/apis/client/models";
import { getEventsPage } from "@/services/event";
import { getAllPlatforms } from "@/services/platform";
import { getReleasesPage } from "@/services/release";
import { getTracksPage } from "@/services/track";
import { getCurrentUserPlatforms } from "@/services/user";
import { getMerchPage } from "@/services/merch";
import { useAuthStore } from "@/stores/authStore";

type DashboardStats = {
  tracks: number;
  releases: number;
  merch: number;
  events: number;
  platforms: number;
};

const EMPTY_STATS: DashboardStats = {
  tracks: 0,
  releases: 0,
  merch: 0,
  events: 0,
  platforms: 0,
};

export function useDashboardStats() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!isHydrated) {
      return () => {
        cancelled = true;
      };
    }

    if (!isAuthenticated || !token) {
      setStats(EMPTY_STATS);
      setIsLoading(false);

      return () => {
        cancelled = true;
      };
    }

    async function loadStats() {
      setIsLoading(true);

      try {
        const [tracks, releases, merch, events, platforms] = await Promise.all([
          getTracksPage(1, 1),
          getReleasesPage(1, 1),
          getMerchPage(1, 1),
          getEventsPage(1, 1),
          user?.role === UserRoleEnum.Artist
            ? getCurrentUserPlatforms().then((connectedPlatforms) => connectedPlatforms.length).catch(() => 0)
            : getAllPlatforms().then((availablePlatforms) => availablePlatforms.length).catch(() => 0),
        ]);

        if (!cancelled) {
          setStats({
            tracks: tracks.totalCount ?? 0,
            releases: releases.totalCount ?? 0,
            merch: merch.totalCount ?? 0,
            events: events.totalCount ?? 0,
            platforms,
          });
        }
      } catch {
        if (!cancelled) {
          setStats(EMPTY_STATS);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isHydrated, token, user?.id, user?.role]);

  return {
    ...stats,
    isLoading,
  };
}