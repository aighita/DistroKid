import { FeedbackApi, type ApiFeedbackGetPageGetRequest } from "@/infrastructure/apis/client/apis";
import { getApiConfig } from "@/lib/api";





export async function getFeedbackPage(page: number, pageSize: number, search?: string) {
    const api = new FeedbackApi(getApiConfig());
    const response = await api.apiFeedbackGetPageGet({
        page,
        pageSize,
        search
    });

    if (response.errorMessage || !response.response) {
        throw new Error(response.errorMessage?.message || "Failed to fetch feedback");
    }

    return response.response;
}
