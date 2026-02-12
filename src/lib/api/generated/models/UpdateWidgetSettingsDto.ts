/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateWidgetSettingsDto = {
  /**
   * 테마 색상
   */
  themeColor?: string;
  /**
   * 위젯 위치
   */
  position?: UpdateWidgetSettingsDto.position;
  /**
   * 환영 메시지
   */
  welcomeMessage?: string;
  /**
   * 입력창 플레이스홀더
   */
  placeholder?: string;
  /**
   * 자동 열림 지연 시간 (초)
   */
  autoOpenDelay?: number;
  /**
   * 영업시간 활성화 여부
   */
  businessHoursEnabled?: boolean;
  /**
   * 영업시간 시작
   */
  businessHoursStart?: string;
  /**
   * 영업시간 종료
   */
  businessHoursEnd?: string;
};
export namespace UpdateWidgetSettingsDto {
  /**
   * 위젯 위치
   */
  export enum position {
    BOTTOM_RIGHT = "bottom-right",
    BOTTOM_LEFT = "bottom-left",
  }
}
