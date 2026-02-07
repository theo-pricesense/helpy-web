/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
export class AppService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @returns any
   * @throws ApiError
   */
  public appControllerGetHello(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "GET",
      url: "/",
    });
  }
}
