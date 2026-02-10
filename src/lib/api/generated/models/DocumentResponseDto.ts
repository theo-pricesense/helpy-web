/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DocumentResponseDto = {
  /**
   * 문서 ID
   */
  id: string;
  /**
   * 워크스페이스 ID
   */
  workspaceId: string;
  /**
   * 문서 타입
   */
  type: DocumentResponseDto.type;
  /**
   * 문서 제목
   */
  title: string;
  /**
   * 문서 내용 (TEXT 타입)
   */
  content?: string;
  /**
   * URL (URL 타입)
   */
  url?: string;
  /**
   * 파일명 (FILE 타입)
   */
  fileName?: string;
  /**
   * 파일 크기 (FILE 타입)
   */
  fileSize?: number;
  /**
   * MIME 타입 (FILE 타입)
   */
  mimeType?: string;
  /**
   * 처리 상태
   */
  status: DocumentResponseDto.status;
  /**
   * 에러 메시지
   */
  errorMessage?: string;
  /**
   * 청크 수
   */
  chunkCount: number;
  /**
   * 마지막 처리 시간
   */
  lastProcessedAt?: string;
  /**
   * 생성일
   */
  createdAt: string;
  /**
   * 수정일
   */
  updatedAt: string;
};
export namespace DocumentResponseDto {
  /**
   * 문서 타입
   */
  export enum type {
    TEXT = "TEXT",
    URL = "URL",
    FILE = "FILE",
  }
  /**
   * 처리 상태
   */
  export enum status {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
  }
}
