import { TrackApi } from "@/infrastructure/apis/client";
import type { TrackAddRecord, TrackUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig, runApiRequest } from "@/lib/api";

function getApi() {
  return new TrackApi(getApiConfig());
}

export async function getTracksPage(page = 1, pageSize = 10, search?: string) {
  const response = await runApiRequest(
    () => getApi().apiTrackGetPageGet({ page, pageSize, search }),
    "Failed to fetch tracks",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch tracks");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getTrackById(id: string) {
  const response = await runApiRequest(() => getApi().apiTrackGetByIdIdGet({ id }), "Failed to fetch track");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch track");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addTrack(trackData: TrackAddRecord) {
  const response = await runApiRequest(() => getApi().apiTrackAddPost({ trackAddRecord: trackData }), "Failed to add track");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add track");
}

export async function updateTrack(id: string, trackData: TrackUpdateRecord) {
  const response = await runApiRequest(
    () => getApi().apiTrackUpdateIdPut({ id, trackUpdateRecord: trackData }),
    "Failed to update track",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update track");
}

export async function deleteTrack(id: string) {
  const response = await runApiRequest(() => getApi().apiTrackDeleteIdDelete({ id }), "Failed to delete track");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete track");
}

