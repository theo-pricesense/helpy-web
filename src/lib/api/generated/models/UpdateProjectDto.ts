/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateProjectDto = {
  /**
   * 프로젝트 이름
   */
  name?: string;
  /**
   * 프로젝트 상태
   */
  status?: UpdateProjectDto.status;
  /**
   * 프로젝트 설정
   */
  settings?: Record<string, any>;
};
export namespace UpdateProjectDto {
  /**
   * 프로젝트 상태
   */
  export enum status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
  }
}
