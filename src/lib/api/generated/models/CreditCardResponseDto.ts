/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreditCardResponseDto = {
  /**
   * 카드 ID
   */
  id: string;
  /**
   * 결제 게이트웨이
   */
  gateway: string;
  /**
   * 카드 번호 (마스킹)
   */
  cardNumber: string;
  /**
   * 카드사
   */
  cardCompany: string;
  /**
   * 기본 카드 여부
   */
  isDefault: boolean;
  /**
   * 등록일
   */
  createdAt: string;
};
