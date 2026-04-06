"use client";

import { useEffect, useState } from "react";
import { UserFileApi } from "@/infrastructure/apis/client";
import { getApiConfig } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";

const AVATAR_FILE_ID_KEY_PREFIX = "userAvatarFileId:";
const LEGACY_AVATAR_URL_KEY = "userAvatarUrl";
const AVATAR_EVENT_NAME = "user-avatar-updated";

function getAvatarStorageKey(userId: string) {
  return `${AVATAR_FILE_ID_KEY_PREFIX}${userId}`;
}

function readStoredAvatarFileId(userId: string | null | undefined): string | null {
  if (typeof window === "undefined" || !userId) {
    return null;
  }

  const storedFileId = window.localStorage.getItem(getAvatarStorageKey(userId));
  if (storedFileId) {
    return storedFileId;
  }

  // Global legacy values can point to a different account's avatar.
  // Remove them and let the hook refetch the current user's own file.
  if (window.localStorage.getItem(LEGACY_AVATAR_URL_KEY)) {
    window.localStorage.removeItem(LEGACY_AVATAR_URL_KEY);
  }

  return null;
}

export function setStoredUserAvatarFileId(fileId: string | null, userId?: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  const resolvedUserId = userId ?? useAuthStore.getState().user?.id ?? null;
  if (!resolvedUserId) {
    return;
  }

  const storageKey = getAvatarStorageKey(resolvedUserId);

  if (fileId) {
    window.localStorage.setItem(storageKey, fileId);
  } else {
    window.localStorage.removeItem(storageKey);
  }

  window.dispatchEvent(new CustomEvent(AVATAR_EVENT_NAME, { detail: { fileId, userId: resolvedUserId } }));
}

export function useUserAvatar() {
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.user?.id ?? null);
  const [avatarFileId, setAvatarFileId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setAvatarFileId(readStoredAvatarFileId(userId));

    const handleStorage = (event: StorageEvent) => {
      if (event.key === LEGACY_AVATAR_URL_KEY || event.key === (userId ? getAvatarStorageKey(userId) : null)) {
        setAvatarFileId(readStoredAvatarFileId(userId));
      }
    };

    const handleAvatarUpdated = (event: Event) => {
      const detail = (event as CustomEvent<{ fileId?: string | null; userId?: string | null }>).detail;
      if (detail?.userId && detail.userId !== userId) {
        return;
      }

      setAvatarFileId(detail?.fileId ?? readStoredAvatarFileId(userId));
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(AVATAR_EVENT_NAME, handleAvatarUpdated as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(AVATAR_EVENT_NAME, handleAvatarUpdated as EventListener);
    };
  }, [userId]);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    async function resolveAvatar() {
      if (!token || !userId) {
        if (!cancelled) {
          setAvatarUrl("");
        }
        return;
      }

      let resolvedFileId = avatarFileId;

      if (!resolvedFileId) {
        try {
          const api = new UserFileApi(getApiConfig());
          const filesResponse = await api.apiUserFileGetPageGet({ page: 1, pageSize: 100 });
          const profilePhotoFile = (filesResponse.response?.data ?? [])
            .filter((file) => file.description === "Profile Photo")
            .sort((left, right) => right.updatedAt.getTime() - left.updatedAt.getTime())[0];

          resolvedFileId = profilePhotoFile?.id ?? null;
          if (resolvedFileId) {
            setStoredUserAvatarFileId(resolvedFileId, userId);
          }
        } catch {
          resolvedFileId = null;
        }
      }

      if (!resolvedFileId) {
        if (!cancelled) {
          setAvatarUrl("");
        }
        return;
      }

      const basePath = process.env.NEXT_PUBLIC_API_URL ?? "";
      const response = await fetch(`${basePath}/api/UserFile/Download/${resolvedFileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (!cancelled) {
          setAvatarUrl("");
        }
        return;
      }

      const avatarBlob = await response.blob();
      objectUrl = URL.createObjectURL(avatarBlob);

      if (!cancelled) {
        setAvatarUrl(objectUrl);
      }
    }

    resolveAvatar();

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [avatarFileId, token, userId]);

  return avatarUrl;
}
