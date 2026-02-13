/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { AiSettingsResponseDto } from "../models/AiSettingsResponseDto";
import type { CreateWorkspaceDto } from "../models/CreateWorkspaceDto";
import type { NotificationSettingsResponseDto } from "../models/NotificationSettingsResponseDto";
import type { UpdateAiSettingsDto } from "../models/UpdateAiSettingsDto";
import type { UpdateNotificationSettingsDto } from "../models/UpdateNotificationSettingsDto";
import type { UpdateWidgetSettingsDto } from "../models/UpdateWidgetSettingsDto";
import type { UpdateWorkspaceDto } from "../models/UpdateWorkspaceDto";
import type { WidgetSettingsResponseDto } from "../models/WidgetSettingsResponseDto";
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
        "x-organization-id": xOrganizationId,
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
        "x-organization-id": xOrganizationId,
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
        "x-organization-id": xOrganizationId,
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
        "x-organization-id": xOrganizationId,
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
        "x-organization-id": xOrganizationId,
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
        "x-organization-id": xOrganizationId,
      },
    });
  }
  /**
   * 위젯 설정 조회
   * @param xOrganizationId 조직 ID
   * @param id
   * @returns WidgetSettingsResponseDto
   * @throws ApiError
   */
  public getWidgetSettings(
    xOrganizationId: string,
    id: string,
  ): CancelablePromise<WidgetSettingsResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/workspaces/{id}/widget-settings",
      path: {
        id: id,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
    });
  }
  /**
   * 위젯 설정 수정
   * @param xOrganizationId 조직 ID
   * @param id
   * @param requestBody
   * @returns WidgetSettingsResponseDto
   * @throws ApiError
   */
  public updateWidgetSettings(
    xOrganizationId: string,
    id: string,
    requestBody: UpdateWidgetSettingsDto,
  ): CancelablePromise<WidgetSettingsResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/workspaces/{id}/widget-settings",
      path: {
        id: id,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * AI 설정 조회
   * @param xOrganizationId 조직 ID
   * @param id
   * @returns AiSettingsResponseDto
   * @throws ApiError
   */
  public getAiSettings(
    xOrganizationId: string,
    id: string,
  ): CancelablePromise<AiSettingsResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/workspaces/{id}/ai-settings",
      path: {
        id: id,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
    });
  }
  /**
   * AI 설정 수정
   * @param xOrganizationId 조직 ID
   * @param id
   * @param requestBody
   * @returns AiSettingsResponseDto
   * @throws ApiError
   */
  public updateAiSettings(
    xOrganizationId: string,
    id: string,
    requestBody: UpdateAiSettingsDto,
  ): CancelablePromise<AiSettingsResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/workspaces/{id}/ai-settings",
      path: {
        id: id,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 알림 설정 조회
   * @param xOrganizationId 조직 ID
   * @param id
   * @returns NotificationSettingsResponseDto
   * @throws ApiError
   */
  public getNotificationSettings(
    xOrganizationId: string,
    id: string,
  ): CancelablePromise<NotificationSettingsResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/workspaces/{id}/notification-settings",
      path: {
        id: id,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
    });
  }
  /**
   * 알림 설정 수정
   * @param xOrganizationId 조직 ID
   * @param id
   * @param requestBody
   * @returns NotificationSettingsResponseDto
   * @throws ApiError
   */
  public updateNotificationSettings(
    xOrganizationId: string,
    id: string,
    requestBody: UpdateNotificationSettingsDto,
  ): CancelablePromise<NotificationSettingsResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/workspaces/{id}/notification-settings",
      path: {
        id: id,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
