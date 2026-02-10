/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ConversationResponseDto = {
  /**
   * 대화 ID
   */
  id: string;
  /**
   * 워크스페이스 ID
   */
  workspaceId: string;
  /**
   * 고객 ID
   */
  customerId: string;
  /**
   * 상태
   */
  status: ConversationResponseDto.status;
  /**
   * 채널
   */
  channel: ConversationResponseDto.channel;
  /**
   * 메시지 수
   */
  messageCount: number;
  /**
   * AI 메시지 수
   */
  aiMessageCount: number;
  /**
   * 마지막 메시지 시간
   */
  lastMessageAt?: string;
  /**
   * 생성일
   */
  createdAt: string;
  /**
   * 수정일
   */
  updatedAt: string;
};
export namespace ConversationResponseDto {
  /**
   * 상태
   */
  export enum status {
    ACTIVE = "ACTIVE",
    WAITING = "WAITING",
    CLOSED = "CLOSED",
  }
  /**
   * 채널
   */
  export enum channel {
    WIDGET = "WIDGET",
    KAKAO = "KAKAO",
    SLACK = "SLACK",
  }
}
