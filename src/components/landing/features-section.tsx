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
    title: "반복 문의 자동 응답",
    description: '"배송 어디예요?" "교환 어떻게 해요?" AI가 알아서 답변합니다.',
  },
  {
    icon: Zap,
    title: "5분이면 셋업 완료",
    description:
      "복잡한 설정 없이 시작하세요. FAQ만 올리면 AI가 바로 학습합니다.",
  },
  {
    icon: MessageSquare,
    title: "웹 위젯 한 줄 설치",
    description: "코드 한 줄이면 내 쇼핑몰에 AI 상담 위젯이 붙습니다.",
  },
  {
    icon: BarChart3,
    title: "실시간 분석",
    description:
      "어떤 문의가 많은지, AI가 얼마나 해결했는지 한눈에 확인하세요.",
  },
  {
    icon: Globe,
    title: "해외 고객도 OK",
    description:
      "AI가 자동으로 번역해서 응대합니다. 영어, 일본어, 중국어 지원.",
  },
  {
    icon: Shield,
    title: "AI 응답 기본 포함",
    description:
      "별도 과금 없이 AI 응답이 기본 포함되어 있습니다. 숨겨진 비용 없음.",
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
            혼자서도 할 수 있어요
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            CS 전담 인력 없이도 AI가 고객 응대를 처리합니다.
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
