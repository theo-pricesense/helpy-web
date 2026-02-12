/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NotificationSettingsResponseDto = {
  id: string;
  workspaceId: string;
  emailEnabled: boolean;
  emailRecipients: Array<string>;
  slackEnabled: boolean;
  slackWebhookUrl: Record<string, any> | null;
  onNewConversation: boolean;
  onAgentRequested: boolean;
  createdAt: string;
  updatedAt: string;
};
