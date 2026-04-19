import { MerchApi } from "@/infrastructure/apis/client";
import type { MerchAddRecord, MerchUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig, runApiRequest } from "@/lib/api";

function getApi() {
  return new MerchApi(getApiConfig());
}

export async function getMerchPage(page = 1, pageSize = 10, search?: string) {
  const response = await runApiRequest(
    () => getApi().apiMerchGetPageGet({ page, pageSize, search }),
    "Failed to fetch merch",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch merch");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getMerchById(id: string) {
  const response = await runApiRequest(() => getApi().apiMerchGetByIdIdGet({ id }), "Failed to fetch merch item");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch merch item");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addMerch(data: MerchAddRecord) {
  const response = await runApiRequest(() => getApi().apiMerchAddPost({ merchAddRecord: data }), "Failed to add merch");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add merch");
}

export async function updateMerch(id: string, data: MerchUpdateRecord) {
  const response = await runApiRequest(
    () => getApi().apiMerchUpdateIdPut({ id, merchUpdateRecord: data }),
    "Failed to update merch",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update merch");
}

export async function deleteMerch(id: string) {
  const response = await runApiRequest(() => getApi().apiMerchDeleteIdDelete({ id }), "Failed to delete merch");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete merch");
}
