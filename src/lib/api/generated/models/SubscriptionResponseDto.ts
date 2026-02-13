/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPlanDto } from "./SubscriptionPlanDto";
export type SubscriptionResponseDto = {
  /**
   * 구독 ID
   */
  id: string;
  /**
   * 조직 ID
   */
  organizationId: string;
  /**
   * 구독 플랜 정보
   */
  plan: SubscriptionPlanDto;
  /**
   * 구독 상태
   */
  status: SubscriptionResponseDto.status;
  /**
   * 현재 기간 시작일
   */
  currentPeriodStart: string;
  /**
   * 현재 기간 종료일
   */
  currentPeriodEnd: string;
  /**
   * 생성일
   */
  createdAt: string;
};
export namespace SubscriptionResponseDto {
  /**
   * 구독 상태
   */
  export enum status {
    ACTIVE = "active",
    TRIALING = "trialing",
    PAST_DUE = "past_due",
    CANCELED = "canceled",
  }
}
