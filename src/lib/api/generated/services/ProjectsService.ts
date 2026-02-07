/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { CreateProjectDto } from "../models/CreateProjectDto";
import type { UpdateProjectDto } from "../models/UpdateProjectDto";
export class ProjectsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 프로젝트 생성
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public projectsControllerCreateProject(
    requestBody: CreateProjectDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/projects",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 프로젝트 목록 조회
   * @param organizationId
   * @returns any
   * @throws ApiError
   */
  public projectsControllerGetProjects(
    organizationId: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects",
      query: {
        organizationId: organizationId,
      },
    });
  }
  /**
   * 프로젝트 상세 조회
   * @param id
   * @returns any
   * @throws ApiError
   */
  public projectsControllerGetProject(id: string): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "GET",
      url: "/projects/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * 프로젝트 수정
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public projectsControllerUpdateProject(
    id: string,
    requestBody: UpdateProjectDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/projects/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 프로젝트 삭제
   * @param id
   * @returns void
   * @throws ApiError
   */
  public projectsControllerDeleteProject(id: string): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/projects/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * API 키 재발급
   * @param id
   * @returns any
   * @throws ApiError
   */
  public projectsControllerRegenerateApiKey(
    id: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "/projects/{id}/regenerate-key",
      path: {
        id: id,
      },
    });
  }
}
