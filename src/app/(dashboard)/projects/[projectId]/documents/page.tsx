"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Loader2,
  Trash2,
  Type,
  Upload,
} from "lucide-react";
import { useParams } from "next/navigation";
import type React from "react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCreateUrlDocument,
  useDeleteDocument,
  useDocuments,
} from "@/hooks/use-documents";
import { DocumentResponseDto } from "@/lib/api/generated";

type DocumentStatus = DocumentResponseDto.status;
type DocumentType = DocumentResponseDto.type;

const statusConfig: Record<
  DocumentStatus,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    className: "text-muted-foreground border-muted bg-muted/50",
  },
  PROCESSING: {
    label: "Processing",
    icon: Clock,
    className: "text-amber-500 border-amber-500/20 bg-amber-500/10",
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    className: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10",
  },
  FAILED: {
    label: "Failed",
    icon: AlertCircle,
    className: "text-destructive border-destructive/20 bg-destructive/10",
  },
};

const typeIcon: Record<
  DocumentType,
  React.ComponentType<{ className?: string }>
> = {
  TEXT: Type,
  URL: Globe,
  FILE: FileText,
};

function formatFileSize(bytes: number | undefined): string {
  if (!bytes || bytes === 0) return "-";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [crawlUrl, setCrawlUrl] = useState("");

  const { data: documents = [], isLoading } = useDocuments(projectId);
  const createUrlDocument = useCreateUrlDocument(projectId);
  const deleteDocument = useDeleteDocument(projectId);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(Array.from(e.target.files));
    }
  };

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;
    setUploadProgress(0);

    // TODO: Implement actual file upload with FormData
    // For now, simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(null);
            toast.success(`${files.length} file(s) uploaded`);
          }, 300);
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const handleCrawl = async () => {
    if (!crawlUrl.trim()) return;

    try {
      const url = new URL(crawlUrl);
      await createUrlDocument.mutateAsync({
        title: url.hostname,
        url: crawlUrl,
      });
      setCrawlUrl("");
      toast.success("Crawling started");
    } catch {
      toast.error("Failed to start crawling");
    }
  };

  const handleDelete = async (docId: string, docTitle: string) => {
    try {
      await deleteDocument.mutateAsync(docId);
      toast.success(`"${docTitle}" deleted`);
    } catch {
      toast.error("Failed to delete document");
    }
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Documents
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the AI knowledge base. Upload files or crawl web pages.
        </p>
      </div>

      {/* Upload zone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Upload className="h-4 w-4 text-primary" />
            Upload Documents
          </CardTitle>
          <CardDescription>
            Drag and drop files here. Supported: PDF, TXT, MD, DOCX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
          >
            <Upload className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">
              Drop files here or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, TXT, MD, DOCX up to 10MB
            </p>
            <input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.txt,.md,.docx"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
          {uploadProgress !== null && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uploading...</span>
                <span className="font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Web crawling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4 text-primary" />
            Web Crawling
          </CardTitle>
          <CardDescription>
            Add web pages to the knowledge base by crawling URLs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={crawlUrl}
              onChange={(e) => setCrawlUrl(e.target.value)}
              placeholder="https://docs.example.com/guide"
              className="flex-1"
            />
            <Button
              onClick={handleCrawl}
              disabled={!crawlUrl.trim() || createUrlDocument.isPending}
            >
              {createUrlDocument.isPending && (
                <Loader2 className="animate-spin" />
              )}
              Crawl
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Documents ({documents.length})
          </CardTitle>
          <CardDescription>
            All documents in the knowledge base.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                No documents uploaded yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead className="hidden sm:table-cell">Size</TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Chunks
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created
                  </TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => {
                  const status = statusConfig[doc.status];
                  const StatusIcon = status.icon;
                  const TypeIcon = typeIcon[doc.type];
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate max-w-[200px]">
                              {doc.title}
                            </p>
                            {doc.type === DocumentResponseDto.type.FILE &&
                              doc.fileName && (
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {doc.fileName}
                                </p>
                              )}
                            {doc.type === DocumentResponseDto.type.URL &&
                              doc.url && (
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {doc.url}
                                </p>
                              )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {formatFileSize(doc.fileSize)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center text-sm text-muted-foreground">
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
                        {new Date(doc.createdAt).toLocaleDateString("ko-KR")}
                      </TableCell>
                      <TableCell>
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
                                Delete Document?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove &quot;{doc.title}&quot; from
                                the knowledge base.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(doc.id, doc.title)}
                                disabled={deleteDocument.isPending}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {deleteDocument.isPending && (
                                  <Loader2 className="animate-spin" />
                                )}
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
