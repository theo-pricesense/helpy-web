"use client";

import { ArrowRight, Check, Minus, Sparkles } from "lucide-react";
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

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ko-KR").format(price);

const plans = [
  {
    name: "Free",
    description: "AI 고객 서비스를 처음 시작하는 분들을 위한 플랜",
    monthlyPrice: 0,
    yearlyPrice: 0,
    promoPrice: null,
    cta: "무료로 시작하기",
    ctaVariant: "outline" as const,
    highlight: false,
    limits: {
      aiResponses: "300건",
      workspaces: "1개",
      members: "1명",
      aiModel: "Flash-Lite",
    },
    features: [
      { label: "문서 업로드", included: true },
      { label: "우선 지원", included: false },
    ],
  },
  {
    name: "Starter",
    description: "소규모 팀을 위한 합리적인 시작점",
    monthlyPrice: 49000,
    yearlyPrice: 39000,
    promoPrice: 24500,
    cta: "시작하기",
    ctaVariant: "outline" as const,
    highlight: false,
    limits: {
      aiResponses: "1,000건",
      workspaces: "1개",
      members: "3명",
      aiModel: "Flash",
    },
    features: [
      { label: "문서 업로드", included: true },
      { label: "우선 지원", included: false },
    ],
  },
  {
    name: "Pro",
    description: "성장하는 팀을 위한 강력한 AI 고객 서비스",
    monthlyPrice: 299000,
    yearlyPrice: 239000,
    promoPrice: 149500,
    cta: "시작하기",
    ctaVariant: "default" as const,
    highlight: true,
    limits: {
      aiResponses: "20,000건",
      workspaces: "무제한",
      members: "15명",
      aiModel: "Flash",
    },
    features: [
      { label: "문서 업로드", included: true },
      { label: "우선 지원", included: true },
    ],
  },
  {
    name: "Enterprise",
    description: "맞춤형 솔루션이 필요한 대규모 조직",
    monthlyPrice: null,
    yearlyPrice: null,
    promoPrice: null,
    cta: "영업팀 문의",
    ctaVariant: "outline" as const,
    highlight: false,
    limits: {
      aiResponses: "무제한",
      workspaces: "무제한",
      members: "무제한",
      aiModel: "선택 가능",
    },
    features: [
      { label: "문서 업로드", included: true },
      { label: "SLA 99.9%", included: true },
      { label: "전용 지원", included: true },
    ],
  },
];

