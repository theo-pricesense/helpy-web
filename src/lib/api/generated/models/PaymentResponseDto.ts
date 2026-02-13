/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentResponseDto = {
  /**
   * 결제 ID
   */
  id: string;
  /**
   * 결제 유형
   */
  type: string;
  /**
   * 주문 ID
   */
  orderId: string;
  /**
   * 주문명
   */
  orderName: string;
  /**
   * 결제 금액
   */
  amount: number;
  /**
   * 결제 상태
   */
  status: PaymentResponseDto.status;
  /**
   * 결제 승인 일시
   */
  approvedAt?: string;
  /**
   * 생성일
   */
  createdAt: string;
};
export namespace PaymentResponseDto {
  /**
   * 결제 상태
   */
  export enum status {
    READY = "READY",
    DONE = "DONE",
    CANCELED = "CANCELED",
    FAILED = "FAILED",
  }
}
