/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkspaceSettingsDto } from "./WorkspaceSettingsDto";
export type WorkspaceResponseDto = {
  /**
   * 워크스페이스 ID
   */
  id: string;
  /**
   * 조직 ID
   */
  organizationId: string;
  /**
   * 워크스페이스 이름
   */
  name: string;
  /**
   * 워크스페이스 상태
   */
  status: WorkspaceResponseDto.status;
  /**
   * API 키
   */
  apiKey: string;
  /**
   * 워크스페이스 설정
   */
  settings: WorkspaceSettingsDto;
  /**
   * 생성일
   */
  createdAt: string;
  /**
   * 수정일
   */
  updatedAt: string;
};
export namespace WorkspaceResponseDto {
  /**
   * 워크스페이스 상태
   */
  export enum status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
  }
}
