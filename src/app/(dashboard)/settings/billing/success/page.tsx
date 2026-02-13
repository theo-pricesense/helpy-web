"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { creditCardsApi } from "@/lib/api";

export default function BillingSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const registerCard = async () => {
      const authKey = searchParams.get("authKey");
      const customerKey = searchParams.get("customerKey");

      if (!authKey) {
        toast.error("Invalid billing auth response");
        setStatus("error");
        router.replace("/settings/billing");
        return;
      }

      try {
        await creditCardsApi.create({ authKey });
        setStatus("success");
        toast.success("Card registered successfully");

        // Redirect after short delay
        setTimeout(() => {
          router.replace("/settings/billing");
        }, 1500);
      } catch (error) {
        console.error("Failed to register card:", error);
        toast.error("Failed to register card");
        setStatus("error");
        router.replace("/settings/billing");
      }
    };

    registerCard();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center py-20">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center justify-center py-10">
          {status === "loading" && (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">
                Registering your card...
              </p>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mb-4" />
              <p className="text-sm font-medium text-foreground">
                Card registered successfully!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Redirecting...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
