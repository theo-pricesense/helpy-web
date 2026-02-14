/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateAiSettingsDto = {
  /**
   * API 키 모드
   */
  apiKeyMode?: UpdateAiSettingsDto.apiKeyMode;
  /**
   * OpenAI API 키 (BYOK 모드에서 필요)
   */
  openaiApiKey?: string;
  /**
   * 임베딩 모델
   */
  embeddingModel?: UpdateAiSettingsDto.embeddingModel;
  /**
   * 채팅 모델
   */
  chatModel?: UpdateAiSettingsDto.chatModel;
  /**
   * 온도 (0.0 ~ 2.0)
   */
  temperature?: number;
  /**
   * 시스템 프롬프트
   */
  systemPrompt?: string;
};
export namespace UpdateAiSettingsDto {
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
