/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InviteMemberDto = {
  /**
   * 초대할 이메일
   */
  email: string;
  /**
   * 멤버 역할
   */
  role: InviteMemberDto.role;
};
export namespace InviteMemberDto {
  /**
   * 멤버 역할
   */
  export enum role {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
  }
}
