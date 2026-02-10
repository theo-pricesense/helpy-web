/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateMemberRoleDto = {
  /**
   * 변경할 역할
   */
  role: UpdateMemberRoleDto.role;
};
export namespace UpdateMemberRoleDto {
  /**
   * 변경할 역할
   */
  export enum role {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
  }
}
