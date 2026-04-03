/**
 * Shared API configuration factory.
 *
 * Always call this function when creating an API instance — never create a
 * module-level Configuration/Api instance. Calling it at call-site ensures
 * the access token is always read fresh from the Zustand store, so it never
 * goes stale after login.
 *
 * basePath must NOT include the /api prefix because the generated paths
 * already include it (e.g. /api/Track/GetPage).
 */
import { Configuration } from "@/infrastructure/apis/client";
import { useAuthStore } from "@/stores/authStore";

export function getApiConfig(): Configuration {
  return new Configuration({
    basePath: process.env.NEXT_PUBLIC_API_URL || "",
    accessToken: () => Promise.resolve(useAuthStore.getState().token ?? ""),
  });
}
