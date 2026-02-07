/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthUserDto } from "./AuthUserDto";
export type AuthResponseDto = {
  /**
   * Access Token
   */
  accessToken: string;
  /**
   * Refresh Token
   */
  refreshToken: string;
  /**
   * 사용자 정보
   */
  user: AuthUserDto;
};
