import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import type {
  LoginDto,
  SendCodeDto,
  SignupDto,
  VerifyCodeDto,
} from "@/lib/api/generated";
import { useAuthStore } from "@/stores/auth-store";

export function useLogin() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (response) => {
      login(response.accessToken, response.refreshToken, response.user);
      toast.success("로그인 성공!");
      router.push("/organizations");
    },
    onError: (error: Error) => {
      toast.error(error.message || "로그인에 실패했습니다.");
    },
  });
}

export function useSendCode() {
  return useMutation({
    mutationFn: (data: SendCodeDto) => authApi.sendCode(data),
  });
}

export function useVerifyCode() {
  return useMutation({
    mutationFn: (data: VerifyCodeDto) => authApi.verifyCode(data),
  });
}

export function useSignup() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (data: SignupDto) => authApi.signup(data),
    onSuccess: (response) => {
      login(response.accessToken, response.refreshToken, response.user);
      toast.success("회원가입이 완료되었습니다!");
      router.push("/organizations");
    },
    onError: (error: Error) => {
      toast.error(error.message || "회원가입에 실패했습니다.");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { refreshToken, logout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    },
    onSettled: () => {
      logout();
      router.push("/login");
    },
  });
}
