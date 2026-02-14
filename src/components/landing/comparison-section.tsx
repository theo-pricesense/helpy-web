import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "AI 응답",
    others: "별도 과금",
    helpy: "기본 포함",
    helpyBetter: true,
  },
  {
    feature: "월 1,000건 기준",
    others: "10~15만원+",
    helpy: "4.9만원",
    helpyBetter: true,
  },
  {
    feature: "셋업 시간",
    others: "수 시간~수 일",
    helpy: "5분",
    helpyBetter: true,
  },
  {
    feature: "숨겨진 비용",
    others: "애드온 추가 과금",
    helpy: "없음",
    helpyBetter: true,
  },
];

export function ComparisonSection() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl">
            기존 솔루션 대비 1/3 비용
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            AI를 추가 기능으로 파는 곳과는 다릅니다.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  비교 항목
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-muted-foreground">
                  기존 솔루션
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-primary">
                  Helpy
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr
                  key={row.feature}
                  className={
                    index !== comparisons.length - 1
                      ? "border-b border-border"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                    {row.others}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-primary">
                    {row.helpy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
