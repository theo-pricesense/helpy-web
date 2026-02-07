import {
  BarChart3,
  Bot,
  Globe,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI 챗봇",
    description:
      "자연어 처리 기반 AI가 고객 문의를 자동으로 이해하고 정확한 답변을 제공합니다.",
  },
  {
    icon: Zap,
    title: "자동 응답 시스템",
    description:
      "반복되는 질문은 AI가 즉시 처리하여 상담원의 업무 부담을 줄여줍니다.",
  },
  {
    icon: BarChart3,
    title: "실시간 분석",
    description:
      "고객 만족도, 응답 시간, 해결률 등 핵심 지표를 실시간으로 모니터링합니다.",
  },
  {
    icon: MessageSquare,
    title: "옴니채널 지원",
    description:
      "웹, 모바일, 소셜 미디어 등 다양한 채널의 고객 문의를 한 곳에서 관리합니다.",
  },
  {
    icon: Shield,
    title: "엔터프라이즈 보안",
    description:
      "SOC 2 인증, 데이터 암호화, RBAC 등 기업급 보안 기능을 기본 제공합니다.",
  },
  {
    icon: Globe,
    title: "다국어 지원",
    description:
      "AI 번역 엔진으로 전 세계 고객에게 모국어로 된 지원을 제공합니다.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2 className="mt-3 text-3xl font-bold text-balance text-foreground sm:text-4xl">
            고객 서비스에 필요한 모든 것
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            AI 기술을 활용한 종합 고객 서비스 플랫폼으로, 더 빠르고 정확한
            지원을 제공하세요.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
