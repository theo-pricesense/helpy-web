/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { InviteMemberDto } from "../models/InviteMemberDto";
import type { OrganizationMemberResponseDto } from "../models/OrganizationMemberResponseDto";
import type { OrganizationResponseDto } from "../models/OrganizationResponseDto";
import type { OrganizationWithRoleResponseDto } from "../models/OrganizationWithRoleResponseDto";
import type { UpdateMemberRoleDto } from "../models/UpdateMemberRoleDto";
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
  /**
   * 멤버 목록 조회
   * @param id
   * @returns OrganizationMemberResponseDto
   * @throws ApiError
   */
  public getOrganizationMembers(
    id: string,
  ): CancelablePromise<Array<OrganizationMemberResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/organizations/{id}/members",
      path: {
        id: id,
      },
    });
  }
  /**
   * 멤버 초대
   * @param id
   * @param requestBody
   * @returns OrganizationMemberResponseDto
   * @throws ApiError
   */
  public inviteMember(
    id: string,
    requestBody: InviteMemberDto,
  ): CancelablePromise<OrganizationMemberResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/organizations/{id}/members",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 멤버 역할 변경
   * @param id
   * @param memberId
   * @param requestBody
   * @returns OrganizationMemberResponseDto
   * @throws ApiError
   */
  public updateMemberRole(
    id: string,
    memberId: string,
    requestBody: UpdateMemberRoleDto,
  ): CancelablePromise<OrganizationMemberResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/organizations/{id}/members/{memberId}",
      path: {
        id: id,
        memberId: memberId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 멤버 제거
   * @param id
   * @param memberId
   * @returns any
   * @throws ApiError
   */
  public removeMember(id: string, memberId: string): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/organizations/{id}/members/{memberId}",
      path: {
        id: id,
        memberId: memberId,
      },
    });
  }
}
