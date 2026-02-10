/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateWorkspaceDto = {
  /**
   * 워크스페이스 이름
   */
  name?: string;
  /**
   * 워크스페이스 상태
   */
  status?: UpdateWorkspaceDto.status;
  /**
   * 워크스페이스 설정
   */
  settings?: Record<string, any>;
};
export namespace UpdateWorkspaceDto {
  /**
   * 워크스페이스 상태
   */
  export enum status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
  }
}
