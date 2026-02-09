"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/landing/footer";
import { LandingNavbar } from "@/components/landing/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "스타터",
    description: "AI 지원을 시작하는 소규모 팀을 위한 플랜입니다.",
    monthlyPrice: 29,
    yearlyPrice: 24,
    cta: "무료 체험 시작",
    ctaVariant: "outline" as const,
    features: [
      "프로젝트 1개",
      "월 1,000건 대화",
      "기본 AI 모델 (GPT-4o mini)",
      "문서 5개",
      "이메일 지원",
      "기본 분석",
    ],
  },
  {
    name: "프로",
    description: "고급 AI 기능이 필요한 성장하는 팀을 위한 플랜입니다.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    cta: "무료 체험 시작",
    ctaVariant: "default" as const,
    recommended: true,
    features: [
      "무제한 프로젝트",
      "월 10,000건 대화",
      "모든 AI 모델",
      "무제한 문서",
      "우선 지원",
      "고급 분석",
      "커스텀 위젯 스타일링",
      "상담원 연결",
      "웹 크롤링",
    ],
  },
  {
    name: "엔터프라이즈",
    description: "맞춤형 요구사항이 있는 대규모 조직을 위한 플랜입니다.",
    monthlyPrice: null,
    yearlyPrice: null,
    cta: "영업팀 문의",
    ctaVariant: "outline" as const,
    features: [
      "프로의 모든 기능",
      "무제한 대화",
      "맞춤형 AI 모델 학습",
      "SSO & SAML",
      "전담 계정 관리자",
      "SLA 보장",
      "온프레미스 배포",
      "커스텀 연동",
      "감사 로그",
      "HIPAA 규정 준수",
    ],
  },
];

const faqs = [
  {
    question: "나중에 플랜을 변경할 수 있나요?",
    answer:
      "네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 업그레이드 시 남은 결제 기간에 대해 비례 계산됩니다. 다운그레이드 시 변경사항은 다음 결제 주기부터 적용됩니다.",
  },
  {
    question: "무료 체험이 있나요?",
    answer:
      "네! 모든 유료 플랜에는 14일 무료 체험이 제공됩니다. 시작하는 데 신용카드가 필요하지 않습니다. 구독을 결정하기 전에 모든 기능을 살펴볼 수 있습니다.",
  },
  {
    question: "대화 한도를 초과하면 어떻게 되나요?",
    answer:
      "한도에 가까워지면 알림을 보내드립니다. 추가 대화는 건당 요금이 부과되거나, 더 나은 가치를 위해 상위 플랜으로 업그레이드할 수 있습니다.",
  },
  {
    question: "언제든지 취소할 수 있나요?",
    answer:
      "물론입니다. 장기 계약이 없습니다. 계정 설정에서 언제든지 취소할 수 있습니다. 현재 결제 기간이 끝날 때까지 계속 이용하실 수 있습니다.",
  },
  {
    question: "스타트업 할인이 있나요?",
    answer:
      "네, 초기 단계 스타트업을 위한 특별 가격을 제공합니다. 회사 정보와 함께 영업팀에 연락주시면 맞춤형 플랜을 제안해 드리겠습니다.",
  },
  {
    question: "AI 학습은 어떻게 작동하나요?",
    answer:
      "문서(PDF, TXT, MD, DOCX)를 업로드하거나 웹 크롤링을 위한 URL을 제공하세요. AI가 이를 처리하여 제품과 고객에 맞춤화된 지식 베이스를 구축합니다.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <main className="min-h-dvh">
      <LandingNavbar />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="px-3 py-1">
              요금제
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance text-foreground">
              심플하고 투명한 요금제
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              무료로 시작하고, 팀이 성장함에 따라 확장하세요. 숨겨진 비용이
              없습니다.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <Label
                className={cn(
                  "text-sm",
                  !isYearly && "text-foreground font-medium",
                )}
              >
                월간
              </Label>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <Label
                className={cn(
                  "text-sm",
                  isYearly && "text-foreground font-medium",
                )}
              >
                연간
                <Badge variant="secondary" className="ml-2 text-[10px]">
                  20% 할인
                </Badge>
              </Label>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid gap-6 md:grid-cols-3 items-start">
            {plans.map((plan) => {
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              return (
                <Card
                  key={plan.name}
                  className={cn(
                    "relative",
                    plan.recommended &&
                      "border-primary shadow-lg shadow-primary/10 scale-[1.02]",
                  )}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground gap-1">
                        <Sparkles className="h-3 w-3" />
                        추천
                      </Badge>
                    </div>
                  )}
                  <CardHeader className={cn(plan.recommended && "pt-8")}>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-4">
                      {price !== null ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-foreground">
                            ${price}
                          </span>
                          <span className="text-muted-foreground">/월</span>
                        </div>
                      ) : (
                        <span className="text-4xl font-bold text-foreground">
                          맞춤형
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Button
                      variant={plan.ctaVariant}
                      className={cn(
                        "w-full",
                        plan.recommended &&
                          "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                      asChild
                    >
                      <Link
                        href={
                          plan.monthlyPrice === null ? "/contact" : "/signup"
                        }
                      >
                        {plan.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>

                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              자주 묻는 질문
            </h2>
            <p className="text-muted-foreground mt-2">
              Helpy 요금제에 대해 알아야 할 모든 것.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}
