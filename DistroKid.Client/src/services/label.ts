import { LabelApi } from "@/infrastructure/apis/client";
import type { LabelAddRecord, LabelUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig, runApiRequest } from "@/lib/api";

function getApi() {
  return new LabelApi(getApiConfig());
}

export async function getLabelsPage(page = 1, pageSize = 10, search?: string) {
  const response = await runApiRequest(
    () => getApi().apiLabelGetPageGet({ page, pageSize, search }),
    "Failed to fetch labels",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch labels");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getLabelById(id: string) {
  const response = await runApiRequest(() => getApi().apiLabelGetByIdIdGet({ id }), "Failed to fetch label");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch label");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addLabel(data: LabelAddRecord) {
  const response = await runApiRequest(() => getApi().apiLabelAddPost({ labelAddRecord: data }), "Failed to add label");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add label");
}

export async function updateLabel(id: string, data: LabelUpdateRecord) {
  const response = await runApiRequest(
    () => getApi().apiLabelUpdateIdPut({ id, labelUpdateRecord: data }),
    "Failed to update label",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update label");
}

export async function deleteLabel(id: string) {
  const response = await runApiRequest(() => getApi().apiLabelDeleteIdDelete({ id }), "Failed to delete label");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete label");
}
