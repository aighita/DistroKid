import { TrackApi } from "@/infrastructure/apis/client";
import type { TrackAddRecord, TrackUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig } from "@/lib/api";

function getApi() {
  return new TrackApi(getApiConfig());
}

export async function getTracksPage(page = 1, pageSize = 10, search?: string) {
  const response = await getApi().apiTrackGetPageGet({ page, pageSize, search });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch tracks");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getTrackById(id: string) {
  const response = await getApi().apiTrackGetByIdIdGet({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch track");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addTrack(trackData: TrackAddRecord) {
  const response = await getApi().apiTrackAddPost({ trackAddRecord: trackData });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add track");
}

export async function updateTrack(id: string, trackData: TrackUpdateRecord) {
  const response = await getApi().apiTrackUpdateIdPut({ id, trackUpdateRecord: trackData });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update track");
}

export async function deleteTrack(id: string) {
  const response = await getApi().apiTrackDeleteIdDelete({ id });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete track");
}

