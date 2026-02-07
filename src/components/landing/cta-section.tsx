import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, hsl(187 80% 48%) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-3xl text-center">
        <h2 className="text-3xl font-bold text-balance text-foreground sm:text-4xl md:text-5xl">
          지금 바로 시작하세요
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
          무료 체험으로 Helpy의 AI 고객 서비스를 경험해보세요. 신용카드 없이
          시작할 수 있습니다.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="gap-2 px-10">
            <Link href="/signup">
              무료 체험 시작
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="px-10 bg-transparent"
          >
            <Link href="mailto:sales@helpy.ai">영업팀 문의</Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          14일 무료 체험 &middot; 설정 5분 소요 &middot; 언제든지 취소 가능
        </p>
      </div>
    </section>
  );
}
