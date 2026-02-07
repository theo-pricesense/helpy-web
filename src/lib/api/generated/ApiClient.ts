/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import { FetchHttpRequest } from "./core/FetchHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AppService } from "./services/AppService";
import { AuthService } from "./services/AuthService";
import { OrganizationsService } from "./services/OrganizationsService";
import { ProjectsService } from "./services/ProjectsService";
import { UsersService } from "./services/UsersService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
  public readonly app: AppService;
  public readonly auth: AuthService;
  public readonly organizations: OrganizationsService;
  public readonly projects: ProjectsService;
  public readonly users: UsersService;
  public readonly request: BaseHttpRequest;
  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = FetchHttpRequest,
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "",
      VERSION: config?.VERSION ?? "1.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });
    this.app = new AppService(this.request);
    this.auth = new AuthService(this.request);
    this.organizations = new OrganizationsService(this.request);
    this.projects = new ProjectsService(this.request);
    this.users = new UsersService(this.request);
  }
}
