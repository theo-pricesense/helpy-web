/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { CreditCardResponseDto } from "../models/CreditCardResponseDto";
import type { RegisterCreditCardDto } from "../models/RegisterCreditCardDto";
export class CreditCardsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 카드 등록 (빌링키 발급)
   * @param xOrganizationId 조직 ID
   * @param requestBody
   * @returns any 카드 등록 성공
   * @throws ApiError
   */
  public creditCardsControllerRegisterCreditCard(
    xOrganizationId: string,
    requestBody: RegisterCreditCardDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/credit-cards",
      headers: {
        "x-organization-id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 카드 목록 조회
   * @param xOrganizationId 조직 ID
   * @returns CreditCardResponseDto 카드 목록
   * @throws ApiError
   */
  public creditCardsControllerGetCreditCards(
    xOrganizationId: string,
  ): CancelablePromise<Array<CreditCardResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/credit-cards",
      headers: {
        "x-organization-id": xOrganizationId,
      },
    });
  }
  /**
   * 카드 삭제
   * @param xOrganizationId 조직 ID
   * @param id
   * @returns any 삭제 성공
   * @throws ApiError
   */
  public creditCardsControllerDeleteCreditCard(
    xOrganizationId: string,
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/credit-cards/{id}",
      path: {
        id: id,
      },
      headers: {
        "x-organization-id": xOrganizationId,
      },
      errors: {
        404: `카드를 찾을 수 없음`,
      },
    });
  }
}
