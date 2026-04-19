import { PlatformApi } from "@/infrastructure/apis/client";
import type { PlatformAddRecord, PlatformUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig, runApiRequest } from "@/lib/api";

function getApi() {
  return new PlatformApi(getApiConfig());
}

export async function getAllPlatforms() {
  const response = await runApiRequest(() => getApi().apiPlatformGetAllGet(), "Failed to fetch platforms");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch platforms");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getPlatformById(id: string) {
  const response = await runApiRequest(() => getApi().apiPlatformGetByIdIdGet({ id }), "Failed to fetch platform");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch platform");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addPlatform(platform: PlatformAddRecord) {
  const response = await runApiRequest(
    () => getApi().apiPlatformAddPost({ platformAddRecord: platform }),
    "Failed to add platform",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add platform");
}

export async function updatePlatform(id: string, platform: PlatformUpdateRecord) {
  const response = await runApiRequest(
    () => getApi().apiPlatformUpdateIdPut({ id, platformUpdateRecord: platform }),
    "Failed to update platform",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update platform");
}

export async function deletePlatform(id: string) {
  const response = await runApiRequest(() => getApi().apiPlatformDeleteIdDelete({ id }), "Failed to delete platform");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete platform");
}

