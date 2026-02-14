/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WidgetMessageResponseDto = {
  /**
   * 메시지 ID
   */
  id: string;
  /**
   * 역할
   */
  role: WidgetMessageResponseDto.role;
  /**
   * 메시지 내용
   */
  content: string;
  /**
   * 콘텐츠 타입
   */
  contentType: WidgetMessageResponseDto.contentType;
  /**
   * 생성일
   */
  createdAt: string;
};
export namespace WidgetMessageResponseDto {
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
