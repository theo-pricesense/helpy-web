/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrganizationWithRoleResponseDto = {
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
  plan: OrganizationWithRoleResponseDto.plan;
  /**
   * 생성일
   */
  createdAt: string;
  /**
   * 내 역할
   */
  role: OrganizationWithRoleResponseDto.role;
};
export namespace OrganizationWithRoleResponseDto {
  /**
   * 플랜
   */
  export enum plan {
    FREE = "FREE",
    PRO = "PRO",
    ENTERPRISE = "ENTERPRISE",
  }
  /**
   * 내 역할
   */
  export enum role {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
  }
}
