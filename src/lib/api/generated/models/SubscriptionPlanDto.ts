/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionPlanDto = {
  /**
   * 플랜 ID
   */
  id: string;
  /**
   * 플랜 코드
   */
  code: string;
  /**
   * 플랜 이름
   */
  name: string;
  /**
   * 월 가격
   */
  monthlyPrice: number;
  /**
   * 통화
   */
  currency: string;
  /**
   * 월 AI 응답 제한
   */
  monthlyAiResponses: number;
};
