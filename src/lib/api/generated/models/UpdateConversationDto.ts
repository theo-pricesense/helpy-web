/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateConversationDto = {
  /**
   * 대화 상태
   */
  status?: UpdateConversationDto.status;
};
export namespace UpdateConversationDto {
  /**
   * 대화 상태
   */
  export enum status {
    ACTIVE = "ACTIVE",
    WAITING = "WAITING",
    CLOSED = "CLOSED",
  }
}
