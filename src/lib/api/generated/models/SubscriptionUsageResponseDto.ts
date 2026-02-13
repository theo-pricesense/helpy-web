/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SubscriptionUsageResponseDto = {
  /**
   * 사용량 ID
   */
  id: string;
  /**
   * 조직 ID
   */
  organizationId: string;
  /**
   * 사용한 AI 응답 수
   */
  aiResponsesUsed: number;
  /**
   * AI 응답 제한
   */
  aiResponsesLimit: number;
  /**
   * 무제한 여부
   */
  isUnlimited: boolean;
  /**
   * 남은 응답 수 (무제한인 경우 null)
   */
  remainingResponses?: Record<string, any> | null;
  /**
   * 사용률 (%, 무제한인 경우 null)
   */
  usagePercentage?: Record<string, any> | null;
  /**
   * 기간 시작일
   */
  periodStart: string;
  /**
   * 기간 종료일
   */
  periodEnd: string;
};
