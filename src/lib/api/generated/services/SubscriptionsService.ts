/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { ChangePlanDto } from "../models/ChangePlanDto";
import type { SubscriptionResponseDto } from "../models/SubscriptionResponseDto";
export class SubscriptionsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 현재 구독 정보 조회
   * @param xOrganizationId 조직 ID
   * @returns SubscriptionResponseDto 구독 정보 반환
   * @throws ApiError
   */
  public subscriptionsControllerGetSubscription(
    xOrganizationId: string,
  ): CancelablePromise<SubscriptionResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/subscriptions",
      headers: {
        "x-organization-id": xOrganizationId,
      },
      errors: {
        404: `구독 정보 없음`,
      },
    });
  }
  /**
   * 플랜 변경
   * @param xOrganizationId 조직 ID
   * @param requestBody
   * @returns any 플랜 변경 성공
   * @throws ApiError
   */
  public subscriptionsControllerChangePlan(
    xOrganizationId: string,
    requestBody: ChangePlanDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/subscriptions/change-plan",
      headers: {
        "x-organization-id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `동일 플랜으로 변경 불가`,
        404: `구독 또는 플랜을 찾을 수 없음`,
      },
    });
  }
}
