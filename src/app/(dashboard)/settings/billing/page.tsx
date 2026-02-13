"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  CreditCard as CreditCardIcon,
  Crown,
  Download,
  Loader2,
  Plus,
  RotateCcw,
  Trash2,
  XCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { creditCardsApi, paymentsApi, subscriptionsApi } from "@/lib/api";
import { requestBillingAuth } from "@/lib/toss-payments";
import type {
  CreditCard,
  Payment,
  Subscription,
  SubscriptionUsage,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

// ===== Plan display map =====
type PlanCode = "FREE" | "STARTER" | "PRO" | "ENTERPRISE";

const planInfo: Record<PlanCode, { label: string; color: string }> = {
  FREE: { label: "Free", color: "bg-muted text-muted-foreground" },
  STARTER: { label: "Starter", color: "bg-primary/10 text-primary" },
  PRO: { label: "Pro", color: "bg-primary text-primary-foreground" },
  ENTERPRISE: { label: "Enterprise", color: "bg-foreground text-background" },
};

const statusBadge: Record<string, { label: string; variant: string }> = {
  active: { label: "Active", variant: "default" },
  trialing: { label: "Trial", variant: "secondary" },
  past_due: { label: "Past Due", variant: "destructive" },
  canceled: { label: "Canceled", variant: "outline" },
};

const paymentStatusConfig: Record<
  string,
  { label: string; icon: React.ElementType; className: string }
> = {
  DONE: { label: "Paid", icon: CheckCircle2, className: "text-emerald-500" },
  FAILED: { label: "Failed", icon: XCircle, className: "text-destructive" },
  READY: { label: "Pending", icon: Clock, className: "text-yellow-500" },
  CANCELED: {
    label: "Canceled",
    icon: RotateCcw,
    className: "text-muted-foreground",
  },
};

// ===== Tab type =====
type BillingTab = "overview" | "payments" | "cards";

const tabs: { id: BillingTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "payments", label: "Payments" },
  { id: "cards", label: "Cards" },
];

function formatCurrency(amount: number, currency = "KRW") {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

// ===== Usage Bar Component =====
function UsageBar({
  label,
  used,
  limit,
  isUnlimited = false,
}: {
  label: string;
  used: number;
  limit: number;
  isUnlimited?: boolean;
}) {
  const pct =
    !isUnlimited && limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const isHigh = pct >= 80;
  const isFull = pct >= 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span
          className={cn(
            "font-medium",
            isFull ? "text-destructive" : "text-foreground",
          )}
        >
          {used.toLocaleString()}
          {isUnlimited ? " (Unlimited)" : ` / ${limit.toLocaleString()}`}
        </span>
      </div>
      {!isUnlimited && (
        <Progress
          value={pct}
          className={cn(
            "h-2",
            isHigh && !isFull && "[&>div]:bg-yellow-500",
            isFull && "[&>div]:bg-destructive",
          )}
        />
      )}
    </div>
  );
}

// ===== Main Component =====
const validPlans: PlanCode[] = ["FREE", "STARTER", "PRO", "ENTERPRISE"];

