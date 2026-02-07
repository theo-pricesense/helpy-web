/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import { FetchHttpRequest } from "./core/FetchHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AppService } from "./services/AppService";
import { AuthService } from "./services/AuthService";
import { ConversationsService } from "./services/ConversationsService";
import { DocumentsService } from "./services/DocumentsService";
import { HealthService } from "./services/HealthService";
import { OrganizationsService } from "./services/OrganizationsService";
import { ProjectsService } from "./services/ProjectsService";
import { UsersService } from "./services/UsersService";
import { WidgetService } from "./services/WidgetService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
  public readonly app: AppService;
  public readonly auth: AuthService;
  public readonly conversations: ConversationsService;
  public readonly documents: DocumentsService;
  public readonly health: HealthService;
  public readonly organizations: OrganizationsService;
  public readonly projects: ProjectsService;
  public readonly users: UsersService;
  public readonly widget: WidgetService;
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
    this.conversations = new ConversationsService(this.request);
    this.documents = new DocumentsService(this.request);
    this.health = new HealthService(this.request);
    this.organizations = new OrganizationsService(this.request);
    this.projects = new ProjectsService(this.request);
    this.users = new UsersService(this.request);
    this.widget = new WidgetService(this.request);
  }
}
