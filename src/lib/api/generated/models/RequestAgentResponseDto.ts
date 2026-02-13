/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RequestAgentResponseDto = {
  /**
   * 성공 여부
   */
  success: boolean;
  /**
   * 변경된 상태
   */
  status: RequestAgentResponseDto.status;
};
export namespace RequestAgentResponseDto {
  /**
   * 변경된 상태
   */
  export enum status {
    WAITING = "WAITING",
  }
}
