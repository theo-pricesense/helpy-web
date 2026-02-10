/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { CreateWorkspaceDto } from "../models/CreateWorkspaceDto";
import type { UpdateWorkspaceDto } from "../models/UpdateWorkspaceDto";
import type { WorkspaceResponseDto } from "../models/WorkspaceResponseDto";
export class WorkspacesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 워크스페이스 생성
   * @param requestBody
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public createWorkspace(
    requestBody: CreateWorkspaceDto,
  ): CancelablePromise<WorkspaceResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/workspaces",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 워크스페이스 목록 조회
   * @param organizationId
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public getWorkspaces(
    organizationId: string,
  ): CancelablePromise<Array<WorkspaceResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/workspaces",
      query: {
        organizationId: organizationId,
      },
    });
  }
  /**
   * 워크스페이스 상세 조회
   * @param id
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public getWorkspace(id: string): CancelablePromise<WorkspaceResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/workspaces/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * 워크스페이스 수정
   * @param id
   * @param requestBody
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public updateWorkspace(
    id: string,
    requestBody: UpdateWorkspaceDto,
  ): CancelablePromise<WorkspaceResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/workspaces/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 워크스페이스 삭제
   * @param id
   * @returns void
   * @throws ApiError
   */
  public deleteWorkspace(id: string): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/workspaces/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * API 키 재발급
   * @param id
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public regenerateApiKey(id: string): CancelablePromise<WorkspaceResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/workspaces/{id}/regenerate-key",
      path: {
        id: id,
      },
    });
  }
}
