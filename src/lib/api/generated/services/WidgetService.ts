/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { SendMessageDto } from "../models/SendMessageDto";
import type { StartConversationDto } from "../models/StartConversationDto";
import type { StartConversationResponseDto } from "../models/StartConversationResponseDto";
import type { WidgetConversationResponseDto } from "../models/WidgetConversationResponseDto";
import type { WidgetMessageResponseDto } from "../models/WidgetMessageResponseDto";
export class WidgetService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 대화 시작
   * @param requestBody
   * @param xApiKey Workspace API Key
   * @returns StartConversationResponseDto
   * @throws ApiError
   */
  public startConversation(
    requestBody: StartConversationDto,
    xApiKey?: string,
  ): CancelablePromise<StartConversationResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/widget/conversations",
      headers: {
        "X-API-Key": xApiKey,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 메시지 전송 (AI 응답 스트리밍)
   * @param conversationId
   * @param requestBody
   * @param xApiKey Workspace API Key
   * @returns any
   * @throws ApiError
   */
  public sendMessage(
    conversationId: string,
    requestBody: SendMessageDto,
    xApiKey?: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/widget/conversations/{conversationId}/messages",
      path: {
        conversationId: conversationId,
      },
      headers: {
        "X-API-Key": xApiKey,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 메시지 히스토리 조회
   * @param conversationId
   * @param xApiKey Workspace API Key
   * @returns WidgetMessageResponseDto
   * @throws ApiError
   */
  public getMessages(
    conversationId: string,
    xApiKey?: string,
  ): CancelablePromise<Array<WidgetMessageResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/widget/conversations/{conversationId}/messages",
      path: {
        conversationId: conversationId,
      },
      headers: {
        "X-API-Key": xApiKey,
      },
    });
  }
  /**
   * 대화 상세 조회
   * @param conversationId
   * @param xApiKey Workspace API Key
   * @returns WidgetConversationResponseDto
   * @throws ApiError
   */
  public getConversation(
    conversationId: string,
    xApiKey?: string,
  ): CancelablePromise<WidgetConversationResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/widget/conversations/{conversationId}",
      path: {
        conversationId: conversationId,
      },
      headers: {
        "X-API-Key": xApiKey,
      },
    });
  }
}
