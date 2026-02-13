/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { SubscriptionUsageResponseDto } from "../models/SubscriptionUsageResponseDto";
export class SubscriptionUsagesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 현재 구독 사용량 조회
   * @param xOrganizationId 조직 ID
   * @returns SubscriptionUsageResponseDto 사용량 정보 반환
   * @throws ApiError
   */
  public subscriptionUsagesControllerGetUsage(
    xOrganizationId: string,
  ): CancelablePromise<SubscriptionUsageResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/subscription-usages",
      headers: {
        "x-organization-id": xOrganizationId,
      },
      errors: {
        404: `사용량 정보 없음`,
      },
    });
  }
}
