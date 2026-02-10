/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CustomerResponseDto = {
  /**
   * 고객 ID
   */
  id: string;
  /**
   * 프로젝트 ID
   */
  projectId: string;
  /**
   * 세션 ID
   */
  sessionId?: string;
  /**
   * 외부 ID
   */
  externalId?: string;
  /**
   * 이메일
   */
  email?: string;
  /**
   * 이름
   */
  name?: string;
  /**
   * 아바타 URL
   */
  avatarUrl?: string;
  /**
   * 메타데이터
   */
  metadata: Record<string, any>;
  /**
   * 마지막 활동 시간
   */
  lastSeenAt: string;
  /**
   * 대화 수
   */
  conversationCount: number;
  /**
   * 생성일
   */
  createdAt: string;
  /**
   * 수정일
   */
  updatedAt: string;
};
