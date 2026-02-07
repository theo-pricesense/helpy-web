import type {
  LoginDto,
  SendCodeDto,
  SignupDto,
  VerifyCodeDto,
} from "./generated";
import { ApiClient } from "./generated";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const apiClient = new ApiClient({
  BASE: API_BASE_URL,
  WITH_CREDENTIALS: true,
  CREDENTIALS: "include",
});

export const authApi = {
  sendCode: (data: SendCodeDto) => apiClient.auth.sendCode(data),
  verifyCode: (data: VerifyCodeDto) => apiClient.auth.verifyCode(data),
  signup: (data: SignupDto) => apiClient.auth.signup(data),
  login: (data: LoginDto) => apiClient.auth.login(data),
  refresh: (refreshToken: string) => apiClient.auth.refresh({ refreshToken }),
  logout: (refreshToken: string) => apiClient.auth.logout({ refreshToken }),
};
