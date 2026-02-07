/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { OrganizationResponseDto } from "../models/OrganizationResponseDto";
import type { OrganizationWithRoleResponseDto } from "../models/OrganizationWithRoleResponseDto";
import type { UpdateOrganizationDto } from "../models/UpdateOrganizationDto";
export class OrganizationsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * 내 조직 목록 조회
   * @returns OrganizationWithRoleResponseDto
   * @throws ApiError
   */
  public getMyOrganizations(): CancelablePromise<
    Array<OrganizationWithRoleResponseDto>
  > {
    return this.httpRequest.request({
      method: "GET",
      url: "/organizations/me",
    });
  }
  /**
   * 조직 상세 조회
   * @param id
   * @returns OrganizationResponseDto
   * @throws ApiError
   */
  public getOrganization(
    id: string,
  ): CancelablePromise<OrganizationResponseDto> {
    return this.httpRequest.request({
      method: "GET",
      url: "/organizations/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * 조직 정보 수정
   * @param id
   * @param requestBody
   * @returns OrganizationResponseDto
   * @throws ApiError
   */
  public updateOrganization(
    id: string,
    requestBody: UpdateOrganizationDto,
  ): CancelablePromise<OrganizationResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/organizations/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
