import { OpenAPI } from "./generated";

export function initializeApiConfig() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  OpenAPI.BASE = apiUrl;
  OpenAPI.WITH_CREDENTIALS = true;
  OpenAPI.CREDENTIALS = "include";
}

// 클라이언트 사이드에서 자동 초기화
if (typeof window !== "undefined") {
  initializeApiConfig();
}
