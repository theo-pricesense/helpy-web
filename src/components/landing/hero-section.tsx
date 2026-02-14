"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-40 pb-24 md:pt-48 md:pb-32">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, hsl(187 80% 48%) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
        <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
        AI-powered CS
      </div>

      {/* Headline */}
      <h1 className="max-w-3xl text-center text-4xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
        {"CS팀 없어도"}
        <br />
        <span className="text-primary">괜찮아요</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-6 max-w-xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
        AI가 24시간 고객 문의에 응대합니다.
        <br />월 4.9만원부터. 무료로 시작하세요.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button size="lg" asChild className="gap-2 px-8">
          <Link href="/signup">
            무료로 시작하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          asChild
          className="px-8 bg-transparent"
        >
          <Link href="#features">자세히 알아보기</Link>
        </Button>
      </div>

      {/* Dashboard Preview */}
      <div className="relative mt-20 w-full max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5">
          {/* Mock browser bar */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-muted" />
              <div className="h-3 w-3 rounded-full bg-muted" />
              <div className="h-3 w-3 rounded-full bg-muted" />
            </div>
            <div className="mx-auto flex h-7 w-64 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
              app.helpy.ai
            </div>
          </div>

          {/* Mock dashboard content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-3 gap-4">
              {/* Stat cards */}
              {[
                {
                  label: "Total Conversations",
                  value: "12,847",
                  change: "+14%",
                },
                {
                  label: "AI Resolution Rate",
                  value: "94.2%",
                  change: "+3.1%",
                },
                {
                  label: "Avg. Response Time",
                  value: "0.8s",
                  change: "-42%",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-primary">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Mock chart area */}
            <div className="mt-6 flex h-40 items-end gap-1.5 rounded-lg border border-border bg-background p-4">
              {[40, 55, 35, 70, 60, 80, 65, 90, 75, 95, 85, 100].map((h) => (
                <div
                  key={h}
                  className="flex-1 rounded-sm bg-primary/20"
                  style={{ height: `${h}%` }}
                >
                  <div
                    className="w-full rounded-sm bg-primary transition-all"
                    style={{ height: `${Math.min(h + 10, 100)}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative glow under the card */}
        <div
          className="pointer-events-none absolute -bottom-8 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "hsl(187 80% 48%)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
