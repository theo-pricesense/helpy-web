"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionsApi } from "@/lib/api";
import type { Subscription } from "@/lib/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ManageSubscriptionPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const sub = await subscriptionsApi.get();
      setSubscription(sub);
    } catch {
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCancel = async () => {
    setCanceling(true);
    try {
      await subscriptionsApi.cancel();
      toast.success(
        "Subscription canceled. It will expire at the end of the billing period.",
      );
      router.push("/settings/billing");
    } catch {
      toast.error("Failed to cancel subscription");
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const planCode = subscription?.plan.code.toUpperCase() || "FREE";
  const isCanceled = subscription?.status === "canceled";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/settings/billing"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Manage Subscription
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your subscription settings.
          </p>
        </div>
      </div>

      {/* Subscription Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Subscription</CardTitle>
          <CardDescription>
            {planCode === "FREE"
              ? "You are on the free plan."
              : isCanceled
                ? `Your subscription is canceled. Access until ${subscription && formatDate(subscription.currentPeriodEnd)}`
                : subscription
                  ? `${subscription.plan.name} plan - Billing period ends ${formatDate(subscription.currentPeriodEnd)}`
                  : "No active subscription"}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Cancel Section - only show for paid, non-canceled subscriptions */}
      {planCode !== "FREE" && !isCanceled && subscription && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Cancel Subscription</CardTitle>
            <CardDescription>
              If you cancel, you can still use the service until the end of your
              current billing period (
              {formatDate(subscription.currentPeriodEnd)}
              ). After that, your plan will be downgraded to Free.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-muted-foreground">
                  Cancel subscription
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your subscription will be canceled at the end of the current
                    billing period ({formatDate(subscription.currentPeriodEnd)}
                    ). You can continue using the service until then.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCancel}
                    disabled={canceling}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {canceling && (
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    )}
                    Cancel Subscription
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
