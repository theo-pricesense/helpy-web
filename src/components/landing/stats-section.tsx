const stats = [
  {
    value: "94%",
    label: "AI 자동 해결률",
    description: "반복 문의의 94%를 AI가 자동으로 처리",
  },
  {
    value: "0.8s",
    label: "평균 응답 시간",
    description: "사람 대비 120배 빠른 초기 응답",
  },
  {
    value: "3.2x",
    label: "생산성 향상",
    description: "상담원 1인당 처리 건수 3.2배 증가",
  },
  {
    value: "500+",
    label: "기업 고객",
    description: "국내외 500개 이상의 기업이 선택",
  },
];

export function StatsSection() {
  return (
    <section
      id="solutions"
      className="border-y border-border bg-card px-6 py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">By the numbers</p>
          <h2 className="mt-3 text-3xl font-bold text-balance text-card-foreground sm:text-4xl">
            검증된 성과
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-base font-medium text-card-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
