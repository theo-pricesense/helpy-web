"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { HelpyLogo } from "@/components/helpy-logo";
import { useAuthStore } from "@/stores/auth-store";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/organizations");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="flex min-h-dvh">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-card p-12 border-r border-border">
        <HelpyLogo size="lg" />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight text-balance text-foreground">
            AI-first
            <br />
            Customer Service
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            Build smarter, faster support experiences with AI that understands
            your customers.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; 2026 Helpy. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
