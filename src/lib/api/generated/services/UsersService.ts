/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { UpdateMeDto } from "../models/UpdateMeDto";
import type { UserResponseDto } from "../models/UserResponseDto";
export class UsersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 내 정보 조회
   * @returns UserResponseDto
   * @throws ApiError
   */
  public getMe(): CancelablePromise<UserResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/users/me",
    });
  }
  /**
   * 내 정보 수정
   * @param requestBody
   * @returns UserResponseDto
   * @throws ApiError
   */
  public updateMe(
    requestBody: UpdateMeDto,
  ): CancelablePromise<UserResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/users/me",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 회원 탈퇴
   * @returns any
   * @throws ApiError
   */
  public deleteMe(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/users/me",
    });
  }
}
