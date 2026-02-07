/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserResponseDto = {
  /**
   * 사용자 ID
   */
  id: string;
  /**
   * 이메일
   */
  email: string;
  /**
   * 이름
   */
  name: string;
  /**
   * 인증 제공자
   */
  provider?: UserResponseDto.provider;
  /**
   * 생성일
   */
  createdAt: string;
};
export namespace UserResponseDto {
  /**
   * 인증 제공자
   */
  export enum provider {
    EMAIL = "email",
    GOOGLE = "google",
  }
}
