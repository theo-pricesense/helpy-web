/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { CreateProjectDto } from "../models/CreateProjectDto";
import type { ProjectResponseDto } from "../models/ProjectResponseDto";
import type { UpdateProjectDto } from "../models/UpdateProjectDto";
export class ProjectsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 프로젝트 생성
   * @param requestBody
   * @returns ProjectResponseDto
   * @throws ApiError
   */
  public createProject(
    requestBody: CreateProjectDto,
  ): CancelablePromise<ProjectResponseDto> {
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
   * @returns ProjectResponseDto
   * @throws ApiError
   */
  public getProjects(
    organizationId: string,
  ): CancelablePromise<Array<ProjectResponseDto>> {
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
   * @returns ProjectResponseDto
   * @throws ApiError
   */
  public getProject(id: string): CancelablePromise<ProjectResponseDto> {
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
   * @returns ProjectResponseDto
   * @throws ApiError
   */
  public updateProject(
    id: string,
    requestBody: UpdateProjectDto,
  ): CancelablePromise<ProjectResponseDto> {
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
  public deleteProject(id: string): CancelablePromise<void> {
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
   * @returns ProjectResponseDto
   * @throws ApiError
   */
  public regenerateApiKey(id: string): CancelablePromise<ProjectResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/projects/{id}/regenerate-key",
      path: {
        id: id,
      },
    });
  }
}
