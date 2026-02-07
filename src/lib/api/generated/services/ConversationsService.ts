/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { ConversationDetailResponseDto } from "../models/ConversationDetailResponseDto";
import type { ConversationResponseDto } from "../models/ConversationResponseDto";
import type { UpdateConversationDto } from "../models/UpdateConversationDto";
export class ConversationsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 대화 목록 조회
   * @param projectId
   * @returns ConversationResponseDto
   * @throws ApiError
   */
  public getConversations(
    projectId: string,
  ): CancelablePromise<Array<ConversationResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{projectId}/conversations",
      path: {
        projectId: projectId,
      },
    });
  }
  /**
   * 대화 상세 조회 (메시지 포함)
   * @param projectId
   * @param conversationId
   * @returns ConversationDetailResponseDto
   * @throws ApiError
   */
  public getConversation(
    projectId: string,
    conversationId: string,
  ): CancelablePromise<ConversationDetailResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{projectId}/conversations/{conversationId}",
      path: {
        projectId: projectId,
        conversationId: conversationId,
      },
    });
  }
  /**
   * 대화 상태 변경
   * @param projectId
   * @param conversationId
   * @param requestBody
   * @returns ConversationResponseDto
   * @throws ApiError
   */
  public updateConversation(
    projectId: string,
    conversationId: string,
    requestBody: UpdateConversationDto,
  ): CancelablePromise<ConversationResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/projects/{projectId}/conversations/{conversationId}",
      path: {
        projectId: projectId,
        conversationId: conversationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
