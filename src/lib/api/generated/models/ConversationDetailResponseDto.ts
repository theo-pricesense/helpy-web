/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MessageResponseDto } from "./MessageResponseDto";
export type ConversationDetailResponseDto = {
  /**
   * 대화 ID
   */
  id: string;
  /**
   * 프로젝트 ID
   */
  projectId: string;
  /**
   * 고객 ID
   */
  customerId: string;
  /**
   * 상태
   */
  status: ConversationDetailResponseDto.status;
  /**
   * 채널
   */
  channel: ConversationDetailResponseDto.channel;
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
  /**
   * 메시지 목록
   */
  messages: Array<MessageResponseDto>;
};
export namespace ConversationDetailResponseDto {
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