export default function BillingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [activeTab, setActiveTab] = useState<BillingTab>("overview");
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<SubscriptionUsage | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingCard, setAddingCard] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanCode>("FREE");
  const [changingPlan, setChangingPlan] = useState(false);

  // Auto-open plan dialog from ?plan= query param (from pricing page)
  useEffect(() => {
    const planParam = searchParams
      .get("plan")
      ?.toUpperCase() as PlanCode | null;
    if (planParam && validPlans.includes(planParam)) {
      setSelectedPlan(planParam);
      setPlanDialogOpen(true);
      router.replace("/settings/billing", { scroll: false });
    }
  }, [searchParams, router]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [sub, usg, payRes, crd] = await Promise.all([
        subscriptionsApi.get(),
        subscriptionsApi.getUsage(),
        paymentsApi.list(),
        creditCardsApi.list(),
      ]);
      setSubscription(sub);
      setUsage(usg);
      setPayments(payRes.items || []);
      setCards(crd);
    } catch {
      // API not ready, show empty state
      setSubscription(null);
      setUsage(null);
      setPayments([]);
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddCard = async () => {
    if (!user?.id) {
      toast.error("Please login first");
      return;
    }

    setAddingCard(true);
    try {
      // Toss Payments SDK로 빌링키 발급 페이지 열기
      // 성공/실패 시 /settings/billing/success 또는 /fail로 리다이렉트됨
      await requestBillingAuth(user.id);
    } catch (error) {
      console.error("Failed to open billing auth:", error);
      toast.error("Failed to open card registration");
      setAddingCard(false);
    }
  };

  const handleChangePlan = async () => {
    const currentPlanCode = subscription?.plan.code.toUpperCase();
    if (selectedPlan === currentPlanCode) return;

    setChangingPlan(true);
    try {
      await subscriptionsApi.changePlan({ planCode: selectedPlan });
      setPlanDialogOpen(false);
      toast.success(`${planInfo[selectedPlan].label} plan applied`);
      loadData();
    } catch {
      toast.error("Failed to change plan");
    } finally {
      setChangingPlan(false);
    }
  };

  const handleDeleteCard = async (id: string) => {
    setDeletingCardId(id);
    try {
      await creditCardsApi.delete(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
      toast.success("Card removed");
    } catch {
      toast.error("Failed to remove card");
    } finally {
      setDeletingCardId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const planCode = (subscription?.plan.code.toUpperCase() ||
    "FREE") as PlanCode;
  const plan = planInfo[planCode] || planInfo.FREE;
  const subStatus =
    statusBadge[subscription?.status || "active"] || statusBadge.active;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscription, usage, payment history, and payment methods.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/50 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== Overview Tab ===== */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">Current Plan</CardTitle>
                    <Badge className={plan.color}>{plan.label}</Badge>
                    <Badge
                      variant={
                        subStatus.variant as
                          | "default"
                          | "secondary"
                          | "destructive"
                          | "outline"
                      }
                    >
                      {subStatus.label}
                    </Badge>
                  </div>
                  <CardDescription>
                    {planCode === "FREE"
                      ? "You are on the free plan."
                      : subscription
                        ? `Billing period: ${formatDate(subscription.currentPeriodStart)} ~ ${formatDate(subscription.currentPeriodEnd)}`
                        : "No active subscription"}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPlan(planCode);
                    setPlanDialogOpen(true);
                  }}
                >
                  <Crown className="mr-1.5 h-3.5 w-3.5" />
                  {planCode === "FREE" ? "Upgrade" : "Change Plan"}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Usage */}
          {usage && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Usage</CardTitle>
                    <CardDescription>
                      Current billing period usage summary.
                    </CardDescription>
                  </div>
                  {subscription && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Zap className="h-3.5 w-3.5" />
                      Resets {formatDate(subscription.currentPeriodEnd)}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <UsageBar
                  label="AI Responses"
                  used={usage.aiResponsesUsed}
                  limit={usage.aiResponsesLimit}
                  isUnlimited={usage.isUnlimited}
                />
                {!usage.isUnlimited &&
                  usage.aiResponsesUsed >= usage.aiResponsesLimit * 0.8 && (
                    <>
                      <Separator />
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-foreground">
                            Running low on AI responses
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Upgrade your plan to get more AI responses.
                          </p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/pricing">
                            <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />
                            Upgrade
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ===== Payments Tab ===== */}
      {activeTab === "payments" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment History</CardTitle>
            <CardDescription>
              View your past invoices and payment records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CreditCardIcon className="h-8 w-8 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">
                  No payment history yet.
                </p>
              </div>
            ) : (
              <div className="space-y-0 divide-y divide-border">
                {payments.map((payment) => {
                  const st =
                    paymentStatusConfig[payment.status] ||
                    paymentStatusConfig.READY;
                  const Icon = st.icon;
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={cn("shrink-0", st.className)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {payment.orderName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatShortDate(
                              payment.approvedAt || payment.createdAt,
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-medium text-foreground">
                          {formatCurrency(payment.amount)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          asChild
                        >
                          <a
                            href={`/api/invoices/${payment.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download invoice"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ===== Cards Tab ===== */}
      {activeTab === "cards" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your credit/debit cards for billing.
                  </CardDescription>
                </div>
                <Button size="sm" onClick={handleAddCard} disabled={addingCard}>
                  {addingCard ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {cards.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CreditCardIcon className="h-8 w-8 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No payment methods added yet.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add a card to enable paid plan subscriptions.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted">
                          <span className="text-xs font-bold text-foreground">
                            {card.cardCompany}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">
                              {card.cardNumber}
                            </p>
                            {card.isDefault && (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {card.gateway}
                          </p>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            disabled={deletingCardId === card.id}
                          >
                            {deletingCardId === card.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Card?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove the card {card.cardNumber} from
                              your account.
                              {card.isDefault &&
                                " This is your default payment method. Please add another card first."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCard(card.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ===== Change Plan Dialog ===== */}
      <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Change Plan</DialogTitle>
            <DialogDescription>
              Select a plan that fits your needs. Changes take effect
              immediately.
            </DialogDescription>
          </DialogHeader>

          {/* Plan options */}
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                {
                  id: "FREE" as PlanCode,
                  name: "Free",
                  price: 0,
                  desc: "300 AI responses/mo",
                },
                {
                  id: "STARTER" as PlanCode,
                  name: "Starter",
                  price: 49000,
                  desc: "1,000 AI responses/mo",
                },
                {
                  id: "PRO" as PlanCode,
                  name: "Pro",
                  price: 299000,
                  desc: "20,000 AI responses/mo",
                },
                {
                  id: "ENTERPRISE" as PlanCode,
                  name: "Enterprise",
                  price: -1,
                  desc: "Unlimited AI responses",
                },
              ] as const
            ).map((p) => {
              const isSelected = selectedPlan === p.id;
              const isCurrent = planCode === p.id;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => p.id !== "ENTERPRISE" && setSelectedPlan(p.id)}
                  disabled={p.id === "ENTERPRISE"}
                  className={cn(
                    "relative flex flex-col items-start rounded-lg border-2 p-3.5 text-left transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30",
                    p.id === "ENTERPRISE" && "opacity-60 cursor-not-allowed",
                  )}
                >
                  {isCurrent && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-2 right-2 text-[10px] px-1.5 py-0"
                    >
                      Current
                    </Badge>
                  )}
                  <span className="text-sm font-semibold text-foreground">
                    {p.name}
                  </span>
                  <span className="mt-0.5 text-xs text-muted-foreground">
                    {p.desc}
                  </span>
                  <span className="mt-2 text-lg font-bold text-foreground">
                    {p.price === 0
                      ? "Free"
                      : p.price === -1
                        ? "Contact us"
                        : formatCurrency(p.price)}
                  </span>
                  {p.price > 0 && (
                    <span className="text-[11px] text-muted-foreground">
                      /mo
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setPlanDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleChangePlan}
              disabled={changingPlan || selectedPlan === planCode}
            >
              {changingPlan && (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              )}
              {selectedPlan === planCode
                ? "Current Plan"
                : selectedPlan === "FREE"
                  ? "Downgrade to Free"
                  : `Upgrade to ${planInfo[selectedPlan].label}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
