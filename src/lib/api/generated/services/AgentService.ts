/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { AgentConversationResponseDto } from "../models/AgentConversationResponseDto";
import type { AgentMessageResponseDto } from "../models/AgentMessageResponseDto";
import type { SendAgentMessageDto } from "../models/SendAgentMessageDto";
export class AgentService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 대기 중인 대화 목록 조회
   * @param xOrganizationId 조직 ID
   * @param workspaceId
   * @returns AgentConversationResponseDto
   * @throws ApiError
   */
  public getWaitingConversations(
    xOrganizationId: string,
    workspaceId: string,
  ): CancelablePromise<Array<AgentConversationResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/workspaces/{workspaceId}/agent/conversations",
      path: {
        workspaceId: workspaceId,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
    });
  }
  /**
   * 대화 인계받기
   * @param xOrganizationId 조직 ID
   * @param workspaceId
   * @param conversationId
   * @returns AgentConversationResponseDto
   * @throws ApiError
   */
  public takeConversation(
    xOrganizationId: string,
    workspaceId: string,
    conversationId: string,
  ): CancelablePromise<AgentConversationResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/workspaces/{workspaceId}/agent/conversations/{conversationId}/take",
      path: {
        workspaceId: workspaceId,
        conversationId: conversationId,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
    });
  }
  /**
   * AI에게 대화 전환
   * @param xOrganizationId 조직 ID
   * @param workspaceId
   * @param conversationId
   * @returns AgentConversationResponseDto
   * @throws ApiError
   */
  public releaseConversation(
    xOrganizationId: string,
    workspaceId: string,
    conversationId: string,
  ): CancelablePromise<AgentConversationResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/workspaces/{workspaceId}/agent/conversations/{conversationId}/release",
      path: {
        workspaceId: workspaceId,
        conversationId: conversationId,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
    });
  }
  /**
   * 상담원 메시지 전송
   * @param xOrganizationId 조직 ID
   * @param workspaceId
   * @param conversationId
   * @param requestBody
   * @returns AgentMessageResponseDto
   * @throws ApiError
   */
  public sendMessage(
    xOrganizationId: string,
    workspaceId: string,
    conversationId: string,
    requestBody: SendAgentMessageDto,
  ): CancelablePromise<AgentMessageResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/workspaces/{workspaceId}/agent/conversations/{conversationId}/messages",
      path: {
        workspaceId: workspaceId,
        conversationId: conversationId,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
