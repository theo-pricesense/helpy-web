/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectSettingsDto } from "./ProjectSettingsDto";
export type ProjectResponseDto = {
  /**
   * 프로젝트 ID
   */
  id: string;
  /**
   * 조직 ID
   */
  organizationId: string;
  /**
   * 프로젝트 이름
   */
  name: string;
  /**
   * 프로젝트 상태
   */
  status: ProjectResponseDto.status;
  /**
   * API 키
   */
  apiKey: string;
  /**
   * 프로젝트 설정
   */
  settings: ProjectSettingsDto;
  /**
   * 생성일
   */
  createdAt: string;
  /**
   * 수정일
   */
  updatedAt: string;
};
export namespace ProjectResponseDto {
  /**
   * 프로젝트 상태
   */
  export enum status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
  }
}
