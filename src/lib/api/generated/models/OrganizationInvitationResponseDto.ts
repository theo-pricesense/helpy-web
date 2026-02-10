/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrganizationInvitationResponseDto = {
  /**
   * 초대 ID
   */
  id: string;
  /**
   * 이메일
   */
  email: string;
  /**
   * 역할
   */
  role: OrganizationInvitationResponseDto.role;
  /**
   * 상태
   */
  status: OrganizationInvitationResponseDto.status;
  /**
   * 생성일
   */
  createdAt: string;
  /**
   * 만료일
   */
  expiresAt: string;
};
export namespace OrganizationInvitationResponseDto {
  /**
   * 역할
   */
  export enum role {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
  }
  /**
   * 상태
   */
  export enum status {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    EXPIRED = "EXPIRED",
  }
}
