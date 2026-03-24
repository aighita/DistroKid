import { AuthorizationApi } from "@/infrastructure/apis/client";
import type { LoginRecord, RegisterRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig } from "@/lib/api";

function getApi() {
  return new AuthorizationApi(getApiConfig());
}

/** Login with email and password. Returns { token, user }. */
export async function login(email: string, password: string) {
  const loginData: LoginRecord = { email, password };
  const response = await getApi().apiAuthorizationLoginPost({ loginRecord: loginData });

  if (response.errorMessage) {
    throw new Error(response.errorMessage.message ?? "Login failed");
  }
  if (!response.response) throw new Error("No response from server");
  return response.response; // { token, user }
}

/** Register a new user. Returns { token, user }. */
export async function register(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
) {
  const registerData: RegisterRecord = {
    name,
    email,
    password,
    confirmPassword,
    role: role as any,
  };

  const response = await getApi().apiAuthorizationRegisterPost({ registerRecord: registerData });

  if (response.errorMessage) {
    throw new Error(response.errorMessage.message ?? "Registration failed");
  }
  if (!response.response) throw new Error("No response from server");
  return response.response; // { token, user }
}

