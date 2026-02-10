/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { InviteMemberDto } from "../models/InviteMemberDto";
import type { OrganizationInvitationResponseDto } from "../models/OrganizationInvitationResponseDto";
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
   * @param xOrganizationId 조직 ID
   * @returns OrganizationMemberResponseDto
   * @throws ApiError
   */
  public getOrganizationMembers(
    xOrganizationId: string,
  ): CancelablePromise<Array<OrganizationMemberResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/organizations/members",
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
    });
  }
  /**
   * 멤버 역할 변경
   * @param memberId
   * @param xOrganizationId 조직 ID
   * @param requestBody
   * @returns OrganizationMemberResponseDto
   * @throws ApiError
   */
  public updateMemberRole(
    memberId: string,
    xOrganizationId: string,
    requestBody: UpdateMemberRoleDto,
  ): CancelablePromise<OrganizationMemberResponseDto> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/organizations/members/{memberId}",
      path: {
        memberId: memberId,
      },
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 멤버 제거
   * @param memberId
   * @param xOrganizationId 조직 ID
   * @returns any
   * @throws ApiError
   */
  public removeMember(
    memberId: string,
    xOrganizationId: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/organizations/members/{memberId}",
      path: {
        memberId: memberId,
      },
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
    });
  }
  /**
   * 초대 목록 조회
   * @param xOrganizationId 조직 ID
   * @returns OrganizationInvitationResponseDto
   * @throws ApiError
   */
  public getOrganizationInvitations(
    xOrganizationId: string,
  ): CancelablePromise<Array<OrganizationInvitationResponseDto>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/organizations/invitations",
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
    });
  }
  /**
   * 멤버 초대
   * @param xOrganizationId 조직 ID
   * @param requestBody
   * @returns OrganizationInvitationResponseDto
   * @throws ApiError
   */
  public inviteMember(
    xOrganizationId: string,
    requestBody: InviteMemberDto,
  ): CancelablePromise<OrganizationInvitationResponseDto> {
    return this.httpRequest.request({
      method: "POST",
      url: "/organizations/invitations",
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * 초대 취소
   * @param invitationId
   * @param xOrganizationId 조직 ID
   * @returns any
   * @throws ApiError
   */
  public cancelInvitation(
    invitationId: string,
    xOrganizationId: string,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/organizations/invitations/{invitationId}",
      path: {
        invitationId: invitationId,
      },
      headers: {
        "X-Organization-Id": xOrganizationId,
      },
    });
  }
}
