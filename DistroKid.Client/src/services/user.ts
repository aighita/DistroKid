import { UserApi, type ApiUserGetPageGetRequest } from "@/infrastructure/apis/client/apis";
import type { PlatformRecord, UserUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig, getResponseErrorMessage, runApiRequest } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";

function getBaseUrl() {
    return process.env.NEXT_PUBLIC_API_URL || "";
}

async function authorizedFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${getBaseUrl()}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers ?? {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        throw new Error(await getResponseErrorMessage(response, "Request failed"));
    }

    const payload = await response.json();

    if (payload.errorMessage) {
        throw new Error(payload.errorMessage?.message || "Request failed");
    }

    return payload.response as T;
}

export async function getUsersPage(page: number, pageSize: number, search?: string) {
    const api = new UserApi(getApiConfig());
    const response = await runApiRequest(
        () => api.apiUserGetPageGet({
            page,
            pageSize,
            search
        }),
        "Failed to fetch users",
    );

    if (response.errorMessage || !response.response) {
        throw new Error(response.errorMessage?.message || "Failed to fetch users");
    }

    return response.response;
}

export async function updateUser(user: UserUpdateRecord) {
    const api = new UserApi(getApiConfig());
    const response = await runApiRequest(() => api.apiUserUpdatePut({ userUpdateRecord: user }), "Failed to update user");

    if (response.errorMessage) {
        throw new Error(response.errorMessage.message || "Failed to update user");
    }

    return response;
}

export async function deleteUser(id: string) {
    const api = new UserApi(getApiConfig());
    const response = await runApiRequest(() => api.apiUserDeleteIdDelete({ id }), "Failed to delete user");

    if (response.errorMessage) {
        throw new Error(response.errorMessage.message || "Failed to delete user");
    }

    return response;
}

export async function getCurrentUserPlatforms() {
    const api = new UserApi(getApiConfig());
    const response = await runApiRequest(() => api.apiUserGetUserPlatformsGet(), "Failed to fetch connected platforms");

    if (response.errorMessage) {
        throw new Error(response.errorMessage.message || "Failed to fetch connected platforms");
    }

    return response.response ?? [];
}

export async function getUserPlatformsById(id: string) {
    return authorizedFetch<PlatformRecord[]>(`/api/User/GetUserPlatformsById/${id}`, {
        method: "GET",
    });
}

export async function connectCurrentUserPlatform(platformId: string) {
    return authorizedFetch<PlatformRecord[]>(`/api/User/ConnectPlatform/${platformId}`, {
        method: "PUT",
    });
}

export async function disconnectCurrentUserPlatform(platformId: string) {
    return authorizedFetch<PlatformRecord[]>(`/api/User/DisconnectPlatform/${platformId}`, {
        method: "PUT",
    });
}
