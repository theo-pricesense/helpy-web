/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentResponseDto } from "./PaymentResponseDto";
export type GetPaymentsResponseDto = {
  /**
   * 결제 내역 목록
   */
  items: Array<PaymentResponseDto>;
  /**
   * 전체 결제 건수
   */
  total: number;
};
