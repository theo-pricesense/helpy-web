import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi, organizationsApi } from "@/lib/api";
import type {
  LoginDto,
  SendCodeDto,
  SignupDto,
  VerifyCodeDto,
} from "@/lib/api/generated";
import { useAuthStore } from "@/stores/auth-store";
import { useOrganizationStore } from "@/stores/organization-store";

export function useLogin() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const setCurrentOrgId = useOrganizationStore((s) => s.setCurrentOrgId);

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: async (response) => {
      login(response.accessToken, response.refreshToken, response.user);

      // 기본 조직 설정
      try {
        const orgs = await organizationsApi.getMyOrganizations();
        if (orgs.length > 0) {
          setCurrentOrgId(orgs[0].id);
        }
      } catch {
        // 조직 조회 실패해도 로그인은 진행
      }

      toast.success("로그인 성공!");
      router.push("/workspaces");
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
  const setCurrentOrgId = useOrganizationStore((s) => s.setCurrentOrgId);

  return useMutation({
    mutationFn: (data: SignupDto) => authApi.signup(data),
    onSuccess: async (response) => {
      login(response.accessToken, response.refreshToken, response.user);

      // 기본 조직 설정
      try {
        const orgs = await organizationsApi.getMyOrganizations();
        if (orgs.length > 0) {
          setCurrentOrgId(orgs[0].id);
        }
      } catch {
        // 조직 조회 실패해도 가입은 진행
      }

      toast.success("회원가입이 완료되었습니다!");
      router.push("/workspaces");
    },
    onError: (error: Error) => {
      toast.error(error.message || "회원가입에 실패했습니다.");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { refreshToken, logout } = useAuthStore();
  const clearOrg = useOrganizationStore((s) => s.clear);

  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    },
    onSettled: () => {
      logout();
      clearOrg();
      router.push("/login");
    },
  });
}
