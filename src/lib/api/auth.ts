import type {
  LoginDto,
  SendCodeDto,
  SignupDto,
  VerifyCodeDto,
} from "./generated";
import { ApiClient } from "./generated";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Unauthenticated client for auth endpoints
const publicClient = new ApiClient({
  BASE: API_BASE_URL,
  WITH_CREDENTIALS: true,
  CREDENTIALS: "include",
});

export const authApi = {
  sendCode: (data: SendCodeDto) => publicClient.auth.sendCode(data),
  verifyCode: (data: VerifyCodeDto) => publicClient.auth.verifyCode(data),
  signup: (data: SignupDto) => publicClient.auth.signup(data),
  login: (data: LoginDto) => publicClient.auth.login(data),
  refresh: (refreshToken: string) =>
    publicClient.auth.refresh({ refreshToken }),
  logout: (refreshToken: string) => publicClient.auth.logout({ refreshToken }),
};
