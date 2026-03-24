import { LabelApi } from "@/infrastructure/apis/client";
import type { LabelAddRecord, LabelUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig } from "@/lib/api";

function getApi() {
  return new LabelApi(getApiConfig());
}

export async function getLabelsPage(page = 1, pageSize = 10, search?: string) {
  const response = await getApi().apiLabelGetPageGet({ page, pageSize, search });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch labels");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getLabelById(id: string) {
  const response = await getApi().apiLabelGetByIdIdGet({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch label");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addLabel(data: LabelAddRecord) {
  const response = await getApi().apiLabelAddPost({ labelAddRecord: data });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add label");
}

export async function updateLabel(id: string, data: LabelUpdateRecord) {
  const response = await getApi().apiLabelUpdateIdPut({ id, labelUpdateRecord: data });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update label");
}

export async function deleteLabel(id: string) {
  const response = await getApi().apiLabelDeleteIdDelete({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete label");
}
