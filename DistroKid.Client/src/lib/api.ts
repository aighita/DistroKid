

import { Configuration } from "@/infrastructure/apis/client";
import { ResponseError, type Middleware } from "@/infrastructure/apis/client/runtime";
import { useAuthStore } from "@/stores/authStore";

const LEGACY_AVATAR_URL_KEY = "userAvatarUrl";
const AVATAR_FILE_ID_KEY_PREFIX = "userAvatarFileId:";

let isRedirectingToLogin = false;

function clearAvatarCache() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(LEGACY_AVATAR_URL_KEY);

  for (const key of Object.keys(window.localStorage)) {
    if (key.startsWith(AVATAR_FILE_ID_KEY_PREFIX)) {
      window.localStorage.removeItem(key);
    }
  }
}

export function clearClientSession() {
  useAuthStore.getState().logout();
  clearAvatarCache();
}

function handleUnauthorizedResponse(status: number) {
  if (status !== 401) {
    return;
  }

  clearClientSession();

  if (
    typeof window === "undefined" ||
    window.location.pathname === "/login" ||
    isRedirectingToLogin
  ) {
    return;
  }

  isRedirectingToLogin = true;
  window.location.replace("/login");
}

function getStatusFallback(status: number, fallback: string) {
  switch (status) {
    case 400:
      return "Invalid request.";
    case 401:
      return "Your session expired. Please log in again.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "The request conflicts with the current server state.";
    case 422:
      return "The submitted data is invalid.";
    case 500:
      return "The server failed to process the request.";
    default:
      return fallback;
  }
}

async function readResponseMessage(response: Response, fallback: string) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = await response.clone().json().catch(() => null) as {
      errorMessage?: { message?: string | null } | null;
      message?: string | null;
      title?: string | null;
    } | null;

    const message = payload?.errorMessage?.message ?? payload?.message ?? payload?.title;
    if (message) {
      return message;
    }
  }

  const text = (await response.clone().text().catch(() => "")).trim();
  return text || fallback;
}

const authMiddleware: Middleware = {
  post: async ({ response }) => {
    handleUnauthorizedResponse(response.status);
    return response;
  },
};

export async function getResponseErrorMessage(response: Response, fallback: string) {
  handleUnauthorizedResponse(response.status);
  return readResponseMessage(response, getStatusFallback(response.status, fallback));
}

export async function toApiError(error: unknown, fallback: string) {
  if (error instanceof ResponseError) {
    const message = await getResponseErrorMessage(error.response, fallback);
    return new Error(message);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error(fallback);
}

export async function runApiRequest<T>(request: () => Promise<T>, fallback: string) {
  try {
    return await request();
  } catch (error) {
    throw await toApiError(error, fallback);
  }
}

export function getApiConfig(): Configuration {
  return new Configuration({
    basePath: process.env.NEXT_PUBLIC_API_URL || "",
    accessToken: () => Promise.resolve(useAuthStore.getState().token ?? ""),
    middleware: [authMiddleware],
  });
}
