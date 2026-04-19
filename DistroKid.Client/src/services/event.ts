import { EventApi } from "@/infrastructure/apis/client";
import type { EventAddRecord, EventUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig, runApiRequest } from "@/lib/api";

function getApi() {
  return new EventApi(getApiConfig());
}

export async function getEventsPage(page = 1, pageSize = 10, search?: string) {
  const response = await runApiRequest(
    () => getApi().apiEventGetPageGet({ page, pageSize, search }),
    "Failed to fetch events",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch events");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function getEventById(id: string) {
  const response = await runApiRequest(() => getApi().apiEventGetByIdIdGet({ id }), "Failed to fetch event");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to fetch event");
  if (!response.response) throw new Error("No response from server");
  return response.response;
}

export async function addEvent(data: EventAddRecord) {
  const response = await runApiRequest(() => getApi().apiEventAddPost({ eventAddRecord: data }), "Failed to add event");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to add event");
}

export async function updateEvent(id: string, data: EventUpdateRecord) {
  const response = await runApiRequest(
    () => getApi().apiEventUpdateIdPut({ id, eventUpdateRecord: data }),
    "Failed to update event",
  );
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update event");
}

export async function deleteEvent(id: string) {
  const response = await runApiRequest(() => getApi().apiEventDeleteIdDelete({ id }), "Failed to delete event");
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to delete event");
}
