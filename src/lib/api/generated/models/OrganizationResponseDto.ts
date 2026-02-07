/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrganizationResponseDto = {
  /**
   * 조직 ID
   */
  id: string;
  /**
   * 조직 이름
   */
  name: string;
  /**
   * 조직 슬러그
   */
  slug: string;
  /**
   * 플랜
   */
  plan: OrganizationResponseDto.plan;
  /**
   * 생성일
   */
  createdAt: string;
};
export namespace OrganizationResponseDto {
  /**
   * 플랜
   */
  export enum plan {
    FREE = "FREE",
    PRO = "PRO",
    ENTERPRISE = "ENTERPRISE",
  }
}
