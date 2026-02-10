/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrganizationMemberResponseDto = {
  /**
   * 멤버 ID
   */
  id: string;
  /**
   * 사용자 ID
   */
  userId: string;
  /**
   * 이메일
   */
  email: string;
  /**
   * 이름
   */
  name: string;
  /**
   * 역할
   */
  role: OrganizationMemberResponseDto.role;
  /**
   * 가입일
   */
  createdAt: string;
};
export namespace OrganizationMemberResponseDto {
  /**
   * 역할
   */
  export enum role {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
  }
}