const faqs = [
  {
    question: "AI 응답이란 무엇인가요?",
    answer:
      "AI가 고객에게 메시지 1건을 생성하면 1 AI 응답으로 카운트됩니다. 고객의 메시지나 상담원이 직접 작성한 응답은 과금되지 않습니다.",
  },
  {
    question: "월 AI 응답 상한을 초과하면 어떻게 되나요?",
    answer:
      "상한 초과 시 건당 23원의 추가 요금이 부과됩니다. 사전에 알림을 보내드리며, 상위 플랜으로 업그레이드하면 더 합리적인 비용으로 이용할 수 있습니다.",
  },
  {
    question: "플랜을 변경할 수 있나요?",
    answer:
      "언제든 업그레이드 또는 다운그레이드할 수 있습니다. 업그레이드 시 남은 기간에 대해 일할 계산되며, 다운그레이드는 다음 결제 주기부터 적용됩니다. 추가 멤버는 월 15,000원/명, 추가 워크스페이스는 월 30,000원/개로 이용 가능합니다.",
  },
  {
    question: "런칭 프로모션은 언제까지인가요?",
    answer:
      "런칭 프로모션(30% 할인)은 한정 기간 동안 제공됩니다. 프로모션 기간 중 가입하시면 첫 결제 주기에 할인가가 적용됩니다.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <main className="min-h-dvh">
      <LandingNavbar />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-16 space-y-4 text-center">
            <Badge variant="outline" className="px-3 py-1">
              Pricing
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance text-foreground md:text-5xl">
              심플하고 투명한 요금제
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-pretty text-muted-foreground">
              AI 응답 기반 과금으로, 사용한 만큼만 지불하세요. 무료로 시작하고
              성장에 맞춰 확장하세요.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <Label
                className={cn(
                  "text-sm",
                  !isYearly && "font-medium text-foreground",
                )}
              >
                월간
              </Label>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <Label
                className={cn(
                  "text-sm",
                  isYearly && "font-medium text-foreground",
                )}
              >
                연간
                <Badge variant="secondary" className="ml-2 text-[10px]">
                  20% 할인
                </Badge>
              </Label>
            </div>

            {/* Promo banner */}
            <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              런칭 프로모션: 첫 달 50% 할인
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
              const basePrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const promoPrice =
                !isYearly && plan.promoPrice ? plan.promoPrice : null;
              const displayPrice = promoPrice ?? basePrice;

              return (
                <Card
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col",
                    plan.highlight &&
                      "border-primary shadow-lg shadow-primary/10 md:scale-[1.03]",
                  )}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gap-1 bg-primary text-primary-foreground">
                        <Sparkles className="h-3 w-3" />
                        인기
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="lg:pt-8">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="min-h-[40px] text-xs">
                      {plan.description}
                    </CardDescription>
                    <div className="pt-3">
                      {displayPrice !== null ? (
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-foreground">
                              {"\u20A9"}
                              {formatPrice(displayPrice)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              /월
                            </span>
                            {promoPrice && (
                              <span className="text-xs text-primary">
                                첫 달
                              </span>
                            )}
                          </div>
                          <p
                            className={cn(
                              "text-xs",
                              promoPrice
                                ? "text-muted-foreground"
                                : "invisible",
                            )}
                          >
                            {promoPrice
                              ? `이후 \u20A9${formatPrice(plan.monthlyPrice!)}/월`
                              : `\u20A9${formatPrice(plan.monthlyPrice ?? 0)}`}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="text-3xl font-bold text-foreground">
                            별도 협의
                          </span>
                          <p className="invisible text-xs">{"\u20A9"}0</p>
                        </div>
                      )}
                    </div>
                    {/* Limits */}
                    <div className="mt-4 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AI 응답</span>
                        <span className="font-medium text-foreground">
                          {plan.limits.aiResponses}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AI 모델</span>
                        <span className="font-medium text-foreground">
                          {plan.limits.aiModel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          워크스페이스
                        </span>
                        <span className="font-medium text-foreground">
                          {plan.limits.workspaces}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">멤버</span>
                        <span className="font-medium text-foreground">
                          {plan.limits.members}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <Button
                      variant={plan.ctaVariant}
                      className={cn(
                        "w-full",
                        plan.highlight &&
                          "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                      size="sm"
                      asChild
                    >
                      <Link
                        href={
                          plan.monthlyPrice === null ? "/contact" : "/signup"
                        }
                      >
                        {plan.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>

                    <ul className="mt-5 space-y-2.5 lg:min-h-[100px]">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.label}
                          className="flex items-start gap-2 text-xs"
                        >
                          {feature.included ? (
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          ) : (
                            <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                          )}
                          <span
                            className={cn(
                              feature.included
                                ? "text-muted-foreground"
                                : "text-muted-foreground/40",
                            )}
                          >
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Overage + Add-on info */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                AI 응답 초과 시
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {"\u20A9"}23
                <span className="text-sm font-normal text-muted-foreground">
                  /건
                </span>
              </p>
            </div>
            <div className="hidden h-10 w-px bg-border sm:block" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">추가 멤버</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {"\u20A9"}15,000
                <span className="text-sm font-normal text-muted-foreground">
                  /명/월
                </span>
              </p>
            </div>
            <div className="hidden h-10 w-px bg-border sm:block" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                추가 워크스페이스
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {"\u20A9"}30,000
                <span className="text-sm font-normal text-muted-foreground">
                  /개/월
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              자주 묻는 질문
            </h2>
            <p className="mt-2 text-muted-foreground">
              요금제에 대해 궁금한 점이 있으신가요?
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
