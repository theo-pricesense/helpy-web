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
   * @param xOrganizationId 조직 ID
   * @param requestBody
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public createWorkspace(
    xOrganizationId: string,
    requestBody: CreateWorkspaceDto,
  ): CancelablePromise<WorkspaceResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/workspaces",
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 워크스페이스 목록 조회
   * @param xOrganizationId 조직 ID
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public getWorkspaces(
    xOrganizationId: string,
  ): CancelablePromise<Array<WorkspaceResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/workspaces",
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
    });
  }
  /**
   * 워크스페이스 상세 조회
   * @param xOrganizationId 조직 ID
   * @param id
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public getWorkspace(
    xOrganizationId: string,
    id: string,
  ): CancelablePromise<WorkspaceResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/workspaces/{id}",
      path: {
        id: id,
      },
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
    });
  }
  /**
   * 워크스페이스 수정
   * @param xOrganizationId 조직 ID
   * @param id
   * @param requestBody
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public updateWorkspace(
    xOrganizationId: string,
    id: string,
    requestBody: UpdateWorkspaceDto,
  ): CancelablePromise<WorkspaceResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/workspaces/{id}",
      path: {
        id: id,
      },
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 워크스페이스 삭제
   * @param xOrganizationId 조직 ID
   * @param id
   * @returns void
   * @throws ApiError
   */
  public deleteWorkspace(
    xOrganizationId: string,
    id: string,
  ): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/workspaces/{id}",
      path: {
        id: id,
      },
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
    });
  }
  /**
   * API 키 재발급
   * @param xOrganizationId 조직 ID
   * @param id
   * @returns WorkspaceResponseDto
   * @throws ApiError
   */
  public regenerateApiKey(
    xOrganizationId: string,
    id: string,
  ): CancelablePromise<WorkspaceResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/workspaces/{id}/regenerate-key",
      path: {
        id: id,
      },
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
    });
  }
}
