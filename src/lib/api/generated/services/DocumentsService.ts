/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { ChunkSearchResultDto } from "../models/ChunkSearchResultDto";
import type { CreateTextDocumentDto } from "../models/CreateTextDocumentDto";
import type { CreateUrlDocumentDto } from "../models/CreateUrlDocumentDto";
import type { DocumentResponseDto } from "../models/DocumentResponseDto";
import type { UpdateDocumentDto } from "../models/UpdateDocumentDto";
export class DocumentsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 텍스트 문서 생성
   * @param projectId
   * @param requestBody
   * @returns DocumentResponseDto
   * @throws ApiError
   */
  public documentsControllerCreateTextDocument(
    projectId: string,
    requestBody: CreateTextDocumentDto,
  ): CancelablePromise<DocumentResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/projects/{projectId}/documents/text",
      path: {
        projectId: projectId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * URL 문서 생성 (웹페이지 크롤링)
   * @param projectId
   * @param requestBody
   * @returns DocumentResponseDto
   * @throws ApiError
   */
  public documentsControllerCreateUrlDocument(
    projectId: string,
    requestBody: CreateUrlDocumentDto,
  ): CancelablePromise<DocumentResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/projects/{projectId}/documents/url",
      path: {
        projectId: projectId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 파일 문서 업로드
   * @param projectId
   * @returns DocumentResponseDto
   * @throws ApiError
   */
  public documentsControllerCreateFileDocument(
    projectId: string,
  ): CancelablePromise<DocumentResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/projects/{projectId}/documents/file",
      path: {
        projectId: projectId,
      },
    });
  }
  /**
   * 프로젝트 문서 목록 조회
   * @param projectId
   * @returns DocumentResponseDto
   * @throws ApiError
   */
  public documentsControllerGetDocuments(
    projectId: string,
  ): CancelablePromise<Array<DocumentResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{projectId}/documents",
      path: {
        projectId: projectId,
      },
    });
  }
  /**
   * 문서 검색 (시맨틱 검색)
   * @param projectId
   * @param query 검색 쿼리
   * @param limit 결과 개수 제한
   * @param threshold 유사도 임계값
   * @returns ChunkSearchResultDto
   * @throws ApiError
   */
  public documentsControllerSearchDocuments(
    projectId: string,
    query: string,
    limit: number = 5,
    threshold: number = 0.7,
  ): CancelablePromise<Array<ChunkSearchResultDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{projectId}/documents/search",
      path: {
        projectId: projectId,
      },
      query: {
        query: query,
        limit: limit,
        threshold: threshold,
      },
    });
  }
  /**
   * 문서 상세 조회
   * @param id
   * @returns DocumentResponseDto
   * @throws ApiError
   */
  public documentsControllerGetDocument(
    id: string,
  ): CancelablePromise<DocumentResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{projectId}/documents/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * 문서 수정
   * @param id
   * @param requestBody
   * @returns DocumentResponseDto
   * @throws ApiError
   */
  public documentsControllerUpdateDocument(
    id: string,
    requestBody: UpdateDocumentDto,
  ): CancelablePromise<DocumentResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/projects/{projectId}/documents/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 문서 삭제
   * @param id
   * @returns void
   * @throws ApiError
   */
  public documentsControllerDeleteDocument(
    id: string,
  ): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/projects/{projectId}/documents/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * 문서 처리 (청킹 & 임베딩)
   * @param id
   * @returns DocumentResponseDto
   * @throws ApiError
   */
  public documentsControllerProcessDocument(
    id: string,
  ): CancelablePromise<DocumentResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/projects/{projectId}/documents/{id}/process",
      path: {
        id: id,
      },
    });
  }
}
