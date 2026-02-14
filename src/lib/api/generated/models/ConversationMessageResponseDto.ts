/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ConversationMessageResponseDto = {
  /**
   * 메시지 ID
   */
  id: string;
  /**
   * 역할
   */
  role: ConversationMessageResponseDto.role;
  /**
   * 메시지 내용
   */
  content: string;
  /**
   * 콘텐츠 타입
   */
  contentType: ConversationMessageResponseDto.contentType;
  /**
   * 생성일
   */
  createdAt: string;
};
export namespace ConversationMessageResponseDto {
  /**
   * 역할
   */
  export enum role {
    CUSTOMER = "CUSTOMER",
    ASSISTANT = "ASSISTANT",
    AGENT = "AGENT",
  }
  /**
   * 콘텐츠 타입
   */
  export enum contentType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    FILE = "FILE",
  }
}
