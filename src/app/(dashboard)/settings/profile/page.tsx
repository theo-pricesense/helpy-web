"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearTokens, usersApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

const updateNameSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
});

type UpdateNameForm = z.infer<typeof updateNameSchema>;

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateNameForm>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name });
    }
  }, [user, reset]);

  const onSave = async (data: UpdateNameForm) => {
    setIsSaving(true);
    try {
      const updated = await usersApi.updateMe({ name: data.name });
      setUser(updated);
      reset({ name: updated.name });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await usersApi.deleteMe();
      clearTokens();
      toast.success("Account deleted");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete account",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings.
        </p>
      </div>

      {/* Profile info card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed.
              </p>
            </div>

            <Button type="submit" size="sm" disabled={!isDirty || isSaving}>
              {isSaving && <Loader2 className="animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base text-destructive">
            Danger Zone
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All your data, organizations,
                  and projects will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting && <Loader2 className="animate-spin" />}
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
