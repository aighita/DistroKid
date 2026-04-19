import { ReleaseApi } from "@/infrastructure/apis/client";
import type { ReleaseAddRecord, ReleaseUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig, runApiRequest } from "@/lib/api";

function getApi() {
  return new ReleaseApi(getApiConfig());
}

export async function getReleasesPage(page = 1, pageSize = 10, search?: string) {
  const response = await runApiRequest(
    () => getApi().apiReleaseGetPageGet({ page, pageSize, search }),
    "Failed to fetch releases",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch releases");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getReleaseById(id: string) {
  const response = await runApiRequest(() => getApi().apiReleaseGetByIdIdGet({ id }), "Failed to fetch release");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch release");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addRelease(data: ReleaseAddRecord) {
  const response = await runApiRequest(() => getApi().apiReleaseAddPost({ releaseAddRecord: data }), "Failed to add release");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add release");
}

export async function updateRelease(id: string, data: ReleaseUpdateRecord) {
  const response = await runApiRequest(
    () => getApi().apiReleaseUpdateIdPut({ id, releaseUpdateRecord: data }),
    "Failed to update release",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update release");
}

export async function deleteRelease(id: string) {
  const response = await runApiRequest(() => getApi().apiReleaseDeleteIdDelete({ id }), "Failed to delete release");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete release");
}
