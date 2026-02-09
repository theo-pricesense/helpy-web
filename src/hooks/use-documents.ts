import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type {
  CreateUrlDocumentDto,
  DocumentResponseDto,
} from "@/lib/api/generated";

export const documentKeys = {
  all: ["documents"] as const,
  lists: () => [...documentKeys.all, "list"] as const,
  list: (projectId: string) => [...documentKeys.lists(), projectId] as const,
  details: () => [...documentKeys.all, "detail"] as const,
  detail: (documentId: string) =>
    [...documentKeys.details(), documentId] as const,
};

export function useDocuments(projectId: string) {
  return useQuery<DocumentResponseDto[]>({
    queryKey: documentKeys.list(projectId),
    queryFn: () =>
      apiClient.documents.documentsControllerGetDocuments(projectId),
    enabled: !!projectId,
  });
}

export function useDocument(documentId: string) {
  return useQuery<DocumentResponseDto>({
    queryKey: documentKeys.detail(documentId),
    queryFn: () =>
      apiClient.documents.documentsControllerGetDocument(documentId),
    enabled: !!documentId,
  });
}

export function useCreateUrlDocument(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUrlDocumentDto) =>
      apiClient.documents.documentsControllerCreateUrlDocument(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.list(projectId),
      });
    },
  });
}

export function useDeleteDocument(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) =>
      apiClient.documents.documentsControllerDeleteDocument(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.list(projectId),
      });
    },
  });
}

export function useProcessDocument(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) =>
      apiClient.documents.documentsControllerProcessDocument(documentId),
    onSuccess: (_, documentId) => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.detail(documentId),
      });
      queryClient.invalidateQueries({
        queryKey: documentKeys.list(projectId),
      });
    },
  });
}
