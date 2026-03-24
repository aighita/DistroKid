import { UserApi } from "@/infrastructure/apis/client";
import type { UserUpdateRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig } from "@/lib/api";

function getApi() {
  return new UserApi(getApiConfig());
}

export async function updateUser(user: UserUpdateRecord) {
  const response = await getApi().apiUserUpdatePut({ userUpdateRecord: user });
  if (response.errorMessage) throw new Error(response.errorMessage.message ?? "Failed to update profile");
}
