import { PlatformApi } from "@/infrastructure/apis/client";
import type { PlatformAddRecord, PlatformUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig } from "@/lib/api";

function getApi() {
  return new PlatformApi(getApiConfig());
}

export async function getAllPlatforms() {
  const response = await getApi().apiPlatformGetAllGet();
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch platforms");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getPlatformById(id: string) {
  const response = await getApi().apiPlatformGetByIdIdGet({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch platform");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addPlatform(platform: PlatformAddRecord) {
  const response = await getApi().apiPlatformAddPost({ platformAddRecord: platform });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add platform");
}

export async function updatePlatform(id: string, platform: PlatformUpdateRecord) {
  const response = await getApi().apiPlatformUpdateIdPut({ id, platformUpdateRecord: platform });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update platform");
}

export async function deletePlatform(id: string) {
  const response = await getApi().apiPlatformDeleteIdDelete({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete platform");
}

