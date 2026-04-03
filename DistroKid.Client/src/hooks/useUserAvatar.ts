"use client";

import { useEffect, useState } from "react";
import { UserFileApi } from "@/infrastructure/apis/client";
import { getApiConfig } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";

const AVATAR_FILE_ID_KEY = "userAvatarFileId";
const LEGACY_AVATAR_URL_KEY = "userAvatarUrl";
const AVATAR_EVENT_NAME = "user-avatar-updated";

function readStoredAvatarFileId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedFileId = window.localStorage.getItem(AVATAR_FILE_ID_KEY);
  if (storedFileId) {
    return storedFileId;
  }

  const legacyUrl = window.localStorage.getItem(LEGACY_AVATAR_URL_KEY);
  if (!legacyUrl) {
    return null;
  }

  const match = legacyUrl.match(/\/api\/UserFile\/Download\/([^?]+)/);
  if (!match) {
    return null;
  }

  window.localStorage.setItem(AVATAR_FILE_ID_KEY, match[1]);
  return match[1];
}

export function setStoredUserAvatarFileId(fileId: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (fileId) {
    window.localStorage.setItem(AVATAR_FILE_ID_KEY, fileId);
  } else {
    window.localStorage.removeItem(AVATAR_FILE_ID_KEY);
  }

  window.dispatchEvent(new CustomEvent(AVATAR_EVENT_NAME, { detail: { fileId } }));
}

export function useUserAvatar() {
  const token = useAuthStore((state) => state.token);
  const [avatarFileId, setAvatarFileId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setAvatarFileId(readStoredAvatarFileId());

    const handleStorage = (event: StorageEvent) => {
      if (event.key === AVATAR_FILE_ID_KEY || event.key === LEGACY_AVATAR_URL_KEY) {
        setAvatarFileId(readStoredAvatarFileId());
      }
    };

    const handleAvatarUpdated = (event: Event) => {
      const fileId = (event as CustomEvent<{ fileId?: string | null }>).detail?.fileId;
      setAvatarFileId(fileId ?? readStoredAvatarFileId());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(AVATAR_EVENT_NAME, handleAvatarUpdated as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(AVATAR_EVENT_NAME, handleAvatarUpdated as EventListener);
    };
  }, []);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    async function resolveAvatar() {
      if (!token) {
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
            setStoredUserAvatarFileId(resolvedFileId);
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
  }, [avatarFileId, token]);

  return avatarUrl;
}