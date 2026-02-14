/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AgentMessageResponseDto = {
  /**
   * 메시지 ID
   */
  id: string;
  /**
   * 대화 ID
   */
  conversationId: string;
  /**
   * 역할
   */
  role: AgentMessageResponseDto.role;
  /**
   * 발신자 ID (customer: customerId, agent: userId)
   */
  senderId?: string;
  /**
   * 메시지 내용
   */
  content: string;
  /**
   * 콘텐츠 타입
   */
  contentType: AgentMessageResponseDto.contentType;
  /**
   * 생성일
   */
  createdAt: string;
};
export namespace AgentMessageResponseDto {
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
