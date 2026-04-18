










import { Configuration } from "@/infrastructure/apis/client";
import { useAuthStore } from "@/stores/authStore";

export function getApiConfig(): Configuration {
  return new Configuration({
    basePath: process.env.NEXT_PUBLIC_API_URL || "",
    accessToken: () => Promise.resolve(useAuthStore.getState().token ?? ""),
  });
}
