import { FeedbackApi, type ApiFeedbackGetPageGetRequest } from "@/infrastructure/apis/client/apis";
import { getApiConfig, runApiRequest } from "@/lib/api";





export async function getFeedbackPage(page: number, pageSize: number, search?: string) {
    const api = new FeedbackApi(getApiConfig());
    const response = await runApiRequest(
        () => api.apiFeedbackGetPageGet({
            page,
            pageSize,
            search
        }),
        "Failed to fetch feedback",
    );

    if (response.errorMessage || !response.response) {
        throw new Error(response.errorMessage?.message || "Failed to fetch feedback");
    }

    return response.response;
}
