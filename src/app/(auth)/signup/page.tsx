"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Mail, Shield, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { HelpyLogo } from "@/components/helpy-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useSendCode, useSignup, useVerifyCode } from "@/hooks/use-auth";

// Step schemas
const emailSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
});

const infoSchema = z
  .object({
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
    name: z.string().min(1, "이름을 입력해주세요."),
    organizationName: z.string().min(1, "조직명을 입력해주세요."),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type EmailForm = z.infer<typeof emailSchema>;
type InfoForm = z.infer<typeof infoSchema>;

const steps = [
  { label: "이메일 인증", icon: Mail },
  { label: "코드 확인", icon: Shield },
  { label: "정보 입력", icon: UserPlus },
];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [verifyToken, setVerifyToken] = useState("");

  const sendCodeMutation = useSendCode();
  const verifyCodeMutation = useVerifyCode();
  const signupMutation = useSignup();

  // Step 1: Email form
  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  // Step 3: Info form
  const infoForm = useForm<InfoForm>({
    resolver: zodResolver(infoSchema),
  });

  const handleSendCode = (data: EmailForm) => {
    sendCodeMutation.mutate(
      { email: data.email },
      {
        onSuccess: () => {
          setEmail(data.email);
          setStep(1);
          toast.success("인증 코드가 발송되었습니다.");
        },
        onError: (error) => {
          toast.error(error.message || "코드 발송에 실패했습니다.");
        },
      },
    );
  };

  const handleVerifyCode = () => {
    if (otpValue.length !== 6) return;
    verifyCodeMutation.mutate(
      { email, code: otpValue },
      {
        onSuccess: (response) => {
          setVerifyToken(response.token);
          setStep(2);
          toast.success("이메일이 인증되었습니다.");
        },
        onError: (error) => {
          toast.error(error.message || "인증에 실패했습니다.");
        },
      },
    );
  };

  const handleSignup = (data: InfoForm) => {
    signupMutation.mutate({
      token: verifyToken,
      password: data.password,
      name: data.name,
      organizationName: data.organizationName,
    });
  };

  const isSubmitting =
    sendCodeMutation.isPending ||
    verifyCodeMutation.isPending ||
    signupMutation.isPending;

  return (
    <div className="space-y-8">
      {/* Mobile logo */}
      <HelpyLogo size="lg" className="lg:hidden" />

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Create account
        </h2>
        <p className="text-sm text-muted-foreground">
          새 계정을 만들어 시작하세요.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-px w-8 transition-colors ${
                    i < step ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Email */}
      {step === 0 && (
        <form
          onSubmit={emailForm.handleSubmit(handleSendCode)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              {...emailForm.register("email")}
            />
            {emailForm.formState.errors.email && (
              <p className="text-sm text-destructive">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            인증 코드 발송
          </Button>
        </form>
      )}

      {/* Step 2: OTP */}
      {step === 1 && (
        <div className="space-y-5">
          <button
            type="button"
            onClick={() => setStep(0)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            이전 단계
          </button>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{email}</span>으로
            발송된 6자리 코드를 입력해주세요.
          </p>
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            className="w-full"
            disabled={otpValue.length !== 6 || isSubmitting}
            onClick={handleVerifyCode}
          >
            {isSubmitting && <Loader2 className="animate-spin" />}
            인증 확인
          </Button>
        </div>
      )}

      {/* Step 3: Info */}
      {step === 2 && (
        <form
          onSubmit={infoForm.handleSubmit(handleSignup)}
          className="space-y-5"
        >
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            이전 단계
          </button>

          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              {...infoForm.register("name")}
            />
            {infoForm.formState.errors.name && (
              <p className="text-sm text-destructive">
                {infoForm.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgName">조직명</Label>
            <Input
              id="orgName"
              placeholder="Acme Inc."
              {...infoForm.register("organizationName")}
            />
            {infoForm.formState.errors.organizationName && (
              <p className="text-sm text-destructive">
                {infoForm.formState.errors.organizationName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="8자 이상"
              autoComplete="new-password"
              {...infoForm.register("password")}
            />
            {infoForm.formState.errors.password && (
              <p className="text-sm text-destructive">
                {infoForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 재입력"
              autoComplete="new-password"
              {...infoForm.register("confirmPassword")}
            />
            {infoForm.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {infoForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            가입 완료
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
