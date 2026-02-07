/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StartConversationResponseDto = {
  /**
   * 대화 ID
   */
  conversationId: string;
  /**
   * 고객 ID
   */
  customerId: string;
  /**
   * 상태
   */
  status: StartConversationResponseDto.status;
};
export namespace StartConversationResponseDto {
  /**
   * 상태
   */
  export enum status {
    ACTIVE = "ACTIVE",
    WAITING = "WAITING",
    CLOSED = "CLOSED",
  }
}
