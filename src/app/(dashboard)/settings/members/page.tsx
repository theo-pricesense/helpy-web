"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  Crown,
  Loader2,
  Mail,
  MoreHorizontal,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCancelInvitation,
  useInviteMember,
  useOrganizationInvitations,
  useOrganizationMembers,
  useRemoveMember,
} from "@/hooks/use-organizations";
import {
  type InviteMemberDto,
  OrganizationInvitationResponseDto,
  OrganizationMemberResponseDto,
} from "@/lib/api/generated";

const inviteSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요"),
  role: z.enum(["ADMIN", "MEMBER"]),
});

type InviteForm = z.infer<typeof inviteSchema>;

const ROLE_CONFIG: Record<
  OrganizationMemberResponseDto.role,
  { label: string; icon: typeof Crown; color: string }
> = {
  [OrganizationMemberResponseDto.role.OWNER]: {
    label: "Owner",
    icon: Crown,
    color: "text-amber-500",
  },
  [OrganizationMemberResponseDto.role.ADMIN]: {
    label: "Admin",
    icon: ShieldCheck,
    color: "text-primary",
  },
  [OrganizationMemberResponseDto.role.MEMBER]: {
    label: "Member",
    icon: Users,
    color: "text-muted-foreground",
  },
};

export default function MembersPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [removeTarget, setRemoveTarget] =
    useState<OrganizationMemberResponseDto | null>(null);
  const [cancelTarget, setCancelTarget] =
    useState<OrganizationInvitationResponseDto | null>(null);

  const { data: members = [], isLoading: membersLoading } =
    useOrganizationMembers();
  const { data: invitations = [] } = useOrganizationInvitations();
  const inviteMutation = useInviteMember();
  const removeMutation = useRemoveMember();
  const cancelMutation = useCancelInvitation();

  const form = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "", role: "MEMBER" },
  });

  const handleInvite = (data: InviteForm) => {
    inviteMutation.mutate(
      { email: data.email, role: data.role as InviteMemberDto.role },
      {
        onSuccess: () => {
          toast.success(`${data.email}(으)로 초대를 보냈습니다.`);
          setInviteOpen(false);
          form.reset();
        },
        onError: () => {
          toast.error("초대 발송에 실패했습니다.");
        },
      },
    );
  };

  const handleRemoveMember = () => {
    if (!removeTarget) return;
    removeMutation.mutate(removeTarget.id, {
      onSuccess: () => {
        toast.success(`${removeTarget.name} 멤버를 제거했습니다.`);
        setRemoveTarget(null);
      },
      onError: () => {
        toast.error("멤버 제거에 실패했습니다.");
      },
    });
  };

  const handleCancelInvite = () => {
    if (!cancelTarget) return;
    cancelMutation.mutate(cancelTarget.id, {
      onSuccess: () => {
        toast.success("초대를 취소했습니다.");
        setCancelTarget(null);
      },
      onError: () => {
        toast.error("초대 취소에 실패했습니다.");
      },
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const pendingInvitations = invitations.filter(
    (inv) => inv.status === OrganizationInvitationResponseDto.status.PENDING,
  );

  if (membersLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Members
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage team members and their roles.
          </p>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <UserPlus className="h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={form.handleSubmit(handleInvite)}>
              <DialogHeader>
                <DialogTitle>Invite Member</DialogTitle>
                <DialogDescription>
                  Send an invitation email to add a new team member.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email address</Label>
                  <Input
                    id="invite-email"
                    type="text"
                    placeholder="colleague@company.com"
                    autoFocus
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <Select
                    value={form.watch("role")}
                    onValueChange={(v) =>
                      form.setValue("role", v as "ADMIN" | "MEMBER")
                    }
                  >
                    <SelectTrigger id="invite-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                          Admin
                        </span>
                      </SelectItem>
                      <SelectItem value="MEMBER">
                        <span className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          Member
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Admin can manage workspaces and members. Member can only
                    view and use workspaces.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setInviteOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={inviteMutation.isPending}>
                  {inviteMutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Send Invite
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Team Members
            <Badge variant="secondary" className="ml-2">
              {members.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            People who have access to your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden sm:table-cell">Joined</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const roleConfig = ROLE_CONFIG[member.role];
                const RoleIcon = roleConfig.icon;
                const initials = member.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1.5 font-normal">
                        <RoleIcon className={`h-3 w-3 ${roleConfig.color}`} />
                        {roleConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {formatDate(member.createdAt)}
                    </TableCell>
                    <TableCell>
                      {member.role !==
                        OrganizationMemberResponseDto.role.OWNER && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setRemoveTarget(member)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Invites */}
      {pendingInvitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Pending Invitations
              <Badge variant="secondary" className="ml-2">
                {pendingInvitations.length}
              </Badge>
            </CardTitle>
            <CardDescription>
              Invitations that have been sent but not yet accepted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingInvitations.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {invite.email}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {invite.role ===
                          OrganizationInvitationResponseDto.role.ADMIN
                            ? "Admin"
                            : "Member"}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Sent {formatDate(invite.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => setCancelTarget(invite)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cancel invite</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Remove Member Confirm Dialog */}
      <AlertDialog
        open={!!removeTarget}
        onOpenChange={(open) => !open && setRemoveTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>{removeTarget?.name}</strong> ({removeTarget?.email}) will
              lose access to the organization and all workspaces. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              disabled={removeMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removeMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Invite Confirm Dialog */}
      <AlertDialog
        open={!!cancelTarget}
        onOpenChange={(open) => !open && setCancelTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel invitation?</AlertDialogTitle>
            <AlertDialogDescription>
              The invitation to <strong>{cancelTarget?.email}</strong> will be
              revoked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelInvite}
              disabled={cancelMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {cancelMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Revoke Invite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
