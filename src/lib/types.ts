export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  memberCount?: number;
}

export interface Project {
  id: string;
  name: string;
  organizationId: string;
  apiKey?: string;
  status?: "active" | "inactive";
  createdAt: string;
}
