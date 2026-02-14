"use client";

import { ArrowRight, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UpgradeBannerProps {
  plan: "free" | "starter";
  variant?: "sidebar" | "inline";
}

export function UpgradeBanner({
  plan,
  variant = "sidebar",
}: UpgradeBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (variant === "sidebar") {
    return (
      <div className="mx-3 mb-2 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground leading-tight">
                {plan === "free" ? "Upgrade to Pro" : "Upgrade Plan"}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                {plan === "free"
                  ? "Get 20,000 AI responses/mo"
                  : "Unlock unlimited workspaces"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setDismissed(true);
            }}
            className="shrink-0 rounded-sm p-0.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
        <Link
          href="/settings/billing?plan=pro"
          className="mt-2 flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Upgrade Now
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    );
  }

  // Inline variant (for top of pages)
  return null;
}

interface UsageAlertBannerProps {
  used: number;
  limit: number;
  resourceName: string;
}

export function UsageAlertBanner({
  used,
  limit,
  resourceName,
}: UsageAlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const pct = limit > 0 ? (used / limit) * 100 : 0;

  if (dismissed || pct < 80) return null;

  const isFull = pct >= 100;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg border px-4 py-3",
        isFull
          ? "bg-destructive/5 border-destructive/20"
          : "bg-yellow-500/5 border-yellow-500/20",
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            isFull ? "bg-destructive/10" : "bg-yellow-500/10",
          )}
        >
          <Sparkles
            className={cn(
              "h-4 w-4",
              isFull
                ? "text-destructive"
                : "text-yellow-600 dark:text-yellow-400",
            )}
          />
        </div>
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm font-medium",
              isFull ? "text-destructive" : "text-foreground",
            )}
          >
            {isFull
              ? `${resourceName} limit reached`
              : `${resourceName} running low`}
          </p>
          <p className="text-xs text-muted-foreground">
            {used.toLocaleString()} / {limit.toLocaleString()} used
            {isFull ? " - upgrade to continue" : ` (${Math.round(pct)}%)`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/settings/billing?plan=pro"
          className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Upgrade
          <ArrowRight className="h-3 w-3" />
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded-sm p-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
