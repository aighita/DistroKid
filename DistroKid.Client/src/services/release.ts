import { ReleaseApi } from "@/infrastructure/apis/client";
import type { ReleaseAddRecord, ReleaseUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig } from "@/lib/api";

function getApi() {
  return new ReleaseApi(getApiConfig());
}

export async function getReleasesPage(page = 1, pageSize = 10, search?: string) {
  const response = await getApi().apiReleaseGetPageGet({ page, pageSize, search });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch releases");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getReleaseById(id: string) {
  const response = await getApi().apiReleaseGetByIdIdGet({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch release");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addRelease(data: ReleaseAddRecord) {
  const response = await getApi().apiReleaseAddPost({ releaseAddRecord: data });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add release");
}

export async function updateRelease(id: string, data: ReleaseUpdateRecord) {
  const response = await getApi().apiReleaseUpdateIdPut({ id, releaseUpdateRecord: data });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update release");
}

export async function deleteRelease(id: string) {
  const response = await getApi().apiReleaseDeleteIdDelete({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete release");
}
