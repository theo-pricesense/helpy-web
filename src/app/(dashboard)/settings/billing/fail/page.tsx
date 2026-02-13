"use client";

import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BillingFailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message");

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="flex items-center justify-center py-20">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <XCircle className="h-10 w-10 text-destructive mb-4" />
          <p className="text-sm font-medium text-foreground">
            Card registration failed
          </p>
          {errorMessage && (
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {errorMessage}
            </p>
          )}
          {errorCode && (
            <p className="text-xs text-muted-foreground mt-1">
              Error code: {errorCode}
            </p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => router.replace("/settings/billing")}
          >
            Go back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
