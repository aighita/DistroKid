import { MerchApi } from "@/infrastructure/apis/client";
import type { MerchAddRecord, MerchUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig } from "@/lib/api";

function getApi() {
  return new MerchApi(getApiConfig());
}

export async function getMerchPage(page = 1, pageSize = 10, search?: string) {
  const response = await getApi().apiMerchGetPageGet({ page, pageSize, search });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch merch");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getMerchById(id: string) {
  const response = await getApi().apiMerchGetByIdIdGet({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch merch item");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addMerch(data: MerchAddRecord) {
  const response = await getApi().apiMerchAddPost({ merchAddRecord: data });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add merch");
}

export async function updateMerch(id: string, data: MerchUpdateRecord) {
  const response = await getApi().apiMerchUpdateIdPut({ id, merchUpdateRecord: data });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update merch");
}

export async function deleteMerch(id: string) {
  const response = await getApi().apiMerchDeleteIdDelete({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete merch");
}
