/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
export class PaymentsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 결제 내역 조회
   * @param xOrganizationId 조직 ID
   * @param limit
   * @param offset
   * @returns any 결제 내역
   * @throws ApiError
   */
  public paymentsControllerGetPayments(
    xOrganizationId: string,
    limit?: number,
    offset?: number,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "GET",
      url: "/payments",
      headers: {
        "x-organization-id": xOrganizationId,
      },
      query: {
        limit: limit,
        offset: offset,
      },
    });
  }
}
