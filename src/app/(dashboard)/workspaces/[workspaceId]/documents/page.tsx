"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateTextDocument,
  useCreateUrlDocument,
  useDeleteDocument,
  useDocuments,
  useProcessDocument,
} from "@/hooks/use-documents";
import { DocumentResponseDto } from "@/lib/api/generated";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const t = useTranslations();
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const [urlDialogOpen, setUrlDialogOpen] = useState(false);
  const [textDialogOpen, setTextDialogOpen] = useState(false);

  const { data: documents = [], isLoading } = useDocuments(workspaceId);
  const createUrlMutation = useCreateUrlDocument(workspaceId);
  const createTextMutation = useCreateTextDocument(workspaceId);
  const deleteMutation = useDeleteDocument(workspaceId);
  const processMutation = useProcessDocument(workspaceId);

  const urlSchema = z.object({
    title: z.string().min(1, t("documents.titleRequired")),
    url: z.string().url(t("documents.urlInvalid")),
  });

  const textSchema = z.object({
    title: z.string().min(1, t("documents.titleRequired")),
    content: z.string().min(1, t("documents.contentRequired")),
  });

  type UrlForm = z.infer<typeof urlSchema>;
  type TextForm = z.infer<typeof textSchema>;

  const statusConfig: Record<
    DocumentResponseDto.status,
    { label: string; icon: typeof Clock; className: string }
  > = {
    [DocumentResponseDto.status.PENDING]: {
      label: t("status.pending"),
      icon: Clock,
      className: "text-muted-foreground border-muted bg-muted/50",
    },
    [DocumentResponseDto.status.PROCESSING]: {
      label: t("status.processing"),
      icon: Clock,
      className: "text-amber-500 border-amber-500/20 bg-amber-500/10",
    },
    [DocumentResponseDto.status.COMPLETED]: {
      label: t("status.completed"),
      icon: CheckCircle2,
      className: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10",
    },
    [DocumentResponseDto.status.FAILED]: {
      label: t("status.failed"),
      icon: AlertCircle,
      className: "text-destructive border-destructive/20 bg-destructive/10",
    },
  };

  const typeConfig: Record<
    DocumentResponseDto.type,
    { label: string; icon: typeof FileText }
  > = {
    [DocumentResponseDto.type.TEXT]: { label: "Text", icon: FileText },
    [DocumentResponseDto.type.URL]: { label: "URL", icon: Globe },
    [DocumentResponseDto.type.FILE]: { label: "File", icon: FileText },
  };

  const urlForm = useForm<UrlForm>({
    resolver: zodResolver(urlSchema),
    defaultValues: { title: "", url: "" },
  });

  const textForm = useForm<TextForm>({
    resolver: zodResolver(textSchema),
    defaultValues: { title: "", content: "" },
  });

  const handleCreateUrl = (data: UrlForm) => {
    createUrlMutation.mutate(data, {
      onSuccess: () => {
        toast.success(t("documents.toast.urlCreated"));
        setUrlDialogOpen(false);
        urlForm.reset();
      },
      onError: () => {
        toast.error(t("documents.toast.urlFailed"));
      },
    });
  };

  const handleCreateText = (data: TextForm) => {
    createTextMutation.mutate(data, {
      onSuccess: () => {
        toast.success(t("documents.toast.textCreated"));
        setTextDialogOpen(false);
        textForm.reset();
      },
      onError: () => {
        toast.error(t("documents.toast.textFailed"));
      },
    });
  };

  const handleDelete = (docId: string) => {
    deleteMutation.mutate(docId, {
      onSuccess: () => {
        toast.success(t("documents.toast.deleted"));
      },
      onError: () => {
        toast.error(t("documents.toast.deleteFailed"));
      },
    });
  };

  const handleProcess = (docId: string) => {
    processMutation.mutate(docId, {
      onSuccess: () => {
        toast.success(t("documents.toast.processStarted"));
      },
      onError: () => {
        toast.error(t("documents.toast.processFailed"));
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t("documents.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("documents.description")}
          </p>
        </div>
        <div className="flex gap-2">
          {/* Text Document Dialog */}
          <Dialog open={textDialogOpen} onOpenChange={setTextDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4" />
                {t("documents.addText")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={textForm.handleSubmit(handleCreateText)}>
                <DialogHeader>
                  <DialogTitle>{t("documents.addTextTitle")}</DialogTitle>
                  <DialogDescription>
                    {t("documents.addTextDescription")}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-title">
                      {t("documents.docTitle")}
                    </Label>
                    <Input
                      id="text-title"
                      placeholder={t("documents.titlePlaceholder")}
                      {...textForm.register("title")}
                    />
                    {textForm.formState.errors.title && (
                      <p className="text-sm text-destructive">
                        {textForm.formState.errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-content">
                      {t("documents.content")}
                    </Label>
                    <Textarea
                      id="text-content"
                      placeholder={t("documents.contentPlaceholder")}
                      rows={8}
                      {...textForm.register("content")}
                    />
                    {textForm.formState.errors.content && (
                      <p className="text-sm text-destructive">
                        {textForm.formState.errors.content.message}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setTextDialogOpen(false)}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button type="submit" disabled={createTextMutation.isPending}>
                    {createTextMutation.isPending && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {t("common.create")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* URL Document Dialog */}
          <Dialog open={urlDialogOpen} onOpenChange={setUrlDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Globe className="h-4 w-4" />
                {t("documents.addUrl")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={urlForm.handleSubmit(handleCreateUrl)}>
                <DialogHeader>
                  <DialogTitle>{t("documents.addUrlTitle")}</DialogTitle>
                  <DialogDescription>
                    {t("documents.addUrlDescription")}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="url-title">{t("documents.docTitle")}</Label>
                    <Input
                      id="url-title"
                      placeholder="Help Center"
                      {...urlForm.register("title")}
                    />
                    {urlForm.formState.errors.title && (
                      <p className="text-sm text-destructive">
                        {urlForm.formState.errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url-url">{t("documents.url")}</Label>
                    <Input
                      id="url-url"
                      placeholder={t("documents.urlPlaceholder")}
                      {...urlForm.register("url")}
                    />
                    {urlForm.formState.errors.url && (
                      <p className="text-sm text-destructive">
                        {urlForm.formState.errors.url.message}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setUrlDialogOpen(false)}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button type="submit" disabled={createUrlMutation.isPending}>
                    {createUrlMutation.isPending && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {t("documents.crawl")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Document list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t("documents.allDocuments")}
            <Badge variant="secondary" className="ml-2">
              {documents.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            {t("documents.allDocumentsDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                {t("documents.empty")}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("documents.document")}</TableHead>
                  <TableHead>{t("documents.type")}</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {t("documents.chunks")}
                  </TableHead>
                  <TableHead>{t("conversations.status")}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("common.created")}
                  </TableHead>
                  <TableHead className="w-20" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => {
                  const status = statusConfig[doc.status];
                  const type = typeConfig[doc.type];
                  const StatusIcon = status.icon;
                  const TypeIcon = type.icon;

                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate max-w-[200px]">
                              {doc.title}
                            </p>
                            {doc.url && (
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {doc.url}
                              </p>
                            )}
                            {doc.fileName && (
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {doc.fileName}
                                {doc.fileSize &&
                                  ` (${formatFileSize(doc.fileSize)})`}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{type.label}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {doc.chunkCount}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`gap-1 ${status.className}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {(doc.status === DocumentResponseDto.status.PENDING ||
                            doc.status ===
                              DocumentResponseDto.status.FAILED) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleProcess(doc.id)}
                              disabled={processMutation.isPending}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {t("documents.deleteTitle")}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t("documents.deleteDescription", {
                                    title: doc.title,
                                  })}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  {t("common.cancel")}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(doc.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {t("common.delete")}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
