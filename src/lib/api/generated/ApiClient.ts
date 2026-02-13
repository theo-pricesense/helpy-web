/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import { FetchHttpRequest } from "./core/FetchHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AgentService } from "./services/AgentService";
import { AppService } from "./services/AppService";
import { AuthService } from "./services/AuthService";
import { ConversationsService } from "./services/ConversationsService";
import { CreditCardsService } from "./services/CreditCardsService";
import { CustomersService } from "./services/CustomersService";
import { DocumentsService } from "./services/DocumentsService";
import { HealthService } from "./services/HealthService";
import { OrganizationsService } from "./services/OrganizationsService";
import { PaymentsService } from "./services/PaymentsService";
import { SubscriptionsService } from "./services/SubscriptionsService";
import { SubscriptionUsagesService } from "./services/SubscriptionUsagesService";
import { UsersService } from "./services/UsersService";
import { WebhooksService } from "./services/WebhooksService";
import { WidgetService } from "./services/WidgetService";
import { WorkspacesService } from "./services/WorkspacesService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
  public readonly agent: AgentService;
  public readonly app: AppService;
  public readonly auth: AuthService;
  public readonly conversations: ConversationsService;
  public readonly creditCards: CreditCardsService;
  public readonly customers: CustomersService;
  public readonly documents: DocumentsService;
  public readonly health: HealthService;
  public readonly organizations: OrganizationsService;
  public readonly payments: PaymentsService;
  public readonly subscriptions: SubscriptionsService;
  public readonly subscriptionUsages: SubscriptionUsagesService;
  public readonly users: UsersService;
  public readonly webhooks: WebhooksService;
  public readonly widget: WidgetService;
  public readonly workspaces: WorkspacesService;
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
    this.agent = new AgentService(this.request);
    this.app = new AppService(this.request);
    this.auth = new AuthService(this.request);
    this.conversations = new ConversationsService(this.request);
    this.creditCards = new CreditCardsService(this.request);
    this.customers = new CustomersService(this.request);
    this.documents = new DocumentsService(this.request);
    this.health = new HealthService(this.request);
    this.organizations = new OrganizationsService(this.request);
    this.payments = new PaymentsService(this.request);
    this.subscriptions = new SubscriptionsService(this.request);
    this.subscriptionUsages = new SubscriptionUsagesService(this.request);
    this.users = new UsersService(this.request);
    this.webhooks = new WebhooksService(this.request);
    this.widget = new WidgetService(this.request);
    this.workspaces = new WorkspacesService(this.request);
  }
}
