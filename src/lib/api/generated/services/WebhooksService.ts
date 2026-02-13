/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
export class WebhooksService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 토스페이먼츠 웹훅 수신
   * @returns any
   * @throws ApiError
   */
  public tossPaymentsWebhookControllerHandleWebhook(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/webhooks/tosspayments",
    });
  }
}
