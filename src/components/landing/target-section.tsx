import { Rocket, ShoppingBag, Users } from "lucide-react";

const targets = [
  {
    icon: ShoppingBag,
    title: "1인 셀러",
    description: "혼자서 CS까지 하느라 지친 스마트스토어, 쿠팡 셀러",
  },
  {
    icon: Rocket,
    title: "초기 스타트업",
    description: "CS 채용 전, 개발에 집중하고 싶은 창업팀",
  },
  {
    icon: Users,
    title: "소규모 팀",
    description: "반복 문의에 시간 뺏기기 싫은 2-5인 팀",
  },
];

export function TargetSection() {
  return (
    <section className="px-6 py-24 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
            이런 분들을 위해 만들었어요
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {targets.map((target) => (
            <div
              key={target.title}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <target.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {target.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {target.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
