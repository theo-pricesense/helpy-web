/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AiSettingsResponseDto = {
  /**
   * AI 설정 ID
   */
  id: string;
  /**
   * 워크스페이스 ID
   */
  workspaceId: string;
  /**
   * API 키 모드
   */
  apiKeyMode: AiSettingsResponseDto.apiKeyMode;
  /**
   * OpenAI API 키 (마스킹됨)
   */
  openaiApiKey: Record<string, any> | null;
  /**
   * 임베딩 모델
   */
  embeddingModel: AiSettingsResponseDto.embeddingModel;
  /**
   * 채팅 모델
   */
  chatModel: AiSettingsResponseDto.chatModel;
  /**
   * 온도 (창의성)
   */
  temperature: number;
  /**
   * 시스템 프롬프트
   */
  systemPrompt: string;
  /**
   * 생성일
   */
  createdAt: string;
  /**
   * 수정일
   */
  updatedAt: string;
};
export namespace AiSettingsResponseDto {
  /**
   * API 키 모드
   */
  export enum apiKeyMode {
    HELPY = "HELPY",
    BYOK = "BYOK",
  }
  /**
   * 임베딩 모델
   */
  export enum embeddingModel {
    TEXT_EMBEDDING_3_SMALL = "text-embedding-3-small",
    TEXT_EMBEDDING_3_LARGE = "text-embedding-3-large",
  }
  /**
   * 채팅 모델
   */
  export enum chatModel {
    GPT_4O_MINI = "gpt-4o-mini",
    GPT_4O = "gpt-4o",
    GPT_4_TURBO = "gpt-4-turbo",
  }
}
