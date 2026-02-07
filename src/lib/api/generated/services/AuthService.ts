/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { LoginDto } from "../models/LoginDto";
import type { RefreshDto } from "../models/RefreshDto";
import type { SendCodeDto } from "../models/SendCodeDto";
import type { SignupDto } from "../models/SignupDto";
import type { VerifyCodeDto } from "../models/VerifyCodeDto";
export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 인증 코드 발송
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public sendCode(requestBody: SendCodeDto): CancelablePromise<any> {
    console.log(requestBody);
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/send-code",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 인증 코드 확인
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public verifyCode(requestBody: VerifyCodeDto): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/verify-code",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 회원가입
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public signup(requestBody: SignupDto): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/signup",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 로그인
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public login(requestBody: LoginDto): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 토큰 갱신
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public refresh(requestBody: RefreshDto): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/refresh",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 로그아웃
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public logout(requestBody: RefreshDto): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/logout",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
