/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { ConversationResponseDto } from "../models/ConversationResponseDto";
import type { CustomerResponseDto } from "../models/CustomerResponseDto";
import type { UpdateCustomerDto } from "../models/UpdateCustomerDto";
export class CustomersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 고객 목록 조회
   * @param projectId
   * @returns CustomerResponseDto
   * @throws ApiError
   */
  public getCustomers(
    projectId: string,
  ): CancelablePromise<Array<CustomerResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{projectId}/customers",
      path: {
        projectId: projectId,
      },
    });
  }
  /**
   * 고객 상세 조회
   * @param projectId
   * @param customerId
   * @returns CustomerResponseDto
   * @throws ApiError
   */
  public getCustomer(
    projectId: string,
    customerId: string,
  ): CancelablePromise<CustomerResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{projectId}/customers/{customerId}",
      path: {
        projectId: projectId,
        customerId: customerId,
      },
    });
  }
  /**
   * 고객 정보 수정
   * @param projectId
   * @param customerId
   * @param requestBody
   * @returns CustomerResponseDto
   * @throws ApiError
   */
  public updateCustomer(
    projectId: string,
    customerId: string,
    requestBody: UpdateCustomerDto,
  ): CancelablePromise<CustomerResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/projects/{projectId}/customers/{customerId}",
      path: {
        projectId: projectId,
        customerId: customerId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 고객 대화 목록 조회
   * @param projectId
   * @param customerId
   * @returns ConversationResponseDto
   * @throws ApiError
   */
  public getCustomerConversations(
    projectId: string,
    customerId: string,
  ): CancelablePromise<Array<ConversationResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{projectId}/customers/{customerId}/conversations",
      path: {
        projectId: projectId,
        customerId: customerId,
      },
    });
  }
}
