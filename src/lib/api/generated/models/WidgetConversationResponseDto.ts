/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WidgetConversationResponseDto = {
  /**
   * 대화 ID
   */
  id: string;
  /**
   * 상태
   */
  status: WidgetConversationResponseDto.status;
  /**
   * 메시지 수
   */
  messageCount: number;
  /**
   * 마지막 메시지 시간
   */
  lastMessageAt: string;
  /**
   * 생성일
   */
  createdAt: string;
};
export namespace WidgetConversationResponseDto {
  /**
   * 상태
   */
  export enum status {
    ACTIVE = "ACTIVE",
    WAITING = "WAITING",
    ASSIGNED = "ASSIGNED",
    CLOSED = "CLOSED",
  }
}
