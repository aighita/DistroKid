import { AuthorizationApi } from "@/infrastructure/apis/client";
import type { LoginRecord, RegisterRecord } from "@/infrastructure/apis/client/models";
import { getApiConfig, runApiRequest } from "@/lib/api";

function getApi() {
  return new AuthorizationApi(getApiConfig());
}


export async function login(email: string, password: string) {
  const loginData: LoginRecord = { email, password };
  const response = await runApiRequest(
    () => getApi().apiAuthorizationLoginPost({ loginRecord: loginData }),
    "Login failed",
  );

  if (response.errorMessage) {
    throw new Error(response.errorMessage.message ?? "Login failed");
  }
  if (!response.response) throw new Error("No response from server");
  return response.response; 
}


export async function register(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
  bio?: string,
  socialMediaLink?: string,
) {
  const registerData: RegisterRecord = {
    name,
    email,
    password,
    confirmPassword,
    role: role as any,
    bio,
    socialMediaLink,
  };

  const response = await runApiRequest(
    () => getApi().apiAuthorizationRegisterPost({ registerRecord: registerData }),
    "Registration failed",
  );

  if (response.errorMessage) {
    throw new Error(response.errorMessage.message ?? "Registration failed");
  }
  if (!response.response) throw new Error("No response from server");
  return response.response; 
}

