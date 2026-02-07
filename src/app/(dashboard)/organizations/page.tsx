"use client";

import { Building2, Crown, Loader2, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrganizations } from "@/hooks/use-organizations";

export default function OrganizationsPage() {
  const router = useRouter();
  const { data: organizations = [], isLoading } = useOrganizations();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Organizations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select an organization to manage projects.
        </p>
      </div>

      {organizations.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No organizations yet
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first organization to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <Card
              key={org.id}
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
              onClick={() => router.push(`/organizations/${org.id}/projects`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{org.name}</CardTitle>
                    <CardDescription>
                      Created{" "}
                      {new Date(org.createdAt).toLocaleDateString("ko-KR")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    {org.role === "OWNER" && <Crown className="h-3 w-3" />}
                    {org.role === "ADMIN" && <Shield className="h-3 w-3" />}
                    {org.role === "MEMBER" && <User className="h-3 w-3" />}
                    {org.role}
                  </Badge>
                  <Badge variant="outline">{org.plan}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
